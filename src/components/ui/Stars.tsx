import { StarIcon } from './Icons';

type StarsProps = {
  rating: number;
  max?: number;
  className?: string;
};

/**
 * Nota em estrelas. O valor também vai em texto para leitores de tela,
 * então a informação nunca depende só da forma ou da cor.
 */
export function Stars({ rating, max = 5, className = '' }: StarsProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {Array.from({ length: max }, (_, index) => (
        <StarIcon
          key={index}
          className={index < Math.round(rating) ? 'text-[#E2A03F]' : 'text-[var(--hair-strong)]'}
        />
      ))}
      <span className="sr-only">
        Nota {rating.toString().replace('.', ',')} de {max}
      </span>
    </span>
  );
}
