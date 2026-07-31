import { Section } from '@/components/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { LazyMap } from '@/components/ui/LazyMap';
import {
  ArrowIcon,
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  PinIcon,
} from '@/components/ui/Icons';
import { contato } from '@/content/sections';
import { addressLine, site } from '@/content/site';

const headingId = 'contato-titulo';

// Rota até as coordenadas exatas do perfil, não até o texto do endereço.
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.geo.latitude},${site.geo.longitude}`;

/**
 * Contato e localização.
 *
 * O mapa ocupa o bloco inteiro e as informações ficam num painel de vidro
 * por cima, no desktop, ou logo abaixo, no mobile. Assim a localização vira
 * o assunto da seção em vez de um quadrado ao lado do texto.
 */
export function Contato() {
  return (
    <Section id={contato.id} theme="light" labelledBy={headingId} className="depth">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>{contato.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id={headingId} className="mt-6 max-w-[14ch] text-(length:--text-display)">
                {contato.title}
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="flex flex-col items-start gap-5">
            <p className="max-w-[42ch] text-(length:--text-lead) text-[var(--muted)]">
              {contato.lead}
            </p>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton size="lg">Fale conosco</WhatsAppButton>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-15 items-center gap-3 rounded-full border border-[var(--hair-strong)] px-6 eyebrow transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <PinIcon width={18} height={18} />
                Como chegar
                <ArrowIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-300 ease-[var(--ease-marcha)] group-hover:translate-x-1"
                />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative overflow-hidden rounded-(--radius-xl) shadow-[var(--shadow-soft)]">
            <LazyMap query={contato.mapQuery} title={`Mapa com a localização do ${site.name}`} />

            {/* Painel de informações: sobreposto no desktop, empilhado no mobile */}
            <div className="glass mt-4 grid gap-7 rounded-(--radius-lg) p-7 shadow-[var(--shadow-lift)] sm:grid-cols-2 lg:absolute lg:bottom-7 lg:left-7 lg:mt-0 lg:max-w-lg lg:grid-cols-1 lg:p-9">
              <div className="flex gap-4">
                <PinIcon className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="eyebrow text-[var(--muted)]">Onde ficamos</p>
                  <p className="mt-2 font-(family-name:--font-display) text-xl font-semibold tracking-[-0.03em]">
                    {addressLine()}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ClockIcon className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <div>
                  <p className="eyebrow text-[var(--muted)]">Horários</p>
                  <ul className="mt-2 flex flex-col gap-1">
                    {site.openingHoursDisplay.map((slot) => (
                      <li key={slot.label} className="flex flex-wrap gap-x-3">
                        <span className="text-[var(--muted)]">{slot.label}</span>
                        <span>{slot.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <ul className="flex flex-wrap gap-3 pt-1 sm:col-span-2 lg:col-span-1">
                <li>
                  <a
                    href={site.social.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[var(--hair-strong)] px-5 eyebrow transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <InstagramIcon width={16} height={16} />
                    {site.social.instagram.label}
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-[var(--hair-strong)] px-5 eyebrow transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    <FacebookIcon width={16} height={16} />
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
