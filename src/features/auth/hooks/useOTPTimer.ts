import { useState, useEffect, useCallback, useRef } from 'react';

interface UseOTPTimerOptions {
    initialSeconds?: number;
    onComplete?: () => void;
}

export const useOTPTimer = ({ initialSeconds = 300, onComplete }: UseOTPTimerOptions = {}) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const start = useCallback(() => {
        setIsRunning(true);
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    const stop = useCallback(() => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    const reset = useCallback(() => {
        stop();
        setSeconds(initialSeconds);
    }, [stop, initialSeconds]);

    useEffect(() => {
        if (!isRunning) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    setIsRunning(false);
                    onComplete?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, onComplete]);

    const formatTime = useCallback(() => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }, [seconds]);

    return {
        seconds,
        isRunning,
        start,
        stop,
        reset,
        formatTime,
    };
};

