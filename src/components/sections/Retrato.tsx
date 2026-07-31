import Image from 'next/image';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { retrato } from '@/content/sections';

const headingId = 'retrato-titulo';

/**
 * Fecho do site: a foto de conformação em cor cheia, em tamanho grande,
 * com o recorte da marcha por cima e um último convite para a visita.
 */
export function Retrato() {
  return (
    <Section theme="dark" labelledBy={headingId}>
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{retrato.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id={headingId} className="mt-6 max-w-[18ch] text-(length:--text-display)">
                {retrato.title}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="flex flex-col items-start gap-5">
            <p className="max-w-[34ch] text-[var(--muted)]">{retrato.lead}</p>
            <WhatsAppButton message={retrato.ctaMessage}>Fale conosco</WhatsAppButton>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <figure className="relative">
            <div className="overflow-hidden rounded-(--radius-xl)">
              <Image
                src={retrato.media.src}
                alt={retrato.media.alt}
                width={retrato.media.width}
                height={retrato.media.height}
                sizes="(max-width: 1600px) 100vw, 1536px"
                quality={74}
                className="h-[46svh] w-full object-cover object-[50%_42%] md:h-[64svh]"
              />
            </div>

            {/* Recorte de apoio: dá profundidade e mostra a marcha */}
            <div className="absolute -bottom-6 right-4 hidden w-40 overflow-hidden rounded-(--radius-md) border-4 border-[var(--bg)] lg:block xl:w-52">
              <Image
                src={retrato.inset.src}
                alt={retrato.inset.alt}
                width={retrato.inset.width}
                height={retrato.inset.height}
                quality={70}
                sizes="220px"
                className="aspect-4/5 w-full object-cover"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
