'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { video } from '@/content/media';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const backdrop = video('hero', 'Vista do redondel do Rancho Zimbrão sob o paredão de pedra');

/**
 * Fundo do hero: o vídeo do rancho rodando atrás do conteúdo, com um degradê
 * preto por cima para o texto manter contraste.
 *
 * Toca sozinho, sem som e em loop, sem nenhum controle na tela. O poster é
 * uma imagem otimizada e aparece primeiro; o vídeo entra por cima assim que
 * a página termina de carregar, para não disputar banda com o primeiro paint.
 * Com `prefers-reduced-motion: reduce` fica só o poster parado.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (reduceMotion) {
      element.pause();
      return;
    }

    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => void element.play().catch(() => undefined), 600);
    };

    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });

    return () => {
      window.removeEventListener('load', start);
      if (timer) window.clearTimeout(timer);
    };
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src={backdrop.poster.src}
        alt={backdrop.poster.alt}
        width={backdrop.poster.width}
        height={backdrop.poster.height}
        priority
        fetchPriority="high"
        quality={62}
        sizes="(max-width: 900px) 100vw, 1280px"
        className="h-full w-full object-cover object-[50%_72%]"
      />

      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        tabIndex={-1}
        onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover object-[50%_72%] transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={backdrop.mp4} type="video/mp4" />
      </video>

      {/* Degradê leve: escurece o suficiente para o texto passar em AA */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,12,0.62)_0%,rgba(11,11,12,0.38)_34%,rgba(11,11,12,0.9)_100%)]"
      />
    </div>
  );
}
