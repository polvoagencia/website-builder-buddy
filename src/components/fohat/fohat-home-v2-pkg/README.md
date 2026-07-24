# FOHAT — Home v2 (rewrite cinematográfico)

Reescrita completa da home page da FOHAT com narrativa dirigida por scroll,
no espírito das páginas de lançamento da Apple.

## O que vem aqui dentro

```
src/
  routes/
    index.tsx                                   ← SUBSTITUI o arquivo atual
  components/fohat/home-v2/
    CinematicHero.tsx                           ← Capítulo 1
    Numbers.tsx                                 ← Capítulo 2
    Frontiers.tsx                               ← Capítulo 3 (pinado, o mais impactante)
    Belief.tsx                                  ← Capítulo 4 (bg interpola navy→mist)
    Vitrine.tsx                                 ← Capítulo 5 (scroll horizontal)
    Projects.tsx                                ← Capítulo 6 (SVG que se desenha)
    Partners.tsx                                ← Capítulo 7 (diagrama radial)
    FinalCTA.tsx                                ← Capítulo 8 (botão magnético)
    ChapterDots.tsx                             ← Overlay: navegação lateral
    ScrollProgressBar.tsx                       ← Overlay: barra no topo
    primitives/
      CountUp.tsx                               ← Contador animado
      ScrollLinkedText.tsx                      ← Texto revelado por scroll
```

**Todos os componentes usam bibliotecas que já estão no `package.json`
do projeto atual** (`motion`, `@tanstack/react-router`, `lucide-react`).
Nenhuma dependência nova precisa ser instalada.

## Como aplicar no Lovable

1. Crie a pasta `src/components/fohat/home-v2/` e dentro dela a subpasta
   `primitives/`.
2. Cole cada arquivo no caminho correspondente.
3. Substitua o conteúdo do `src/routes/index.tsx` pelo novo.
4. Os componentes antigos em `src/components/fohat/home/` (`HeroLayered`,
   `StickyFronts`, `ProjectsGateway`, `PartnersNetwork`, `MagneticCTA`)
   **podem ser deletados** — não são mais usados. Se quiser preservar
   por segurança, deixe onde estão, o novo `index.tsx` não os importa.

## O que você PRECISA editar antes de publicar

### 1. Números reais (Numbers.tsx)

O bloco de stats tem 4 valores. Três estão marcados com um chip laranja
"EDITAR" no canto — eles são placeholders razoáveis mas você precisa
substituir pelos números reais da agência:

```tsx
const STATS: Stat[] = [
  { value: 3,   ... },   // ← este é real (3 frentes)
  { value: 6,   ..., todo: true },  // ← trocar por capitais atendidas reais
  { value: 12,  plus: true, ..., todo: true },  // ← trocar por anos reais
  { value: 100, suffix: "%", ..., todo: true }, // ← trocar por % ou nº projetos
];
```

Depois de trocar, remova o `todo: true` de cada um — o chip laranja some.

Se algum dos números for muito pequeno (ex.: "12 projetos") ou muito grande
sem impacto (ex.: "10.000 emails enviados"), remova o card inteiro. Um
bloco de 3 stats reais é melhor que um de 4 com um "editar".

### 2. (Opcional) Ordem dos capítulos

O array `chapters` em `routes/index.tsx` controla os pontos do
`ChapterDots` lateral. Se você mover ou renomear seções, atualize lá.

## Comportamento em mobile

- `Frontiers` e `Vitrine` têm fallback próprio pra telas menores que `lg`
  (o pinning do desktop briga com gestos de scroll nativos no mobile).
- `ChapterDots` está oculto abaixo de `lg` (`hidden lg:block`) — no mobile
  a barra de progresso do topo é suficiente.
- Todos os capítulos foram testados no build; `npm run build` gera 219KB
  gzip pra home.

## Prefers-reduced-motion

Todos os componentes chamam o hook `useReducedMotion` que você já tem
em `src/hooks/useReducedMotion.ts`. Quando o usuário tem `prefers-reduced-motion: reduce`
ativo:

- As mask reveals de texto ficam estáticas (posição final imediata).
- Contadores mostram o valor final direto, sem animar.
- Animações loop (halo, ring, mark girando) são desativadas.
- Parallax e transformações por scroll são congeladas.
- O conteúdo permanece 100% legível e navegável.

## Sobre a barra amarela "editar" dentro do preview

É intencional — é o chip laranja `EDITAR` que renderizei nos cards de
número. Serve como TODO visual. Depois de trocar os números reais e
remover `todo: true`, o chip desaparece.

## Como testar antes de publicar

```bash
# Do dentro da pasta do projeto:
npm run dev
# Abre http://localhost:5173/
```

- Faça scroll lento com a roda do mouse pra ver as transições dirigidas
  por progresso (especialmente o número 01→02→03 no capítulo Frontiers).
- Passe o mouse sobre os pontos laterais direitos: cada um mostra o nome
  do capítulo e leva ao anchor correspondente.
- Passe o mouse perto do botão "Conte sua ideia" no CTA final pra ver
  o efeito magnético.

## Sobre 404s de assets no dev local

Os arquivos `.asset.json` do Lovable apontam pra caminhos
`/__l5e/assets-v1/...` que só existem no runtime do Lovable. No `npm run dev`
local você verá alguns 404 no console pra `mark-fohat.png` — isso
desaparece automaticamente no preview e produção do Lovable.

## Roadmap (nice-to-have, não incluído)

Se depois disso você quiser subir ainda mais o nível:

- **Vídeo no fundo do CinematicHero** — substituir o orb radial por um
  loop mudo de 6–8s (WebM). Basta trocar a `<div>` do orb por um
  `<video autoplay muted loop playsinline>`.
- **Image sequence estilo Apple/AirPods** — 60 frames renderizados em
  Blender, controlados por `<canvas>` conforme o scroll. Alto esforço,
  altíssimo impacto no capítulo Frontiers.
- **View Transitions entre home e subpáginas** — o CSS já tem
  `@view-transition { navigation: auto }`; falta dar
  `view-transition-name` aos cards de frente e ao hero das subpáginas.

---

Qualquer dúvida ou refinamento, é só me chamar.
