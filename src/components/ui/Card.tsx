import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'gradient' | 'bordered';
}

export function Card({ children, className = '', onClick, variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-card dark:bg-gray-800 shadow-eco hover:shadow-eco-lg border border-gray-100 dark:border-gray-700',
    gradient: 'bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 shadow-eco hover:shadow-eco-lg border border-primary/20',
    bordered: 'bg-white dark:bg-gray-800 shadow-lg border-2 border-primary/30 hover:border-primary',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl transition-all duration-300 ${
        onClick ? 'cursor-pointer transform hover:scale-[1.02]' : ''
      } ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-lg font-bold text-textPrimary dark:text-white ${className}`}>
      {children}
    </h3>
  );
}
