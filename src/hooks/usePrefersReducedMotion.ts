'use client';

import { useEffect, useState } from 'react';

/**
 * `prefers-reduced-motion` sem quebrar a hidratação.
 *
 * Retorna `false` no servidor e no primeiro render do cliente, e só então
 * passa a refletir a preferência real. O `useReducedMotion` do Motion lê o
 * valor já no primeiro render do cliente, o que gera HTML diferente do
 * servidor em quem tem a preferência ligada.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduced;
}
