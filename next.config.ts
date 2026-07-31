import type { NextConfig } from 'next';

/**
 * O site roda em dois destinos:
 *
 * - Vercel (produção): saída padrão, imagens otimizadas pelo next/image.
 * - GitHub Pages (prévia para o cliente): exportação estática numa subpasta,
 *   ativada por `NEXT_PUBLIC_BASE_PATH`. O Pages não tem otimizador de
 *   imagem, então ali elas são servidas como estão.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const isExport = basePath.length > 0;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Some o selo do Next no canto durante o `next dev`. Ele nunca sai na
  // build, mas atrapalha na hora de conferir o layout.
  devIndicators: false,

  ...(isExport ? { output: 'export' as const, basePath, trailingSlash: true } : {}),

  images: {
    formats: ['image/avif', 'image/webp'],
    // Larguras alinhadas aos `sizes` usados nos componentes, evita gerar variantes inúteis.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1920, 2560],
    imageSizes: [96, 160, 240, 320],
    // Qualidades realmente usadas nos componentes (Next 16 exige declarar)
    qualities: [62, 68, 70, 72, 74, 82],
    ...(isExport ? { unoptimized: true } : {}),
  },

  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: '/videos/:path*',
              headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
          ];
        },
      }),
};

export default nextConfig;
