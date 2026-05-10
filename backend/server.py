#!/usr/bin/env python3
import argparse
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any, Dict


ROOT = Path(__file__).resolve().parent
DEFAULT_DATA_PATH = ROOT / "data" / "soc-summary.json"


def load_payload(data_path: Path) -> Dict[str, Any]:
    # Denne funksjonen leser JSON-fila som frontend skal vise i dashboardet.
    if not data_path.exists():
        raise FileNotFoundError(f"Fant ikke datasettet: {data_path}")

    with data_path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


class SocHandler(BaseHTTPRequestHandler):
    data_path = DEFAULT_DATA_PATH

    def _write_json(self, payload: Dict[str, Any], status: int = 200) -> None:
        # Her sender backend et Python-objekt tilbake til nettleseren som JSON.
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        # Dette er en enkel helsesjekk som er nyttig når vi vil kontrollere at backend kjører.
        if self.path in ("/health", "/api/health"):
            self._write_json({"status": "ok"})
            return

        # Dette er hovedendepunktet som frontend bruker når den skal hente SOC-data.
        if self.path in ("/api/summary", "/api/summary/"):
            try:
                payload = load_payload(self.data_path)
            except Exception as exc:
                self._write_json(
                    {"error": "Kunne ikke lese SOC-data", "details": str(exc)},
                    status=500,
                )
                return

            self._write_json(payload)
            return

        self._write_json(
            {
                "message": "SOC backend kjører",
                "endpoints": ["/api/health", "/api/summary"],
                "dataPath": str(self.data_path),
            }
        )

    def do_OPTIONS(self) -> None:
        # Denne delen gjør det enklere å hente data fra frontend selv om den kjører på en annen port.
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, format: str, *args: Any) -> None:
        return


def parse_args() -> argparse.Namespace:
    # Her kan vi velge host, port og datafil når serveren startes.
    parser = argparse.ArgumentParser(description="Enkel Python-backend for SOC-dashboard.")
    parser.add_argument("--host", default="127.0.0.1", help="Host som serveren skal lytte på.")
    parser.add_argument("--port", default=8001, type=int, help="Port for API-et.")
    parser.add_argument(
        "--data",
        default=os.environ.get("SOC_DATA_PATH", str(DEFAULT_DATA_PATH)),
        help="Sti til SOC JSON-data.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    SocHandler.data_path = Path(args.data).resolve()
    # Til slutt starter vi en liten HTTP-server som bare leverer JSON-data.
    server = ThreadingHTTPServer((args.host, args.port), SocHandler)
    print(f"SOC backend kjører på http://{args.host}:{args.port}")
    print(f"Leser data fra: {SocHandler.data_path}")
    server.serve_forever()


if __name__ == "__main__":
    main()
