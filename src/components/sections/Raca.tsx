import Image from 'next/image';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { raca } from '@/content/sections';

const headingId = 'raca-titulo';

export function Raca() {
  return (
    <Section id={raca.id} theme="dark" labelledBy={headingId}>
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>{raca.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 id={headingId} className="mt-6 max-w-[16ch] text-(length:--text-display)">
              {raca.title}
            </h2>
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-8 max-w-[50ch] text-(length:--text-lead)">
            {raca.lead}
          </Reveal>
        </div>

        <Reveal delay={0.16} className="lg:col-span-5">
          <dl className="grid gap-4 sm:grid-cols-2">
            {raca.facts.map((fact) => (
              <div key={fact.label} className="card px-7 py-8">
                <dt className="eyebrow text-[var(--muted)]">{fact.label}</dt>
                <dd className="mt-4 font-(family-name:--font-display) text-lg font-semibold tracking-[-0.03em]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={0.05} className="shell mt-16">
        <figure>
          <div className="overflow-hidden rounded-(--radius-xl)">
            <Image
              src={raca.media.src}
              alt={raca.media.alt}
              width={raca.media.width}
              height={raca.media.height}
              sizes="(max-width: 1600px) 100vw, 1536px"
              quality={74}
              className="h-[40svh] w-full object-cover object-center md:h-[58svh]"
            />
          </div>
          <figcaption className="mt-4 eyebrow text-[var(--muted)]">
            Prova de marcha, quatro tempos e apoio constante
          </figcaption>
        </figure>
      </Reveal>

      <div className="shell mt-20 grid gap-12 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-6">
          {raca.paragraphs.map((paragraph, index) => (
            <Reveal as="p" key={paragraph.slice(0, 24)} delay={index * 0.06} className="max-w-[54ch]">
              {paragraph}
            </Reveal>
          ))}
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
          {raca.gaits.map((gait, index) => (
            <Reveal as="li" key={gait.id} delay={index * 0.06}>
              <div className="card h-full px-8 py-9">
                <h3 className="text-(length:--text-title)">{gait.name}</h3>
                <p className="mt-4 text-[var(--muted)]">{gait.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
