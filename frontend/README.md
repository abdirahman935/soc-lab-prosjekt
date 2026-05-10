# React frontend uten Vite

Dette er frontend-delen for SOC-dashboardet. Den henter data fra Python-backend pa `http://127.0.0.1:8001/api/summary`, men bruker ikke Vite, npm eller et byggetrinn.

## Start frontend pa Mac eller Linux

```bash
cd frontend
python3 -m http.server 4173
```

## Start frontend pa Windows Server 2022

```powershell
Set-Location frontend
py -3 -m http.server 4173
```

## Standard adresse

```text
http://127.0.0.1:4173
```

## Struktur

- `index.html`: import map og oppstart
- `app.js`: React-logikk uten JSX-bygging
- `styles.css`: styling
- `data/sample-soc-summary.json`: lokal fallback hvis backend ikke svarer

## Merk

React lastes i nettleseren via ESM-importer, sa klienten ma ha nettilgang for a hente React-modulene.

Frontend prover forst Python-backend, og hvis den ikke svarer vises lokal sample-data i stedet.

## Ekte data fra Windows Server 2022

Hvis elevene skal bruke ekte data fra sitt eget domene, bor de:

1. kjor `Get-SocSummary.ps1` pa `SRV-SOC01` og lagre JSON-fila i `C:\SOC\exports\soc-summary.json`
2. starte backend med `Start-SocWebApp.ps1`
3. apne frontend pa `http://127.0.0.1:4173`

Da vil dashboardet vise domenenavn, maskiner og hendelser fra deres egen Windows-lab.
