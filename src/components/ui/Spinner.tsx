import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary' }) => {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  const colorStyles = {
    primary: 'border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400',
    secondary: 'border-secondary-200 dark:border-secondary-800 border-t-secondary-600 dark:border-t-secondary-400',
    white: 'border-white border-opacity-25 border-t-white',
  };

  return (
    <div className={`${sizeStyles[size]} ${colorStyles[color]} rounded-full animate-spin`} />
  );
};

export default Spinner;

