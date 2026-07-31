import Image from 'next/image';
import { logo } from '@/content/media';
import { site } from '@/content/site';

type WordmarkProps = {
  /** altura do logotipo em px; o lettering acompanha proporcionalmente */
  height?: number;
  className?: string;
};

/**
 * Assinatura da marca.
 *
 * Usa o logotipo real assim que existir um arquivo em `public/logo/`
 * (rancho-zimbrao.svg ou .png), medido no build por scripts/prepare-media.mjs.
 * Como o logo é preto sólido, `logo-mark` o inverte nas seções escuras.
 * Enquanto o arquivo não estiver lá, entra o lettering tipográfico.
 */
export function Wordmark({ height = 40, className = '' }: WordmarkProps) {
  if (logo) {
    const width = Math.round((logo.width / logo.height) * height);

    return (
      <Image
        src={logo.src}
        alt={site.name}
        width={width}
        height={height}
        priority
        className={`logo-mark w-auto ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <span className={`flex items-baseline gap-2 leading-none ${className}`}>
      <span className="eyebrow">Rancho</span>{' '}
      <span
        className="font-(family-name:--font-display) font-bold tracking-[-0.04em]"
        style={{ fontSize: height * 0.72 }}
      >
        Zimbrão
      </span>
    </span>
  );
}
