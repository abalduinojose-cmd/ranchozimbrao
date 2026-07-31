# Rancho Zimbrão

Site institucional do criatório de Mangalarga Marchador.
Next.js 16 (App Router) + React 19, TypeScript strict, Tailwind CSS v4, Motion e Lenis.
Página única, 100% estática, pronta para a Vercel.

```bash
npm install
npm run dev      # http://localhost:5204
npm run build
npm run start
npm run typecheck
```

## Identidade

Marca monocromática de alto contraste: as seções alternam preto e branco em
sequência, e a fotografia entra em cor cheia por cima desse ritmo.

| Token | Valor | Onde entra |
|---|---|---|
| `--color-ink` | `#0B0B0C` | fundo das seções escuras |
| `--color-paper` | `#F6F4F0` | fundo das seções claras (off-white quente) |
| `--color-accent` | `#C79A54` | dourado sobre fundo escuro |
| `--color-accent-deep` | `#86673A` | mesmo dourado calibrado para fundo claro (AA) |
| `--color-sand` / `--color-slate` | `#EAE4D9` / `#16161A` | superfícies de cartão |

Tipografia: **Bricolage Grotesque** (títulos), **Instrument Sans** (corpo) e
**Geist Mono** (etiquetas e fichas técnicas). Todas por `next/font/google`,
com `display: swap`.

**Elemento-assinatura: o corte de marcha.** A fronteira entre duas seções não é
um corte reto. Uma lâmina diagonal da cor seguinte varre a faixa conforme o
scroll, com um filete dourado permanente marcando o eixo. Está em
`src/components/Seam.tsx` + `.seam` no `globals.css`.

## Como o tema funciona

`<Section theme="dark" | "light">` injeta `data-theme` e, com ele, as variáveis
`--bg`, `--fg`, `--muted`, `--accent`, `--card`, `--hair`. Todo componente lê
essas variáveis, então qualquer bloco funciona nos dois fundos sem duplicar
classe. O cabeçalho flutuante usa `useSectionTheme()` para trocar de tema junto
com a seção que passa por baixo.

## Onde mexer no conteúdo

Nenhum texto, telefone ou link vive dentro de JSX. Tudo sai de `src/content/`:

| Arquivo | O que guarda |
|---|---|
| `site.ts` | nome, WhatsApp, redes, endereço, horários, navegação, letreiro |
| `sections.ts` | textos de Sobre, Raça, Contato e rodapé |
| `animais.ts` | plantel (nome, sexo, pelagem, nascimento, registro, genealogia) |
| `experiencias.ts` | cavalgada, primeira sela, day use, visita ao plantel |
| `reviews.ts` | avaliações do Google e nota agregada |
| `galeria.ts` | ordem e legendas das fotos |
| `media-manifest.json` | **gerado**, não editar à mão |

### Avaliações do Google

`reviews.ts` traz os dados reais do perfil, coletados em 31/07/2026: nota
**5,0** com **10 avaliações**, todas de cinco estrelas. Três têm texto e viram
card no carrossel; as outras sete aparecem na fileira de fotos de perfil.

As fotos de perfil e a foto anexada por um cliente foram baixadas para
`public/reviews/` (o link do googleusercontent expira):

```bash
node scripts/fetch-review-assets.mjs
```

O Google só publica data relativa, então `dateLabel` guarda o que o perfil
mostra ("há 3 anos") e é o que aparece na tela; `date` é uma aproximação em
ISO usada só pelo JSON-LD.

### Pendências

1. **Plantel** (`animais.ts`): as fotos e as pelagens são reais; nomes,
   registros ABCCMM, datas e genealogias ainda são placeholder.
2. **Endereço** (`site.ts`): o Google lista só bairro e CEP
   (Posse, Petrópolis - RJ, 25770-460). Falta o logradouro. As coordenadas já
   estão conferidas e entram no JSON-LD.
3. **Domínio** (`site.ts`): trocar `url` antes do deploy.

## Mídia

As fotos e os vídeos originais ficam em `img/` e `videos instagram/`, fora do
`public/`. O script abaixo copia, renomeia, corta os reels, extrai posters e
grava as dimensões reais em `src/content/media-manifest.json` (é o que garante
CLS zero):

```bash
node scripts/prepare-media.mjs
```

Para reprocessar do zero, apague `public/img`, `public/videos` e rode de novo.

### Logotipo

O logotipo já está em `public/logo/rancho-zimbrao.png`, recortado do arquivo
original (que vinha sobre fundo chapado) por:

```bash
node scripts/prepare-logo.mjs "caminho/do/logo.png"
node scripts/prepare-media.mjs
```

Se um dia chegar uma versão vetorial, salve como `rancho-zimbrao.svg` na mesma
pasta e rode só o `prepare-media`. O componente `Wordmark` usa o arquivo
automaticamente e o inverte nas seções escuras; sem arquivo, cai para o
lettering tipográfico.

## Decisões de performance

- **Reveals em CSS, não em JS.** `.reveal` usa scroll-driven animation
  (`animation-timeline: view()`), roda fora da main thread e não custa um
  componente cliente por bloco. A versão em Motion colocava ~60 observers e
  ~70KB no caminho crítico. O Motion continua no lightbox, carregado sob
  demanda por `next/dynamic`.
- **Hero em CSS.** A entrada orquestrada não espera hidratação. A foto do hero
  é o LCP e não recebe animação de opacidade, porque isso adiava o paint dela.
- **Sem `filter` em imagem grande** e sem `color-mix()` nas variáveis de tema:
  os dois apareciam no recálculo de estilo de uma página longa.
- Vídeos com `preload="none"`, tocando só quando visíveis, parados em
  `prefers-reduced-motion`.

## Auditoria (Lighthouse mobile, build de produção)

Acessibilidade **100**, Boas práticas **100**, SEO **100** e **CLS 0** em
todas as rodadas. FCP 1,0s, Speed Index 1,3s, TBT entre 70ms e 300ms.
Performance entre 82 e 90 conforme a carga da máquina.

O que sobra é o LCP, entre 3,2s e 4,1s. O elemento medido é o título do hero,
que é o maior bloco da página. Medindo com throttle aplicado de verdade (não o
simulado do Lighthouse), o primeiro paint e o LCP acontecem no MESMO instante:
não há nada atrasando especificamente o título, é a página inteira que só
pinta depois de baixar HTML, CSS e fontes por uma conexão de 1,6 Mbps servida
por um `next start` local em HTTP/1.1, com 150ms de latência por requisição.
Na Vercel isso muda de figura: HTTP/2, CDN e TTFB de ~50ms em vez dos ~470ms
do servidor local.

Já foram feitas as otimizações que dependem do código: uma variação por
família de fonte, todas pré-carregadas; vídeo do hero só depois do `load`;
nenhuma animação de opacidade no elemento que marca o LCP; `backdrop-filter`
só depois do primeiro scroll; e nenhum `filter` ou `color-mix()` em elemento
grande.

Diagnóstico rápido, se precisar revisitar:

```bash
node scripts/probe-lcp.mjs http://localhost:5206   # quando a página pinta
node scripts/probe-cls.mjs http://localhost:5206   # o que se mexe e quando
```
