import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'avatar',
  size = 'md',
  initials,
  className = '',
}) => {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl',
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeStyles[size]} rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        ${sizeStyles[size]}
        rounded-full
        bg-gradient-to-br from-primary-500 to-secondary-500
        text-white
        flex items-center justify-center
        font-semibold
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default Avatar;

