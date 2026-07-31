import type { CSSProperties, ReactNode } from 'react';

type RevealTag = 'div' | 'li' | 'p' | 'span' | 'figure' | 'article' | 'header';

type RevealProps = {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  /**
   * Atraso relativo, em segundos, para escalonar blocos irmãos.
   * Como a animação é guiada pelo scroll e não pelo relógio, o atraso vira
   * um deslocamento na faixa de entrada. O efeito percebido é o mesmo.
   */
  delay?: number;
};

/**
 * Reveal padrão da casa: o bloco sobe e aparece conforme entra na tela.
 *
 * Server component de propósito. A animação é uma scroll-driven animation
 * em CSS (`.reveal` no globals.css): anima só transform e opacity, roda fora
 * da main thread e não adiciona nenhum byte de JavaScript. Com
 * `prefers-reduced-motion: reduce`, ou em navegador sem
 * `animation-timeline`, o conteúdo nasce visível.
 */
export function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const style =
    delay > 0 ? ({ '--reveal-shift': `${Math.min(delay * 40, 18)}%` } as CSSProperties) : undefined;

  return (
    <Tag className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  );
}
