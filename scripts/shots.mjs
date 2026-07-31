/**
 * Screenshots de verificação (uso interno de desenvolvimento).
 *
 *   node scripts/shots.mjs [url] [preset]
 *
 * Usa o Chrome já instalado na máquina, sem baixar browser.
 * Salva em scripts/shots/.
 */

import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'scripts', 'shots');
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const url = process.argv[2] ?? 'http://localhost:5204';
const preset = process.argv[3] ?? 'desktop';

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};

const SHOTS = [
  { name: 'hero', y: 0 },
  { name: 'sobre', selector: '#sobre' },
  { name: 'raca', selector: '#raca' },
  { name: 'plantel', selector: '#plantel' },
  { name: 'experiencias', selector: '#experiencias' },
  { name: 'avaliacoes', selector: '#avaliacoes' },
  { name: 'galeria', selector: '#galeria' },
  { name: 'contato', selector: '#contato' },
  { name: 'retrato', selector: '#retrato-titulo' },
  { name: 'footer', selector: 'footer' },
];

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'shell',
  args: ['--hide-scrollbars', '--force-device-scale-factor=1'],
});

const page = await browser.newPage();
await page.setViewport(VIEWPORTS[preset] ?? VIEWPORTS.desktop);
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

// Percorre a página inteira para disparar os reveals e o lazy loading.
await page.evaluate(async () => {
  const step = window.innerHeight * 0.6;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 90));
  }
  window.scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 600));
});

for (const shot of SHOTS) {
  if (shot.selector) {
    await page.evaluate((selector) => {
      document.querySelector(selector)?.scrollIntoView({ block: 'start' });
    }, shot.selector);
  } else {
    await page.evaluate((y) => window.scrollTo(0, y), shot.y ?? 0);
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
  const file = path.join(outDir, `${preset}-${shot.name}.png`);
  await page.screenshot({ path: file });
  console.log(file);
}

await browser.close();
