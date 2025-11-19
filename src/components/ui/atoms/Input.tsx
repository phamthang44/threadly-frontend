import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string | React.ReactNode;
    icon?: React.ReactNode;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, helperText, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium mb-2">
                        {label}
                        {props.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`w-full transition-all duration-200 ${icon ? 'pl-10' : ''} ${className}`}
                        {...props}
                    />
                </div>
                {error && (
                    <span className="text-red-400 text-sm mt-1 block">{error}</span>
                )}
                {helperText && !error && (
                    <p className="text-sm mt-1">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
