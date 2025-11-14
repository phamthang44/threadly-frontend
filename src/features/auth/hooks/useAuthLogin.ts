'use client';

import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { setCredentials } from '@/store/authSlice';
import { LoginRequest } from '@/features/auth/types';

export const useAuthLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();

    const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            // Call your auth service endpoint here
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();

            // Store token and user in Redux
            dispatch(setCredentials({
                user: data.user,
                accessToken: data.accessToken,
            }));

            return true;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An error occurred';
            setError(message);
            console.error('Login error:', err);
            return false;
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return { login, loading, error };
};

