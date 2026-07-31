import Image from 'next/image';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { sobre } from '@/content/sections';

const headingId = 'sobre-titulo';

export function Sobre() {
  return (
    <Section id={sobre.id} theme="light" labelledBy={headingId}>
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{sobre.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id={headingId} className="mt-6 max-w-[15ch] text-(length:--text-display)">
                {sobre.title}
              </h2>
            </Reveal>

            <div className="mt-9 max-w-[56ch] space-y-5">
              {sobre.paragraphs.map((paragraph, index) => (
                <Reveal as="p" key={paragraph.slice(0, 24)} delay={0.1 + index * 0.04}>
                  {paragraph}
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bento: o reel vertical do redondel ao lado das baias à noite */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6">
            <Reveal delay={0.1}>
              <figure>
                <LazyVideo
                  video={sobre.media}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"
                  aspect={3 / 4}
                  className="w-full"
                />
                <figcaption className="mt-3 flex items-center gap-3 eyebrow text-[var(--muted)]">
                  <span aria-hidden className="block size-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                  O redondel
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.16}>
              <figure className="sm:mt-10">
                <div className="overflow-hidden rounded-(--radius-md)">
                  <Image
                    src={sobre.still.src}
                    alt={sobre.still.alt}
                    width={sobre.still.width}
                    height={sobre.still.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 28vw"
                    quality={72}
                    className="aspect-3/4 w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-center gap-3 eyebrow text-[var(--muted)]">
                  <span aria-hidden className="block size-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                  Fim de tarde nas baias
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <ul className="mt-20 grid gap-4 md:grid-cols-3">
          {sobre.pillars.map((pillar, index) => (
            <Reveal as="li" key={pillar.id} delay={index * 0.06}>
              <div className="card flex h-full flex-col px-8 py-9">
                <span className="eyebrow text-[var(--accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 text-(length:--text-title)">{pillar.title}</h3>
                <p className="mt-4 text-[var(--muted)]">{pillar.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
