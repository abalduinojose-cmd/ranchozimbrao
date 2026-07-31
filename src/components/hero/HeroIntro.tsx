import { site } from '@/content/site';
import { ButtonLink } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ArrowIcon } from '@/components/ui/Icons';

/**
 * Entrada orquestrada do hero: etiqueta, título linha a linha, apoio e CTAs.
 *
 * É um server component e a animação é CSS. Foi uma decisão de performance:
 * animar o hero com Motion só começava depois da hidratação e empurrava o
 * LCP para 4s. Em CSS a orquestração roda no primeiro paint, sem JS nenhum.
 *
 * A quebra vem de `site.taglineLines`, então o reveal é por linha de verdade,
 * nunca por letra. `prefers-reduced-motion` zera duração e delay no globals.
 */
export function HeroIntro() {
  return (
    <div>
      <p
        className="hero-fade inline-flex items-center gap-3 rounded-full border border-[var(--hair)] bg-[rgba(11,11,12,0.35)] py-2 pl-3 pr-5 eyebrow text-[var(--accent)] backdrop-blur-sm"
        style={{ animationDelay: '0.04s' }}
      >
        <span aria-hidden className="block size-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
        Criatório {site.breed}
      </p>

      {/* Sem `nowrap`: em telas estreitas cada linha declarada quebra dentro
          da própria máscara, e o reveal continua correto porque a máscara
          acompanha a altura do bloco. */}
      {/* `text-wrap: normal` no hero: o `balance` herdado do base recalcula
          a distribuição das linhas depois do layout e, como o bloco é
          ancorado embaixo, esse recálculo empurrava o hero inteiro (CLS). */}
      <h1 className="mt-6 max-w-[16ch] text-(length:--text-hero) [text-wrap:normal] sm:max-w-none">
        {site.taglineLines.map((text, index) => (
          <span key={text} className="line-mask">
            <span className="hero-line block" style={{ animationDelay: `${index * 0.06}s` }}>
              {text}
            </span>
          </span>
        ))}
      </h1>

      <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <p
          className="hero-fade max-w-[42ch] text-(length:--text-lead) text-[var(--color-paper)]/80"
          style={{ animationDelay: '0.22s' }}
        >
          {site.subline}
        </p>

        <div className="hero-fade flex flex-wrap gap-3" style={{ animationDelay: '0.34s' }}>
          <WhatsAppButton size="lg">Fale conosco</WhatsAppButton>
          <ButtonLink
            href="#plantel"
            variant="ghost"
            className="min-h-15 bg-[rgba(11,11,12,0.35)] backdrop-blur-sm"
            icon={<ArrowIcon width={18} height={18} className="rotate-90" />}
          >
            Ver o plantel
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
