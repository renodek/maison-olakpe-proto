import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  note: number;
  small?: boolean;
  showCount?: boolean;
}

export default function StarRating({ note, small = false, showCount = true }: StarRatingProps) {
  const fullStars = Math.floor(note);
  const hasHalf = note - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div
      className={cn('flex items-center gap-0.5', small ? 'text-xs' : 'text-sm')}
      aria-label={`Note : ${note} sur 5`}
      role="img"
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn('fill-jaune text-jaune', small ? 'w-3.5 h-3.5' : 'w-4 h-4')}
          strokeWidth={1.5}
        />
      ))}
      {hasHalf && (
        <StarHalf
          className={cn('fill-jaune text-jaune', small ? 'w-3.5 h-3.5' : 'w-4 h-4')}
          strokeWidth={1.5}
        />
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn('text-sable', small ? 'w-3.5 h-3.5' : 'w-4 h-4')}
          strokeWidth={1.5}
        />
      ))}
      {showCount && (
        <span className="text-nuit/50 dark:text-creme/50 text-xs ml-1">({note})</span>
      )}
    </div>
  );
}
