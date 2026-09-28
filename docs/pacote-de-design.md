# Pacote de design: site NEW CORP STUDIO

Insumo único da construção de `site/`, no modelo de `site-de-10k/references/pacote-de-design.md`, Nível 1 (uma tomada de 6 s). Toda linha entre aspas ou em bloco de texto embarca **ao pé da letra**. Números de faixa são pontos de partida: o teste de flick decide depois.

**Portão 1 aprovado pelo Pedro em 28/09/2026:** conceito D, Plex Sans + Plex Mono, topo parado no celular, texto aprovado, FAQ sem a pergunta de mensalidade, sem fidelidade nem multa, suporte depois da primeira semana combinado à parte.

Fontes do texto: `src/content/*.ts` (aprovado), `docs/auditoria.md` (regras e linguagem dos clientes) e `PRODUCT.md` (fatos). Onde o texto aprovado mudou, o motivo está na seção 10.

## 1. A premissa

**Sustentar.** Pedro passou três anos vendendo para a indústria e viu empresa pequena boa que vendia mal: faltava a arte que chama o cliente e o sistema que segura a operação. O site inteiro ensina essa ideia em duas metades, "Arte que chama. Sistema que sustenta.", e prova com a pessoa: quem atende é quem faz, e o painel que ele vende é o que ele usa. O vídeo desce até um palco de luz onde a marca NC pousa; a página abaixo é a estrutura que sustenta essa chegada. Seção que não serve a essa ideia sai.

## 2. Paleta (tokens)

Tirada de `src/index.css`, que já passa contraste. Valores finais conferidos contra a filmagem aprovada depois do portão do vídeo.

```css
:root{
  --canvas:#090b0e;        /* preto frio, nunca #000 */
  --panel:#0f1217;         /* superfícies: só o cartão do diagnóstico e o formulário */
  --panel-2:#15191f;
  --line:#262c35;          /* linhas finas decorativas */
  --field:#626c7a;         /* borda de campo: 3,7:1 */
  --text-primary:#ecf1f5;  /* 17,3:1 */
  --text-secondary:#a0abb8;/* 8,46:1 */
  --accent:#00c8fd;        /* botão, foco e uma ou duas ênfases; 10:1 */
  --accent-hover:#5cdcff;
  --accent-muted:#00c8fd26;/* brilhos, bordas acesas, partículas */
  --violet:#8b2af1;        /* só em luz, degradê e decoração: 3,5:1 não serve para texto */
  --on-accent:#0a0824;     /* texto do botão sobre azul sólido */
}
```

Regra do botão: fundo azul **sólido** com `--on-accent`. O degradê azul para roxo fica na borda acesa e no brilho, nunca atrás do rótulo (o antigo caía para 3,4:1 na ponta roxa).

## 3. Fontes

- **IBM Plex Sans** 400 e 600, local em woff2, subconjunto latino, pré-carregada. Faz o papel de título (600, tamanho grande, entreletra fechada) e de texto (400, 17 a 18 px).
- **IBM Plex Mono** 500, só para rótulos pequenos: "01 · Marca", números dos passos, contador do diagnóstico.

Desvio da skill, dito em voz alta: a site-de-10k pede uma fonte de título com personalidade própria. Aqui vale a decisão de 26/09 (a Plex é a letra da marca e do painel). A personalidade vem da escala: o título do topo claramente maior que qualquer h2.

## 4. Conceito do vídeo e mapa de faixas

**Conceito escolhido: D, "Palco da marca".** A câmera desce devagar por uma névoa escura e fria, com luz azul entrando pela esquerda e roxa pela direita, a mesma luz de contorno da logo NC, e chega a um chão escuro com uma poça de luz no centro: um palco vazio. **A logo NC real não é gerada:** ela entra pela camada da página (o PNG oficial `newcorp-emblema-transparente.png`) e pousa no palco na última faixa, guiada pela rolagem. Assim a logo fica perfeita em todo quadro, sem risco de a IA deformar as letras. Obedece as leis 1 (descer), 5 (luz e névoa são assuntos tolerantes), 6 (eixo vertical), 4 (final pensado) e 12 (o prompt continua "no text, no logos").

Conceitos que ficaram de reserva (se D falhar três vezes no vídeo, troca-se o conceito):
- **A, "Viga de aço":** descida ao longo de uma viga de aço escovado, luz azul de um lado e roxa do outro; termina num chão escuro. Liga com a origem na indústria. Sem logo.
- **B, "Fios de luz":** fios soltos de luz azul e roxa que se alinham em paralelo conforme a rolagem desce, a desordem virando sistema. Termina em linhas calmas.
- **C, "Horizonte":** descida em direção a um horizonte de planeta aceso em azul e roxo (a ideia do `hero-horizon.tsx`). Termina com o horizonte baixo no quadro.

**Altura do topo:** 450vh (350vh de rolagem). **Composição:** a ação no centro; texto das faixas 1 e 2 embaixo à esquerda; faixa 3 centrada, abaixo da logo.

| Faixa | Intervalo (partida) | Momento da filmagem (conceito D) | Texto (ao pé da letra) | Entrada |
|---|---|---|---|---|
| 1 | 0,00 a 0,30 | Névoa escura, as duas luzes acendem nas bordas | Título: "Arte que chama. Sistema que sustenta." Subtítulo: "Marca que passa confiança, página que traz contato e um painel para largar a planilha." | (f) deriva para baixo, montada no carregamento (`max(scrollK, loadK)`) |
| 2 | 0,36 a 0,64 | A descida atravessa a névoa, luz azul e roxa dos dois lados | Título: "Quem atende é quem faz." Subtítulo: "Marca, página e sistema feitos pela mesma pessoa, do primeiro papo à entrega." | (b) alinhamento em grade |
| 3 | 0,70 a 1,00 | Chegada ao palco de luz; a logo NC real sobe e pousa no centro | Título: "Antes de fechar, você vê uma tela pronta." Subtítulo: "Desenho uma tela real do seu projeto, sem custo e sem compromisso." Botão: "Quero meu protótipo" | (e) subida palavra por palavra, depois subtítulo, depois botão |

Rampas: `f = min(0,02, (b - a) / 3)`. A logo da faixa 3 usa o mesmo `--k` da faixa: `opacity` e `transform: translateY + scale` só, e desmonta ao rolar para cima.

## 5. Topo parado (celular, tablet em pé, movimento reduzido)

Fundo: o quadro final do vídeo em `object-fit: cover`. A logo NC real fica por cima como elemento da página, não gravada na imagem, então nunca é cortada no retrato e fica inteira e legível em 375 px. Esse topo parado é mostrado ao Pedro no mesmo portão do vídeo. Sem vídeo no celular: decisão do Portão 1. Até o vídeo existir, o fundo é o ambiente da marca (a logo parada sobre as duas luzes).

- Título: "Arte que chama. Sistema que sustenta."
- Subtítulo: "Marca, página e sistema para pequena empresa, feitos por uma pessoa só. Antes de fechar, você vê uma tela do seu projeto, sem custo."
- Botão: "Quero meu protótipo"

## 6. Abaixo da dobra

Cabeçalho fixo: marca NC + "NEW CORP STUDIO", âncoras "Frentes", "Diagnóstico", "Quem faz", "Dúvidas", e o botão "Quero meu protótipo". No celular, as âncoras vão para um menu com `popover`, rótulo "Menu".

Link de pular: "Pular para o conteúdo".

Esqueletos: nenhuma seção vizinha repete o de outra. O botão "Quero meu protótipo" leva sempre a `#contato`.

### 6.1 `#frentes`, três fileiras com linha fina

- Título: "Três frentes. Dá para começar por uma."
- Abertura: "Identidade visual, página que traz contato e sistema de gestão. Você pode contratar o pacote inteiro ou só a parte que está travando a sua empresa hoje."

**01 · Marca, "Identidade visual"**
- Dor: "Quando a arte muda a cada post, a empresa parece menor do que ela é."
- Texto: "Monto a marca inteira: logotipo, cores, fontes e um guia curto de como aplicar cada coisa. Em arquivo que não perde qualidade, do cartão de visita ao letreiro da fachada."
- Para quem: "Para quem já tem cliente, mas ainda usa um logo feito no celular, ou nunca teve marca nenhuma."
- Entregas:
  - "Logotipo": "Versão principal, reduzida e monocromática, em arquivo que não perde qualidade em nenhum tamanho."
  - "Paleta de cores": "As cores da marca com o código exato de cada uma, conferidas em fundo claro e escuro."
  - "Tipografia": "As fontes escolhidas e onde usar cada uma: título, texto corrido e destaque."
  - "Manual de marca": "Um guia curto com o certo e o errado, para quem for mexer na sua marca depois de mim."

**02 · Web, "Página que traz contato"**
- Dor: "Site bonito que não gera contato é despesa, não investimento."
- Texto: "Uma página só, que abre rápido no celular e leva quem chega até o seu WhatsApp. Sem menu gigante e sem páginas que ninguém abre."
- Para quem: "Para quem só tem Instagram, ou tem um site em plataforma genérica que ninguém atualiza há anos."
- Entregas:
  - "Página única": "Uma página feita para uma coisa só: transformar quem chega em contato no seu WhatsApp."
  - "Formulário que chega no seu WhatsApp": "A pessoa preenche e o pedido chega direto a você, sem plataforma no meio cobrando mensalidade."
  - "Botão que abre a conversa pronta": "A conversa já abre com a mensagem escrita, para a pessoa só apertar enviar."

**03 · Sistema, "Sistema de gestão"**
- Dor: "Com o controle na cabeça e na planilha, a empresa não anda sem você dentro."
- Texto: "Um painel com clientes, projetos e financeiro, desenhado a partir de como a sua operação já funciona, e não de um modelo pronto que você teria que obedecer."
- Para quem: "Para quem já perdeu prazo, cobrança ou cliente por não ter um lugar único para olhar."
- Entregas:
  - "Cadastro de clientes": "Cada cliente com histórico, telefone e em que pé está a negociação."
  - "Controle de projetos": "O que está em andamento, o que travou e o que já foi entregue, numa tela só."
  - "Fluxo de caixa": "Entrada e saída lançadas na hora, com o saldo do mês sempre à vista."
  - "Relatórios": "Os números do mês prontos quando você abrir, sem montar planilha no domingo."
  - "Painel no celular": "O mesmo painel no telefone, para consultar de qualquer lugar sem abrir o computador."

Fecho da seção: "Doze entregas, nenhuma surpresa."

### 6.2 `#diagnostico`, o momento interativo (único cartão da página)

- Título: "Descubra por onde começar."
- Abertura: "Quatro perguntas, um minuto. O resultado aparece aqui mesmo, sem pedir seu contato."
- Contador (Mono): "Pergunta 1 de 4"
- Perguntas (`<fieldset>` + `<legend>`, a chave no `value`):
  1. "O que sua empresa tem hoje no digital?" `digital`: "Nada ainda" (`nada`), "Só Instagram" (`instagram`), "Um site antigo" (`site-antigo`), "Site e sistema, mas ruins" (`sistema`)
  2. "O que mais te trava agora?" `trava`: "Ninguém me acha" (`achar`), "Passo a imagem errada" (`imagem`), "Controlo tudo no caderno" (`caderno`), "Perco tempo com tarefa manual" (`manual`)
  3. "Quantas pessoas estão na operação?" `equipe`: "Só eu" (`so-eu`), "2 a 5" (`2-a-5`), "6 a 20" (`6-a-20`), "Mais de 20" (`mais-de-20`)
  4. "Quando você quer isso no ar?" `prazo`: "Essa semana" (`semana`), "Até 30 dias" (`30-dias`), "Sem pressa, quero entender" (`entender`)
- Botões de navegação: "Voltar" e "Próxima"; na quarta, "Ver meu resultado".
- Rótulo do resultado (Mono): "Seu resultado"

**`presenca`**, "Comece pela presença: marca e página primeiro."
"Pelas suas respostas, o gargalo está em ser encontrado e entendido, antes de escalar a operação."
- "Identidade visual enxuta: marca, paleta e tipografia prontas para uso digital."
- "Uma página única, com formulário e WhatsApp, feita para gerar contato."
- "Perfil e página falando a mesma língua, com a mesma promessa."

**`operacao`**, "Seu gargalo é operação: comece pelo sistema."
"O negócio já gera demanda. O que está custando dinheiro é o controle manual."
- "Sistema de gestão sob medida para o processo que mais consome seu tempo hoje."
- "Clientes, projetos e financeiro num lugar só, com relatório simples."
- "Página conectada ao sistema, para o contato entrar já organizado."

**`percepcao`**, "O problema não é volume, é percepção."
"Chega gente até você, mas a apresentação está entregando menos do que a empresa é."
- "Marca nova aplicada em tudo que o cliente vê."
- "Uma página que mostra como você trabalha e o que já entregou."
- "Propostas e materiais no mesmo padrão da marca nova."

Depois do resultado: "Suas respostas já vão junto no pedido do protótipo." + botão "Quero meu protótipo". Link discreto: "Refazer".

Como acende: as três recomendações surgem uma por vez (escalonamento de 120 ms), e o fio da marca (seção 7) liga o resultado ao contato. Movimento reduzido: tudo aparece de uma vez.

### 6.3 `#como-funciona`, quatro passos no fio

- Título: "Marca e página no ar em até 10 dias úteis."
- "01", "Conversa de 20 minutos": "Você conta como a empresa funciona hoje e o que está travando. Sem briefing longo nem formulário gigante."
- "02", "Protótipo de uma tela": "Desenho uma tela real do seu projeto: a página inicial, o painel, o que fizer mais sentido. Sem custo e sem compromisso."
- "03", "Produção": "Aprovado o rumo, entra a produção: arte, página e sistema na mesma linha visual."
- "04", "No ar em até 10 dias úteis": "Marca e página publicadas, com você sabendo mexer. Sistema de gestão tem prazo próprio, combinado no orçamento. Ajustes da primeira semana já estão inclusos."

### 6.4 `#quem-faz`, história e prova lado a lado

- Título: "Vim de vendas. Por isso aqui ninguém fala difícil."
- Abertura: "Sou o Pedro Henrique. Toco a NEW CORP STUDIO sozinho, de Cajamar, atendendo toda São Paulo."
- História:
  1. "Passei três anos vendendo para a indústria. Nesse tempo entrei em muita empresa pequena que trabalhava bem e vendia mal. Não era falta de qualidade: quem procurava no Google não achava, e quem achava via uma apresentação que não combinava com o serviço prestado."
  2. "Aprendi a programar para resolver exatamente isso. Hoje faço as três coisas que faltavam naquelas empresas: a marca, a página e o sistema que segura a operação por dentro."
  3. "Como vim de vendas e não de tecnologia, eu explico em português. Se em algum momento eu soltar uma palavra que você não entendeu, pode me parar na hora. O erro é meu, não seu."
- Prova, título: "O sistema que eu vendo é o que eu uso"
- Prova, texto: "O painel de clientes, projetos e financeiro da própria NEW CORP foi construído por mim e roda todos os meus projetos. Quando eu digo que o fluxo funciona, é porque é nele que eu lanço a minha própria conta no fim do mês."
- Legenda da tela: "Tela do meu painel, com dados de demonstração."
- Compromissos (lista com linha fina, sem cartão):
  - "Você fala comigo, não com um atendimento": "Quem responde o WhatsApp é a mesma pessoa que desenha a marca e escreve o código. Não tem time no meio nem número de chamado."
  - "Preço fechado antes de começar": "Você aprova escopo e valor antes da primeira parcela. O que não estava combinado eu falo na hora, não na fatura do fim."
  - "Prazo dito na cara": "O prazo sai combinado no começo. Se alguma coisa atrasar, você descobre pelo motivo que eu te conto, não pelo silêncio."
  - "Você fica dono de tudo": "Arquivos, código e acessos ficam no seu nome. Se um dia quiser trocar de fornecedor, leva o trabalho inteiro junto."

### 6.5 `#duvidas`, sete perguntas (`<details name="faq">`)

"Tem mensalidade?" ficou de fora por decisão do Pedro (28/09): ainda não está definido.

- Título: "Perguntas que todo mundo faz antes de fechar."

1. "Quanto custa?"
   "Não tenho tabela, porque cada empresa precisa de uma coisa. Depois da conversa eu mando o orçamento pelo WhatsApp em três opções, com o que entra em cada uma, e você escolhe. O preço fica fechado antes de começar."
2. "E se você sumir no meio do projeto?"
   "Quem atende é quem faz, então você fala sempre com a mesma pessoa. E tudo que eu produzo fica no seu nome desde o começo: arquivos, código e acessos. O trabalho é seu, comigo ou com quem você quiser."
3. "Tem fidelidade ou multa?"
   "Não. Você não assina contrato de 12 meses nem paga multa para sair."
4. "Não entendo nada de tecnologia. Dá certo mesmo assim?"
   "Dá. Vim de vendas, não de programação, e explico tudo em português. Você me conta como a empresa funciona e eu cuido da parte técnica. Na entrega, te mostro como mexer no que é seu."
5. "E se o sistema ficar mais complicado que a minha planilha?"
   "O painel é desenhado a partir de como você já trabalha, e não de um modelo pronto. Antes de fechar, você vê uma tela dele no protótipo. Se não ficar mais simples que a planilha, eu te digo que não vale a pena fazer."
6. "Quem resolve depois da entrega?"
   "Eu mesmo. Os ajustes da primeira semana já estão inclusos. Depois disso, cada ajuste é combinado à parte, pelo WhatsApp."
7. "O que você não faz?"
   "Loja virtual com estoque e pagamento, gestão de redes sociais, tráfego pago e site em plataforma de arrastar e soltar. Dizer isso agora evita nós dois descobrirmos no meio do projeto. Em qualquer um desses casos, eu indico alguém."

### 6.6 `#contato`, o formulário sobre o quadro final

- Título: "Me conta o que você precisa."
- Abertura: "Você conta, eu devolvo um protótipo de uma tela. Só depois falamos de contrato."
- Campo 1, rótulo visível: "Seu nome" (obrigatório, `autocomplete="given-name"`). Erro: "Escreva seu nome para eu saber com quem estou falando."
- Campo 2, rótulo visível: "O que você quer resolver primeiro?" (obrigatório). Opções: "Escolha uma opção" (vazia, desativada, selecionada), "Marca (identidade visual)", "Página que traz contato", "Sistema de gestão", "Ainda não sei". Erro: "Escolha uma opção. Se ainda não sabe, tudo bem, é a última."
- Se o diagnóstico foi feito, linha acima do botão: "Vai junto na mensagem: seu resultado do diagnóstico." Link: "Tirar".
- Aviso honesto, logo acima do botão: "Ao tocar no botão, o seu WhatsApp abre com a mensagem pronta. Você confere e envia. Nada fica guardado neste site."
- Botão: "Quero meu protótipo"
- Depois do toque: título "Seu WhatsApp abriu com a mensagem pronta." Texto: "É só enviar. Se ele não abriu, use o botão abaixo." Botão: "Abrir o WhatsApp".
- Mensagem enviada: `contactMessage()` de `site/assets/js/lib.js`, mais as 4 respostas do diagnóstico em texto legível.

**Destino do formulário:** só WhatsApp, `window.open` síncrono dentro do submit, com recuo para `location.href`. Sem backend, sem serviço de formulário, sem campo de telefone (a conversa já mostra o número) e sem caixa de LGPD (nada é guardado).

### 6.7 Rodapé

- "NEW CORP STUDIO"
- "Arte que chama. Sistema que sustenta."
- "Cajamar, atendo toda São Paulo."
- "WhatsApp 11 98868-1657" (link `wa.me` sem mensagem)
- `#privacidade`: "Privacidade: este site não usa cookies e não guarda o que você digita. O formulário só monta uma mensagem e abre o seu WhatsApp. Você decide se envia."
- "© 2026 NEW CORP STUDIO"

### 6.8 `404.html`

- Título: "Essa página não existe mais."
- Texto: "O site agora é uma página só. Tudo que estava aqui continua lá."
- Link: "Voltar ao início"

## 7. Camada vetorial e ambiente

- **Elemento assinatura, "o fio":** uma linha fina vertical, azul descendo para roxo, que se traça com a rolagem da borda esquerda de `#frentes` até o botão do formulário, com um nó aceso em cada seção. Nos passos de "Como funciona" ela vira a linha que liga 01 a 04. Teste de volume: sem o fio, a página perde a sensação de uma estrutura só do topo ao contato. Movimento reduzido: o fio aparece inteiro, parado.
- **Ambiente fixo:** duas luzes suaves (azul à esquerda, roxa à direita) que derivam num ciclo de 70 s, mais grão leve. Só `transform` e `opacity`.
- **Um elemento vivo por seção, em nível de sussurro:** frentes, o número da fileira acende quando ela entra; diagnóstico, o anel do contador; como funciona, o nó do passo; quem faz, um brilho lento na borda da tela do painel; dúvidas, o ícone do `details` gira; contato, a borda do botão respira.
- **Ícones:** sprite SVG inline com os lucide em uso, tirado de `node_modules/lucide-react` antes de apagar o React. `aria-hidden="true"` em tudo que é decoração.
- **Entradas:** um IntersectionObserver põe `.in` uma vez; só `opacity` e `transform`; conteúdo visível sem JS; nenhum `blur` animado.

## 8. Lista de engenharia

Tudo de `site-de-10k/references/pipeline-scrub.md`, sem pular:
- Blob com anel de carregamento honesto e watchdog de 20 s; `VIDEO_BYTES` igual ao tamanho real.
- rAF que descansa, normalizado por dt (`approach()` de `lib.js`).
- Seeks travados, sem sobreposição.
- Escrita no DOM só na mudança (delta de 0,008 no `--k`).
- Faixas em vh (`bandOpacity()` e `bandK()` de `lib.js`), validadas pelo flick de 120, 240 e 360 px.
- Legibilidade em 4 camadas, pior quadro de cada faixa com 3,5:1 ou mais.
- Os 5 portões do topo parado, idênticos no CSS e no JS e vivos com `change`.
- Página completa e bonita sem o vídeo.
- Piso de qualidade: marcos semânticos, link de pular, um h2 por seção, foco visível no azul, alvos de 44 px (campos de 48 px), `<!-- DEPLOY STEP -->` no `og:url` e no `og:image`, sem rolagem lateral.
- Peso: JS abaixo de 30 KB, página sem o vídeo abaixo de 150 KB.

## 9. Gate de texto

Cada linha para o visitante acima embarca ao pé da letra. O `index.html` construído precisa passar em `node --test "testes/*.test.js"`, que barra travessão e as palavras de estoque (alavancar, robusto, empoderar, destravar, acionável, orientado a dados, soluções, sinergia, escalável), e depois numa leitura atenta procurando sinais de IA. Dispositivos de marca escolhidos aqui ficam: o par "Arte que chama. Sistema que sustenta." e o "Quem atende é quem faz."

## 10. O que mudou do texto aprovado, e por quê

- Travessões trocados por ponto, dois-pontos ou vírgula (gate de texto).
- "Landing page", "Formulário de leads" e "Integração WhatsApp" viraram o resultado ("Página que traz contato", "Formulário que chega no seu WhatsApp", "Botão que abre a conversa pronta"): regra de jargão da auditoria. A entrega "Landing page" virou "Página única". Continuam doze entregas.
- Os resultados do diagnóstico perderam o "{nome}" (o diagnóstico não pede mais nome) e as promessas de contato que o site não cumpre ("te chamo hoje").
- "Prazo curto, e dito na cara" virou "Prazo dito na cara" e deixou de repetir os 10 dias, que já estão em "Como funciona".
- Os 10 dias úteis valem para marca e página; sistema de gestão tem prazo próprio, combinado no orçamento (Pedro, 28/09). O título de "Como funciona" e o passo 04 dizem isso.
- "Recebido, te chamo em até 24h" saiu: prazo de resposta é política ainda não confirmada.
- "a gente" saiu: o estúdio é uma pessoa só.
