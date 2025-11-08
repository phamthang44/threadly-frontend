import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            {label}
            {props.required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 ${icon ? 'pl-10' : ''} rounded-lg
              border-2 border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-gray-50
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800
              transition-all duration-200
              disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50
              ${error ? 'border-red-500 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

