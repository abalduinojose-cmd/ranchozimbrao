import { img, video, type MediaImage, type MediaVideo } from './media';

/**
 * EXPERIÊNCIAS NO RANCHO
 * TODO: confirmar quais experiências são realmente oferecidas, se há valor
 * fechado, duração e número mínimo de pessoas. O layout aceita de 3 a 5 itens.
 */

export type Experiencia = {
  id: string;
  numero: string;
  nome: string;
  resumo: string;
  detalhes: string[];
  media: MediaImage | MediaVideo;
  ctaMessage: string;
};

function isVideo(media: MediaImage | MediaVideo): media is MediaVideo {
  return 'mp4' in media;
}

export const experiencias = {
  id: 'experiencias',
  eyebrow: 'Experiências',
  title: 'O campo não se explica, se atravessa',
  lead: 'Programas para quem monta há anos e para quem nunca subiu em um cavalo. Tudo com agendamento, no ritmo de quem chega.',
  items: [
    {
      id: 'cavalgada',
      numero: '01',
      nome: 'Cavalgada guiada',
      resumo: 'Trilhas pelas estradas de terra da região, sempre acompanhado por um condutor do rancho.',
      detalhes: ['Cavalos mansos e selados', 'Percursos curtos ou de meio período', 'A partir de 12 anos'],
      media: video('cavalgada', 'Cavaleiros em fila durante uma cavalgada pela estrada de terra'),
      ctaMessage: 'Olá! Gostaria de agendar uma cavalgada no Rancho Zimbrão.',
    },
    {
      id: 'batismo',
      numero: '02',
      nome: 'Primeira sela',
      resumo: 'A aula de batismo para quem nunca montou. Contato no chão, postura, rédea e os primeiros passos na marcha.',
      detalhes: ['Individual ou em dupla', 'Cavalo escolhido pelo temperamento', 'Crianças acompanhadas'],
      media: img('sela-crioula.jpg', 'Cavalo pampa preta selado com arreio de couro à sombra das árvores'),
      ctaMessage: 'Olá! Gostaria de saber sobre a aula de primeira sela no Rancho Zimbrão.',
    },
    {
      id: 'day-use',
      numero: '03',
      nome: 'Day use no rancho',
      resumo: 'O dia inteiro no campo, entre o pasto, a sombra e o paredão de pedra. Para famílias e grupos pequenos.',
      detalhes: ['Área de descanso e churrasqueira', 'Visita às baias', 'Agendamento com antecedência'],
      media: video('pasto', 'Cavalo solto no pasto do rancho com o paredão de pedra ao fundo'),
      ctaMessage: 'Olá! Gostaria de informações sobre o day use no Rancho Zimbrão.',
    },
    {
      id: 'plantel-visita',
      numero: '04',
      nome: 'Visita ao plantel',
      resumo: 'Para quem veio comprar. Apresentação dos animais disponíveis, demonstração de marcha e conversa sem pressa.',
      detalhes: ['Genealogia e registro em mãos', 'Demonstração no redondel', 'Vídeo enviado antes da visita'],
      media: img('cavaleiro-rancho.jpg', 'Cavaleiro montado em cavalo do Rancho Zimbrão durante encontro'),
      ctaMessage: 'Olá! Gostaria de agendar uma visita ao plantel do Rancho Zimbrão.',
    },
  ] satisfies Experiencia[],
} as const;

export { isVideo };
