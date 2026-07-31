'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArrowIcon, ChevronLeftIcon, ChevronRightIcon } from '@/components/ui/Icons';
import { animais, plantel, type Animal } from '@/content/animais';
import { whatsappUrl } from '@/content/site';

const headingId = 'plantel-titulo';

/** Genealogia só aparece depois de preenchida, para o card não exibir TODO. */
function genealogiaOf(animal: Animal): string | null {
  const { pai, mae } = animal.genealogia;
  if (pai === 'TODO' || mae === 'TODO') return null;
  return `${pai} x ${mae}`;
}

/**
 * Plantel em trilho horizontal.
 *
 * As fichas ficam lado a lado e se arrastam, em vez de empilhar uma embaixo
 * da outra: dez animais em grade davam uma seção longa demais no desktop.
 * O trilho usa scroll-snap nativo, funciona com toque, roda do mouse, setas
 * do teclado e os botões de avançar.
 */
export function Plantel() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

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

  return (
    <Section id={plantel.id} theme="light" labelledBy={headingId}>
      <div className="shell flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Reveal>
            <Eyebrow>{plantel.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id={headingId} className="mt-6 max-w-[15ch] text-(length:--text-display)">
              {plantel.title}
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.12} className="mt-6 max-w-[54ch] text-(length:--text-lead) text-[var(--muted)]">
            {plantel.lead}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex items-center gap-4">
          <span className="hidden eyebrow text-[var(--muted)] sm:block">Arraste para o lado</span>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={edges.start}
              className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
            >
              <span className="sr-only">Animal anterior</span>
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={edges.end}
              className="inline-flex size-13 items-center justify-center rounded-full border border-[var(--hair-strong)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
            >
              <span className="sr-only">Próximo animal</span>
              <ChevronRightIcon />
            </button>
          </div>
        </Reveal>
      </div>

      <ul
        ref={track}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label="Animais do plantel"
        className="track mt-12 items-start gap-6 px-(--space-gutter) pb-10 pt-4 [scroll-padding-inline:var(--space-gutter)]"
      >
        {animais.map((animal, index) => {
          const genealogia = genealogiaOf(animal);

          return (
            <li
              key={animal.id}
              // Grid escalonado: os cards pares descem um pouco, o que quebra
              // a linha reta e dá movimento ao trilho.
              className={`card card-hover group flex w-[82%] shrink-0 snap-start flex-col p-3 sm:w-[46%] lg:w-[31%] xl:w-[24%] ${
                index % 2 === 1 ? 'lg:mt-12' : ''
              }`}
            >
              <article className="flex h-full flex-col">
                <div className="relative overflow-hidden rounded-(--radius-md) bg-[var(--color-ink)]">
                  <Image
                    src={animal.foto.src}
                    alt={animal.foto.alt}
                    width={animal.foto.width}
                    height={animal.foto.height}
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, (max-width: 1280px) 31vw, 23vw"
                    quality={72}
                    className="aspect-4/5 w-full object-cover transition-transform duration-700 ease-[var(--ease-marcha)] group-hover:scale-[1.06]"
                  />
                  {animal.destaque ? (
                    <span className="absolute left-3 top-3 rounded-full bg-[var(--bg)] px-3.5 py-2 eyebrow text-[var(--fg)] shadow-[var(--shadow-soft)]">
                      {animal.destaque}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col px-3 pb-2 pt-5">
                  <h3 className="text-(length:--text-title)">{animal.nome}</h3>

                  <p className="mt-2 eyebrow text-[var(--accent)]">
                    {animal.sexo} · {animal.pelagem}
                  </p>

                  <dl className="mt-5 flex flex-col gap-2 border-t border-[var(--hair)] pt-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="eyebrow text-[var(--muted)]">Nascimento</dt>
                      <dd className="font-(family-name:--font-mono) tabular-nums">{animal.nascimento}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="eyebrow text-[var(--muted)]">ABCCMM</dt>
                      <dd className="font-(family-name:--font-mono) tabular-nums">{animal.registro}</dd>
                    </div>
                    {genealogia ? (
                      <div className="flex justify-between gap-4">
                        <dt className="eyebrow text-[var(--muted)]">Genealogia</dt>
                        <dd className="text-right">{genealogia}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <a
                    href={whatsappUrl(plantel.ctaMessage(animal.nome))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 eyebrow text-[var(--fg)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    Pedir informações
                    <ArrowIcon
                      width={16}
                      height={16}
                      className="transition-transform duration-300 ease-[var(--ease-marcha)] group-hover:translate-x-1"
                    />
                    <span className="sr-only">sobre {animal.nome}</span>
                  </a>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
