import { img, type MediaImage } from './media';

/**
 * PLANTEL
 *
 * ⚠ TODO: preencher com os dados reais do plantel.
 * As FOTOS são reais (acervo do rancho). Nomes, registros ABCCMM,
 * datas de nascimento e genealogias abaixo são PLACEHOLDER e existem
 * apenas para o layout ficar pronto. Substitua campo a campo.
 *
 * As pelagens foram descritas a partir das próprias fotos, então essas
 * costumam já estar corretas. Confira mesmo assim.
 */

export type Sexo = 'Garanhão' | 'Égua' | 'Potro' | 'Potra' | 'Castrado';

export type Animal = {
  id: string;
  nome: string;
  sexo: Sexo;
  pelagem: string;
  /** ISO 8601 (YYYY-MM-DD) ou apenas o ano */
  nascimento: string;
  /** número de registro na ABCCMM */
  registro: string;
  genealogia: { pai: string; mae: string };
  /** linha curta de destaque exibida no card, opcional */
  destaque?: string;
  foto: MediaImage;
};

export const animais: Animal[] = [
  {
    id: 'rz-marques',
    nome: 'RZ Marquês',
    sexo: 'Garanhão',
    pelagem: 'Pampa preta',
    nascimento: '2018',
    registro: '000001',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    destaque: 'Reprodutor da casa',
    foto: img('pampa-preta-conformacao.jpg', 'Garanhão pampa preta em pé no piquete do Rancho Zimbrão'),
  },
  {
    id: 'rz-sereno',
    nome: 'RZ Sereno',
    sexo: 'Garanhão',
    pelagem: 'Castanha escura',
    nascimento: '2019',
    registro: '000002',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    destaque: 'Marcha batida',
    foto: img('castanho-marcha.jpg', 'Cavalo castanho escuro de crina trançada levantando o membro anterior'),
  },
  {
    id: 'rz-diamante',
    nome: 'RZ Diamante',
    sexo: 'Garanhão',
    pelagem: 'Tordilha',
    nascimento: '2017',
    registro: '000003',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    // TODO: informar em qual exposição o animal foi premiado
    destaque: 'Premiado em pista',
    foto: img('tordilho-campeao.jpg', 'Cavalo tordilho premiado com faixa de campeão Mangalarga Marchador'),
  },
  {
    id: 'rz-pedra',
    nome: 'RZ Pedra',
    sexo: 'Potro',
    pelagem: 'Tordilha',
    nascimento: '2022',
    registro: '000004',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    foto: img('tordilho-jovem.jpg', 'Potro tordilho ao lado do paredão de pedra'),
  },
  {
    id: 'rz-ouro',
    nome: 'RZ Ouro',
    sexo: 'Garanhão',
    pelagem: 'Baia',
    nascimento: '2019',
    registro: '000005',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    foto: img('baio-perfil.jpg', 'Cavalo baio de perfil com crina escura no gramado do rancho'),
  },
  {
    id: 'rz-aurora',
    nome: 'RZ Aurora',
    sexo: 'Égua',
    pelagem: 'Pampa castanha',
    nascimento: '2020',
    registro: '000006',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    destaque: 'Matriz',
    foto: img('rosilha-pampa.jpg', 'Égua pampa castanha no piquete de areia'),
  },
  {
    id: 'rz-fogo',
    nome: 'RZ Fogo',
    sexo: 'Garanhão',
    pelagem: 'Alazã pampa',
    nascimento: '2018',
    registro: '000007',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    foto: img('alazao-pampa.jpg', 'Cavalo alazão pampa em pé na grama diante do paredão'),
  },
  {
    id: 'rz-jandaia',
    nome: 'RZ Jandaia',
    sexo: 'Égua',
    pelagem: 'Pampa baia',
    nascimento: '2021',
    registro: '000008',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    destaque: 'Matriz',
    foto: img('baia-pampa.jpg', 'Égua pampa baia de cabresto verde no pasto'),
  },
  {
    id: 'rz-noite',
    nome: 'RZ Noite',
    sexo: 'Garanhão',
    pelagem: 'Pampa preta',
    nascimento: '2020',
    registro: '000009',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    foto: img('pampa-preta-gramado.jpg', 'Cavalo pampa preta em pé no gramado com as baias ao fundo'),
  },
  {
    id: 'rz-estrela',
    nome: 'RZ Estrela',
    sexo: 'Égua',
    pelagem: 'Pampa preta',
    nascimento: '2021',
    registro: '000010',
    genealogia: { pai: 'TODO', mae: 'TODO' },
    foto: img('pampa-preta-baias.jpg', 'Égua pampa preta em frente à fileira de baias do rancho'),
  },
];

export const plantel = {
  id: 'plantel',
  eyebrow: 'Plantel',
  title: 'Os animais da casa',
  lead: 'Cada ficha traz pelagem, ano de nascimento, registro na ABCCMM e genealogia. Quer o vídeo da marcha de algum deles? É só chamar no WhatsApp.',
  ctaMessage: (nome: string) =>
    `Olá! Vi o ${nome} no site do Rancho Zimbrão e gostaria de mais informações.`,
} as const;
