import Image from 'next/image';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LazyVideo } from '@/components/ui/LazyVideo';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { experiencias, isVideo } from '@/content/experiencias';

const headingId = 'experiencias-titulo';
const MEDIA_SIZES = '(max-width: 1024px) 92vw, 44vw';

export function Experiencias() {
  return (
    <Section id={experiencias.id} theme="dark" labelledBy={headingId}>
      <div className="shell">
        <SectionHeading
          id={headingId}
          eyebrow={experiencias.eyebrow}
          title={experiencias.title}
          lead={experiencias.lead}
        />

        <ul className="mt-16 flex flex-col gap-4">
          {experiencias.items.map((item, index) => (
            <Reveal as="li" key={item.id}>
              <article className="card grid items-center gap-8 p-3 lg:grid-cols-12 lg:gap-12 lg:p-4">
                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                  <div className="overflow-hidden rounded-(--radius-md)">
                    {isVideo(item.media) ? (
                      <LazyVideo video={item.media} sizes={MEDIA_SIZES} aspect={4 / 3} className="w-full" />
                    ) : (
                      <Image
                        src={item.media.src}
                        alt={item.media.alt}
                        width={item.media.width}
                        height={item.media.height}
                        sizes={MEDIA_SIZES}
                        quality={72}
                        className="aspect-4/3 w-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`px-3 pb-4 lg:col-span-6 lg:px-2 lg:py-6 ${
                    index % 2 === 1 ? 'lg:order-1 lg:col-start-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-[var(--hair)] font-(family-name:--font-mono) text-sm text-[var(--accent)]">
                      {item.numero}
                    </span>
                    <span aria-hidden className="block h-px flex-1 bg-[var(--hair)]" />
                  </div>

                  <h3 className="mt-6 text-(length:--text-display)">{item.nome}</h3>
                  <p className="mt-4 max-w-[46ch] text-(length:--text-lead) text-[var(--muted)]">
                    {item.resumo}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {item.detalhes.map((detalhe) => (
                      <li
                        key={detalhe}
                        className="rounded-full border border-[var(--hair)] px-4 py-2 eyebrow"
                      >
                        {detalhe}
                      </li>
                    ))}
                  </ul>

                  <WhatsAppButton message={item.ctaMessage} className="mt-8">
                    Fale conosco
                  </WhatsAppButton>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
