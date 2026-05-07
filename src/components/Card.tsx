import React from 'react';
import { motion } from 'motion/react';
import { Celebrity } from '../types.ts';
import { cn } from '../lib/utils.ts';
import { Lock, User } from 'lucide-react';

interface CardProps {
  key?: React.Key;
  celebrity: Celebrity;
  isEliminated?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  showCategory?: boolean;
  small?: boolean;
}

export default function Card({ 
  celebrity, 
  isEliminated, 
  isSelected, 
  onClick, 
  disabled,
  showCategory = true,
  small = false
}: CardProps) {
  return (
    <motion.div
      whileHover={!disabled && !isEliminated ? { y: -4, scale: 1.02 } : {}}
      whileTap={!disabled && !isEliminated ? { scale: 0.98 } : {}}
      onClick={() => !disabled && onClick?.()}
      className={cn(
        "relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer transition-all duration-300",
        isEliminated 
          ? "bg-white/5 border border-white/5 opacity-30 grayscale" 
          : "bg-surface-hover border border-white/10 shadow-lg hover:border-accent-cyan/30",
        disabled && !isSelected && "cursor-default",
        small ? "w-24 h-32" : "w-full"
      )}
    >
      <img
        src={celebrity.imageUrl}
        alt={celebrity.name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-1.5 sm:p-3 flex flex-col justify-end">
        {showCategory && !isEliminated && (
          <span className="text-[6px] sm:text-[8px] uppercase tracking-[0.1em] sm:tracking-[0.15em] text-accent-cyan font-black mb-0">
            {celebrity.category}
          </span>
        )}
        <h3 className={cn(
          "text-slate-100 font-bold leading-tight line-clamp-2",
          small ? "text-[8px]" : "text-[10px] sm:text-sm"
        )}>
          {celebrity.name}
        </h3>
      </div>

      {/* Eliminated Overlay */}
      {isEliminated && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="w-full h-[1px] bg-red-500/30 rotate-45 scale-150" />
        </div>
      )}

      {/* Selection Badge removed per user request */}
    </motion.div>
  );
}
