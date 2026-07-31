'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './Icons';

export type LightboxItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  legenda?: string;
};

type LightboxProps = {
  items: readonly LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (step: number) => void;
  label: string;
};

/**
 * Lightbox sem biblioteca: diálogo modal, foco preso no painel,
 * Esc para fechar, setas para navegar. Anima só opacity e transform.
 */
export function Lightbox({ items, index, onClose, onNavigate, label }: LightboxProps) {
  const panel = useRef<HTMLDivElement>(null);
  const item = index === null ? undefined : items[index];

  useEffect(() => {
    if (index === null) return;
    panel.current?.focus();
  }, [index]);

  return (
    <AnimatePresence>
      {item ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          data-theme="dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[90] flex flex-col bg-[rgba(11,11,12,0.96)] text-[var(--color-paper)]"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className="flex items-center justify-between gutter py-4">
            <span className="eyebrow text-[var(--color-muted-paper)]">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-12 items-center justify-center rounded-full border border-[rgba(246,244,240,0.22)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <span className="sr-only">Fechar</span>
              <CloseIcon />
            </button>
          </div>

          <div
            ref={panel}
            tabIndex={-1}
            className="flex min-h-0 flex-1 items-center justify-center gutter pb-6 outline-none"
          >
            <motion.figure
              key={item.src}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-full flex-col items-center gap-4"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 900px) 92vw, 76vw"
                quality={82}
                className="max-h-[74svh] w-auto rounded-(--radius-md) object-contain"
              />
              {item.legenda ? (
                <figcaption className="eyebrow text-center text-[var(--color-muted-paper)]">
                  {item.legenda}
                </figcaption>
              ) : null}
            </motion.figure>
          </div>

          <div className="flex items-center justify-center gap-3 pb-8">
            <button
              type="button"
              onClick={() => onNavigate(-1)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-[rgba(246,244,240,0.22)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <span className="sr-only">Foto anterior</span>
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => onNavigate(1)}
              className="inline-flex size-12 items-center justify-center rounded-full border border-[rgba(246,244,240,0.22)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <span className="sr-only">Próxima foto</span>
              <ChevronRightIcon />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
