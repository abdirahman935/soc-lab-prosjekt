# Python backend

Dette er en enkel backend uten eksterne avhengigheter. Den leverer SOC-data som JSON og er laget for a passe sammen med React-frontend.

## Start backend

```bash
python3 server.py
```

Standard adresse:

```text
http://127.0.0.1:8001/api/summary
```

## Ekte Windows-data

Hvis du har kjor `Get-SocSummary.ps1` pa Windows, kan du peke backend mot den filen:

```bash
python3 server.py --data "/sti/til/soc-summary.json"
```
