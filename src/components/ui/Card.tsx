import React from 'react';
import css from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glow?: boolean;
}

export default function Card({ children, className = '', hoverable = false, glow = false }: CardProps) {
  const classes = `
    ${css.card} 
    ${hoverable ? css.hoverable : ''} 
    ${glow ? css.glow : ''} 
    ${className}
  `.trim();

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
