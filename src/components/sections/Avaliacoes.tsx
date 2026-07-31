'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Stars } from '@/components/ui/Stars';
import type { LightboxItem } from '@/components/ui/Lightbox';
import { ChevronLeftIcon, ChevronRightIcon, GoogleGlyph, ArrowIcon } from '@/components/ui/Icons';
import { useLightbox } from '@/hooks/useLightbox';
import { aggregate, avaliacoes, reviewsComTexto, reviewsSemTexto } from '@/content/reviews';
import { site } from '@/content/site';

const headingId = 'avaliacoes-titulo';

// O lightbox (e o Motion que ele usa) só entram no bundle quando alguém
// realmente abre uma foto.
const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox), {
  ssr: false,
});

export function Avaliacoes() {
  const track = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const photos = useMemo<LightboxItem[]>(
    () =>
      reviewsComTexto.flatMap((review) =>
        review.photos.map((photo) => ({ ...photo, legenda: `Foto enviada por ${review.author}` })),
      ),
    [],
  );

  const lightbox = useLightbox(photos.length);

  const updateEdges = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    setEdges({ start: element.scrollLeft <= 4, end: element.scrollLeft >= max - 4 });
  }, []);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    updateEdges();
    element.addEventListener('scroll', updateEdges, { passive: true });
    window.addEventListener('resize', updateEdges);
    return () => {
      element.removeEventListener('scroll', updateEdges);
      window.removeEventListener('resize', updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const element = track.current;
    const card = element?.firstElementChild;
    if (!element || !card) return;
    element.scrollBy({ left: (card.getBoundingClientRect().width + 16) * direction, behavior: 'smooth' });
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollByCard(1);
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollByCard(-1);
      }
    },
    [scrollByCard],
  );

  let photoOffset = 0;

  return (
    <Section id={avaliacoes.id} theme="light" labelledBy={headingId}>
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{avaliacoes.eyebrow}</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 id={headingId} className="mt-6 max-w-[15ch] text-(length:--text-display)">
                {avaliacoes.title}
              </h2>
            </Reveal>
          </div>

          {/* Selo: nota média, total e origem */}
          <Reveal delay={0.1} className="shrink-0">
            <div className="card flex items-center gap-7 p-7">
              <div>
                <p className="font-(family-name:--font-display) text-6xl font-bold leading-none tracking-[-0.05em] tabular-nums">
                  {aggregate.ratingValue.toFixed(1).replace('.', ',')}
                </p>
                <Stars rating={aggregate.ratingValue} className="mt-3" />
              </div>
              <div className="flex flex-col gap-2 border-l border-[var(--hair)] pl-7">
                <span className="flex items-center gap-2 eyebrow">
                  <GoogleGlyph />
                  Google
                </span>
                <span className="text-sm text-[var(--muted)]">{aggregate.reviewCount} avaliações</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Carrossel: só quem escreveu vira card */}
        <div
          className="relative mt-14"
          role="group"
          aria-roledescription="carrossel"
          aria-label="Avaliações de clientes no Google"
        >
          <ul ref={track} tabIndex={0} onKeyDown={onKeyDown} className="track gap-4 pb-2">
            {reviewsComTexto.map((review) => {
              const isOpen = expanded === review.id;
              const start = photoOffset;
              photoOffset += review.photos.length;

              return (
                <li
                  key={review.id}
                  className="card flex w-[86%] shrink-0 snap-start flex-col p-7 sm:w-[54%] lg:w-[38%] xl:w-[32%]"
                >
                  {/* Cabeçalho igual ao do Google: foto de perfil, nome, data */}
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <Image
                        src={review.avatar}
                        alt={`Foto de perfil de ${review.author}`}
                        width={160}
                        height={160}
                        sizes="52px"
                        quality={74}
                        className="size-13 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-13 shrink-0 items-center justify-center rounded-full bg-[var(--fg)] font-(family-name:--font-display) text-lg font-bold text-[var(--bg)]"
                      >
                        {review.author.charAt(0)}
                      </span>
                    )}

                    <span className="min-w-0">
                      <span className="block truncate font-(family-name:--font-display) text-lg font-semibold tracking-[-0.03em]">
                        {review.author}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-2">
                        <Stars rating={review.rating} />
                        <span className="eyebrow text-[var(--muted)]">{review.dateLabel}</span>
                      </span>
                    </span>
                  </div>

                  <p
                    className={`mt-5 flex-1 text-[var(--fg)] ${isOpen ? '' : 'line-clamp-5'}`}
                    id={`review-text-${review.id}`}
                  >
                    {review.text}
                  </p>

                  {review.text.length > 150 ? (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : review.id)}
                      aria-expanded={isOpen}
                      aria-controls={`review-text-${review.id}`}
                      className="mt-3 min-h-11 self-start eyebrow text-[var(--accent)]"
                    >
                      {isOpen ? 'Ler menos' : 'Ler mais'}
                    </button>
                  ) : null}

                  {review.photos.length > 0 ? (
                    <ul className="mt-6 flex flex-wrap gap-2 border-t border-[var(--hair)] pt-5">
                      {review.photos.map((photo, photoIndex) => (
                        <li key={photo.src}>
                          <button
                            type="button"
                            onClick={(event) => lightbox.open(start + photoIndex, event.currentTarget)}
                            className="block overflow-hidden rounded-(--radius-sm) border-2 border-transparent transition-colors hover:border-[var(--accent)]"
                          >
                            <span className="sr-only">Ampliar foto enviada por {review.author}</span>
                            <Image
                              src={photo.src}
                              alt={photo.alt}
                              width={photo.width}
                              height={photo.height}
                              sizes="120px"
                              quality={68}
                              className="h-20 w-28 object-cover"
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <a
              href={site.google.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-13 items-center gap-3 rounded-full border border-[var(--hair-strong)] px-6 eyebrow transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <GoogleGlyph />
              {avaliacoes.ctaLabel}
              <ArrowIcon
                width={16}
                height={16}
                className="transition-transform duration-300 ease-[var(--ease-marcha)] group-hover:translate-x-1"
              />
            </a>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={edges.start}
                className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
              >
                <span className="sr-only">Avaliação anterior</span>
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={edges.end}
                className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
              >
                <span className="sr-only">Próxima avaliação</span>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Quem avaliou só com a nota: fileira de fotos de perfil */}
        {reviewsSemTexto.length > 0 ? (
          <Reveal delay={0.08} className="mt-12">
            <div className="card flex flex-wrap items-center gap-5 p-6 sm:p-7">
              <ul className="flex -space-x-3">
                {reviewsSemTexto.map((review) => (
                  <li key={review.id}>
                    {review.avatar ? (
                      <Image
                        src={review.avatar}
                        alt={`Foto de perfil de ${review.author}`}
                        width={160}
                        height={160}
                        sizes="48px"
                        quality={70}
                        className="size-12 rounded-full border-2 border-[var(--card)] object-cover"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex size-12 items-center justify-center rounded-full border-2 border-[var(--card)] bg-[var(--fg)] font-(family-name:--font-display) font-bold text-[var(--bg)]"
                      >
                        {review.author.charAt(0)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <p className="flex items-center gap-3">
                <Stars rating={5} />
                <span className="text-[var(--muted)]">
                  Mais {reviewsSemTexto.length} pessoas {avaliacoes.wallLabel}
                </span>
              </p>
            </div>
          </Reveal>
        ) : null}
      </div>

      <Lightbox
        items={photos}
        index={lightbox.index}
        onClose={lightbox.close}
        onNavigate={lightbox.go}
        label="Fotos enviadas por clientes"
      />
    </Section>
  );
}
