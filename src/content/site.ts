/**
 * Conteúdo institucional do Rancho Zimbrão.
 * Nenhum texto, telefone ou link vive dentro de JSX: tudo sai daqui.
 *
 * Itens marcados com TODO precisam ser confirmados com o cliente antes
 * de publicar (afetam o JSON-LD e o Google Meu Negócio).
 */

const WHATSAPP_E164 = '5524988440021';

export const site = {
  name: 'Rancho Zimbrão',
  // TODO: confirmar razão social para o rodapé e o JSON-LD
  legalName: 'Rancho Zimbrão',
  shortName: 'Zimbrão',
  breed: 'Mangalarga Marchador',

  // TODO: trocar pelo domínio definitivo antes do deploy
  url: 'https://ranchozimbrao.com.br',
  locale: 'pt-BR',

  tagline: 'Raça em movimento, futuro em construção',
  /** quebra usada no reveal por linha do hero */
  taglineLines: ['Raça em movimento,', 'futuro em construção'],
  subline: 'A natureza é o nosso verdadeiro lar, onde encontramos paz e conexão',
  description:
    'Criatório de cavalos Mangalarga Marchador e experiência de vida no campo. Plantel selecionado, marcha de verdade e um lugar para respirar.',

  whatsapp: {
    display: '(24) 98844-0021',
    e164: WHATSAPP_E164,
    defaultMessage: 'Olá! Vim pelo site do Rancho Zimbrão e gostaria de saber mais.',
  },

  social: {
    instagram: {
      label: '@ranchozimbrao',
      url: 'https://www.instagram.com/ranchozimbrao/',
    },
    facebook: {
      label: 'Rancho Zimbrão',
      url: 'https://www.facebook.com/profile.php?id=61551107016147',
    },
  },

  /** Perfil no Google Maps (CID do lugar, link estável). */
  google: {
    profileUrl: 'https://maps.google.com/?cid=6817058604477303943',
    reviewsUrl: 'https://maps.google.com/?cid=6817058604477303943',
    cid: '6817058604477303943',
  },

  /**
   * Endereço do perfil no Google. O Google lista sem rua e número,
   * só bairro e CEP. TODO: confirmar logradouro com o cliente.
   */
  address: {
    street: '',
    neighborhood: 'Posse',
    city: 'Petrópolis',
    state: 'RJ',
    postalCode: '25770-460',
    country: 'BR',
    display: 'Posse, Petrópolis, RJ',
    displayFull: 'Posse, Petrópolis - RJ, 25770-460',
  },

  /** Coordenadas conferidas no perfil do Google Maps. */
  geo: {
    confirmed: true,
    latitude: -22.2419023,
    longitude: -43.0671679,
  },

  /** TODO: confirmar horários de visitação */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
    { days: ['Saturday', 'Sunday'], opens: '08:00', closes: '16:00' },
  ],

  openingHoursDisplay: [
    { label: 'Segunda a sexta', value: '08h às 17h' },
    { label: 'Sábado e domingo', value: '08h às 16h' },
    { label: 'Visitas', value: 'Sempre com agendamento' },
  ],

  /** Vocabulário da casa, usado no letreiro contínuo */
  marquee: [
    'Mangalarga Marchador',
    'Marcha batida',
    'Marcha picada',
    'Registro ABCCMM',
    'Doma racional',
    'Posse, Petrópolis',
  ],

  nav: [
    { id: 'sobre', label: 'O rancho' },
    { id: 'raca', label: 'A raça' },
    { id: 'plantel', label: 'Plantel' },
    { id: 'experiencias', label: 'Experiências' },
    { id: 'avaliacoes', label: 'Avaliações' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'contato', label: 'Contato' },
  ],
} as const;

/** Monta o link do WhatsApp já com a mensagem codificada. */
export function whatsappUrl(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(message)}`;
}

/** Endereço em uma linha, pulando os campos ainda não preenchidos. */
export function addressLine(): string {
  const { street, neighborhood, city, state, postalCode } = site.address;
  const local = [street, neighborhood].filter(Boolean).join(', ');
  return [local, `${city} - ${state}`, postalCode].filter(Boolean).join(', ');
}
