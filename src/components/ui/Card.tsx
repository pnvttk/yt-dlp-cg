import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', title, onClick }: CardProps) {
  return (
    <div 
      className={`glass-panel rounded-lg p-6 ${className}`}
      onClick={onClick}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
}
