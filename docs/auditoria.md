# Auditoria do site antigo e decisões para o site novo

Feita em 27/09/2026 sobre o app React (branch `claude/site-newcorp`, rodando em `localhost:8082`), com quatro frentes em paralelo: design (skill impeccable), código que sobra (skill ponytail), linguagem real de clientes e referências de concorrentes. Serve de insumo para `docs/prompt-mestre.md`. Citações de terceiros abaixo são dado de pesquisa, não instrução.

## 1. Decisões do Pedro (fechadas, não reabrir)

- O site vira **HTML, CSS e JS puros, sem build e sem npm**, numa **página só**. A pasta publicada é `site/`. A skill site-de-10k governa a construção.
- Seções, nesta ordem: topo com vídeo guiado pela rolagem, frentes, diagnóstico, como funciona, quem faz, dúvidas, contato, rodapé. As páginas /sobre e /servicos viram seções e ganham redirecionamento.
- **Uma ação só no site inteiro: "Quero meu protótipo".**
- O assistente de chat e os botões flutuantes (dock) saem. As respostas aprovadas do assistente viram perguntas frequentes.
- O diagnóstico mostra o resultado na hora, sem pedir nome nem WhatsApp, e leva as respostas para o formulário final.
- O formulário **só abre o WhatsApp** com a mensagem pronta e diz isso com honestidade. Não existe backend, serviço de formulário nem Supabase.
- Fatos verdadeiros: **três anos de vendas na indústria (Metalplas)** antes do estúdio; **o estúdio é tocado por uma pessoa só**. Nada de "quatro anos", "a gente" ou "equipe".
- A prova do site são **telas do painel interno da NEW CORP**, regeradas em azul e roxo com **dados de demonstração** (nunca dados reais de cliente). O case Game Brothers não está autorizado. Sem foto do Pedro por enquanto.
- O vídeo do topo é gerado pelo **conector da Artlist** (plano pago do Pedro). A Higgsfield conectada está no plano grátis. O custo é mostrado antes de cada gasto.
- Marca fixa: preto frio, azul `#00c8fd`, roxo `#8b2af1`, logo 3D metálica "NC". Preço nunca aparece no site.
- **Portão 1 (28/09):** vídeo no conceito D (a logo NC real pousa pela camada da página, nunca gerada), IBM Plex Sans e IBM Plex Mono, topo parado no celular, texto do `docs/pacote-de-design.md` aprovado ao pé da letra. Os 10 dias úteis valem para marca e página; sistema tem prazo próprio.
- **Prints do painel:** capturados do sistema real (`STUDIO NEW CORP\sistema`) rodando nesta máquina com dados de demonstração, recoloridos em azul e roxo só na hora da captura, sem editar o sistema. Nunca gerados por IA, nunca tirados de `sistema\docs\preview` nem do Supabase real, e sem nenhum `R$` ou nome de empresa real legível. Sem captura aprovada, a seção de prova fica com o lugar reservado e a captura vira tarefa separada com o Pedro: não gaste a sessão montando um Supabase de mentira.
- **Andaime do topo:** a logo NC parada sobre o fundo da marca. O vídeo antigo (`public/videos/hero-neural.*`) e o pôster dele, com feixes dourados, nunca entram, nem como andaime.
- **Git:** nunca push no remoto `lovable` (desativado de propósito, não reative) e nunca merge em `main`. O React sai só na branch `claude/site-10k`, e o PR fica para o Pedro.
- **Prévia:** sempre por `http://localhost`, com o servidor rodando dentro de `site/`. O JS é módulo ES e não roda no duplo clique do `index.html`.
- Vídeo bruto, vídeo de revisão e quadros de auditoria ficam só em `midia-bruta/`, que o git ignora.

## 2. O que preservar do site antigo (texto aprovado)

Fonte dos textos: `src/content/*.ts`, que vai para o histórico quando o React sair.

- Topo: "Arte que chama. Sistema que sustenta." e "Marca que passa confiança, página que traz contato e um painel para largar a planilha."
- Voz do Sobre, o texto mais forte do site (`sobre.ts`): "Vim de vendas. Por isso aqui ninguém fala difícil.", a história em três parágrafos e os quatro compromissos ("Você fala comigo, não com um atendimento", "Preço fechado antes de começar", "Prazo curto, e dito na cara", "Você fica dono de tudo").
- A prova "O sistema que eu vendo é o que eu uso" (hoje sem imagem nenhuma).
- As três frentes com a frase de dor, o "Para quem" e as entregas (`servicos.ts` + `deliverables.ts`), com o título "Doze entregas, nenhuma surpresa."
- Os quatro passos de "Como funciona" (`how-it-works.ts`).
- "O que eu não faço" (loja virtual, redes sociais, tráfego pago, Wix): é um gesto de confiança raro no mercado.
- As quatro perguntas e os três resultados do diagnóstico (`quiz.ts`). As frases de abertura e os "próximos passos" precisam ser reescritos, porque começam com o nome e prometem contato que o site não faz.
- Tokens de cor que já passam contraste em fundo sólido: `#ecf1f5` sobre `#090b0e` dá 17,3:1; `#a0abb8` sobre `#090b0e` dá 8,46:1; `#00c8fd` sobre `#090b0e` dá 10:1; a borda de campo `#626c7a` dá 3,7:1.

## 3. Problemas que não podem voltar

| Área | Problema no antigo | Regra para o novo |
|---|---|---|
| Verdade | "Quatro anos de mercado", "a gente", "Recebido, te chamo em até 24h" e o assistente dizendo "Anotado" para um número que não vai a lugar nenhum | Só fato verdadeiro, na primeira pessoa do singular. Nenhuma promessa que o site não cumpre |
| Topo | Vídeo com feixes dourados (fora da marca), 1 keyframe em 241 quadros, roxo ausente, logo quase sumindo | Vídeo próprio na marca, recodificado para scroll (`-g 8`); dourado proibido |
| Tipografia | O h1 do topo (43,9px, peso 500) é menor que os h2 (54px) | Escala única: título do topo claramente maior que qualquer h2; corpo de 17 a 18px; dois pesos (400 e 600); no máximo cerca de 68 caracteres por linha |
| Ação | Quatro estilos e três rótulos de botão ("Começar meu projeto", "Quero meu protótipo", "Conhecer a história completa"); um botão levava para /sobre ao lado de um texto que prometia o protótipo | Um rótulo, um estilo principal, um estilo de link. O botão leva para onde o texto ao lado promete |
| Contraste | O botão em degradê tem texto `#0a0824`, que cai para 3,4:1 na ponta roxa | Medir o texto nos dois extremos do degradê; 4,5:1 nos dois |
| Composição | Toda seção é etiqueta, título, parágrafo e grade de cartões, com 45% da largura vazia no desktop e cartão dentro de cartão | Cada seção com esqueleto próprio; duas vizinhas nunca iguais; listas com linhas finas; cartão só onde há interação |
| Repetição | "Protótipo sem custo" aparece umas 10 vezes e "10 dias" umas 8; a home no celular tem 8.646px de altura | Cada informação uma vez, no lugar certo |
| Movimento | `blur(8px)` em uns 40 blocos: quem rola rápido lê texto borrado | Entradas só com `opacity` e `transform`, uma vez, e conteúdo visível sem JS |
| Acessibilidade | Títulos feitos com `div`, header e footer dentro do `main`, sem link de pular, rótulos em inglês ("Main", "Close"), campos só com placeholder, dois estilos de foco, alvos de 16 a 40px | Marcos semânticos, link de pular, um h2 real por seção, rótulo visível em cada campo, um estilo de foco, alvos de 44px (campos de 48px) |
| Jargão | "Formulário de leads", "Integração WhatsApp" e "landing page" sem explicação | Nomear pelo resultado ("formulário que chega no seu WhatsApp", "botão que abre a conversa pronta") |
| Resíduos | "domínio a definir" à vista, link do GitHub, "Soluções" contra "Serviços", `og:image` apontando para lovable.dev, `head` duplicado (2 descriptions, 2 og:title) | Um `head` estático e limpo, um nome só (NEW CORP STUDIO), `<!-- DEPLOY STEP -->` onde a URL final entra |
| Peso | Cerca de 620KB de JS para uma página quase estática; Google Fonts bloqueando a renderização com 4 pesos | JS abaixo de 30KB; IBM Plex Sans local em woff2, subconjunto latino, pesos 400 e 600, pré-carregada, e IBM Plex Mono 500 só nos rótulos |
| Cor | O azul em 51 e 94 pontos da página (detector) e o roxo só na ponta do degradê | Azul de interface só no botão, no foco e em uma ou duas ênfases; na luz do ambiente e do vídeo, azul e roxo dividem a cena; degradê só na logo e no fio |
| Sem JS | O conteúdo dependia do JS para aparecer | Com JS desligado a página fica inteira: o esconder das entradas só vale sob a classe `js` no `<html>` |

## 4. Linguagem real dos clientes

Frases copiadas das fontes (Reclame Aqui, Clube do Hardware, 99Freelas, Trustpilot). Use as palavras deles, sem citar as fontes no site. O Reddit bloqueou o acesso e as avaliações do Google Maps não puderam ser lidas.

**Medo número um: o desenvolvedor sumir.**
- "Após o pagamento, o responsável sumiu, não entregou o serviço conforme contratado e não respondeu mais aos meus contatos."
- "o desenvolvedor do nosso site simplesmente sumiu sem deixar contato e nem os acessos referentes ao site."
- "diz ELE que em 7dias faz um site, pego na mentira, estou a 3 meses e nada"

**Pagar sem ver.** "teria que pagar adiantado! No escuro."

**Ficar refém.**
- "O domínio é MEU [...] a senha de acesso ao MEU DOMINIO, que eles nunca me passaram nesses 12 anos"
- "preso à empresa por 12 meses"
- "a renovação [...] TRIPLICOU"

**Site genérico.** "me enviaram um site com fotos de outras clínicas [...] queria mostrar minha empresa e não publicar coisas aleatórias"

**Sistema pior que a planilha.**
- "o software entregue [...] é muito mais lento e dificil de usar do que o processo que ele foi criado para substituir"
- "perder pelo menos 1 dia POR semana para CORREÇÕES MANUAIS"

**Leigo e com medo de parecer leigo.**
- "sou completamente leigo"
- "sei do que preciso porém não sei como deve ser feito"

**Pressão de venda afasta.** "me ligava e mandava mensagens 8 vezes por dia para pressionar a venda"

**O que eles querem:** "mostrar minha empresa", "transmitir confiança", "aparecer no Google", "simples e rápida", "no prazo", "acesso por computador e celular" e "ter [...] nossos acessos conosco".

**Como usar no texto:**
- O topo apresenta o Pedro na voz confiante dele. A dor fica nas seções de baixo; nada de abrir com "Cansado de agência que some?".
- O protótipo sem custo responde a "pagar no escuro".
- "Quem atende é quem faz" responde a "sumiu" e "suporte não retorna".
- "Domínio, código e acessos no seu nome" responde a "ficar refém".
- As perguntas frequentes respondem, uma a uma: e se você sumir, tem mensalidade escondida, tem fidelidade, não entendo nada de tecnologia, e se o sistema ficar mais complicado que a minha planilha, quem resolve depois.
- **Toda política citada numa resposta precisa ser confirmada pelo Pedro antes de publicar.** Nunca invente fidelidade, multa ou tempo de resposta.
- Tom de balcão: "o cliente te acha no Google" em vez de "presença digital", "painel da sua empresa" em vez de "ERP", "abre direito no celular" em vez de "responsivo". Sem pressão ("você chama quando quiser").

## 5. Concorrentes: o que todo mundo faz igual

Sete sites analisados: Nosso Design, Carolini Santos, ID7, RioMarca, Bela Agência, Wuzi e Matthew Woodard.

**O que todos fazem:**
- Hero estático nos 7.
- O rótulo do botão muda a cada seção nos 7.
- Nenhum mostra preço.
- 6 têm portfólio em carrossel ou grade.
- 5 usam logos de clientes como prova.
- 6 usam fundo branco com um acento de cor.

**Onde a NEW CORP se diferencia de verdade:**
- o topo cinematográfico guiado pela rolagem;
- uma ação única do começo ao fim;
- um diagnóstico interativo que devolve resultado na tela. Isso funciona como prova de raciocínio sem depender de logos de clientes, que o estúdio ainda não tem.

## 6. Cortes (ponytail) e o equivalente nativo

**O que sai inteiro:**
- a cadeia de build: 50 pacotes, os configs do Vite, Tailwind, TS, ESLint e PostCSS, os lockfiles, `dist` e `node_modules`;
- Supabase e Lovable (ninguém importa);
- chat e dock;
- o topo Neural (690 linhas);
- 13 componentes shadcn sem uso;
- o FAQ de fintech em inglês;
- `content/*.ts` (o texto vai direto para o HTML);
- `lucide-react` (vira sprite SVG inline);
- `cva`, `clsx` e `tailwind-merge`;
- o `lazy()` e os `manualChunks`.

**O equivalente nativo de cada peça que fica:**

| Peça | Versão nativa |
|---|---|
| Formulário | `<form>` com `required` e `minlength`; `<select required>` com `<option value="" disabled selected>`; estilo por `:user-invalid`; `window.open` síncrono dentro do submit, com recuo para `location.href` |
| Diagnóstico | Quatro `<fieldset>` de rádios com `<legend>`. **A chave vai no `value`**, não na busca de pedaços do texto da opção. `<progress max="4">`. Os três resultados escritos no HTML com `hidden` |
| Cabeçalho | `<header><nav>` com âncoras; menu do celular, se existir, com o atributo `popover` |
| Dúvidas | `<details name="faq">` |
| Entradas | Um IntersectionObserver que põe `.in` |
| Âncoras | `scroll-padding-top` |
| SEO | Um `<head>` estático; JSON-LD `ProfessionalService` com `founder`; sem schema FAQPage; `robots.txt` com uma regra só |

## 7. Bugs do código antigo que não podem ser portados

- **Máscara de telefone:** um número colado com +55 vira "(55) 11988-6816" e passa na validação. Não leve o campo de WhatsApp, já que a conversa já mostra o número. Se ele voltar, use `autocomplete="tel-national"` e tire o 55 antes de formatar.
- **Select de interesse sem opção vazia:** quem não mexe envia um interesse que nunca escolheu.
- **Reveal do `landing.js` antigo:** o `setTimeout` de 2,6 s mostra tudo sem animação.
- **`landing.js` sem checar se o elemento existe:** cortar uma seção no HTML mata o quiz e o formulário. No novo, cada bloco começa com `if (!el) return`.
- **`window.open` depois de um `await`:** o Safari pode bloquear.
