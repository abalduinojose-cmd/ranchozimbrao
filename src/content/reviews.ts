/**
 * AVALIAÇÕES DO GOOGLE
 *
 * Dados reais do perfil do Rancho Zimbrão no Google Maps, coletados em
 * 31/07/2026. Nota 5,0 com 10 avaliações, todas de cinco estrelas.
 *
 * As fotos de perfil e a foto anexada por um dos clientes foram baixadas
 * para `public/reviews/` por `node scripts/fetch-review-assets.mjs`, porque
 * o link do googleusercontent expira.
 *
 * Sobre as datas: o Google só publica a data relativa ("há 3 anos"). O campo
 * `dateLabel` guarda exatamente o que o perfil mostra e é o que aparece na
 * tela. O campo `date` é uma aproximação em ISO, usada apenas pelo JSON-LD,
 * que exige uma data.
 *
 * Para atualizar quando entrarem avaliações novas:
 *  1. abra o perfil, copie autor, nota, data relativa e texto;
 *  2. acrescente a foto de perfil em `scripts/fetch-review-assets.mjs` e rode;
 *  3. inclua a avaliação aqui e ajuste `aggregate`.
 */

import { asset } from '@/lib/asset';

export type ReviewPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Review = {
  id: string;
  author: string;
  /** foto de perfil de quem avaliou, recorte quadrado em public/reviews/avatars/ */
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO aproximado, só para o JSON-LD */
  date: string;
  /** o que o Google mostra no perfil */
  dateLabel: string;
  /** vazio quando a pessoa deu só a nota, sem escrever */
  text: string;
  photos: ReviewPhoto[];
};

export const aggregate = {
  ratingValue: 5.0,
  reviewCount: 10,
  bestRating: 5,
} as const;

const raw: Review[] = [
  {
    id: 'jeronimo-jaconi',
    author: 'Jeronimo Jaconi',
    avatar: '/reviews/avatars/jeronimo-jaconi.jpg',
    rating: 5,
    date: '2023-07-01',
    dateLabel: 'há 3 anos',
    text: 'Local agradabilíssimo bom para quem deseja cavalgar e relaxar ao ar livre junto da natureza, você precisa conhecer e interagir com a natureza neste local muito especial. Não perca a oportunidade de passar um final de semana agradável.',
    photos: [],
  },
  {
    id: 'marcelo-freitas',
    author: 'Marcelo Freitas De Souza',
    avatar: '/reviews/avatars/marcelo-freitas.jpg',
    rating: 5,
    date: '2022-07-01',
    dateLabel: 'há 4 anos',
    text: 'Tranquilidade.',
    photos: [
      {
        src: '/reviews/marcelo-freitas-1.jpg',
        alt: 'Foto do Rancho Zimbrão enviada por Marcelo Freitas De Souza no Google',
        width: 1200,
        height: 900,
      },
    ],
  },
  {
    id: 'tanara-torres',
    author: 'Tanara Torres',
    avatar: '/reviews/avatars/tanara-torres.jpg',
    rating: 5,
    date: '2022-07-01',
    dateLabel: 'há 4 anos',
    text: 'Como entro em contato?',
    photos: [],
  },
  {
    id: 'junior-costa',
    author: 'Junior Costa',
    avatar: '/reviews/avatars/junior-costa.jpg',
    rating: 5,
    date: '2024-07-01',
    dateLabel: 'há 2 anos',
    text: '',
    photos: [],
  },
  {
    id: 'vinicius-rinaldi',
    author: 'Vinicius Rinaldi Vieira',
    avatar: '/reviews/avatars/vinicius-rinaldi.jpg',
    rating: 5,
    date: '2024-07-01',
    dateLabel: 'há 2 anos',
    text: '',
    photos: [],
  },
  {
    id: 'lorran-silveira',
    author: 'Lorran Silveira Silva',
    avatar: '/reviews/avatars/lorran-silveira.jpg',
    rating: 5,
    date: '2024-07-01',
    dateLabel: 'há 2 anos',
    text: '',
    photos: [],
  },
  {
    id: 'priscila-zimbrao',
    author: 'Priscila Zimbrao',
    avatar: '/reviews/avatars/priscila-zimbrao.jpg',
    rating: 5,
    date: '2023-07-01',
    dateLabel: 'há 3 anos',
    text: '',
    photos: [],
  },
  {
    id: 'cristiana-tornaghi',
    author: 'Cristiana Tornaghi',
    avatar: '/reviews/avatars/cristiana-tornaghi.jpg',
    rating: 5,
    date: '2023-07-01',
    dateLabel: 'há 3 anos',
    text: '',
    photos: [],
  },
  {
    id: 'luiza-navarro',
    author: 'Luiza Maria Navarro Lima',
    avatar: '/reviews/avatars/luiza-navarro.jpg',
    rating: 5,
    date: '2023-07-01',
    dateLabel: 'há 3 anos',
    text: '',
    photos: [],
  },
  {
    id: 'sonia-zimbrao',
    author: 'Sonia Zimbrao',
    avatar: '/reviews/avatars/sonia-zimbrao.jpg',
    rating: 5,
    date: '2022-07-01',
    dateLabel: 'há 4 anos',
    text: '',
    photos: [],
  },
];

/**
 * Os caminhos passam pelo `asset()` para funcionarem também na prévia do
 * GitHub Pages, que serve o site numa subpasta.
 */
export const reviews: Review[] = raw.map((review) => ({
  ...review,
  ...(review.avatar ? { avatar: asset(review.avatar) } : {}),
  photos: review.photos.map((photo) => ({ ...photo, src: asset(photo.src) })),
}));

/** Avaliações que trazem texto: são elas que viram card no carrossel. */
export const reviewsComTexto = reviews.filter((review) => review.text.length > 0);

/** Quem avaliou só com a nota: aparece na fileira de fotos de perfil. */
export const reviewsSemTexto = reviews.filter((review) => review.text.length === 0);

export const avaliacoes = {
  id: 'avaliacoes',
  eyebrow: 'Avaliações do Google',
  title: 'Quem passou pela porteira',
  ctaLabel: 'Ver todas no Google',
  wallLabel: 'avaliaram com cinco estrelas sem deixar comentário',
} as const;
