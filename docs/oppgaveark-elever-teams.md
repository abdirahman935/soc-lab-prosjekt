# Oppgave: Security Operations Lab

Dere er IT-drift og sikkerhetsteamet til en skole. Oppgaven deres er å bygge et lite Windows-miljø, sikre det og følge med på hva som skjer i det.

Dere skal ikke bare få ting til å virke. Dere skal også kunne forklare hva dere har gjort, hvorfor dere har gjort det, og hva dere finner når noe går galt.

## Dette skal dere lage

Dere skal sette opp:

- et domene med brukere og klienter
- en filserver med riktige rettigheter
- logging og sentral samling av hendelser
- et enkelt dashboard som viser status og hendelser

Dashboardet skal være enkelt. React-delen trenger ikke være stor. Python skal brukes enkelt, for eksempel til å lese JSON eller telle hendelser.

## Serverne i prosjektet

`SRV-DC01` skal være domenekontrolleren deres. Den styrer brukere, grupper og innlogging.

`SRV-FILE01` skal være filserveren deres. Der jobber dere med delte mapper og tilgangsstyring.

`SRV-SOC01` skal være sikkerhetsserveren deres. Der skal dere samle hendelser og hente data til dashboardet.

I tillegg skal dere ha minst to klientmaskiner i domenet.

## Dette skal dere vise at dere kan

Gjennom prosjektet skal dere vise at dere kan:

- bygge og drifte et lite Windows-miljø
- sikre brukere, klienter og servere
- finne og forklare hendelser
- bruke enkel React og enkel Python i en praktisk løsning
- dokumentere og forklare arbeidet deres

## Hendelser dere skal jobbe med

Dere kan få hendelser som:

- mange mislykkede pålogginger
- låst brukerkonto
- feil rettigheter på delt mappe
- tjeneste som stopper
- klient som ikke får riktig policy

Når dere finner en hendelse, skal dere forklare hva som skjedde, hvordan dere fant det, og hva dere gjorde for å løse det.

## Dette skal dere levere

Til slutt skal dere levere:

- et fungerende miljø
- et enkelt dashboard
- minst to incident-rapporter
- dokumentasjon for drift og brukerstøtte
- etikk- og personvernsnotat
- risiko- og sikkerhetsvurdering
- test- og forbedringslogg

## Viktig

Hold løsningene enkle og forståelige.

Det er bedre å lage noe lite som dere forstår godt enn noe stort som dere ikke klarer å forklare.
