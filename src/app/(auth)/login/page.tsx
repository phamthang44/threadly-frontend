'use client';

import React from 'react';
import { LoginView } from '@/features/auth/components';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();

  const handleLoginSubmit = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you would authenticate here
    router.push('/');
  };
    //onSubmit={handleLoginSubmit}
  return <LoginView />;
};

export default LoginPage;

