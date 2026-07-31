'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Estado do lightbox: índice aberto, navegação circular e trava de scroll.
 * Guarda o elemento que abriu para devolver o foco no fechamento.
 */
export function useLightbox(total: number) {
  const [index, setIndex] = useState<number | null>(null);
  const [opener, setOpener] = useState<HTMLElement | null>(null);

  const open = useCallback((next: number, trigger?: HTMLElement | null) => {
    setOpener(trigger ?? null);
    setIndex(next);
  }, []);

  const close = useCallback(() => {
    setIndex(null);
    opener?.focus();
  }, [opener]);

  const go = useCallback(
    (step: number) => {
      setIndex((current) => (current === null ? current : (current + step + total) % total));
    },
    [total],
  );

  useEffect(() => {
    if (index === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [index, close, go]);

  return { index, isOpen: index !== null, open, close, go };
}
