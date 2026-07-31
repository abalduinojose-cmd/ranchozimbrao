import type { Metadata } from 'next';
import { Hero } from '@/components/hero/Hero';
import { Seam } from '@/components/Seam';
import { Sobre } from '@/components/sections/Sobre';
import { Raca } from '@/components/sections/Raca';
import { Plantel } from '@/components/sections/Plantel';
import { Experiencias } from '@/components/sections/Experiencias';
import { Avaliacoes } from '@/components/sections/Avaliacoes';
import { Galeria } from '@/components/sections/Galeria';
import { Contato } from '@/components/sections/Contato';
import { Retrato } from '@/components/sections/Retrato';
import { Footer } from '@/components/sections/Footer';
import { JsonLd } from '@/components/JsonLd';
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd } from '@/lib/jsonld';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} | Criatório de ${site.breed}`,
  description: site.description,
  alternates: { canonical: '/' },
};

/**
 * Página única. A ordem alterna preto e branco, e cada troca de fundo
 * passa por um <Seam>, o corte de marcha.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={[buildLocalBusinessJsonLd(), buildWebSiteJsonLd()]} />

      <main id="conteudo">
        <span id="topo" aria-hidden />

        <Hero />
        <Seam from="dark" to="light" />

        <Sobre />
        <Seam from="light" to="dark" reverse />

        <Raca />
        <Seam from="dark" to="light" />

        <Plantel />
        <Seam from="light" to="dark" reverse />

        <Experiencias />
        <Seam from="dark" to="light" />

        <Avaliacoes />
        <Seam from="light" to="dark" reverse />

        <Galeria />
        <Seam from="dark" to="light" />

        <Contato />
        <Seam from="light" to="dark" reverse />

        <Retrato />

        <Footer />
      </main>
    </>
  );
}
