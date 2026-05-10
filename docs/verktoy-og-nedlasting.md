# Verktoy og nedlasting

Dette er et stramt og realistisk gratisoppsett som passer godt i skole.

## Obligatoriske verktoy

| Verktoy | Hvorfor | Kommentar | Offisiell lenke |
| --- | --- | --- | --- |
| Windows Server 2022 Evaluation | Plattformen for domenet og SOC-laben | Gratis i 180 dager | [Microsoft Evaluation Center](https://www.microsoft.com/en-us/evalcenter/download-windows-server-2022) |
| Windows Admin Center | Moderne administrasjon av servere i nettleser | Uten ekstra kostnad | [Windows Admin Center overview](https://learn.microsoft.com/en-us/windows-server/manage/windows-admin-center/overview) |
| Windows Event Forwarding | Sentral samling av hendelser | Kjernen i prosjektet | [WEF guidance](https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/use-windows-event-forwarding-to-assist-in-intrusion-detection) |
| Sysmon | Dypere logging av prosesser, nettverk og filer | Viktigste SOC-forsterker i laben | [Sysmon - Sysinternals](https://learn.microsoft.com/sysinternals/downloads/sysmon) |
| Sysinternals Suite | Analyse og feilsoking | Bruk spesielt Autoruns, Process Explorer og AccessChk | [Sysinternals Suite](https://learn.microsoft.com/sysinternals/downloads/sysinternals-suite) |
| Microsoft Defender Antivirus | Innebygd beskyttelse og hendelser | Bør beholdes aktiv | [Defender overview](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-antivirus-windows?view=o365-worldwide) |

## Nettverks- og analyseverktoy

| Verktoy | Hvorfor | Kommentar | Offisiell lenke |
| --- | --- | --- | --- |
| Wireshark | Trafikkfangst og pakkeanalyse | Windows-installer forenkler oppsettet | [Wireshark downloads](https://www.wireshark.org/download.html) |
| Nmap | Nettverkskartlegging og portskanning | Bruk kun pa labnettet | [Nmap for Windows](https://nmap.org/book/inst-windows.html) |

## PowerShell

PowerShell er ikke bare et hjelpeverktoy, men en del av selve prosjektet:

- installasjon av roller og features
- oppsett av WinRM, WEC og Sysmon
- eksport av hendelser til JSON
- automatisering av tiltak

Relevant dokumentasjon:

- [Get-WinEvent](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.diagnostics/get-winevent?view=powershell-7.6)
- [wecutil](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wecutil)
- [Hyper-V i Windows Server](https://learn.microsoft.com/en-us/windows-server/virtualization/hyper-v/get-started/Install-Hyper-V)

## Valgfrie tillegg

Hvis dere vil utvide prosjektet senere, kan dere legge til en ekstra sensor-VM for nettverk eller egne oppgaver for digital etterforskning. Jeg ville likevel beholdt Windows, AD, logging og hendelser som hovedkjernen i prosjektet.
