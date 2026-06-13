'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackColor?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

export default function SafeImage({
  src,
  alt,
  className = '',
  fallbackColor = '#E8DCC8',
  fill = false,
  width,
  height,
  sizes,
  priority = false,
  quality = 85,
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center ${className}`}
        style={{ backgroundColor: fallbackColor }}
      >
        <span className="text-creme/60 text-sm font-sans italic">{alt}</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
        className={className}
        onError={() => setError(true)}
        priority={priority}
        quality={quality}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 400}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
      priority={priority}
      quality={quality}
    />
  );
}
