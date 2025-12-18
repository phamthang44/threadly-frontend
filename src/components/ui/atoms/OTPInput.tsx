'use client';

import React, { useRef, useState, useEffect } from 'react';

interface OTPInputProps {
    length?: number;
    onChange: (value: string) => void;
    onComplete?: (value: string) => void;
    disabled?: boolean;
    error?: string;
    inputBgColor?: string;
    inputBorderColor?: string;
    inputBorderColorFocus?: string;
    inputTextColor?: string;
    errorTextColor?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
    length = 6,
    onChange,
    onComplete,
    disabled = false,
    error,
    inputBgColor = 'var(--login-form-input-bg)',
    inputBorderColor = 'var(--login-form-input-border)',
    inputBorderColorFocus = 'var(--login-form-input-border-focus)',
    inputTextColor = 'var(--login-form-input-text)',
    errorTextColor = 'var(--login-form-error-text)',
}) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        if (disabled) return;

        // Only allow digits
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take the last digit if multiple are pasted
        setOtp(newOtp);

        const otpString = newOtp.join('');
        onChange(otpString);

        // Auto-focus next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // Call onComplete when all digits are filled
        if (newOtp.every(digit => digit !== '') && onComplete) {
            onComplete(otpString);
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            if (otp[index]) {
                newOtp[index] = '';
                setOtp(newOtp);
                onChange(newOtp.join(''));
            } else if (index > 0) {
                // Move to previous input if current is empty
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').split('').slice(0, length);

        if (digits.length > 0) {
            const newOtp = [...otp];
            digits.forEach((digit, index) => {
                if (index < length) {
                    newOtp[index] = digit;
                }
            });
            setOtp(newOtp);
            const otpString = newOtp.join('');
            onChange(otpString);

            // Focus on the next empty input or the last input
            const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
            const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
            inputRefs.current[focusIndex]?.focus();

            // Call onComplete if all digits are filled
            if (newOtp.every(digit => digit !== '') && onComplete) {
                onComplete(otpString);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="flex gap-2 justify-center">
                {Array(length)
                    .fill(0)
                    .map((_, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otp[index]}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            disabled={disabled}
                            className="w-12 h-12 text-center font-semibold text-lg rounded-lg border-2 transition-all duration-200 focus:outline-none"
                            style={{
                                backgroundColor: inputBgColor,
                                borderColor: error ? '#ef4444' : otp[index] ? inputBorderColorFocus : inputBorderColor,
                                color: inputTextColor,
                                cursor: disabled ? 'not-allowed' : 'text',
                                opacity: disabled ? 0.5 : 1,
                            }}
                        />
                    ))}
            </div>
            {error && (
                <p className="text-center mt-3 text-sm font-medium" style={{ color: errorTextColor }}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default OTPInput;

