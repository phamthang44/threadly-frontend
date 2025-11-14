'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import InstagramIconBrand from '../../../components/ui/InstagramIconBrand';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
}

const LoginRequiredModalMobile: React.FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
  featureName = 'This feature',
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <div
          className="
            w-full max-w-sm
            bg-[#0A0A0A] dark:bg-[#0A0A0A]
            rounded-t-3xl sm:rounded-2xl
            shadow-2xl
            transform transition-all duration-200
            border border-[#383939]
            overflow-hidden
          "
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-6 border-b border-[#383939]">
            <h2 className="text-lg font-semibold text-white">
              Join Threadly
            </h2>
            <button
              onClick={onClose}
              className="
                text-[#A0A0A0] hover:text-white
                transition-colors duration-150
                p-1 rounded-full hover:bg-[#1A1A1A]
              "
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-8 text-center">
            <p className="text-[#A0A0A0] text-sm mb-2">
              {featureName} is only available to Threadly members.
            </p>
            <p className="text-[#808080] text-xs mb-8">
              Join Threadly to share thoughts, find out what's going on, follow people and more.
            </p>

            {/* Threads Logo Icon (optional decorative element) */}
            <div className="flex justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
            </div>

            {/* CTA Button - Instagram Login */}
            <button
              onClick={handleLoginClick}
              className="
                w-full
                bg-gradient-to-r from-purple-600 to-pink-600
                hover:from-purple-700 hover:to-pink-700
                text-white
                font-semibold
                py-3
                px-4
                rounded-xl
                transition-all duration-200
                flex items-center justify-center gap-3
                mb-3
              "
            >
              <InstagramIconBrand />
              <span>Continue with Instagram</span>
            </button>

            {/* Secondary action */}
            <button
              onClick={onClose}
              className="
                w-full
                bg-[#262626]
                hover:bg-[#363636]
                text-white
                font-semibold
                py-3
                px-4
                rounded-xl
                transition-all duration-200
              "
            >
              Not now
            </button>
          </div>

          {/* Footer info */}
          <div className="px-6 py-4 bg-[#161616] border-t border-[#383939]">
            <p className="text-[#808080] text-xs text-center leading-relaxed">
              By continuing, you agree to our{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRequiredModalMobile;

