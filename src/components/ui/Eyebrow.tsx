type EyebrowProps = {
  children: string;
  className?: string;
};

/** Etiqueta em cápsula que abre cada seção. */
export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p
      className={`inline-flex items-center gap-3 rounded-full border border-[var(--hair)] py-2 pl-3 pr-5 eyebrow text-[var(--accent)] ${className}`}
    >
      <span aria-hidden className="block size-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
      {children}
    </p>
  );
}
