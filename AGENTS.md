# AGENTS.md

## Design Direction

Per qualsiasi modifica a UI, layout, componenti, tipografia, colori, spaziature, immagini, motion o tono visivo del sito, seguire obbligatoriamente le linee guida definite in `@DESIGN.md`.

## Requirement

- Considerare `@DESIGN.md` come fonte di verita' per lo stile del progetto.
- Non introdurre soluzioni visive in contrasto con la direzione editoriale, elegante e premium descritta in `@DESIGN.md`.
- In caso di dubbio su una scelta di design, preferire l'interpretazione piu' coerente con `@DESIGN.md`.

## Project Context

- Il progetto e' un sito Astro minimale gia' trasformato in una landing page matrimonio single-page con sezioni dedicate e stile editoriale custom.
- L'obiettivo del repository e' una landing page matrimonio single-page, non un sito multi-pagina generico.
- Lo stack attuale resta leggero ma non piu' solo Astro: `astro` gestisce shell e contenuto statico, `@astrojs/react` e `framer-motion` gestiscono poche isole interattive mirate.
- Il TypeScript config estende `astro/tsconfigs/strict`: mantenere il codice compatibile con questa impostazione.
- L'ambiente previsto usa Node `>=22.12.0`.

## Source Of Truth

- `DESIGN.md` definisce stile, gerarchia delle sezioni, palette, tipografia, spaziature, motion e tono del sito.
- `src/pages/index.astro` e' il punto di ingresso della pagina principale e deve riflettere la struttura narrativa descritta in `DESIGN.md`.
- `src/layouts/Layout.astro` e' il posto corretto per shell documento, meta tag globali, font, variabili globali e stile condiviso.
- `src/components/` deve contenere sezioni o blocchi riusabili della landing, non residui dello starter Astro.
- `public/` e `src/assets/` vanno usati per immagini e asset reali del progetto; evitare di lasciare asset dimostrativi non piu' pertinenti.
- `src/components/MotionProvider.tsx` e' wrapper corretto per `LazyMotion`; se si aggiungono nuove isole Framer Motion, riusare quello invece di importare feature bundle separati.

## Current Repository State

- `src/pages/index.astro` monta la landing completa tramite componenti dedicati per nav, hero, intro, venue, `Lista nozze` e footer.
- `src/layouts/Layout.astro` centralizza metadata, token globali, tipografia, motion di base e regole condivise dell'intera esperienza.
- `src/components/FloatingNav.astro`, `HeroSection.astro`, `VenueSection.astro` e `RegistrySection.astro` fanno da bridge Astro verso isole React mirate, non contengono piu' tutta la logica motion inline.
- `src/components/MotionNav.tsx` gestisce menu mobile, focus trap e animazione overlay.
- `src/components/MotionHero.tsx` gestisce hero cinematica con parallax smussato e hydration ritardata.
- `src/components/MotionVenueVisual.tsx` anima solo blocco visuale della location; copy e dettagli restano Astro statico.
- `src/components/MotionRegistryGrid.tsx` anima solo griglia `Lista nozze`; intro resta Astro statica.
- `src/assets/logo.webp` e favicon custom fanno parte dell'identita' visiva corrente.
- `public/placeholders/` contiene immagini editoriali placeholder locali, utili fino all'arrivo degli asset fotografici definitivi.
- `README.md` puo' ancora non riflettere pienamente il prodotto finale; non usarlo come riferimento funzionale o di prodotto finche' non viene aggiornato.

## Implementation Guidance

- Mantenere il sito come esperienza single-page con le sezioni principali nell'ordine definito da `DESIGN.md`.
- Preferire Astro puro e HTML/CSS ben strutturati; usare React solo per isole interattive o motion che non conviene gestire con solo CSS.
- Privilegiare markup semantico e accessibile: heading ordinati, landmark chiari, `alt` significativi, focus states visibili.
- Trattare il contenuto come sito reale per invitati: copy in italiano naturale, elegante, caldo e leggermente formale.
- Evitare qualsiasi estetica da template tecnologico, documentazione o starter kit.
- Non aggiungere dipendenze nuove senza una motivazione concreta; prima sfruttare le capacita' native di Astro e CSS.
- Se una sezione diventa complessa, estrarla in un componente dedicato dentro `src/components/`; altrimenti preferire implementazioni semplici e locali.
- Centralizzare token visivi condivisi e regole globali nel layout o in stili globali coerenti, evitando valori sparsi e incoerenti tra sezioni.
- Mobile first: ogni modifica deve funzionare bene su viewport piccoli prima di raffinare la composizione desktop.
- Se aggiungi motion con Framer Motion, preferire `useSpring` sopra `useScroll` raw per smussare parallax e ridurre jank.
- Preferire `client:visible` o `client:idle` per isole motion non critiche; usare `client:load` solo per UI che deve reagire subito, come menu mobile.
- Tenere statico in Astro tutto contenuto che non richiede stato o interazione; non trasformare sezioni testuali in isole React senza beneficio concreto.
- Evitare troppe animazioni scroll-linked simultanee, glow animati superflui o `will-change` sparsi: performance mobile conta piu' di effetto scenico marginale.
- Per nuove animazioni Framer Motion, riusare `MotionProvider` con `LazyMotion` e preferire animazioni di `transform`/`opacity`, non layout-triggering props.
- Conservare supporto `prefers-reduced-motion` sia lato CSS globale sia lato isole React.

## Content And UX Rules

- Le sezioni attese sono: hero, paragrafo introduttivo, venue description, `Lista nozze`, footer.
- La `Lista nozze` deve apparire premium e integrata nel brand matrimoniale, mai come checkout o catalogo e-commerce.
- CTA, bottoni e link esterni devono avere tono sobrio e raffinato, coerente con la direzione editoriale.
- Le immagini devono avere feeling editoriale e luminoso; evitare placeholder vistosi o visual da prodotto software.
- Le animazioni devono essere morbide, rare e mai appariscenti.
- Hero puo' essere piu' immersiva delle altre sezioni, ma nav mobile, venue e `Lista nozze` devono restare leggibili, reattive e facili da usare anche su device mediocri.

## Verification

- Dopo modifiche sostanziali, verificare almeno con `npm run build`.
- Se si introducono cambi strutturali, controllare che non restino testi demo di Astro, metadata generici o riferimenti allo starter nel risultato finale.
