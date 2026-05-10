# Uke for uke-arbeidsplan

## Security Operations Lab for Windows Server 2022

Dette prosjektet handler om at dere skal jobbe som driftsteam og sikkerhetsteam for en skole. Dere skal bygge et Windows-miljø, sikre det, samle logger, oppdage hendelser og vise status i et enkelt dashboard.

Dere kan litt React fra før, og bare litt Python. Derfor skal React-delen være enkel, og Python skal brukes til små og praktiske oppgaver, ikke store avanserte løsninger.

## Målet med prosjektet

Når prosjektet er ferdig, skal dere ha:

- et lite Windows-domene med servere og klienter
- grunnleggende sikkerhetsoppsett
- sentral loggsamling
- en enkel visning av hendelser og status
- dokumentasjon, refleksjon og rapporter

## Uke 1: Planlegging og oppstart

### Dette skal dere lære

- hva prosjektet går ut på
- hva et SOC er
- hvordan miljøet deres skal se ut

### Dette skal dere gjøre

- lese prosjektbeskrivelsen
- lage en enkel nettverksskisse
- fordele roller i gruppa
- starte et behovs- og kravdokument for dashboardet
- starte et etikk- og personvernsnotat
- installere `SRV-DC01`
- installere AD DS og DNS
- opprette domenet, for eksempel `skole.lab`

### Dette skal være ferdig

- nettverksskisse
- første utkast til behovs- og kravdokument
- første utkast til etikk- og personvernsnotat
- installert Windows Server 2022
- fungerende domenekontroller

## Uke 2: Brukere, grupper og klienter

### Dette skal dere lære

- hvordan et domene organiseres
- hvordan brukere og grupper brukes
- hvordan klienter meldes inn i domenet

### Dette skal dere gjøre

- opprette OU-er for servere, klienter, elever og lærere
- opprette brukere og grupper
- installere minst to klient-PC-er
- melde klientene inn i domenet
- teste innlogging med ulike brukere
- skrive et første utkast til hvordan en support-sak om pålogging skal håndteres

### Dette skal være ferdig

- minst to klienter i domenet
- brukere og grupper opprettet
- dokumentert OU-struktur
- utkast til brukerstøtte-sak eller supportflyt

## Uke 3: Filserver og tilgangsstyring

### Dette skal dere lære

- hvordan delte mapper fungerer
- forskjellen på share permissions og NTFS-rettigheter
- hvordan feil tilgang kan oppdages og forklares

### Dette skal dere gjøre

- installere `SRV-FILE01`
- opprette delte mapper for elever og lærere
- sette share permissions
- sette NTFS-rettigheter
- teste tilgang med ulike brukere
- bruke AccessChk eller PowerShell hvis dere vil kontrollere rettigheter ekstra nøye
- lage en brukerstøtte-sak der feil rettigheter må forklares til en bruker

### Dette skal være ferdig

- fungerende filserver
- delte mapper med riktige rettigheter
- kort dokumentasjon av hvem som skal ha tilgang til hva
- minst én ferdig brukerstøtte-sak

## Uke 4: GPO, sikkerhet og logging

### Dette skal dere lære

- hvordan miljøet kan sikres bedre
- hvorfor logging er viktig i et SOC
- hvilke hendelser som er relevante å følge med på

### Dette skal dere gjøre

- lage GPO for passordpolicy
- slå på kontolåsing
- begrense lokale administratorer
- aktivere PowerShell-logging
- installere Sysmon
- kontrollere at logger blir skrevet i Event Viewer
- starte en risiko- og sikkerhetsvurdering

### Dette skal være ferdig

- minst én sikkerhets-GPO
- Sysmon installert på utvalgte maskiner
- dokumentasjon av hvilke logger som er aktivert
- utkast til risiko- og sikkerhetsvurdering

## Uke 5: Sentral loggsamling og enkel analyse

### Dette skal dere lære

- hvordan hendelser kan samles på én server
- hvordan PowerShell og enkel Python kan brukes videre i prosjektet
- hvordan dere kan begynne å finne mønstre i hendelser

### Dette skal dere gjøre

- installere `SRV-SOC01`
- konfigurere Windows Event Collector
- sette opp Windows Event Forwarding
- teste at klienter og servere sender hendelser til collector
- bruke PowerShell til å hente ut utvalgte Event IDs
- eksportere data til JSON eller CSV
- starte test- og forbedringslogg

### Python og React denne uka

- Python skal brukes enkelt, for eksempel til å lese JSON, telle hendelser eller filtrere data
- React skal fortsatt være enkel frontend, ikke en stor portal

### Dette skal være ferdig

- fungerende collector-server
- minst noen sentrale hendelser samlet fra andre maskiner
- enkel eksport av hendelsesdata
- aktiv test- og forbedringslogg

## Uke 6: Dashboard, hendelser og presentasjon

### Dette skal dere lære

- hvordan tekniske data kan vises på en forståelig måte
- hvordan hendelser analyseres og forklares
- hvordan en løsning dokumenteres og presenteres

### Dette skal dere gjøre

- lage et enkelt dashboard i React
- vise tellerkort, nylige hendelser og varsler
- bruke Python bare der det hjelper dere praktisk, for eksempel til enkel behandling av JSON-data
- gjennomføre minst to lærerstyrte hendelser
- skrive incident-rapporter
- ferdigstille behovs- og kravdokument, etikknotat og testlogg
- forberede framføring eller demonstrasjon

### Dette skal være ferdig

- en enkel visning av systemstatus og hendelser
- minst to ferdige incident-rapporter
- etikk- og personvernsnotat
- behovs- og kravdokument
- risiko- og sikkerhetsvurdering
- test- og forbedringslogg
- kort presentasjon av løsning, funn og forbedringer

## Faste leveranser underveis

Hver uke skal dere levere eller oppdatere:

- kort statusrapport
- skjermbilder eller loggutskrifter som viser framdrift
- oppdatert dokumentasjon
- kort refleksjon om hva som fungerte, hva som var vanskelig, og hva neste steg er
- oppdatert test- og forbedringslogg når dere har begynt med den

## Sluttleveranse

Til slutt skal gruppa levere:

- fungerende domene med klienter
- filserver og tilgangsstyring
- GPO og sikkerhetsoppsett
- WEF, WEC og Sysmon
- enkel visning av hendelser
- incident-rapporter
- dokumentasjon for drift og brukerstøtte
- etikk- og personvernsnotat
- behovs- og kravdokument
- risiko- og sikkerhetsvurdering
- test- og forbedringslogg

## Viktig råd

Hold løsningene enkle og forståelige.

- React-delen trenger ikke være stor
- Python-delen trenger ikke være avansert
- Det viktigste er at dere forstår hva dere bygger, hvorfor dere bygger det, og hvordan dere kan forklare det til andre
