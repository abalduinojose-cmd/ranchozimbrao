'use client';

import { useEffect, useState } from 'react';
import type { SectionTheme } from '@/components/Section';

/**
 * Descobre o tema (`data-theme`) da seção que está passando sob o topo da
 * página, para o cabeçalho fixo se inverter junto com o fundo.
 *
 * As posições das seções são medidas uma vez (e a cada resize) e guardadas.
 * No scroll só comparamos números, dentro de um requestAnimationFrame:
 * nenhuma leitura de layout por frame, nenhum reflow.
 */
export function useSectionTheme(headerHeight = 72): SectionTheme {
  const [theme, setTheme] = useState<SectionTheme>('dark');

  useEffect(() => {
    // Só as seções do conteúdo: o cabeçalho e o menu mobile também carregam
    // data-theme e não podem entrar na conta.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main > [data-theme]'));
    if (sections.length === 0) return;

    let stops: { top: number; theme: SectionTheme }[] = [];
    let frame = 0;

    const measure = () => {
      stops = sections
        .map((section) => {
          const value = section.dataset.theme;
          const sectionTheme: SectionTheme = value === 'light' ? 'light' : 'dark';
          // O corte de marcha já mostra a cor da próxima seção, então a
          // troca acontece assim que a faixa do corte começa.
          const seam = section.previousElementSibling as HTMLElement | null;
          const offset = seam?.classList.contains('seam') ? seam.offsetHeight : 0;
          return { top: section.offsetTop - offset, theme: sectionTheme };
        })
        .sort((a, b) => a.top - b.top);
    };

    const update = () => {
      frame = 0;
      // A linha de leitura é a base do cabeçalho: o tema tem de ser o da
      // seção que está logo abaixo dele, não a que já passou.
      const line = window.scrollY + headerHeight;
      let next: SectionTheme = stops[0]?.theme ?? 'dark';
      for (const stop of stops) {
        if (stop.top <= line) next = stop.theme;
        else break;
      }
      setTheme((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [headerHeight]);

  return theme;
}
