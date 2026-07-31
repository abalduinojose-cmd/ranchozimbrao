type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

/**
 * Letreiro contínuo com o vocabulário da raça.
 *
 * O grupo de itens é renderizado duas vezes e a faixa anda 50% do próprio
 * comprimento: o laço fica invisível. Anima só `transform`, então roda no
 * compositor, e para com `prefers-reduced-motion`.
 */
export function Marquee({ items, className = '' }: MarqueeProps) {
  const group = (
    <div className="marquee__group">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-(--space-gutter) eyebrow whitespace-nowrap">
          {item}
          <span className="block size-1.5 rotate-45 bg-[var(--accent)]" />
        </span>
      ))}
    </div>
  );

  return (
    // Decorativo: repete informação que já existe em texto nas seções.
    // Altura fixa de propósito: se ela dependesse da fonte, o layout se
    // reacomodaria quando a fonte terminasse de carregar (CLS).
    <div
      aria-hidden
      className={`flex h-14 items-center overflow-hidden border-y border-[var(--hair)] ${className}`}
    >
      <div className="marquee">
        {group}
        {group}
      </div>
    </div>
  );
}
