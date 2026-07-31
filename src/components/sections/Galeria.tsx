'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { useLightbox } from '@/hooks/useLightbox';
import { galeria } from '@/content/galeria';

const headingId = 'galeria-titulo';

// Mesmo raciocínio da seção de avaliações: o lightbox entra sob demanda.
const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox), {
  ssr: false,
});

export function Galeria() {
  const track = useRef<HTMLUListElement>(null);
  const lightbox = useLightbox(galeria.fotos.length);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    element.scrollBy({ left: (card.getBoundingClientRect().width + 16) * direction, behavior: 'smooth' });
  }, []);

  return (
    <Section id={galeria.id} theme="dark" labelledBy={headingId}>
      <div className="shell flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <Eyebrow>{galeria.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id={headingId} className="mt-6 text-(length:--text-display)">
              {galeria.title}
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-[44ch] text-[var(--muted)]">
            {galeria.lead}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex gap-3">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span className="sr-only">Foto anterior</span>
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span className="sr-only">Próxima foto</span>
            <ChevronRightIcon />
          </button>
        </Reveal>
      </div>

      <ul
        ref={track}
        className="track mt-12 gap-4 px-(--space-gutter) pb-2 [scroll-padding-inline:var(--space-gutter)]"
      >
        {galeria.fotos.map((foto, index) => (
          <li key={foto.src} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[32%] xl:w-[26%]">
            <button
              type="button"
              onClick={(event) => lightbox.open(index, event.currentTarget)}
              className="group block w-full text-left"
            >
              <span className="relative block overflow-hidden rounded-(--radius-lg) bg-[var(--tint)]">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  width={foto.width}
                  height={foto.height}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 30vw"
                  quality={72}
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-[var(--ease-marcha)] group-hover:scale-[1.05]"
                />
              </span>
              <span className="mt-4 flex items-center gap-3 eyebrow text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                <span aria-hidden>{String(index + 1).padStart(2, '0')}</span>
                <span aria-hidden className="block h-px w-6 bg-current" />
                {foto.legenda}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        items={galeria.fotos}
        index={lightbox.index}
        onClose={lightbox.close}
        onNavigate={lightbox.go}
        label="Galeria do Rancho Zimbrão"
      />
    </Section>
  );
}
