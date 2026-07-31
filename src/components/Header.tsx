'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { useSectionTheme } from '@/hooks/useSectionTheme';
import { Wordmark } from './ui/Wordmark';
import { ArrowIcon } from './ui/Icons';

const HEADER_HEIGHT = 104;

/**
 * Cabeçalho flutuante.
 *
 * Uma barra em cápsula que paira sobre o conteúdo e troca de tema junto com
 * a seção que passa por baixo, para o contraste nunca quebrar na alternância
 * preto e branco. O vidro só entra depois do primeiro scroll, quando existe
 * mídia atrás para justificá-lo.
 */
export function Header() {
  const theme = useSectionTheme(HEADER_HEIGHT);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Sentinela no topo: sem listener de scroll.
  useEffect(() => {
    const target = sentinel.current;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry?.isIntersecting), {
      threshold: 0,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Fecha o menu no Esc e devolve o foco ao botão.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-20 w-px" />

      <header
        data-theme={theme}
        className="fixed inset-x-0 top-0 z-50 gutter pt-3 text-[var(--fg)] sm:pt-5"
      >
        {/* O desfoque só entra depois do primeiro scroll: `backdrop-filter`
            sobre a área do hero custava uma passada extra de composição e
            atrasava o LCP em segundos na primeira pintura. */}
        <div
          className={`mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 rounded-full border border-[var(--hair)] bg-[var(--surface)] pl-4 pr-2 transition-shadow duration-300 ease-[var(--ease-marcha)] sm:h-21 sm:pl-6 sm:pr-3 ${
            scrolled ? 'glass shadow-[0_10px_34px_rgba(11,11,12,0.18)]' : ''
          }`}
        >
          <a
            href="#topo"
            className="flex min-h-11 items-center"
            aria-label={`${site.name}, ir para o topo`}
          >
            <Wordmark height={52} />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-3.5 eyebrow text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--glass)] hover:text-[var(--fg)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="inline-flex size-12 items-center justify-center rounded-full border border-[var(--hair-strong)] lg:hidden"
          >
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-[var(--fg)] transition-transform duration-300 ease-[var(--ease-marcha)] ${
                  open ? 'translate-y-1.5 rotate-[18deg]' : ''
                }`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-[var(--fg)] transition-transform duration-300 ease-[var(--ease-marcha)] ${
                  open ? '-translate-y-1.5 -rotate-[18deg]' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Menu mobile: painel cheio, sempre no preto da marca.
          Só os destinos, em lista limpa. O contato já está no botão
          flutuante, presente em toda a navegação. */}
      <div
        id="menu-mobile"
        data-theme="dark"
        hidden={!open}
        className="themed depth fixed inset-0 z-40 flex flex-col justify-center gutter pt-24 lg:hidden"
      >
        <nav aria-label="Navegação principal (mobile)">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between gap-6 py-4 font-(family-name:--font-display) text-4xl font-bold tracking-[-0.04em] transition-colors hover:text-[var(--accent)]"
                >
                  {item.label}
                  <ArrowIcon
                    width={22}
                    height={22}
                    className="shrink-0 -rotate-45 text-[var(--muted)] transition-all duration-300 ease-[var(--ease-marcha)] group-hover:translate-x-1 group-hover:text-[var(--accent)]"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
