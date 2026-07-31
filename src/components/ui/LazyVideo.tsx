'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { MediaVideo } from '@/content/media';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { PauseIcon, PlayIcon } from './Icons';

type LazyVideoProps = {
  video: MediaVideo;
  className?: string;
  /** `sizes` do poster, igual ao espaço que o painel ocupa no layout */
  sizes: string;
  priority?: boolean;
  /** proporção do painel (largura/altura). Padrão: a do arquivo. */
  aspect?: number;
};

/**
 * Painel de vídeo do site.
 *
 * - `preload="none"`: nenhum byte de vídeo antes de o painel entrar em cena
 * - toca sozinho quando fica visível e pausa ao sair, para não gastar bateria
 * - controle central de play e pausa, sempre disponível: some quando o vídeo
 *   está rodando e volta no hover ou no foco, para não tampar a imagem
 * - com `prefers-reduced-motion: reduce` nada toca sem o usuário mandar
 * - o poster passa pelo next/image; a proporção é fixa, então CLS é zero
 */
export function LazyVideo({ video, className = '', sizes, priority = false, aspect }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [manualPause, setManualPause] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const autoplay = !reduceMotion && !manualPause;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!autoplay) {
      element.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void element.play().catch(() => undefined);
        else element.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [autoplay]);

  const toggle = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      setManualPause(false);
      void element.play().catch(() => undefined);
    } else {
      setManualPause(true);
      element.pause();
    }
  }, []);

  return (
    <div
      className={`group/video relative overflow-hidden rounded-(--radius-md) bg-[var(--color-ink)] ${className}`}
      style={{ aspectRatio: aspect ?? `${video.width} / ${video.height}` }}
    >
      <Image
        src={video.poster.src}
        alt={video.poster.alt}
        width={video.poster.width}
        height={video.poster.height}
        sizes={sizes}
        priority={priority}
        quality={70}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        aria-label={video.poster.alt}
        onPlaying={() => {
          setReady(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={video.mp4} type="video/mp4" />
      </video>

      {/* Controle central. Enquanto roda, ele se apaga e só reaparece no
          hover ou no foco pelo teclado. */}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!playing}
        className={`absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ease-[var(--ease-marcha)] focus-visible:opacity-100 group-hover/video:opacity-100 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="sr-only">{playing ? 'Pausar vídeo' : 'Reproduzir vídeo'}</span>
        <span
          aria-hidden
          className="flex size-16 items-center justify-center rounded-full bg-[rgba(11,11,12,0.45)] text-[var(--color-paper)] shadow-[0_10px_30px_rgba(11,11,12,0.4)] backdrop-blur-sm transition-transform duration-300 ease-[var(--ease-marcha)] group-hover/video:scale-110 sm:size-18"
        >
          {playing ? <PauseIcon width={22} height={22} /> : <PlayIcon width={22} height={22} className="ml-0.5" />}
        </span>
      </button>
    </div>
  );
}
