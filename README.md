# Security Operations Lab for Windows Server 2022

Security Operations Lab for Windows Server 2022
Prosjektet gir deg muligheten til å bygge en liten, realistisk SOC-lab som bruker Windows Server 2022. De må sette opp domene, koble nettverket til klient-PC-er, samle logger og bruke et enkelt dashboard for å bruke ekte hendelser fra eget labmiljø.

Prosjektet er utvidet slik at den kan dekke alle kjerneelementene:

etikk, lovverk og yrkesutovelse
IT-stotte og kommunikasjon
losningsarkitektur og systemutvikling
informasjonssikkerhet
utviklingsprosesser og kreativ problemlosing
Kort anbefaling
Kjernemodellen bor vøre:

SRV-DC01: AD DS, DNS og eventuelt DHCP
SRV-FILE01: filserver, delte mapper, NTFS/share-permissions og feilretting
SRV-SOC01: Windows Event Collector, Windows Admin Center, JSON-eksport og valgfri Python/React-del
PC-01 og PC-02: domeneklienter for brukere, GPO-testing og hendelser
Verktøy som passer godt
Windows Server 2022 Evaluation
Windows Admin Center
Windows Event Forwarding og Windows Event Collector
Sysmon
Sysinternals Suite
Microsoft Defender Antivirus
Wireshark
Nmap
PowerShell 5.1 eller PowerShell 7
Forslag til læringsmal
Bygg domenet og grunnleggende drift.
Herd klienter og servere med GPO, kontolasing, rettigheter og logging.
Samle hendelser sentralt med WEF/WEC.
Eksporter hendelser til JSON med PowerShell.
Bygg et lite dashboard i React uten Vite, og eventuelt et tynt Python-API.
Kjor to til seks hendelser som elevene ma oppdage, analysere og rette.
Foreslatt arkitektur
Navn	Rolle	Forslag
SRV-DC01	Domenekontroller	AD DS, DNS, DHCP, OU-struktur, brukergrupper
SRV-FILE01	Applikasjon og filserver	Mapper, deling, rettigheter, brukerstottefeil
SRV-SOC01	SOC collector	WEC, Windows Admin Center, JSON-eksport, valgfri API/app
PC-01	Klient	Elevbruker, policytest, hendelser
PC-02	Klient	Elevbruker, supportcase, ekstra hendelser
Forslag til domene: skole.lab

Forslag til subnett: 192.168.50.0/24

Hva som ligger i denne mappen

## Innhold i mappen

- [Laboppsett](./docs/laboppsett.md)
- [Verktoy og nedlasting](./docs/verktoy-og-nedlasting.md)
- [Hendelser og vurdering](./docs/hendelser-og-vurdering.md)
- [Incident-mal](./docs/incident-mal.md)
- [Kjerneelementer og ekstra leveranser](./docs/kjerneelementer-og-ekstra-leveranser.md)
- [Etikk og personvern-mal](./docs/etikk-og-personvern-mal.md)
- [Brukerstotte-sak-mal](./docs/brukerstotte-sak-mal.md)
- [Behovs- og krav-mal](./docs/behovs-og-krav-mal.md)
- [Risiko- og sikkerhetsvurdering-mal](./docs/risiko-og-sikkerhetsvurdering-mal.md)
- [Test- og forbedringslogg-mal](./docs/test-og-forbedringslogg-mal.md)
- [WEF baseline query](./configs/wef/baseline-query.xml)
- [Sysmon lab-config](./configs/sysmon/sysmon-lab.xml)
- [Configure-Collector.ps1](./scripts/windows/Configure-Collector.ps1)
- [Configure-Forwarder.ps1](./scripts/windows/Configure-Forwarder.ps1)
- [Install-Sysmon.ps1](./scripts/windows/Install-Sysmon.ps1)
- [Get-SocSummary.ps1](./scripts/windows/Get-SocSummary.ps1)
- [Start-SocWebApp.ps1](./scripts/windows/Start-SocWebApp.ps1)
- [React uten Vite pa Windows Server](./docs/react-uten-vite-windows-server.md)

## Praktisk rekkefolge

1. Installer `SRV-DC01` og opprett domenet.
2. Legg `SRV-FILE01`, `SRV-SOC01` og klientene inn i domenet.
3. Installer og konfigurer WEC pa `SRV-SOC01`.
4. Rull ut Sysmon og PowerShell-logging pa klienter og servere.
5. Opprett WEF-subscription med query fra `configs/wef/baseline-query.xml`.
6. Kjor `Get-SocSummary.ps1` pa collector slik at JSON-filen blir oppdatert med ekte data fra laben.
7. Start frontend og backend, og kontroller at dashboardet viser live-data.
8. Bruk hendelsene i `docs/hendelser-og-vurdering.md` som oppgaver.
9. La elevene levere etikknotat, brukerstotte-sak, behovsanalyse og testlogg i tillegg til teknisk losning.

## Kort vurdering

README-en bor gi et raskt svar pa tre sporsmal:

- Hva er prosjektet?
- Hva skal elevene sette opp?
- Hvordan henger Windows, logging og dashboard sammen?

Denne forsiden er derfor best nar den er kort, tydelig og praktisk.

## Kilder

- [Windows Server 2022 Evaluation Center](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2022)
- [Windows Server documentation](https://learn.microsoft.com/en-us/windows-server/)
- [Windows Admin Center overview](https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview)
- [Use Windows Event Forwarding to assist in intrusion detection](https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection)
- [wecutil command reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wecutil)
- [Get-WinEvent command reference](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent?view=powershell-7.6)
- [Sysmon command reference](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/sysmon)
- [Sysmon - Sysinternals](https://learn.microsoft.com/sysinternals/downloads/sysmon)
- [Microsoft Defender Antivirus overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-antivirus-windows?view=o365-worldwide)
- [Wireshark downloads](https://www.wireshark.org/download.html)
- [Nmap for Windows](https://nmap.org/book/inst-windows.html)
