# Igor Wedding Website

Landing page matrimonio single-page realizzata con Astro.

La repository contiene:

- il sito statico Astro
- il `Dockerfile` per buildare un container nginx
- il workflow GitHub Actions che pubblica su GHCR
- l'aggiornamento automatico della repo GitOps `k3s-argocd-gitops`

## Comandi utili

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

## Build container locale

```bash
docker build -t ghcr.io/lerma4/igor-wedding-website:local .
docker run --rm -p 8080:8080 ghcr.io/lerma4/igor-wedding-website:local
```

Health check disponibile su `http://localhost:8080/healthz`.

## CI/CD

Il workflow `.github/workflows/container.yml` replica il flusso usato in `canarino-argocd-demo`:

1. builda e pubblica l'immagine container su GHCR a ogni push su `master`
2. pubblica anche i tag Git `v*`
3. su push a `master` aggiorna automaticamente `apps/igor-wedding/overlays/igor-wedding/kustomization.yaml` nella repo GitOps
4. Argo CD rileva il commit GitOps e sincronizza il deploy nel cluster K3s

## Secret richiesto

Per consentire al workflow di scrivere nella repo privata `k3s-argocd-gitops`, configura un secret GitHub Actions chiamato `GITOPS_REPO_TOKEN` con accesso in scrittura a quella repository.
