import React from 'react';
import { twMerge } from 'tailwind-merge';

const GlassCard = ({ children, className }) => {
  return (
    <div className={twMerge(
      "bg-white/60 backdrop-blur-md border border-white/50 shadow-soft rounded-3xl p-6",
      className
    )}>
      {children}
    </div>
  );
};

export default GlassCard;