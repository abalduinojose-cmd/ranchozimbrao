/**
 * Baixa as fotos de perfil de quem avaliou no Google e as fotos anexadas
 * às avaliações, para `public/reviews/`.
 *
 *   node scripts/fetch-review-assets.mjs
 *
 * Servimos os arquivos do nosso domínio em vez de apontar para o
 * googleusercontent: o link do Google expira, muda de formato e nos
 * obrigaria a liberar um host remoto no next/image.
 *
 * Se o perfil ganhar avaliações novas, acrescente a linha aqui, rode de novo
 * e atualize `src/content/reviews.ts`.
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outAvatars = path.join(root, 'public', 'reviews', 'avatars');
const outPhotos = path.join(root, 'public', 'reviews');

/** slug → URL da foto de perfil no Google */
const AVATARS = {
  'jeronimo-jaconi':
    'https://lh3.googleusercontent.com/a-/ALV-UjVrA8CUtjgCrZaclnljMbiOActLniN26bgUClgVsg5fMRy2uTEL=w160-h160-p-rp-mo-ba12-br100',
  'tanara-torres':
    'https://lh3.googleusercontent.com/a-/ALV-UjXORpI09s8tbhFDVlJYKjd7mXRiWxjg5rU5aNcPLG_ZXWKsPGo=w160-h160-p-rp-mo-br100',
  'marcelo-freitas':
    'https://lh3.googleusercontent.com/a-/ALV-UjUS_EZ9Y5HAv48BF6fK6bF5Ji80NrWvT-p1sSJ8QwNpEhpIMgs=w160-h160-p-rp-mo-br100',
  'junior-costa':
    'https://lh3.googleusercontent.com/a-/ALV-UjU3Wo4JpN4j70VQlX4ytzguf6UjsjzX6EDwUjOHyjrWI8xnQekbLw=w160-h160-p-rp-mo-br100',
  'vinicius-rinaldi':
    'https://lh3.googleusercontent.com/a/ACg8ocJ9kUyNxxFukxIq0T3fiT9zrYOBhVk3ld35kVzmwlouAOxDFQ=w160-h160-p-rp-mo-br100',
  'lorran-silveira':
    'https://lh3.googleusercontent.com/a-/ALV-UjVYk-gNq3YZQvjk0meJ-SKB0MNWoLceEzDRjcHSrTcx9qaOIA11-w=w160-h160-p-rp-mo-br100',
  'priscila-zimbrao':
    'https://lh3.googleusercontent.com/a/ACg8ocJ7fRPhQYsELDfgKn12wnTf8IVGigaLWSvCPAXlJWv_3KN_TA=w160-h160-p-rp-mo-br100',
  'cristiana-tornaghi':
    'https://lh3.googleusercontent.com/a-/ALV-UjXSIfeRqC9tP9MRQcQr4VwABCcZfLgBpj0gBLgS_xMIDtWL2D8VwA=w160-h160-p-rp-mo-br100',
  'luiza-navarro':
    'https://lh3.googleusercontent.com/a-/ALV-UjWWU4NxcU_8EB5RAJTHmdBhNPateF-VYBM0D_IuCiK_vRUx8Oyh=w160-h160-p-rp-mo-br100',
  'sonia-zimbrao':
    'https://lh3.googleusercontent.com/a/ACg8ocII3meyMREuykIn6Rua2NX7_NllUnEY0EjOmYrAsU6BzD23Vw=w160-h160-p-rp-mo-br100',
};

/** slug → URL da foto anexada à avaliação */
const PHOTOS = {
  'marcelo-freitas-1':
    'https://lh3.googleusercontent.com/grass-cs/ACvplmMTGWniTVNUI3xGU1PkH3_Gf6jC0ku0MK7rKoVCtlM4eiFgg1BQt8ED9IIqYlcg5DxaxtqPy999Nskaft-AbKiYik5L2CTkguqDtM36kUc6enPja6B5z2E8Tr01frlsgayXwztMaw=w1200-h900-p-k-no',
};

async function download(url, target, size) {
  if (existsSync(target)) return sharp(target).metadata();

  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120 Safari/537.36' },
  });
  if (!response.ok) throw new Error(`${response.status} em ${url}`);

  const buffer = Buffer.from(await response.arrayBuffer());
  const pipeline = sharp(buffer);
  if (size) pipeline.resize(size, size, { fit: 'cover' });
  await pipeline.jpeg({ quality: 82, mozjpeg: true }).toFile(target);
  return sharp(target).metadata();
}

mkdirSync(outAvatars, { recursive: true });
mkdirSync(outPhotos, { recursive: true });

for (const [slug, url] of Object.entries(AVATARS)) {
  const target = path.join(outAvatars, `${slug}.jpg`);
  const meta = await download(url, target, 160);
  console.log(`[avatar] ${slug.padEnd(22)} ${meta.width}x${meta.height}`);
}

for (const [slug, url] of Object.entries(PHOTOS)) {
  const target = path.join(outPhotos, `${slug}.jpg`);
  const meta = await download(url, target);
  console.log(`[foto]   ${slug.padEnd(22)} ${meta.width}x${meta.height}`);
}
