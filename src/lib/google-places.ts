/**
 * SINCRONIZAÇÃO AUTOMÁTICA DAS AVALIAÇÕES (desativada de propósito)
 * ------------------------------------------------------------------
 * Hoje as avaliações vêm de `src/content/reviews.ts`, arquivo estático.
 * Isso mantém o site 100% estático, sem chamada de API em runtime e sem
 * chave exposta.
 *
 * Se um dia quiser puxar direto do Google, este arquivo já tem o caminho.
 * O que muda:
 *
 *   1. criar `GOOGLE_PLACES_API_KEY` e `GOOGLE_PLACE_ID` no ambiente da Vercel;
 *   2. descomentar o bloco abaixo;
 *   3. no componente da seção, trocar o import estático por
 *      `await fetchGoogleReviews()` e marcar a página com
 *      `export const revalidate = 86400` (ISR de 24h, ainda sem chamada
 *      por request);
 *   4. lembrar que a Places API (New) devolve no MÁXIMO 5 avaliações e NÃO
 *      entrega as fotos enviadas pelos clientes junto do review. As fotos
 *      continuam sendo baixadas na mão para `public/reviews/`.
 *
 * Custo: cada requisição do campo `places.reviews` cai no SKU Places Details
 * (Enterprise). Com ISR de 24h dá ~30 chamadas por mês.
 */

// import type { Review } from '@/content/reviews';
//
// const ENDPOINT = 'https://places.googleapis.com/v1/places';
//
// type PlacesReview = {
//   name: string;
//   rating: number;
//   text?: { text: string };
//   originalText?: { text: string };
//   publishTime: string;
//   authorAttribution?: { displayName: string; photoUri?: string };
// };
//
// type PlacesResponse = {
//   rating?: number;
//   userRatingCount?: number;
//   reviews?: PlacesReview[];
// };
//
// export async function fetchGoogleReviews(): Promise<{
//   reviews: Review[];
//   ratingValue: number;
//   reviewCount: number;
// }> {
//   const key = process.env.GOOGLE_PLACES_API_KEY;
//   const placeId = process.env.GOOGLE_PLACE_ID;
//   if (!key || !placeId) throw new Error('Faltam GOOGLE_PLACES_API_KEY e GOOGLE_PLACE_ID');
//
//   const response = await fetch(`${ENDPOINT}/${placeId}?languageCode=pt-BR`, {
//     headers: {
//       'X-Goog-Api-Key': key,
//       'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
//     },
//     // ISR: revalida uma vez por dia, nunca por request
//     next: { revalidate: 86400 },
//   });
//
//   if (!response.ok) throw new Error(`Places API respondeu ${response.status}`);
//
//   const data = (await response.json()) as PlacesResponse;
//
//   return {
//     ratingValue: data.rating ?? 0,
//     reviewCount: data.userRatingCount ?? 0,
//     reviews: (data.reviews ?? []).map((review, index) => ({
//       id: review.name ?? `google-${index}`,
//       author: review.authorAttribution?.displayName ?? 'Cliente do Google',
//       avatar: review.authorAttribution?.photoUri,
//       rating: Math.round(review.rating) as Review['rating'],
//       date: review.publishTime.slice(0, 10),
//       text: review.originalText?.text ?? review.text?.text ?? '',
//       // A API não devolve as fotos do review: continuam vindo de public/reviews/
//       photos: [],
//     })),
//   };
// }

export {};
