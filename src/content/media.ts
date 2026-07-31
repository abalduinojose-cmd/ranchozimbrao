import manifest from './media-manifest.json';
import { asset } from '@/lib/asset';

/**
 * Fonte única de verdade das dimensões de mídia.
 * O arquivo `media-manifest.json` é gerado por `node scripts/prepare-media.mjs`
 * a partir dos arquivos originais em `img/` e `videos instagram/`.
 * Ter width/height reais aqui é o que garante CLS zero.
 */

export type MediaImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type MediaVideo = {
  mp4: string;
  poster: MediaImage;
  width: number;
  height: number;
};

type RawImage = { src: string; width: number; height: number };

const images = manifest.images as Record<string, RawImage | undefined>;
const videos = manifest.videos as Record<
  string,
  { mp4: string; poster: RawImage; width: number; height: number } | undefined
>;

/**
 * Logotipo, quando existir arquivo em `public/logo/`.
 * Enquanto for `null` o cabeçalho e o rodapé usam o lettering tipográfico.
 * Aceita: rancho-zimbrao.svg, rancho-zimbrao.png, logo.svg, logo.png.
 */
const rawLogo = (manifest as { logo?: RawImage | null }).logo ?? null;
export const logo: RawImage | null = rawLogo ? { ...rawLogo, src: asset(rawLogo.src) } : null;

/** Recupera uma foto do manifesto já com o texto alternativo. */
export function img(file: string, alt: string): MediaImage {
  const found = images[file];
  if (!found) {
    throw new Error(
      `Imagem "${file}" não está no media-manifest.json. Rode: node scripts/prepare-media.mjs`,
    );
  }
  return { ...found, src: asset(found.src), alt };
}

/** Recupera um reel do manifesto já com o texto alternativo do poster. */
export function video(name: string, posterAlt: string): MediaVideo {
  const found = videos[name];
  if (!found) {
    throw new Error(
      `Vídeo "${name}" não está no media-manifest.json. Rode: node scripts/prepare-media.mjs`,
    );
  }
  return {
    mp4: asset(found.mp4),
    poster: { ...found.poster, src: asset(found.poster.src), alt: posterAlt },
    width: found.width,
    height: found.height,
  };
}
