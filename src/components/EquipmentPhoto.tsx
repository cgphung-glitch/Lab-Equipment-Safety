import React, { useState } from 'react';
import { SchematicIcon } from './SchematicIcon';

interface EquipmentPhotoProps {
  imageUrl?: string;
  name: string;
  schematicIcon: string;
  className?: string;
  aspectRatio?: '4/3' | '16/9' | '1/1' | 'auto';
  highResBanner?: boolean;
}

export const EquipmentPhoto: React.FC<EquipmentPhotoProps> = ({
  imageUrl,
  name,
  schematicIcon,
  className = '',
  aspectRatio = '4/3',
  highResBanner = false
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = aspectRatio === '4/3' 
    ? 'aspect-4/3' 
    : aspectRatio === '16/9' 
    ? 'aspect-video' 
    : aspectRatio === '1/1' 
    ? 'aspect-square' 
    : '';

  // If there's an image and no error has occurred yet
  if (imageUrl && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 ${aspectClass} ${className}`}>
        {/* Subtle blur placeholder while image loads */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-4">
            <SchematicIcon type={schematicIcon} className="w-16 h-16 opacity-40 animate-pulse text-blue-400" />
            <span className="text-xs text-slate-400 font-mono mt-2">Loading optical imagery...</span>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={`High-resolution laboratory equipment: ${name}`}
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Studio grade contrast scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

        {/* High-res badge indicator */}
        {highResBanner && (
          <div className="absolute top-2.5 right-2.5 px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono text-cyan-300 tracking-wider">
            STUDIO 8K
          </div>
        )}
      </div>
    );
  }

  // Resilient Scientific Schematic Fallback
  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center bg-slate-900/90 text-slate-200 border border-slate-800 ${aspectClass} ${className}`}
      aria-label={`Schematic diagram: ${name}`}
    >
      {/* Background blueprint grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.4) 1px, transparent 0)`,
          backgroundSize: '16px 16px'
        }} 
      />

      {/* Schematic Diagram Icon */}
      <div className="relative z-10 p-4 flex flex-col items-center text-center">
        <SchematicIcon type={schematicIcon} className="w-20 h-20 text-cyan-400 drop-shadow-md" />
        <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mt-2">
          Technical Schematic
        </span>
      </div>

      {/* Hairline corner accents */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500/40 pointer-events-none" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500/40 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500/40 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500/40 pointer-events-none" />
    </div>
  );
};
