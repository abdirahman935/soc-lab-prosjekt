# Laboppsett

## 1. Minimum som fungerer i skole

Den tryggeste varianten er tre servere og to klienter. Hvis elevene har begrenset maskinvare, bruk to servere og to klienter.

### Anbefalt variant

- `SRV-DC01`: 4 vCPU, 4-6 GB RAM, 60 GB disk
- `SRV-FILE01`: 2-4 vCPU, 4 GB RAM, 60 GB disk
- `SRV-SOC01`: 4 vCPU, 6-8 GB RAM, 80 GB disk
- `PC-01` og `PC-02`: 2 vCPU, 4 GB RAM, 40 GB disk

### Kompakt variant

- `SRV-DC01`: AD DS, DNS, DHCP
- `SRV-SOC01`: filserver, WEC, Windows Admin Center og dashboard
- `PC-01` og `PC-02`

## 2. Nettplan

- Virtuell switch: `SOC-LAB`
- Nett: `192.168.50.0/24`
- Gateway: ikke nodvendig i ren intern lab
- Domene: `skole.lab`
- DNS: `192.168.50.10`

### Foreslatte IP-adresser

- `SRV-DC01`: `192.168.50.10`
- `SRV-FILE01`: `192.168.50.20`
- `SRV-SOC01`: `192.168.50.30`
- `PC-01`: DHCP eller `192.168.50.101`
- `PC-02`: DHCP eller `192.168.50.102`

## 3. Byggerekkefolge

1. Installer Windows Server 2022 pa `SRV-DC01`.
2. Installer AD DS og DNS, opprett domenet `skole.lab`.
3. Legg til DHCP hvis dere vil la klientene hente adresser automatisk.
4. Installer `SRV-FILE01` og `SRV-SOC01`, og meld dem inn i domenet.
5. Opprett elevbrukere, grupper og OU-er.
6. Installer klientene og meld dem inn i domenet.
7. Installer WEC pa `SRV-SOC01`.
8. Rull ut Sysmon og logging.
9. Test hendelser.
10. Eksporter data til dashboard.

## 4. OU-er og grupper

Foreslatt struktur:

- `OU=Servers`
- `OU=Clients`
- `OU=Teachers`
- `OU=Students`
- `OU=ServiceAccounts`

Foreslatte grupper:

- `GG-Teachers`
- `GG-Students`
- `GG-IT-Drift`
- `GG-IT-SOC`
- `GG-File-Teachers-RW`
- `GG-File-Students-R`

## 5. Viktige GPO-er

### Sikkerhetsbaseline

- Passordpolicy med minimum lengde og historikk
- Kontolasing etter et bestemt antall feilforsok
- Begrens lokale administratorer
- Skjermlas og inaktivitet

### Logging

- Slå pa PowerShell Script Block Logging
- Slå pa `Microsoft-Windows-PowerShell/Operational`
- Slå pa `Microsoft-Windows-GroupPolicy/Operational`
- Sørg for at Sysmon logges til `Microsoft-Windows-Sysmon/Operational`

### WEF-klient

For at WEF skal fungere pa klienter og medlemsservere ma dere minst:

1. Sette collector URI i GPO.
2. Starte WinRM-tjenesten.
3. Legge `NT AUTHORITY\NETWORK SERVICE` i `Event Log Readers`.

Forslag til Subscription Manager-verdi:

```text
Server=http://SRV-SOC01:5985/wsman/SubscriptionManager/WEC,Refresh=60
```

## 6. Viktige Event IDs

Dette er et godt minimum for et skole-SOC:

- `4625`: mislykket pålogging
- `4740`: konto låst
- `7031`, `7034`: tjeneste krasjet eller stoppet uventet
- `1058`, `1030`: Group Policy-problemer
- `1116`-`1119`: Defender-detekteringer og tiltak
- Sysmon `1`: prosessopprettelse
- Sysmon `3`: nettverkstilkobling
- Sysmon `11`: filopprettelse
- Sysmon `13`: registerendring
- Sysmon `22`: DNS-query

## 7. Praktisk oppsett per server

### `SRV-DC01`

- Installer AD DS og DNS
- Opprett `skole.lab`
- Opprett OU-er, grupper og testbrukere
- Sett passordpolicy og kontolasing
- Konfigurer DHCP hvis dere vil

### `SRV-FILE01`

- Opprett delte mapper for elever og lærere
- Sett både share-permissions og NTFS-rettigheter
- Lag en bevisst feilrettighet som hendelse elevene senere skal finne

### `SRV-SOC01`

- Installer Windows Event Collector
- Installer Windows Admin Center
- Opprett WEF-subscription
- Kjor `Get-SocSummary.ps1` som manuell jobb eller Scheduled Task
- La JSON-filen leses av et enkelt dashboard

## 8. React og Python

Jeg anbefaler at React-delen er liten og operativ, ikke en stor portal. En enkel frontend holder:

- Dashboard med tellerkort
- Nylige hendelser
- Varsler
- Anbefalte tiltak

Python-laget kan være valgfritt. Hvis dere vil ha det, bruk det kun til:

- lese JSON fra PowerShell-eksport
- filtrere eller gruppere data
- levere et lite API til React

## 9. Lav risiko, hoy verdi

For å gjøre dette trygt i skole:

- bruk kun intern lab
- bruk testbrukere
- ikke bruk ekte skadevare
- ikke skann utenfor labnettet med Nmap
- bruk snapshots for hver fase
