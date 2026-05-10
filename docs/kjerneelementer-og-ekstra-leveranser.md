# Kjerneelementer og ekstra leveranser

Dette dokumentet viser hva som ma legges til i prosjektet for at alle kjerneelementene skal bli tydelig dekket i praksis, ikke bare i beskrivelsen.

## Oversikt

| Kjerneelement | Hva prosjektet dekker godt | Hva som ma legges til | Foreslatt leveranse |
| --- | --- | --- | --- |
| Etikk, lovverk og yrkesutovelse | Sikkerhet, logging og tilgangsstyring | Personvern, rolleforstaelse, ansvar, hva som kan overvakes i en skolelab | Etikk- og personvernsnotat |
| IT-stotte og kommunikasjon | Hendelser, supportsaker og dokumentasjon er antydet | Tydelig brukerstotte, forklaring til ulike mottakere, service og kommunikasjon | Brukerstotte-sak og brukerveiledning |
| Losningsarkitektur og systemutvikling | Infrastruktur, serverroller, backend og frontend | Brukerinnsikt, behov, krav og begrunnede designvalg | Behovs- og kravdokument |
| Informasjonssikkerhet | Hardening, logging, hendelser og tiltak | Metodisk risikovurdering og sikkerhetsbegrunnelse | Risiko- og sikkerhetsvurdering |
| Utviklingsprosesser og kreativ problemlosing | Bygging, feilsoking og videreutvikling | Tydelig testarbeid, forbedringssløyfe og arbeidslogg | Test- og forbedringslogg |

## Obligatoriske ekstra leveranser

For at prosjektet skal dekke alle kjerneelementene tydelig, bor hver gruppe levere disse dokumentene i tillegg til den tekniske losningen:

1. Etikk- og personvernsnotat
2. Brukerstotte-sak med svar til bruker
3. Behovs- og kravdokument for dashboardet
4. Risiko- og sikkerhetsvurdering
5. Test- og forbedringslogg

## Hvordan bruke leveransene i undervisning

### Etikk og lovverk

Elevene skal reflektere over:

- hvilke logger som inneholder personopplysninger
- hvorfor dette bare skal kjores i lukket lab
- hvem som skal ha tilgang til logger og dashboard
- hvordan profesjonell yrkesutovelse ser ut i et drift- og sikkerhetsteam

Bruk mal:

- `docs/etikk-og-personvern-mal.md`

### IT-stotte og kommunikasjon

Elevene skal:

- motta en support-sak
- forklare problemet pa et tilpasset sprak
- svare som om brukeren er en laerer eller elev
- dokumentere hva som ble gjort

Bruk mal:

- `docs/brukerstotte-sak-mal.md`

### Losningsarkitektur og systemutvikling

Elevene skal:

- beskrive hvem dashboardet er laget for
- beskrive hva brukeren trenger a se
- begrunne valg av React, Python og Windows-komponenter
- forklare dataflyten fra Windows-logg til visning

Bruk mal:

- `docs/behovs-og-krav-mal.md`

### Informasjonssikkerhet

Elevene skal:

- identifisere trusler i labmiljoet
- forklare hvorfor de har valgt bestemte sikkerhetstiltak
- beskrive hva som fortsatt er en risiko

Dette kan skrives i eget dokument eller som del av incident-rapportene.

Bruk mal:

- `docs/risiko-og-sikkerhetsvurdering-mal.md`

### Utviklingsprosesser og kreativ problemlosing

Elevene skal:

- teste frontend og backend
- teste at hendelser faktisk kommer fram
- logge feil, tiltak og forbedringer
- vise hvordan de har forbedret losningen underveis

Bruk mal:

- `docs/test-og-forbedringslogg-mal.md`

## Forslag til vurdering

Lukk kretsen ved a vurdere:

- teknisk oppsett
- sikkerhetstiltak
- forklaringer og begrunnelser
- brukertilpasning og dokumentasjon
- testing og forbedringsarbeid

Da blir prosjektet bade praktisk, faglig og tverrfaglig sterkt.
