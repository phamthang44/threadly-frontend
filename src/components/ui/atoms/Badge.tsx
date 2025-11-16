import React from 'react';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  onClose?: () => void;
}

const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'md',
  onClose,
}) => {
  const variantStyles = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200',
    secondary: 'bg-secondary-100 dark:bg-secondary-900 text-secondary-700 dark:text-secondary-200',
    success: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200',
    warning: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200',
    danger: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200',
    info: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}>
      <span>{label}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-1 hover:opacity-70 transition-opacity"
          aria-label="Remove badge"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Badge;

