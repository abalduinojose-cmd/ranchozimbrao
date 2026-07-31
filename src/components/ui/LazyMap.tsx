'use client';

import { useEffect, useRef, useState } from 'react';
import { PinIcon } from './Icons';

type LazyMapProps = {
  query: string;
  title: string;
};

/**
 * Mapa do Google carregado só quando o bloco entra na tela.
 * Antes disso não existe iframe, então nenhum script de terceiro pesa
 * no carregamento inicial nem entra na conta do LCP.
 */
export function LazyMap({ query, title }: LazyMapProps) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = holder.current;
    if (!element || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { rootMargin: '200px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div
      ref={holder}
      className="relative aspect-4/5 w-full overflow-hidden bg-[var(--card)] sm:aspect-16/10 lg:aspect-auto lg:h-150"
    >
      {visible ? (
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--muted)]">
          <PinIcon width={24} height={24} />
          <span className="eyebrow">Carregando o mapa</span>
        </span>
      )}
    </div>
  );
}
