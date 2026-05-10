# Hendelser og vurdering

## Seks gode hendelser

### 1. Brute force eller mange mislykkede pålogginger

- Lærer gjør: feil passord flere ganger mot samme bruker eller flere brukere
- Elevene skal finne: `4625` og eventuelt `4740`
- Elevene skal forklare: omfang, berørte brukere og om kontolasing slo inn
- Tiltak: lås konto, reset passord, verifiser policy, vurder om klienten skal isoleres

### 2. Feil rettigheter pa delt mappe

- Lærer gjør: gir en elev skriveadgang der bare lærere skal ha tilgang
- Elevene skal finne: feil i share-permissions, NTFS eller gruppemedlemskap
- Elevene skal bruke: AccessChk, GUI, PowerShell og gruppeanalyse
- Tiltak: rette ACL, rydde i grupper og dokumentere hva som faktisk ga tilgang

### 3. Tjeneste stopper

- Lærer gjør: stopper DNS eller DHCP pa en server
- Elevene skal finne: tjenestehendelser i `System`
- Elevene skal forklare: hvilken tjeneste, hvilke klienter som blir rammet og hvordan feilen oppdages
- Tiltak: starte tjenesten, sjekke avhengigheter og dokumentere konsekvens

### 4. Mistenkelig prosess

- Lærer gjør: starter `powershell.exe`, `cmd.exe`, `certutil.exe` eller tilsvarende testprosess pa en klient
- Elevene skal finne: Sysmon `1` og eventuelt Sysmon `3`
- Elevene skal forklare: hvorfor akkurat denne prosessen kan vaere interessant i et SOC
- Tiltak: sjekke kommando, bruker, forelderprosess og nettverkstrafikk

### 5. GPO virker ikke

- Lærer gjør: flytter klient til feil OU, lager feil sikkerhetsfiltrering eller stopper nettverksoppslag
- Elevene skal finne: `1058`, `1030`, `gpupdate`, `gpresult`
- Elevene skal forklare: hva klienten skulle hatt, og hvorfor policyen ikke kom frem
- Tiltak: rette OU, filtrering, DNS eller replikeringsproblem

### 6. Malware-simulering

- Lærer gjør: utloser en trygg testhendelse, for eksempel en Defender-test eller en kontrollert filhendelse
- Elevene skal finne: Defender `1116` til `1119` og relevante klientlogger
- Elevene skal forklare: hva som ble oppdaget, hvor det skjedde og hvordan systemet reagerte
- Tiltak: skann, karantene, verifisering og brukerkommunikasjon

## Hva elevene bor levere

1. Fungerende domene med minst to klienter.
2. Filserver med dokumenterte grupper og rettigheter.
3. WEF og Sysmon konfigurert.
4. JSON-eksport eller lite API for hendelser.
5. Dashboard eller annen enkel visning av status og varsler.
6. Minst to ferdige incident-rapporter.

## Enkel vurderingsmatrise

| Omrade | Lav maaloppnaelse | Middels maaloppnaelse | Hoy maaloppnaelse |
| --- | --- | --- | --- |
| Drift | Miljoet fungerer delvis | Roller og klienter fungerer | Stabil drift, strukturert oppsett og god feilsoking |
| Sikkerhet | Grunnleggende tiltak | Flere riktige tiltak og logger | Gjennomfort hardening og god begrunnelse for valg |
| Overvaking | Enkelt innsyn | Samler relevante hendelser | Oppdager, prioriterer og forklarer hendelser godt |
| Analyse | Beskriver symptom | Finner arsak og tiltak | Binder sammen logger, arsak, konsekvens og forbedring |
| Dokumentasjon | Mangelfull | Brukbar og forståelig | Presis, ryddig og tilpasset både drift og brukere |

## Gjennomforbar prosjektmodell

### Uke 1

- Bygg domenet
- Meld inn klienter
- Opprett brukere og grupper

### Uke 2

- Sett opp filserver
- Lag GPO-er
- Hardening og rettighetskontroll

### Uke 3

- Sett opp WEF/WEC
- Installer Sysmon
- Test loggsamling

### Uke 4

- Eksporter data med PowerShell
- Lag dashboard
- Kjor hendelser og dokumenter respons
