import type { ReactNode } from 'react';

type Variant = 'solid' | 'ghost' | 'tinted';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  /** abre em nova aba com rel de segurança */
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  'aria-label'?: string;
};

const shared =
  'group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 eyebrow transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-marcha)] hover:scale-[1.03] active:scale-[0.99]';

const variants: Record<Variant, string> = {
  solid: 'bg-[var(--fg)] text-[var(--bg)]',
  ghost: 'border border-[var(--hair-strong)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  tinted: 'bg-[var(--glass)] text-[var(--fg)] hover:bg-[var(--tint)]',
};

export function ButtonLink({
  href,
  children,
  variant = 'solid',
  external = false,
  icon,
  className = '',
  ...rest
}: ButtonLinkProps) {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={href} className={`${shared} ${variants[variant]} ${className}`} {...externalProps} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  );
}
