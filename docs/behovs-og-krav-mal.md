# Behovs- og kravdokument

## 1. Mottaker

- Hvem er dashboardet laget for?
- Er hovedbrukeren driftsteam, sikkerhetsteam, laerer eller andre?

## 2. Behov

- Hva trenger brukeren a se raskt?
- Hvilke problemer skal dashboardet hjelpe med?
- Hvilke beslutninger skal brukeren kunne ta?

## 3. Funksjonelle krav

Eksempler:

- vise antall mislykkede palogginger
- vise siste hendelser
- vise tjenestestatus
- vise alarmer
- vise anbefalte tiltak

## 4. Ikke-funksjonelle krav

Eksempler:

- enkel a lese
- fungerer pa skolemaskiner
- rask a starte
- lett a forklare til andre

## 5. Arkitektur og dataflyt

Forklar kort hvordan dataene beveger seg gjennom systemet:

- Windows logger
- PowerShell eller eksport
- Python-backend
- React-frontend

## 6. Begrunnelse for tekniske valg

- Hvorfor React?
- Hvorfor Python?
- Hvorfor sentral loggsamling?
- Hvorfor akkurat disse visningene?
