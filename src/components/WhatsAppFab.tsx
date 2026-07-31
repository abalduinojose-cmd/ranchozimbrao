import { site, whatsappUrl } from '@/content/site';
import { WhatsAppIcon } from './ui/Icons';

/**
 * Botão flutuante de WhatsApp.
 *
 * Só o ícone, num disco limpo, sempre ao alcance do polegar no canto
 * inferior direito. Sem rótulo: o texto vive nos CTAs das seções, aqui o
 * que importa é não cobrir o conteúdo.
 */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[var(--color-whats)] text-white shadow-[0_10px_30px_rgba(11,11,12,0.32)] transition-[transform,background-color] duration-200 ease-[var(--ease-marcha)] hover:scale-[1.08] hover:bg-[var(--color-whats-hover)] active:scale-[0.98] sm:bottom-7 sm:right-7 sm:size-15"
    >
      <WhatsAppIcon width={26} height={26} />
      <span className="sr-only">Fale conosco pelo WhatsApp, {site.whatsapp.display}</span>
    </a>
  );
}
