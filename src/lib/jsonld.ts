import { site } from '@/content/site';
import { aggregate, reviews } from '@/content/reviews';
import { animais } from '@/content/animais';

/**
 * As avaliações vêm do perfil real do Google (ver src/content/reviews.ts).
 * Se um dia o arquivo voltar a ficar vazio, o bloco de review sai do
 * JSON-LD sozinho em vez de publicar dado inventado.
 */
export const hasRealReviews = reviews.length > 0;

const DAY_MAP: Record<string, string> = {
  Monday: 'https://schema.org/Monday',
  Tuesday: 'https://schema.org/Tuesday',
  Wednesday: 'https://schema.org/Wednesday',
  Thursday: 'https://schema.org/Thursday',
  Friday: 'https://schema.org/Friday',
  Saturday: 'https://schema.org/Saturday',
  Sunday: 'https://schema.org/Sunday',
};

function absolute(path: string): string {
  return new URL(path, site.url).toString();
}

/**
 * LocalBusiness do rancho, com endereço, geo, horários, redes e (quando
 * houver dado real) nota agregada e avaliações individuais.
 */
export function buildLocalBusinessJsonLd() {
  const images = animais.slice(0, 6).map((animal) => absolute(animal.foto.src));

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    // Criatório de equinos não tem tipo próprio no schema.org; o additionalType
    // aponta para o conceito de haras na Wikidata.
    additionalType: 'https://www.wikidata.org/wiki/Q1249682',
    '@id': `${site.url}#rancho`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    image: images,
    telephone: `+${site.whatsapp.e164}`,
    priceRange: '$$',
    knowsAbout: [site.breed, 'Criação de equinos', 'Cavalgada', 'Marcha batida', 'Marcha picada'],
    address: {
      '@type': 'PostalAddress',
      ...(site.address.street ? { streetAddress: site.address.street } : {}),
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      ...(site.address.postalCode ? { postalCode: site.address.postalCode } : {}),
      addressCountry: site.address.country,
    },
    ...(site.geo.confirmed
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: site.geo.latitude,
            longitude: site.geo.longitude,
          },
        }
      : {}),
    openingHoursSpecification: site.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days.map((day) => DAY_MAP[day]).filter(Boolean),
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [site.social.instagram.url, site.social.facebook.url],
  };

  if (hasRealReviews) {
    data.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: aggregate.bestRating,
    };

    data.review = reviews.map((review) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: review.author },
      datePublished: review.date,
      ...(review.text ? { reviewBody: review.text } : {}),
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: aggregate.bestRating,
      },
      ...(review.photos.length > 0
        ? { image: review.photos.map((photo) => absolute(photo.src)) }
        : {}),
    }));
  }

  return data;
}

/** WebSite, para o Google entender o nome do site nos resultados. */
export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}#site`,
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    publisher: { '@id': `${site.url}#rancho` },
  };
}
