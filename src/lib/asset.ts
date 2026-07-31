/**
 * Prefixo de caminho para os arquivos servidos de `public/`.
 *
 * Na Vercel (e em `next dev`) é vazio e tudo fica na raiz. Na prévia do
 * GitHub Pages o site mora em `/ranchozimbrao`, então `NEXT_PUBLIC_BASE_PATH`
 * carrega esse prefixo.
 *
 * O `next/image` já resolve o basePath sozinho. Este helper existe para o que
 * ele não cobre: `src` de <video> e URLs dentro do CSS.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  return `${basePath}${path}`;
}
