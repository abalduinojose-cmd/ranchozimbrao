import { Section } from '@/components/Section';
import { Marquee } from '@/components/ui/Marquee';
import { site } from '@/content/site';
import { HeroIntro } from './HeroIntro';
import { HeroBackdrop } from './HeroBackdrop';

/**
 * Hero.
 *
 * O rancho em movimento atrás do texto: o reel do redondel roda em tela
 * cheia, com um degradê preto leve por cima para o contraste. A altura é
 * exatamente uma tela, então o conteúdo seguinte já aparece na primeira
 * rolagem.
 */
export function Hero() {
  return (
    <Section
      theme="dark"
      as="header"
      flush
      className="relative flex min-h-svh flex-col overflow-clip"
    >
      <HeroBackdrop />

      <div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-14 sm:pt-36">
        <HeroIntro />
      </div>

      <Marquee items={site.marquee} className="relative border-b-0 text-[var(--muted)]" />
    </Section>
  );
}
