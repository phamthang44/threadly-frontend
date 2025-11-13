import { useState, useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';

export const useLoginRequired = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [featureName, setFeatureName] = useState('This feature');
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const openModal = useCallback((feature: string = 'This feature') => {
    setFeatureName(feature);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const checkAuthAndProceed = useCallback((
    callback: () => void,
    featureName: string = 'This feature'
  ) => {
    if (!isAuthenticated) {
      openModal(featureName);
      return false;
    }
    callback();
    return true;
  }, [isAuthenticated, openModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    checkAuthAndProceed,
    isAuthenticated,
    featureName,
  };
};

