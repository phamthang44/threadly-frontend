import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <div
          className={`
            w-full ${sizeStyles[size]}
            bg-white dark:bg-gray-900
            shadow-2xl
            transform transition-all duration-200 ease-out
            animate-slideUp sm:animate-fadeIn
            overflow-hidden
            rounded-t-2xl sm:rounded-xl
          `}
        >
          {/* Title Header */}
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-50">{title}</h2>
            </div>
          )}

          {/* Content */}
          {children}

          {/* Footer */}
          {footer && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;

