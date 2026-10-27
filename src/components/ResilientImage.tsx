import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  className?: string;
  containerClassName?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative w-full h-full overflow-hidden bg-zinc-900',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div className="flex flex-col justify-between w-full h-full p-8 bg-gradient-to-br from-zinc-900 via-zinc-800 to-slate-900 text-zinc-100">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>WORDPRESS ARCHITECTURE PREVIEW</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="my-auto py-6">
            <p className="text-lg font-semibold tracking-tight text-white font-display">
              {fallbackTitle}
            </p>
            {fallbackSubtitle && (
              <p className="mt-1 text-sm text-zinc-400">{fallbackSubtitle}</p>
            )}
          </div>
          <div className="pt-4 border-t border-zinc-800 text-xs text-zinc-400">
            <span>Gutenberg Block API v3 · High-Concurrency Edge Stack</span>
          </div>
        </div>
      )}
    </div>
  );
};
