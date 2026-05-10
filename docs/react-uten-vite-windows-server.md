# React uten Vite pa Windows Server 2022

Dette oppsettet er laget for elever som skal kjore frontend og backend pa Windows Server 2022 uten Vite, npm eller et byggetrinn.

## Hva som er endret

Frontend bruker na:

- `index.html`
- `app.js`
- `styles.css`

Det betyr:

- ingen `vite.config.js`
- ingen `npm install`
- ingen `npm run dev`

React lastes direkte i nettleseren via import map.

## Hva elevene trenger pa Windows Server 2022

1. Python installert
2. Prosjektmappen kopiert til serveren
3. En nettleser pa serveren eller en klient som kan apne frontend-adressen

## Mappene som er viktige

- `frontend`
- `backend`
- `scripts/windows`

## Start manuelt i to PowerShell-vinduer

### Vindu 1: Backend

```powershell
Set-Location C:\sti\til\soc
py -3 .\backend\server.py
```

Dette starter API-et pa:

```text
http://127.0.0.1:8001/api/summary
```

### Vindu 2: Frontend

```powershell
Set-Location C:\sti\til\soc\frontend
py -3 -m http.server 4173
```

Dette starter frontend pa:

```text
http://127.0.0.1:4173
```

## Start med ett PowerShell-skript

Du kan ogsa bruke:

```powershell
Set-Location C:\sti\til\soc
.\scripts\windows\Start-SocWebApp.ps1
```

Skriptet starter backend og frontend i hvert sitt PowerShell-vindu.

## Hvis Python ikke er tilgjengelig

Sjekk med:

```powershell
py --version
```

Hvis det ikke virker, prov:

```powershell
python --version
```

## Hvordan elevene jobber videre

1. Kjor `Get-SocSummary.ps1` pa collector-serveren.
2. Backend leser JSON-data fra `backend/data/soc-summary.json`, eller dere kan endre stien senere.
3. Frontend henter data fra backend.
4. Hvis backend er stoppet, viser frontend lokal sample-data.

## Pedagogisk fordel

Dette oppsettet er lettere for elever fordi:

- de slipper Node og npm
- de slipper byggetrinn
- de kan fokusere pa React-logikk, JSON og API
- det ligner mer pa enkel drift og feilsoking i prosjektet
