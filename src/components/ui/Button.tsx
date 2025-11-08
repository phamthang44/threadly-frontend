import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon,
    fullWidth = false,
    className = '',
    disabled,
    children,
    ...props
  }, ref) => {
    const baseStyles = 'font-montserrat font-medium transition-all duration-200 cursor-pointer rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-md hover:shadow-lg',
      secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500 shadow-md hover:shadow-lg',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900 focus:ring-primary-500',
      ghost: 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-dark-800',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg',
    };

    const sizeStyles = {
      xs: 'px-3 py-1.5 text-xs gap-2',
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-2.5 text-base gap-2',
      lg: 'px-8 py-3 text-lg gap-3',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${widthClass}
          flex items-center justify-center
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          <>
            {icon && <span className="flex items-center justify-center">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

