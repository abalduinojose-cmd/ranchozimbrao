/**
 * Prepara a mídia enviada pelo cliente para o formato que o site consome.
 *
 *   node scripts/prepare-media.mjs
 *
 * - copia e renomeia as fotos de `img/` para `public/img/` com nomes semânticos
 * - mede cada imagem e grava `src/content/media-manifest.json` (width/height),
 *   que alimenta os componentes e elimina layout shift
 * - corta e transcodifica os reels do Instagram para mp4 (h264) + webm (vp9)
 *   leves, mantendo o 9:16 nativo, e extrai o poster de cada um
 *
 * O script é idempotente: rodar de novo só refaz o que estiver faltando.
 * Para reprocessar, apague `public/videos` e `public/img`.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcImg = path.join(root, 'img');
const srcVideo = path.join(root, 'videos instagram');
/** Vídeos enviados fora do Instagram (gravação original, resolução cheia). */
const srcVideoExtra = path.join(root, 'videos');
const outImg = path.join(root, 'public', 'img');
const outVideo = path.join(root, 'public', 'videos');

/** origem (nome do Instagram) → destino semântico */
const IMAGES = {
  'ranchozimbrao_1688309828_3138092741916827754_54062778517.jpg': 'pampa-preta-conformacao.jpg',
  'ranchozimbrao_1689766775_3150314503913180498_54062778517.jpg': 'sela-crioula.jpg',
  'ranchozimbrao_1720619390_3409124997652856820_54062778517.jpg': 'castanho-marcha.jpg',
  'ranchozimbrao_1722521898_3425084392555559101_54062778517.jpg': 'tordilho-jovem.jpg',
  'ranchozimbrao_1723213249_3430883864455864499_54062778517.jpg': 'baio-perfil.jpg',
  'ranchozimbrao_1725281690_3448235202563046464_54062778517.jpg': 'rosilha-pampa.jpg',
  'ranchozimbrao_1729707964_3485365478011608670_54062778517.jpg': 'alazao-pampa.jpg',
  'ranchozimbrao_1739389191_3566577502555290717_54062778517.jpg': 'cavaleiro-rancho.jpg',
  'ranchozimbrao_1739633616_3568627881737374180_54062778517.jpg': 'baia-pampa.jpg',
  'ranchozimbrao_1744299964_3607772051823145984_54062778517.jpg': 'cavalgada-movimento.jpg',
  'ranchozimbrao_1757972878_3722468761061910853_54062778517.jpg': 'prova-de-marcha.jpg',
  'ranchozimbrao_1770479253_3827373510516056154_54062778517.jpg': 'pampa-preta-gramado.jpg',
  'ranchozimbrao_1770479253_3827373515456935190_54062778517.jpg': 'pampa-preta-baias.jpg',
  'ranchozimbrao_1770927403_3831128259098899037_54062778517.jpg': 'tordilho-campeao.jpg',
  'ranchozimbrao_1784457915_3944639711321170749_54062778517.jpg': 'baias-noite.jpg',
};

/**
 * Reels verticais (720x1280 nativo). Mantemos o 9:16 e cortamos o trecho
 * mais forte de cada um: painel de vídeo pesa pouco e nunca é o LCP.
 */
const VIDEOS = [
  {
    // Gravação original do rancho, 1080x1920: é o fundo do hero.
    source: 'IMG_3307.MOV',
    dir: srcVideoExtra,
    name: 'hero',
    start: '00:00:00',
    duration: '10',
    posterAt: '00:00:04',
    width: 1080,
  },
  {
    source: 'ranchozimbrao_1680621509_3073596792750039949_54062778517.mp4',
    name: 'redondel',
    start: '00:00:00',
    duration: '12',
    posterAt: '00:00:03',
  },
  {
    source: 'ranchozimbrao_1670765625_2990919300089189674_54062778517.mp4',
    name: 'cavalgada',
    start: '00:00:01',
    duration: '12',
    posterAt: '00:00:02',
  },
  {
    source: 'ranchozimbrao_1783858422_3939612136731522546_54062778517.mp4',
    name: 'pasto',
    start: '00:00:02',
    duration: '12',
    posterAt: '00:00:01',
  },
];

/** Nomes aceitos para o logotipo, em ordem de preferência. */
const LOGO_CANDIDATES = [
  'rancho-zimbrao.svg',
  'rancho-zimbrao.png',
  'logo.svg',
  'logo.png',
  'logo.jpg',
];

/** Fotos usadas como exemplo na seção de avaliações do Google. */
const REVIEW_SAMPLES = [
  'cavalgada-movimento.jpg',
  'baias-noite.jpg',
  'cavaleiro-rancho.jpg',
  'prova-de-marcha.jpg',
  'sela-crioula.jpg',
];

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function ffmpeg(args) {
  execFileSync(ffmpegPath, args, { stdio: ['ignore', 'ignore', 'ignore'] });
}

function mb(file) {
  return (statSync(file).size / 1024 / 1024).toFixed(2);
}

async function run() {
  ensureDir(outImg);
  ensureDir(outVideo);

  const manifest = { images: {}, videos: {}, reviewSamples: {}, logo: null };

  for (const [from, to] of Object.entries(IMAGES)) {
    const source = path.join(srcImg, from);
    const target = path.join(outImg, to);
    if (!existsSync(source)) {
      console.warn(`[skip] não encontrei ${from}`);
      continue;
    }
    if (!existsSync(target)) copyFileSync(source, target);
    const { width, height } = await sharp(target).metadata();
    manifest.images[to] = { src: `/img/${to}`, width, height };
    console.log(`[img]   ${to.padEnd(30)} ${width}x${height}`);
  }

  for (const clip of VIDEOS) {
    const source = path.join(clip.dir ?? srcVideo, clip.source);
    if (!existsSync(source)) {
      console.warn(`[skip] vídeo não encontrado: ${clip.source}`);
      continue;
    }

    const mp4 = path.join(outVideo, `${clip.name}.mp4`);
    const webm = path.join(outVideo, `${clip.name}.webm`);
    const poster = path.join(outImg, `${clip.name}-poster.jpg`);
    const trim = ['-ss', clip.start, '-t', clip.duration];
    const scale = clip.width ? ['-vf', `scale=${clip.width}:-2:flags=lanczos`] : [];

    if (!existsSync(mp4)) {
      ffmpeg([
        '-y', ...trim, '-i', source,
        '-an', ...scale,
        '-c:v', 'libx264', '-profile:v', 'high', '-preset', 'slow',
        '-crf', clip.width ? '32' : '30', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        mp4,
      ]);
    }

    // VP9 ficou mais pesado que o h264 nesta fonte (reels já recomprimidos),
    // então servimos só mp4. Mantido aqui caso a fonte melhore no futuro.
    if (process.env.WITH_WEBM && !existsSync(webm)) {
      ffmpeg([
        '-y', ...trim, '-i', source,
        '-an',
        '-c:v', 'libvpx-vp9', '-crf', '38', '-b:v', '0',
        '-row-mt', '1', '-deadline', 'good', '-cpu-used', '3',
        webm,
      ]);
    }

    if (!existsSync(poster)) {
      ffmpeg(['-y', '-ss', clip.posterAt, '-i', mp4, '-frames:v', '1', '-q:v', '4', poster]);
    }

    const meta = await sharp(poster).metadata();
    manifest.videos[clip.name] = {
      mp4: `/videos/${clip.name}.mp4`,
      poster: { src: `/img/${clip.name}-poster.jpg`, width: meta.width, height: meta.height },
      width: meta.width,
      height: meta.height,
    };
    console.log(`[video] ${clip.name.padEnd(30)} ${meta.width}x${meta.height}  mp4 ${mb(mp4)}MB`);
  }

  // Logotipo: se o arquivo estiver em public/logo/, medimos e registramos.
  // O cabeçalho cai para o lettering tipográfico enquanto não existir.
  const logoDir = path.join(root, 'public', 'logo');
  ensureDir(logoDir);
  const logoFile = LOGO_CANDIDATES.find((file) => existsSync(path.join(logoDir, file)));
  if (logoFile) {
    const { width, height } = await sharp(path.join(logoDir, logoFile)).metadata();
    manifest.logo = { src: `/logo/${logoFile}`, width, height };
    console.log(`[logo]  ${logoFile.padEnd(30)} ${width}x${height}`);
  } else {
    manifest.logo = null;
    console.log('[logo]  nenhum arquivo em public/logo/, usando o lettering');
  }

  // Textura de papel: PNG minúsculo em vez de filtro SVG. O feTurbulence
  // precisa ser rasterizado a cada paint e ficava caro nas seções longas.
  const grain = path.join(outImg, 'grain.png');
  if (!existsSync(grain)) {
    const size = 128;
    const pixels = Buffer.alloc(size * size);
    for (let i = 0; i < pixels.length; i += 1) pixels[i] = Math.floor(Math.random() * 256);
    await sharp(pixels, { raw: { width: size, height: size, channels: 1 } })
      .png({ compressionLevel: 9, palette: true })
      .toFile(grain);
    console.log(`[grain] grain.png ${size}x${size}`);
  }

  // Miniaturas de exemplo para a seção de avaliações do Google.
  // Substitua por fotos reais enviadas pelos clientes no perfil.
  const outReviews = path.join(root, 'public', 'reviews');
  ensureDir(outReviews);
  for (const [index, file] of REVIEW_SAMPLES.entries()) {
    const source = path.join(outImg, file);
    const target = path.join(outReviews, `exemplo-${index + 1}.jpg`);
    if (!existsSync(source)) continue;
    if (!existsSync(target)) {
      await sharp(source).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 78 }).toFile(target);
    }
    const { width, height } = await sharp(target).metadata();
    manifest.reviewSamples[`exemplo-${index + 1}.jpg`] = {
      src: `/reviews/exemplo-${index + 1}.jpg`,
      width,
      height,
    };
    console.log(`[review] exemplo-${index + 1}.jpg`.padEnd(38) + `${width}x${height}`);
  }

  const manifestPath = path.join(root, 'src', 'content', 'media-manifest.json');
  ensureDir(path.dirname(manifestPath));
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`\nmanifest → ${path.relative(root, manifestPath)}`);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
