import type { ElementType, ReactNode } from 'react';

export type SectionTheme = 'dark' | 'light';

type SectionProps = {
  children: ReactNode;
  theme: SectionTheme;
  id?: string;
  /** id do heading que nomeia a seção, para o aria-labelledby */
  labelledBy?: string;
  as?: ElementType;
  className?: string;
  /** desliga o padding vertical padrão (hero, footer) */
  flush?: boolean;
  /** desliga a textura de papel (blocos com mídia em tela cheia) */
  plain?: boolean;
};

/**
 * Bloco de página. Injeta o par de variáveis do tema via `data-theme`,
 * então todo componente filho lê --bg / --fg / --muted / --accent / --hair
 * e funciona nos dois fundos sem duplicar classe.
 */
export function Section({
  children,
  theme,
  id,
  labelledBy,
  as: Tag = 'section',
  className = '',
  flush = false,
  plain = false,
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-theme={theme}
      aria-labelledby={labelledBy}
      className={`themed relative ${plain ? '' : 'grain'} ${flush ? '' : 'py-(--space-section)'} ${className}`}
    >
      {children}
    </Tag>
  );
}
