/**
 * Gera a prévia estática para o GitHub Pages.
 *
 *   npm run build:pages
 *
 * O Pages serve o site numa subpasta (/ranchozimbrao), então a build roda com
 * `NEXT_PUBLIC_BASE_PATH` e sai em `docs/`, que é a pasta que o Pages lê.
 * A pasta `dist`/`out` não serve: o Pages só aceita a raiz ou `docs/`.
 *
 * O `.nojekyll` é obrigatório, senão o Jekyll do Pages ignora tudo que começa
 * com underline, incluindo a pasta `_next` inteira.
 */

import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'out');
const docs = path.join(root, 'docs');

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/ranchozimbrao';

console.log(`build estático com basePath "${BASE_PATH}"`);

rmSync(out, { recursive: true, force: true });
rmSync(docs, { recursive: true, force: true });

execFileSync('npx', ['next', 'build'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: BASE_PATH },
});

if (!existsSync(out)) throw new Error('a build não gerou a pasta out/');

cpSync(out, docs, { recursive: true });
writeFileSync(path.join(docs, '.nojekyll'), '');

console.log('\nprévia pronta em docs/');
console.log('No GitHub: Settings › Pages › Source "Deploy from a branch" › main /docs');
