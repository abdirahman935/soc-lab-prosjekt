#!/usr/bin/env bash
set -euo pipefail

# Starter både React-frontend og Python-backend lokalt.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_PORT=4173
BACKEND_PORT=8001
PIDS=()

stop_port_listener() {
  # Stopper gammel prosess hvis porten allerede er i bruk.
  local port="$1"
  local pids
  pids="$(lsof -tiTCP:"$port" -sTCP:LISTEN 2>/dev/null || true)"

  if [[ -n "$pids" ]]; then
    echo "Stopper gammel prosess pa port $port ..."
    kill $pids 2>/dev/null || true
    sleep 1
  fi
}

cleanup() {
  # Sørger for at prosessene stoppes når vi trykker Ctrl+C.
  for pid in "${PIDS[@]:-}"; do
    kill "$pid" 2>/dev/null || true
  done
}

trap cleanup EXIT INT TERM

stop_port_listener "$BACKEND_PORT"
stop_port_listener "$FRONTEND_PORT"

# Python-serveren leverer JSON til frontend.
python3 "$ROOT_DIR/backend/server.py" &
PIDS+=("$!")

(
  cd "$ROOT_DIR/frontend"
  # Enkel lokal webserver for HTML, CSS og React-fila.
  python3 -m http.server "$FRONTEND_PORT"
) &
PIDS+=("$!")

echo "Frontend: http://127.0.0.1:$FRONTEND_PORT/"
echo "Backend:  http://127.0.0.1:$BACKEND_PORT/api/summary"
echo "Trykk Ctrl+C for å stoppe begge."

wait
