import type { ReactNode } from 'react';
import { whatsappUrl } from '@/content/site';
import { WhatsAppIcon } from './Icons';

type Size = 'sm' | 'md' | 'lg';
type Tone = 'brand' | 'solid' | 'outline';

type WhatsAppButtonProps = {
  /** mensagem já preenchida na conversa */
  message?: string;
  children: ReactNode;
  size?: Size;
  tone?: Tone;
  className?: string;
};

const sizes: Record<Size, string> = {
  sm: 'min-h-11 gap-2 pl-4 pr-5 text-[0.7rem]',
  md: 'min-h-13 gap-2.5 pl-5 pr-6',
  lg: 'min-h-15 gap-3 pl-6 pr-8',
};

const icons: Record<Size, number> = { sm: 16, md: 18, lg: 20 };

/**
 * Botão de WhatsApp da casa.
 *
 * Um único componente para todos os pontos de contato, com três tons:
 * `brand` no verde do WhatsApp, `solid` no contraste do tema e `outline`
 * para uso secundário. O ícone fica num disco próprio, o rótulo em cápsula,
 * e o conjunto ganha um leve realce no hover, sem deslocar o layout.
 */
export function WhatsAppButton({
  message,
  children,
  size = 'md',
  tone = 'brand',
  className = '',
}: WhatsAppButtonProps) {
  const tones: Record<Tone, string> = {
    brand: 'bg-[var(--color-whats)] text-white hover:bg-[var(--color-whats-hover)]',
    solid: 'bg-[var(--fg)] text-[var(--bg)]',
    outline: 'border border-[var(--hair-strong)] text-[var(--fg)] hover:border-[var(--accent)]',
  };

  const badge: Record<Tone, string> = {
    brand: 'bg-white/20 text-white',
    solid: 'bg-[var(--bg)]/12 text-[var(--bg)]',
    outline: 'bg-[var(--glass)] text-[var(--accent)]',
  };

  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center whitespace-nowrap rounded-full eyebrow transition-[transform,background-color,border-color] duration-200 ease-[var(--ease-marcha)] hover:scale-[1.03] active:scale-[0.99] ${sizes[size]} ${tones[tone]} ${className}`}
    >
      <span
        aria-hidden
        className={`flex size-8 items-center justify-center rounded-full ${badge[tone]}`}
      >
        <WhatsAppIcon width={icons[size]} height={icons[size]} />
      </span>
      <span>{children}</span>
    </a>
  );
}
