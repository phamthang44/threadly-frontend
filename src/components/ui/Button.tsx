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
    (
        {
            variant, // kept for compatibility, not applied
            size,    // kept for compatibility, not applied
            isLoading = false,
            icon,
            fullWidth = false,
            className = '',
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'font-montserrat';
        const widthClass = fullWidth ? 'w-full' : '';

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                aria-busy={isLoading || undefined}
                className={`${baseStyles} ${widthClass} ${className}`}
                {...props}
            >
                {icon && icon}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
