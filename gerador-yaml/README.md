# apps.yaml · Product Builder

Página interna pra adicionar novos produtos no `config/apps.yaml` do AppsFlyer Campaign Analyzer sem ter que editar YAML na mão.

Roda 100% client-side. Auto-save do rascunho no `localStorage` do navegador.

---

## Deploy no GitHub Pages (3 minutos)

### Opção A — repo dedicado

1. Crie um repo novo no GitHub, ex: `apps-yaml-builder`.
2. Coloque o `index.html` na raiz e faça commit/push:
   ```bash
   git init
   git add index.html README.md
   git commit -m "init builder"
   git branch -M main
   git remote add origin git@github.com:SEU_USER/apps-yaml-builder.git
   git push -u origin main
   ```
3. No GitHub: **Settings → Pages → Source: Deploy from a branch → Branch: main / root → Save**.
4. Em ~30s a página fica em `https://SEU_USER.github.io/apps-yaml-builder/`. Manda o link pro funcionário.

### Opção B — subpasta de um repo existente

Se quiser hospedar dentro de um repo que já existe (ex: o próprio repo do `api_af`):

1. Crie uma pasta, ex: `tools/yaml-builder/`, e coloque o `index.html` dentro.
2. Em **Settings → Pages → Source**: escolha `main` (ou `gh-pages`) e a pasta `/docs` ou `/` raiz.
   - Se preferir ter `/tools/yaml-builder/` acessível, mova pra `/docs/yaml-builder/` e ative `/docs` como root.
3. Acesse em `https://SEU_USER.github.io/REPO/yaml-builder/`.

> Pages só serve a partir da raiz do repo OU da pasta `/docs`. Pra qualquer outro caminho, use Opção A ou um workflow do GitHub Actions.

### Tornar privado (opcional)

GitHub Pages em repo privado exige plano pago (Enterprise). Alternativas:

- **Acesso por link** (security through obscurity): use uma URL não-óbvia + nada sensível no `index.html`. Pra esse caso é OK porque o app não tem segredos — toda a config é digitada na hora.
- **Cloudflare Pages** com Access (gratuito até X usuários): protege com login Google/email.
- **Vercel** com password protection (plano pago).

Pra esse builder, recomendo só usar Pages público mesmo. Não há nada secreto no HTML.

---

## Atualizar a página

Toda vez que mudar o `index.html`, basta `git push` — Pages redeploya automaticamente em ~30s.

---

## Como adicionar campos novos

O HTML é monolítico de propósito (~700 linhas, sem build step). Pra adicionar um campo:

1. **Estado**: adicionar a chave em `blankProduct()`.
2. **UI**: adicionar o `<Field>` correspondente dentro da `<Section>` apropriada.
3. **YAML**: adicionar a linha em `generateYaml()`.
4. **Validação** (se obrigatório): adicionar a regra em `validate()`.

Não tem framework de build, então é editar e empurrar.

---

## Stack

- React 18 (UMD via unpkg)
- Babel Standalone (compila JSX no navegador)
- Tailwind Play CDN
- Fontes: Bricolage Grotesque, Geist, JetBrains Mono (Google Fonts)
- Ícones: SVGs inline (estilo Lucide)

Custos de carregar tudo via CDN: ~3 MB no primeiro load (Babel pesa). Cacheia depois. Pra uso interno, irrelevante. Se quiser otimizar pra produção pública, migre pra Vite + React + build estático (`npm create vite@latest`).
