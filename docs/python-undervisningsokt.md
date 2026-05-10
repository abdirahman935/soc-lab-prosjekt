# Undervisningsøkt i Python

## Python for SOC-prosjektet

Denne økta er laget som en praktisk innføring i Python før elevene begynner med dashboard, loggbehandling og enkel analyse i SOC-prosjektet.

## Mål for økta

Etter økta skal elevene kunne:

- lese en JSON-fil i Python
- bruke variabler, lister og ordbøker
- gå gjennom data med løkker
- filtrere hendelser med `if`
- lage en enkel oppsummering av sikkerhetshendelser

## Hvorfor denne økta passer prosjektet

I SOC-prosjektet skal elevene jobbe med logger og hendelser. Python er nyttig fordi det kan:

- lese loggdata fra JSON eller eksporterte filer
- telle bestemte Event IDs
- finne mønstre i data
- lage et enkelt grunnlag for dashboard eller varsler

Dette betyr at Python ikke læres som noe løsrevet, men som et verktøy de skal bruke senere i prosjektet.

## Varighet

Forslag: 90 minutter

Dette passer godt som:

- én dobbelttime
- eller to økter på 45 minutter

## Forkunnskaper

Elevene trenger ikke kunne Python fra før. Det holder at de:

- kan åpne VS Code
- kan kjøre en fil i terminal
- forstår hva en fil og mappe er

## Opplegg for timen

### Del 1: Intro, 10 min

Forklar kort:

- hva Python er
- hvorfor vi bruker det i SOC-prosjektet
- at vi skal jobbe med ekte lignende hendelsesdata

Vis sammenhengen:

Windows logger -> JSON-data -> Python -> oversikt -> dashboard

### Del 2: Lærer-demo, 15 min

Vis disse tre tingene:

1. Hvordan åpne og kjøre en Python-fil
2. Hvordan lese en JSON-fil
3. Hvordan skrive ut hendelser i terminalen

Bruk filen:

- `examples/python/01_les_logger.py`

### Del 3: Felles koding, 20 min

Jobb sammen i klassen med:

- lister
- løkker
- `if`
- telle hendelser

Bruk filen:

- `examples/python/02_finn_failed_logons.py`

### Del 4: Elevoppgave i par, 25 min

Elevene jobber med å:

- finne hvor mange mislykkede pålogginger som finnes
- finne hvilke brukere som er berørt
- finne hvilke maskiner hendelsene kommer fra
- skrive ut et enkelt varsel hvis antallet er høyt

Bruk filen:

- `examples/python/03_lag_mini_soc_sammendrag.py`

### Del 5: Miniutfordring, 15 min

La elevene bygge videre:

- tell `4625`
- tell `4740`
- tell `7034`
- skriv ut en enkel oppsummering
- lag et tekstvarsel hvis en verdi er høyere enn grenseverdien

Eksempel:

- "Høy aktivitet: mange mislykkede pålogginger"
- "Varsel: låst brukerkonto funnet"
- "Varsel: tjeneste stoppet"

### Del 6: Oppsummering, 5 min

Be elevene svare kort på:

- Hva er en liste?
- Hva er en ordbok i Python?
- Hvordan filtrerer vi ut bare én type hendelse?
- Hvordan kan dette brukes i SOC-prosjektet?

## Læringsinnhold i enkel form

### Variabler

Brukes for å lagre verdier:

```python
event_id = 4625
```

### Lister

Brukes for å lagre mange verdier:

```python
events = [4625, 4740, 7034]
```

### Ordbøker

Brukes for å lagre data med navn på felter:

```python
event = {
    "machine": "PC-01",
    "id": 4625,
    "user": "elev07"
}
```

### Løkker

Brukes for å gå gjennom mange hendelser:

```python
for event in events:
    print(event)
```

### If-setninger

Brukes for å velge ut bestemte hendelser:

```python
if event["id"] == 4625:
    print("Mislykket pålogging")
```

## Kjørbare eksempler

Eksemplene ligger her:

- `examples/python/data/events.json`
- `examples/python/01_les_logger.py`
- `examples/python/02_finn_failed_logons.py`
- `examples/python/03_lag_mini_soc_sammendrag.py`

Kjør slik:

```bash
python3 examples/python/01_les_logger.py
python3 examples/python/02_finn_failed_logons.py
python3 examples/python/03_lag_mini_soc_sammendrag.py
```

## Elevoppgaver

### Oppgave 1

Les JSON-filen og skriv ut:

- hvor mange hendelser som finnes
- første hendelse
- siste hendelse

### Oppgave 2

Finn alle hendelser med Event ID `4625`.

Skriv ut:

- antall
- brukernavn
- maskin

### Oppgave 3

Lag en enkel oppsummering:

- antall mislykkede pålogginger
- antall låste kontoer
- antall tjenestefeil

### Oppgave 4

Lag ett enkelt varsel:

- hvis mislykkede pålogginger er 3 eller flere
- hvis konto er låst
- hvis en tjeneste har stoppet

## Underveisvurdering

Se etter om elevene:

- forstår hva dataene representerer
- klarer å lese JSON
- kan bruke løkker og `if`
- klarer å forklare hva koden gjør
- ser koblingen mellom Python og SOC-prosjektet

## Enkel vurdering av økta

Lav måloppnåelse:

- eleven klarer å kjøre koden, men trenger mye støtte for å forstå eller endre den

Middels måloppnåelse:

- eleven klarer å lese data, filtrere noen hendelser og forklare hovedideen

Høy måloppnåelse:

- eleven klarer å endre koden, lage en enkel oppsummering og forklare hvordan dette kan brukes videre i prosjektet

## Neste steg etter denne økta

Når elevene har hatt denne Python-økta, kan de gå videre til:

- lese ekte `soc-summary.json`
- hente data fra backend
- lage egne filtre
- sende data videre til dashboard
