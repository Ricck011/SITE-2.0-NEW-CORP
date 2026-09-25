// Case Game Brothers (locadora digital de jogos, Barretos-SP). Conteúdo
// aprovado, portado da landing atual (CLAUDE-GERAL-\site\index.html).

export const GAME_BROTHERS_TAG = "Landing page";
export const GAME_BROTHERS_TITLE = "Game Brothers, locadora digital de jogos.";
export const GAME_BROTHERS_LEDE =
  "Loja de aluguel de jogos de PS4 e PS5 em Barretos. Estava na Wix, com 360 anúncios e quase todo o público chegando pelo Instagram, no celular. Tirei o site da plataforma e reconstruí do zero.";

export interface GameBrothersMove {
  number: string;
  title: string;
  description: string;
}

export const GAME_BROTHERS_MOVES: GameBrothersMove[] = [
  {
    number: "01",
    title: "Sair da plataforma, não remendar.",
    description:
      "Site saiu da Wix, virou projeto próprio em hospedagem comum; o processo de pedido passou a ser da loja, não da ferramenta.",
  },
  {
    number: "02",
    title: "Jogo em dois toques.",
    description:
      "Busca sempre visível, categorias em texto real (não imagem com letra dentro), filtro por console/tipo de conta/gênero/preço/promoção.",
  },
  {
    number: "03",
    title: "Nunca esconder o preço nem o risco.",
    description:
      'Valor muda na hora da troca de versão; aviso de "só paga depois da confirmação" aparece antes do pagamento, não depois.',
  },
  {
    number: "04",
    title: "Pedido que termina onde a loja atende.",
    description:
      "Carrinho vive no aparelho e monta pedido que abre no WhatsApp da loja com código de acompanhamento.",
  },
  {
    number: "05",
    title: "O dono precisa mexer sem me chamar.",
    description:
      "Preço, promoção e destaque separados do layout, com opção de ler de planilha do Google.",
  },
];

export const GAME_BROTHERS_STATUS =
  "O site está entregue e aguardando a aprovação do dono sobre preços e destaques antes de substituir a versão atual. Por isso este caso ainda não mostra número de venda: quando existir, ele entra aqui medido.";

export const GAME_BROTHERS_PHONE_AFTER = {
  src: "/images/case-game-brothers/gb-depois-celular.webp",
  alt: "Primeira tela do site novo da Game Brothers no celular, com busca e jogos aparecendo de imediato.",
};

export const GAME_BROTHERS_DESKTOP_COMPARE = [
  {
    src: "/images/case-game-brothers/gb-antes-desktop.webp",
    alt: "Site antigo da Game Brothers no computador, com a frase principal escondida e poucos jogos visíveis.",
    tag: "antes" as const,
  },
  {
    src: "/images/case-game-brothers/gb-depois-desktop.webp",
    alt: "Site novo da Game Brothers no computador, com busca, destaques e jogos visíveis já na primeira tela.",
    tag: "depois" as const,
  },
];
