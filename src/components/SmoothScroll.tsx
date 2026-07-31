'use client';

import { ReactLenis } from 'lenis/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Smooth scroll do Lenis.
 *
 * Renderiza ao lado do conteúdo, nunca em volta dele. Envolver a página
 * fazia o React desmontar e remontar todo o <main> quando a preferência de
 * movimento era detectada depois da hidratação, o que reiniciava as
 * animações e empurrava o LCP em vários segundos.
 *
 * Com `prefers-reduced-motion: reduce` nada é montado e o scroll nativo
 * assume, sem custo de JavaScript.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <ReactLenis root options={{ duration: 1.05, lerp: 0.1, smoothWheel: true, touchMultiplier: 1.6 }} />
  );
}
