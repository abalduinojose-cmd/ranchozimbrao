import { img, type MediaImage } from './media';

/**
 * GALERIA
 * Trilho horizontal com scroll-snap nativo. A ordem aqui é a ordem na tela.
 * Para adicionar uma foto: rode `node scripts/prepare-media.mjs` e inclua o
 * arquivo na lista abaixo com uma legenda e um alt descritivo.
 */

export type FotoGaleria = MediaImage & { legenda: string };

function foto(file: string, alt: string, legenda: string): FotoGaleria {
  return { ...img(file, alt), legenda };
}

export const galeria = {
  id: 'galeria',
  eyebrow: 'Galeria',
  title: 'O rancho por dentro',
  lead: 'Arraste para o lado. Clique em qualquer foto para ampliar.',
  fotos: [
    foto(
      'baias-noite.jpg',
      'Três cavalos amarrados em frente às baias iluminadas ao anoitecer',
      'Fim de tarde nas baias',
    ),
    foto(
      'pampa-preta-conformacao.jpg',
      'Garanhão pampa preta em pé no piquete, foto de conformação',
      'Conformação, pampa preta',
    ),
    foto(
      'cavalgada-movimento.jpg',
      'Cavaleiro marchando dentro do redondel, foto em movimento',
      'Marcha no redondel',
    ),
    foto(
      'prova-de-marcha.jpg',
      'Cavalo e cavaleiro em prova de marcha diante do público',
      'Dia de prova',
    ),
    foto(
      'castanho-marcha.jpg',
      'Cavalo castanho escuro de crina trançada levantando o membro anterior',
      'Crina trançada',
    ),
    foto(
      'sela-crioula.jpg',
      'Cavalo pampa preta selado com arreio de couro à sombra das árvores',
      'Arreio pronto',
    ),
    foto(
      'tordilho-campeao.jpg',
      'Cavalo tordilho premiado com faixa de campeão Mangalarga Marchador',
      'Faixa de campeão',
    ),
    foto(
      'cavaleiro-rancho.jpg',
      'Cavaleiro montado em cavalo do rancho durante encontro de cavaleiros',
      'Encontro de cavaleiros',
    ),
    foto(
      'alazao-pampa.jpg',
      'Cavalo alazão pampa em pé na grama diante do paredão de pedra',
      'Alazã pampa',
    ),
    foto(
      'pampa-preta-baias.jpg',
      'Égua pampa preta em frente à fileira de baias do rancho',
      'Rotina das baias',
    ),
    foto(
      'baia-pampa.jpg',
      'Égua pampa baia de cabresto verde no pasto',
      'Pampa baia',
    ),
    foto(
      'rosilha-pampa.jpg',
      'Égua pampa castanha no piquete de areia sob o paredão',
      'No piquete',
    ),
  ],
} as const;
