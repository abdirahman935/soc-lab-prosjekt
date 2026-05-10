#!/usr/bin/env bash
set -euo pipefail

# Stopper prosesser som hører til den lille SOC-webappen.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

pkill -f "$ROOT_DIR/backend/server.py" 2>/dev/null || true
pkill -f "$ROOT_DIR/frontend" 2>/dev/null || true
pkill -f "http.server 4173" 2>/dev/null || true
pkill -f "start-webapp.sh" 2>/dev/null || true
kill "$(lsof -tiTCP:8001 -sTCP:LISTEN 2>/dev/null)" 2>/dev/null || true
kill "$(lsof -tiTCP:4173 -sTCP:LISTEN 2>/dev/null)" 2>/dev/null || true

echo "Forsøkte å stoppe SOC-webappen."
echo "Hvis du fortsatt ser logglinjer, trykk Ctrl+C i terminalvinduet der de dukker opp."
