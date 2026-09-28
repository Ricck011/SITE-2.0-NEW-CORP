---
name: NEW CORP STUDIO
description: Arte que chama. Sistema que sustenta. Site de uma página, escuro, com topo guiado pela rolagem.
colors:
  canvas: "#090b0e"
  panel: "#0f1217"
  panel-2: "#15191f"
  line: "#262c35"
  field: "#626c7a"
  text-primary: "#ecf1f5"
  text-secondary: "#a0abb8"
  text-on-stage: "#d5dce3"
  accent: "#00c8fd"
  accent-hover: "#5cdcff"
  violet: "#8b2af1"
  on-accent: "#0a0824"
  danger: "#ff5a64"
typography:
  display:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 1.2rem + 4.4vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  display-still:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1rem + 3.6vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 2.6vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title-lg:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
  lede:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.04em"
    fontFeature: "tnum"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "16px"
  node: "50%"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  container: "1180px"
  section: "clamp(88px, 11vw, 160px)"
  row: "40px"
  stack: "20px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.on-accent}"
  button-primary-sm:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "48px"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    height: "32px"
  input-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "48px"
  quiz-option:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "52px"
  card-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.xl}"
    padding: "clamp(20px, 4vw, 40px)"
  menu-popover:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "8px"
---

# Design System: NEW CORP STUDIO

Fonte da verdade: `site/assets/css/site.css`. Direção aprovada: `docs/pacote-de-design.md` (28/09). Regras de origem: `docs/auditoria.md`.

## Overview

**Creative North Star: "O palco e a estrutura"**

O topo é um palco de luz: a câmera desce por um poço escuro, a luz azul entra pela esquerda e a roxa pela direita, e a logo NC real pousa dentro do portal. Abaixo da dobra, a página é a estrutura que sustenta essa chegada: fundo preto frio, linhas finas de 1 px, uma única superfície de cartão por momento interativo e um fio que costura as seções até o formulário.

A cor de interface é rara. O azul marca ação, foco e o traço do fio; azul e roxo só dividem a cena como luz (ambiente, vídeo, degradê do fio). A tipografia é uma família só, e a personalidade vem da escala: o título do topo é claramente maior que qualquer h2.

**Key Characteristics:**
- Escuro frio, nunca `#000`; separação por linha fina, não por sombra.
- Uma família (IBM Plex Sans 400/600) e um mono (Plex Mono 500) só para números.
- O fio como assinatura, do topo ao contato.
- Topo guiado pela rolagem no computador, topo parado nos demais casos.
- Uma ação só em toda a página: "Quero meu protótipo".

## Colors

Preto frio com azul elétrico de ação e roxo que só existe como luz.

### Primary
- **Azul Portal** (accent): botão sólido, contorno de foco, traço e nós do fio, opção marcada do diagnóstico, anel do contador, cursor de digitação. Contraste 10:1 sobre o fundo.
- **Azul Portal Aceso** (accent-hover): só o estado de hover do botão sólido.
- **Tinta sobre Azul** (on-accent): texto de todo botão sólido. Nunca sobre degradê.

### Secondary
- **Roxo de Contorno** (violet): só em luz, degradê e decoração (ponta do fio, luz do ambiente, palco do topo). Mede 3,5:1: não serve para texto nem para borda funcional.

### Neutral
- **Preto Frio** (canvas): fundo de tudo, inclusive dentro dos campos.
- **Painel** (panel): só o cartão do diagnóstico, o formulário (a 88% de opacidade) e o menu do celular.
- **Painel Elevado** (panel-2): hover dos itens do menu no celular.
- **Linha** (line): divisórias de 1 px entre fileiras, borda de cartão, trilho do fio em repouso.
- **Borda de Campo** (field): borda de campo, opção e botão fantasma. Mede 3,7:1.
- **Texto** (text-primary): títulos e texto corrido, 17,3:1.
- **Texto Secundário** (text-secondary): aberturas, notas, respostas do FAQ, 8,46:1.
- **Texto sobre o Palco** (text-on-stage): subtítulos das faixas e do topo parado, sempre com a sombra de texto do topo.
- **Erro** (danger): borda de campo inválido (`:user-invalid`).

As tintas do azul em uso são literais: seleção a 32% e opção marcada a 8%.

### Named Rules
**The Solid Button Rule.** Botão tem fundo azul sólido e texto `on-accent`. O degradê azul para roxo fica no fio e nas linhas de luz, nunca atrás de um rótulo (o antigo caía para 3,4:1 na ponta roxa).

**The Light Only Rule.** Roxo é luz. Se o roxo aparece num lugar que precisa ser lido ou clicado, está errado.

## Typography

**Display Font:** IBM Plex Sans 600 (com system-ui, sans-serif)
**Body Font:** IBM Plex Sans 400 (com system-ui, sans-serif)
**Label/Mono Font:** IBM Plex Mono 500 (com ui-monospace, monospace)

**Character:** A Plex é a letra da marca e do painel que o estúdio vende. Um arquivo variável local (`ibm-plex-sans-latin.woff2`, pesos 100 a 700, subconjunto latino, pré-carregado), usado só em 400 e 600. O Mono vem num arquivo próprio de peso 500.

### Hierarchy
- **Display** (600, clamp 2,75 a 5,5 rem, 1,02, -0,025em): títulos das faixas do topo. Faixa 1 usa clamp 2,75 a 4,75 rem sem limite de largura; faixa 3 usa clamp 2,25 a 4 rem, centrada, até 17ch.
- **Display parado** (600, clamp 2,5 a 4 rem, 1,02): o h1 do topo parado, até 12ch no celular.
- **Headline** (600, clamp 2 a 3,25 rem, 1,08, -0,02em): um h2 por seção, largura de 14ch a 20ch.
- **Title grande** (600, clamp 1,5 a 2 rem): fecho de Frentes, título do resultado. Variante 1,375 a 1,75 rem na prova e na confirmação do envio.
- **Title** (600, clamp 1,25 a 1,5 rem, 1,3): dor de cada frente e pergunta do diagnóstico. Títulos fixos: frente 1,5 rem, compromisso 1,1875 rem, passo 1,25 rem, pergunta do FAQ 1,125 rem.
- **Lede** (400, clamp 1,0625 a 1,25 rem, até 58ch, text-secondary): abertura sob cada h2.
- **Body** (400, 1,0625 rem, 1,125 rem a partir de 900 px, 1,6): texto corrido, 52ch a 64ch.
- **Small** (400, 0,9375 rem; 0,875 rem nas notas): rodapé, aviso do formulário, botão pequeno.
- **Mono** (500, 0,875 rem, 0,04em, algarismos tabulares): só o contador "Pergunta 1 de 4" e os números 01 a 04 dos passos.

### Named Rules
**The Scale Is The Voice Rule.** Não entra segunda família de título. A personalidade vem do salto entre display e headline.

**The Mono Is For Numbers Rule.** Plex Mono só onde há número que conta ou ordena. Nunca em rótulo acima de título.

## Layout

Coluna única de até 1180 px, com margem de 16 px no celular e 32 px a partir de 720 px. Seções com respiro vertical de clamp(88px, 11vw, 160px). Cortes em 480, 720, 900 e 1000 px: a 900 px o menu sai do popover e os passos viram quatro colunas; a 1000 px Frentes vira 4fr/7fr com o título grudado no topo, Quem faz vira 7fr/5fr e Contato vira 5fr/6fr.

Cada seção tem um esqueleto diferente da vizinha: fileiras com linha fina (Frentes), cartão centrado (Diagnóstico), quatro passos sobre uma linha (Como funciona), história e prova lado a lado (Quem faz), lista de `details` (Dúvidas), texto e formulário sobre o quadro final do vídeo (Contato). Cabeçalho fixo translúcido (preto a 74% com desfoque de 12 px); `scroll-padding-top` de 84 px.

### O topo guiado pela rolagem
- **Padrão (computador):** topo de 450vh com palco grudado de 100svh. O vídeo de 6 s avança com a rolagem. Três faixas de texto: 0 a 0,28 (título desce palavra por palavra), 0,32 a 0,58 (letras entram em fila), 0,66 a 1 (título sobe palavra por palavra, depois subtítulo, depois botão). Faixas 1 e 2 embaixo à esquerda; faixa 3 centrada.
- **A logo pousa:** a logo NC real (webp, nunca gerada) sobe e pousa dentro do portal de luz na faixa 3, com a mesma variável de progresso da faixa: só opacidade, translação e escala, e desmonta ao voltar.
- **Legibilidade:** sombra de texto escura em três camadas mais uma mancha escura atrás de cada faixa, ancorada à esquerda nas faixas 1 e 2. Pior quadro de cada faixa com 3,5:1 ou mais em 1280, 1440 e 1920 px.
- **Portões do topo parado:** até 720 px de largura; retrato até 1024 px; retrato com toque; paisagem com toque até 560 px de altura; movimento reduzido. Sem JS também cai no topo parado. A lista é idêntica, caractere por caractere, no CSS e em `GATES` de `hero.js`: mudou um, muda o outro.
- **Topo parado:** sem vídeo. Palco de luz em CSS (azul à esquerda, roxo à direita, poça de luz no chão), logo inteira e título, subtítulo e botão embaixo à esquerda.
- O quadro final do vídeo (o portal) volta como fundo da seção de Contato.

## Elevation & Depth

Plano. Profundidade vem de luz, não de sombra: duas luzes fixas (azul em cima à esquerda, roxa embaixo à direita) derivam em ciclos de 70 s e 84 s atrás da página, e o palco do topo usa os mesmos degradês radiais. Superfícies se separam por linha de 1 px e pelo passo canvas, panel, panel-2.

### Shadow Vocabulary
- **Sombra de texto do palco** (`0 1px 2px rgba(5,5,10,.95), 0 3px 12px rgba(5,5,10,.78), 0 10px 44px rgba(5,5,10,.8)`): só texto sobre vídeo ou palco.
- **Sombra da logo** (`drop-shadow(0 28px 40px rgba(0,0,0,.55))`): só a logo NC no palco.

### Named Rules
**The No Halo Rule.** Nenhum brilho colorido em botão, cartão ou texto. Sombra, quando existe, é escura e serve à leitura.

## Shapes

Cantos suaves e poucos: 10 px (botão do menu, itens do menu, link de pular), 12 px (botões, campos, opções, print do painel), 14 px (menu popover), 16 px (os dois cartões). Nós do fio e dos passos são círculos de 9 px com borda de 1 px. Linhas de 1 px fazem quase todo o trabalho de forma: topo de cada fileira, de cada item do FAQ e do rodapé.

## Components

### Buttons
- **Shape:** cantos suaves (12 px), altura mínima de 48 px.
- **Primary:** azul sólido, texto on-accent em 600, 0 24px. Hover clareia para accent-hover; ativo desce 1 px. Transição de 0,2 s na curva `cubic-bezier(.23,1,.32,1)`.
- **Pequeno:** só no cabeçalho, 40 px de altura (44 px em tela de toque).
- **Fantasma:** borda field de 1 px, sem fundo; hover leva a borda para text-primary. Só na navegação do diagnóstico ("Voltar", "Próxima").
- **Link:** texto secundário sublinhado, 32 px (44 px no toque). Ações menores: "Refazer", "Tirar".

**The One Action Rule.** Todo botão sólido diz "Quero meu protótipo" e leva a `#contato`: cabeçalho, faixa 3, topo parado, resultado do diagnóstico e envio do formulário. A única exceção é "Abrir o WhatsApp", que substitui o formulário depois do envio como continuação da mesma ação. Não crie segundo rótulo nem segundo estilo principal.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** panel (diagnóstico) e panel a 88% (formulário, sobre o portal).
- **Border:** 1 px line. Sem sombra.
- **Internal Padding:** clamp(20px, 4vw, 40px).
- Existem só esses dois. Frentes, compromissos e passos são listas com linha fina, sem cartão.

### Inputs / Fields
- **Style:** 48 px de altura, fundo canvas, borda field de 1 px, 12 px de canto, rótulo visível em 600 acima.
- **Select:** seta SVG em text-secondary, 44 px de respiro à direita.
- **Focus:** o contorno global (2 px accent, afastado 3 px).
- **Erro:** borda danger só depois da interação (`:user-invalid`).
- **Opção do diagnóstico:** linha de 52 px com borda field; hover em text-secondary; marcada em borda accent e fundo azul a 8%.

### Navigation
Cabeçalho fixo com emblema NC de 32 px e "NEW CORP STUDIO" em 600 com 0,04em (o nome some abaixo de 480 px). Até 900 px, botão "Menu" abre um popover panel de 14 px com itens de 48 px. A partir de 900 px, âncoras em linha em text-secondary, hover em text-primary.

### O fio (assinatura)
Linha vertical de 1 px na borda esquerda, de Frentes até a altura do botão do formulário. Em repouso é line; com a rolagem, um traço em degradê azul para roxo desce por cima dela. Um nó de 9 px por seção, na altura do título, acende em azul quando a ponta passa. Em Como funciona o fio encosta na linha dos passos, que se acende de 01 a 04 (azul para roxo, escalonamento de 150 ms). No fim ele dobra para a direita em degradê roxo para azul até o cartão do contato, onde um nó final pulsa. Sem JS ou com movimento reduzido: fio inteiro, parado, nós acesos.

### Movimento
- Entradas: uma vez, só `transform` (22 px, 1 s), conteúdo sempre visível sem JS.
- Um elemento vivo por seção, em nível de sussurro, só com a seção na tela: nó de cada frente, anel do contador, nó do passo, linha da prova, nó final do fio. Tudo pausa com a aba escondida.
- Movimento reduzido: nenhuma animação nem transição; tudo no estado final.

## Do's and Don'ts

### Do:
- **Do** usar accent só em ação, foco, fio e seleção; violet só como luz e degradê.
- **Do** manter o piso de acessibilidade: texto com 4,5:1 ou mais (medido: 17,3:1, 8,46:1, 10:1), borda de campo 3,7:1, faixas do topo com 3,5:1 no pior quadro.
- **Do** dar 44 px a todo alvo e 48 px a campo e botão principal.
- **Do** usar um só estilo de foco: contorno de 2 px accent, afastado 3 px.
- **Do** respeitar `prefers-reduced-motion`: estado final, nada anda, o topo vira parado.
- **Do** separar com linha de 1 px antes de pensar em cartão.
- **Do** mudar os portões do topo parado no CSS e em `hero.js` juntos.

### Don't:
- **Don't** colocar rótulo acima de título (os antigos "01 · Marca" e "Seu resultado" saíram de propósito). O nome vai no próprio título.
- **Don't** pôr halo ou brilho colorido em botão, cartão ou texto.
- **Don't** aplicar grão ou ruído sobre o fundo.
- **Don't** usar degradê atrás de texto de botão.
- **Don't** criar um terceiro cartão ou uma segunda família tipográfica.
- **Don't** gerar ou redesenhar a logo NC: é sempre o arquivo oficial.
- **Don't** usar `#000` puro como fundo.
