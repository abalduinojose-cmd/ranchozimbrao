import type { CSSProperties } from 'react';
import type { SectionTheme } from './Section';

const BG: Record<SectionTheme, string> = {
  dark: 'var(--color-ink)',
  light: 'var(--color-paper)',
};

const RULE: Record<SectionTheme, string> = {
  dark: 'var(--color-accent)',
  light: 'var(--color-accent-deep)',
};

type SeamProps = {
  from: SectionTheme;
  to: SectionTheme;
  /** inverte o sentido do corte, para o ritmo não virar padrão */
  reverse?: boolean;
};

/**
 * O CORTE DE MARCHA.
 *
 * Fronteira entre duas seções. Uma lâmina diagonal da cor da próxima seção
 * varre a faixa conforme o scroll (scroll-driven animation, fora da main
 * thread) e um filete dourado permanente marca o eixo do corte.
 *
 * Sem suporte a `animation-timeline` ou com `prefers-reduced-motion`, a
 * lâmina fica parada no estado final: o corte continua lá, só não varre.
 */
export function Seam({ from, to, reverse = false }: SeamProps) {
  const style = {
    '--seam-from': BG[from],
    '--seam-to': BG[to],
    '--seam-rule': RULE[to],
  } as CSSProperties;

  return (
    <div className="seam" data-reverse={reverse} style={style} aria-hidden="true">
      <div className="seam__blade" />
      <div className="seam__rule" />
      <div
        className="seam__pin"
        style={reverse ? { right: 'var(--space-gutter)' } : { left: 'var(--space-gutter)' }}
      />
    </div>
  );
}
