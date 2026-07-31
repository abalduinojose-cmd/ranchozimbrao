import { img, video } from './media';

/**
 * Textos editoriais das seções.
 * Os TODO marcam informações que só o cliente pode confirmar.
 */

export const sobre = {
  id: 'sobre',
  eyebrow: 'Vida na roça',
  title: 'Um lugar onde o tempo anda no passo do cavalo',
  // TODO: confirmar o ano de fundação e o nome de quem tocou o rancho no começo
  paragraphs: [
    'O Rancho Zimbrão nasceu de uma vontade simples, viver perto dos animais e da terra. Entre o paredão de pedra e o verde que sobe o morro, o dia começa cedo, com casco no chão batido e cheiro de capim molhado.',
    'Aqui o Mangalarga Marchador não é enfeite. Cada animal é acompanhado de perto, do nascimento à doma, com manejo tranquilo, alimentação controlada e muito tempo solto no pasto.',
    'É esse cuidado que entregamos a quem chega. Um plantel confiável, uma marcha honesta e um pedaço de campo para respirar.',
  ],
  pillars: [
    {
      id: 'manejo',
      title: 'Manejo tranquilo',
      text: 'Doma racional e contato diário. Cavalo calmo é cavalo que trabalha melhor e dura mais.',
    },
    {
      id: 'genetica',
      title: 'Genética selecionada',
      text: 'Matrizes e garanhões escolhidos pela marcha, pelo temperamento e pela conformação.',
    },
    {
      id: 'campo',
      title: 'Campo de verdade',
      text: 'Pasto, sombra, água corrente e o paredão de pedra como pano de fundo.',
    },
  ],
  media: video('redondel', 'Vista do redondel do Rancho Zimbrão sob o paredão de pedra'),
  still: img('baias-noite.jpg', 'Cavalos descansando em frente às baias ao anoitecer'),
} as const;

export const raca = {
  id: 'raca',
  eyebrow: 'Mangalarga Marchador',
  title: 'A marcha é o que separa um bom cavalo de um cavalo inesquecível',
  lead: 'Andamento de quatro tempos, com pelo menos um casco sempre apoiado no chão. É isso que tira o solavanco do trote e permite horas de sela sem castigar o cavaleiro.',
  paragraphs: [
    'A raça nasceu em Minas Gerais no século XIX e virou a mais numerosa do Brasil por um motivo prático: ela junta conforto, resistência e docilidade no mesmo animal.',
    'No plantel do Zimbrão a seleção começa pela marcha. Depois vêm o temperamento e a conformação, nessa ordem. Um animal difícil pode até ganhar uma pista, mas não serve para o campo nem para a família.',
  ],
  facts: [
    { label: 'Origem', value: 'Minas Gerais, século XIX' },
    { label: 'Andamentos', value: 'Marcha batida e marcha picada' },
    { label: 'Altura média', value: '1,52 m machos, 1,46 m fêmeas' },
    { label: 'Registro', value: 'ABCCMM' },
  ],
  gaits: [
    {
      id: 'batida',
      name: 'Marcha batida',
      text: 'Apoio diagonal, com momentos de tríplice apoio. Passada mais firme, muito procurada para lida e cavalgada longa.',
    },
    {
      id: 'picada',
      name: 'Marcha picada',
      text: 'Apoio lateral, movimento mais deslizante e macio. O cavaleiro quase não sobe da sela.',
    },
  ],
  media: img('prova-de-marcha.jpg', 'Cavalo Mangalarga Marchador em prova de marcha com o cavaleiro'),
} as const;

export const contato = {
  id: 'contato',
  eyebrow: 'Contato e localização',
  title: 'Venha conhecer o rancho',
  lead: 'Agende a sua visita pelo WhatsApp. A gente combina o melhor dia, prepara os animais e recebe você com café.',
  mapQuery: 'RANCHO ZIMBRÃO, Posse, Petrópolis - RJ, 25770-460',
} as const;

/** Fecho visual do site, logo antes do rodapé. */
export const retrato = {
  eyebrow: 'O plantel do Zimbrão',
  title: 'Cavalo bom se reconhece parado. E se confirma andando.',
  lead: 'Marque a visita e veja a marcha ao vivo, no redondel, sem pressa.',
  media: img('pampa-preta-conformacao.jpg', 'Garanhão pampa preta do Rancho Zimbrão em pé no piquete'),
  inset: img('castanho-marcha.jpg', 'Cavalo castanho escuro do plantel levantando o membro anterior'),
  ctaMessage: 'Olá! Gostaria de marcar uma visita para ver os animais do Rancho Zimbrão.',
} as const;

export const footer = {
  claim: 'Raça em movimento, futuro em construção',
  credit: 'Fotos e vídeos do acervo do Rancho Zimbrão',
} as const;
