/**
 * Recorta o logotipo do arquivo original e grava em public/logo/.
 *
 *   node scripts/prepare-logo.mjs "caminho/do/logo.png"
 *
 * O arquivo que o cliente enviou é o desenho preto e branco sobre um fundo
 * chapado, com sombra. Aqui separamos as três faixas de luminância:
 *
 *   - quase preto  → corpo do desenho, opaco
 *   - quase branco → detalhes internos (crina, lettering), opaco
 *   - meio-tom     → fundo e sombra, transparente
 *
 * Depois o resultado é aparado nas bordas transparentes. Como o logo é
 * exibido com no máximo ~40px de altura, a redução esconde qualquer serrilha
 * da limiarização.
 */

import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'logo');
const target = path.join(outDir, 'rancho-zimbrao.png');

const source = process.argv[2];
if (!source || !existsSync(source)) {
  console.error('Informe o caminho do arquivo do logotipo.');
  process.exit(1);
}

// Limiares ajustáveis: a sombra do arquivo original fica entre eles.
const DARK = Number(process.env.LOGO_DARK ?? 40); // abaixo disso é o preto do desenho
const LIGHT = Number(process.env.LOGO_LIGHT ?? 205); // acima disso é o branco dos detalhes

const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;

  if (lum <= DARK) {
    out[i] = 0;
    out[i + 1] = 0;
    out[i + 2] = 0;
    out[i + 3] = 255;
  } else if (lum >= LIGHT) {
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
    out[i + 3] = 255;
  } else {
    out[i + 3] = 0;
  }
}

mkdirSync(outDir, { recursive: true });

await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 0 })
  .toFile(target);

const meta = await sharp(target).metadata();
console.log(`logo → public/logo/rancho-zimbrao.png  ${meta.width}x${meta.height}`);
console.log('Agora rode: node scripts/prepare-media.mjs');
