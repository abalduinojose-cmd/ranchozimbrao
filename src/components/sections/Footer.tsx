import { Section } from '@/components/Section';
import { Marquee } from '@/components/ui/Marquee';
import { Wordmark } from '@/components/ui/Wordmark';
import { ArrowIcon, FacebookIcon, InstagramIcon } from '@/components/ui/Icons';
import { footer } from '@/content/sections';
import { site } from '@/content/site';

const year = new Date().getFullYear();

const socials = [
  { ...site.social.instagram, Icon: InstagramIcon },
  { label: 'Facebook', url: site.social.facebook.url, Icon: FacebookIcon },
];

/**
 * Rodapé.
 *
 * Sem divisórias: a hierarquia vem do espaço e do peso do texto. A marca
 * abre o bloco, os destinos ficam em coluna própria e o encerramento
 * respira longe de tudo.
 */
export function Footer() {
  return (
    <Section theme="dark" as="footer" flush className="depth pt-4 pb-12">
      <Marquee items={site.marquee} className="border-x-0 border-b-0 text-[var(--muted)]" />

      <div className="shell">
        <div className="mt-20 grid gap-16 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12 lg:mt-24">
          <div>
            <Wordmark height={48} />
            <p className="mt-7 max-w-[34ch] text-sm leading-relaxed text-[var(--muted)]">
              {site.description}
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="eyebrow text-[var(--muted)]">Navegar</p>
            <ul className="mt-5 flex flex-col gap-1">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="group inline-flex min-h-11 items-center gap-2 eyebrow transition-colors hover:text-[var(--accent)]"
                  >
                    {item.label}
                    <ArrowIcon
                      width={14}
                      height={14}
                      className="opacity-0 transition-all duration-300 ease-[var(--ease-marcha)] group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-[var(--muted)]">Falar com a gente</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`tel:+${site.whatsapp.e164}`}
                  className="inline-flex min-h-11 items-center font-(family-name:--font-display) text-xl font-bold tracking-[-0.03em] transition-colors hover:text-[var(--accent)]"
                >
                  {site.whatsapp.display}
                </a>
              </li>
              {socials.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2.5 eyebrow text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                  >
                    <social.Icon width={16} height={16} />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* pr extra no fim da linha para o último item não ficar sob o botão
            flutuante do WhatsApp */}
        <div className="mt-24 flex flex-col gap-4 pb-16 text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:pb-0 sm:pr-28">
          <p className="eyebrow">
            © {year} {site.legalName}
          </p>
          <p className="eyebrow">{footer.credit}</p>
          <a
            href="#topo"
            className="group inline-flex min-h-11 items-center gap-2 eyebrow transition-colors hover:text-[var(--fg)]"
          >
            Voltar ao topo
            <ArrowIcon
              width={14}
              height={14}
              className="-rotate-90 transition-transform duration-300 ease-[var(--ease-marcha)] group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </Section>
  );
}
