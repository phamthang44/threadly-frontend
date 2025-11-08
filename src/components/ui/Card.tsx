import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  hover?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-lg bg-white dark:bg-gray-800 transition-all duration-200';

    const variantStyles = {
      default: 'border border-gray-200 dark:border-gray-700',
      elevated: 'shadow-md hover:shadow-lg bg-white dark:bg-gray-800',
      outlined: 'border-2 border-blue-200 dark:border-blue-900',
    };

    const hoverClass = hover ? 'hover:shadow-lg hover:scale-105 cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${hoverClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

