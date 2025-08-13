
# One Nation – Alle hjerter på jord

Statisk, flerspråklig (NO/EN) nettside med:
- Utdanning (education.html)
- Økonomi & rett (economy.html)
- Malbibliotek (templates.html)
- Akutt-skjema “Hjelp meg nå” (Netlify Forms) på index.html

## Publisering

### Alternativ A: Netlify (anbefalt)
1. Gå til https://app.netlify.com/ og logg inn.
2. Klikk **Add new site → Deploy manually** og dra *hele mappen* (eller ZIP) inn i Netlify.
   - Eller velg **Import from Git** og koble til GitHub repoet ditt.
3. Etter deploy: Åpne Netlify **Forms**-panelet og bekreft at skjemaet `help-now` er oppdaget.
4. Del URLen.

### Alternativ B: GitHub Pages
1. Opprett et nytt repo (f.eks. `one-nation`).
2. Last opp alle filene i mappen til roten av `main`-branchen.
3. I **Settings → Pages**: Source = `Deploy from a branch`, Branch = `main` (root).
4. Vent til GitHub bygger – siden blir tilgjengelig på `https://<bruker>.github.io/one-nation`.

> Merk: GitHub Pages støtter ikke Netlify Forms. For skjema-innsendinger – bruk Netlify.

## Redigere innhold
- Endre tekster i `script.js` under `dict.no` og `dict.en`.
- Legg til seksjoner i HTML-filene, design i `styles.css`.
- Bytt logo ved å erstatte `assets/logo.svg` og `assets/favicon.svg`.

## Lokal test
Åpne `index.html` direkte i nettleseren. Språk lagres i `localStorage`.
