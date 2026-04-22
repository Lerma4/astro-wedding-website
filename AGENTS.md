# AGENTS.md

## Design Direction

Per qualsiasi modifica a UI, layout, componenti, tipografia, colori, spaziature, immagini, motion o tono visivo del sito, seguire obbligatoriamente le linee guida definite in `@DESIGN.md`.

## Requirement

- Considerare `@DESIGN.md` come fonte di verita' per lo stile del progetto.
- Non introdurre soluzioni visive in contrasto con la direzione editoriale, elegante e premium descritta in `@DESIGN.md`.
- In caso di dubbio su una scelta di design, preferire l'interpretazione piu' coerente con `@DESIGN.md`.

## Project Context

- Il progetto e' un sito Astro minimale, attualmente ancora basato quasi interamente sullo starter di default.
- L'obiettivo del repository e' una landing page matrimonio single-page, non un sito multi-pagina generico.
- Lo stack attuale e' volutamente leggero: `astro` come unica dipendenza applicativa, nessun framework UI aggiuntivo.
- Il TypeScript config estende `astro/tsconfigs/strict`: mantenere il codice compatibile con questa impostazione.
- L'ambiente previsto usa Node `>=22.12.0`.

## Source Of Truth

- `DESIGN.md` definisce stile, gerarchia delle sezioni, palette, tipografia, spaziature, motion e tono del sito.
- `src/pages/index.astro` e' il punto di ingresso della pagina principale e deve riflettere la struttura narrativa descritta in `DESIGN.md`.
- `src/layouts/Layout.astro` e' il posto corretto per shell documento, meta tag globali, font, variabili globali e stile condiviso.
- `src/components/` deve contenere sezioni o blocchi riusabili della landing, non residui dello starter Astro.
- `public/` e `src/assets/` vanno usati per immagini e asset reali del progetto; evitare di lasciare asset dimostrativi non piu' pertinenti.

## Current Repository State

- `src/components/Welcome.astro` contiene ancora il contenuto demo di Astro e va considerato materiale provvisorio da sostituire, non una base stilistica da seguire.
- `src/pages/index.astro` monta ancora soltanto `Welcome.astro`; le future modifiche devono trasformarlo nella landing reale del matrimonio.
- `src/layouts/Layout.astro` e' ancora generico, con `lang="en"` e titolo base: quando si lavora sulla pagina reale, allineare lingua, metadata e semantica al contenuto italiano del sito.
- `README.md` e' ancora quello dello starter; non usarlo come riferimento funzionale o di prodotto.

## Implementation Guidance

- Mantenere il sito come esperienza single-page con le sezioni principali nell'ordine definito da `DESIGN.md`.
- Preferire Astro puro e HTML/CSS ben strutturati; introdurre JavaScript solo se serve davvero per interazioni leggere o micro-animazioni necessarie.
- Privilegiare markup semantico e accessibile: heading ordinati, landmark chiari, `alt` significativi, focus states visibili.
- Trattare il contenuto come sito reale per invitati: copy in italiano naturale, elegante, caldo e leggermente formale.
- Evitare qualsiasi estetica da template tecnologico, documentazione o starter kit.
- Non aggiungere dipendenze nuove senza una motivazione concreta; prima sfruttare le capacita' native di Astro e CSS.
- Se una sezione diventa complessa, estrarla in un componente dedicato dentro `src/components/`; altrimenti preferire implementazioni semplici e locali.
- Centralizzare token visivi condivisi e regole globali nel layout o in stili globali coerenti, evitando valori sparsi e incoerenti tra sezioni.
- Mobile first: ogni modifica deve funzionare bene su viewport piccoli prima di raffinare la composizione desktop.

## Content And UX Rules

- Le sezioni attese sono: hero, paragrafo introduttivo, venue description, `Lista nozze`, footer.
- La `Lista nozze` deve apparire premium e integrata nel brand matrimoniale, mai come checkout o catalogo e-commerce.
- CTA, bottoni e link esterni devono avere tono sobrio e raffinato, coerente con la direzione editoriale.
- Le immagini devono avere feeling editoriale e luminoso; evitare placeholder vistosi o visual da prodotto software.
- Le animazioni devono essere morbide, rare e mai appariscenti.

## Verification

- Dopo modifiche sostanziali, verificare almeno con `npm run build`.
- Se si introducono cambi strutturali, controllare che non restino testi demo di Astro, metadata generici o riferimenti allo starter nel risultato finale.
