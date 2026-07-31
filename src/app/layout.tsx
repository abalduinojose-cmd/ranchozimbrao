import type { CSSProperties } from 'react';
import type { Metadata, Viewport } from 'next';
import { asset } from '@/lib/asset';
import { Bricolage_Grotesque, Geist_Mono, Instrument_Sans } from 'next/font/google';
import { site } from '@/content/site';
import { Header } from '@/components/Header';
import { SmoothScroll } from '@/components/SmoothScroll';
import { WhatsAppFab } from '@/components/WhatsAppFab';
import './globals.css';

/**
 * Par tipográfico.
 * Bricolage Grotesque é uma grotesca variável de desenho contemporâneo:
 * em peso alto e tracking fechado ela sustenta títulos gigantes sem virar
 * "fonte de banco". Instrument Sans mantém o corpo neutro e legível, e o
 * Geist Mono dá o rigor de ficha técnica nas etiquetas.
 */
/**
 * Uma variação por família, de propósito.
 *
 * Cada peso extra é mais um arquivo no caminho crítico. Numa conexão lenta
 * isso adia o primeiro paint da página inteira. Um peso por família cobre
 * toda a hierarquia do layout: o display já é pesado por natureza, o corpo
 * é variável e o mono só desenha etiqueta.
 */
const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-bricolage',
  preload: true,
});

const body = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument-sans',
  preload: true,
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-geist-mono',
  // Precisa vir com as outras: o mono desenha as etiquetas e os rótulos dos
  // botões do hero. Carregado depois, ele trocava as métricas no meio da
  // sessão e remexia o bloco do hero, que é ancorado embaixo (CLS de 0,05).
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Criatório de ${site.breed}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Mangalarga Marchador',
    'criatório de cavalos',
    'haras',
    'cavalo marchador',
    'cavalgada',
    'ABCCMM',
    site.name,
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#0B0B0C',
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      style={{ '--grain-url': `url('${asset('/img/grain.png')}')` } as CSSProperties}
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[var(--color-paper)] focus:px-5 focus:py-3 focus:text-[var(--color-ink)] focus:eyebrow"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <SmoothScroll />
        {children}
        <WhatsAppFab />
      </body>
    </html>
  );
}
