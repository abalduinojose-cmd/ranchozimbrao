import { Reveal } from './Reveal';
import { Eyebrow } from './Eyebrow';

type SectionHeadingProps = {
  /** id usado pelo aria-labelledby da seção */
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  align?: 'start' | 'center';
  className?: string;
};

/** Cabeçalho editorial de seção: etiqueta em cápsula, título e linha de apoio. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = 'start',
  className = '',
}: SectionHeadingProps) {
  return (
    <header
      className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'} ${className}`}
    >
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>

      <Reveal delay={0.06}>
        <h2 id={id} className="mt-6 max-w-[17ch] text-(length:--text-display)">
          {title}
        </h2>
      </Reveal>

      {lead ? (
        <Reveal as="p" delay={0.12} className="mt-6 max-w-[54ch] text-(length:--text-lead) text-[var(--muted)]">
          {lead}
        </Reveal>
      ) : null}
    </header>
  );
}
