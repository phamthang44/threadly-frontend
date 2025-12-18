'use client';

import React, { useState, useCallback } from 'react';
import { Button, Input } from '@/components/ui';
import OTPInput from '@/components/ui/atoms/OTPInput';
import { useOTPTimer } from '@/features/auth/hooks/useOTPTimer';
import { Mail, CheckCircle, AlertCircle, Clock } from 'lucide-react';

type OTPFlowStep = 'email' | 'otp' | 'verify';

interface OTPEmailFlowProps {
    onSubmit: (email: string, otp: string) => Promise<boolean>;
    onCancel?: () => void;
    emailInputBgColor?: string;
    emailInputBorderColor?: string;
    emailInputBorderColorFocus?: string;
    emailInputTextColor?: string;
    buttonBgColor?: string;
    buttonTextColor?: string;
    buttonBgColorDisabled?: string;
    buttonTextColorDisabled?: string;
    timerTextColor?: string;
    successTextColor?: string;
    errorTextColor?: string;
    otpResendWaitSeconds?: number;
    otpExpireSeconds?: number;
}

const OTPEmailFlow: React.FC<OTPEmailFlowProps> = ({
    onSubmit,
    onCancel,
    emailInputBgColor = 'var(--login-form-input-bg)',
    emailInputBorderColor = 'var(--login-form-input-border)',
    emailInputBorderColorFocus = 'var(--login-form-input-border-focus)',
    emailInputTextColor = 'var(--login-form-input-text)',
    buttonBgColor = 'var(--login-form-button-bg)',
    buttonTextColor = 'var(--login-form-button-text)',
    buttonBgColorDisabled = 'var(--login-form-button-bg-disabled)',
    buttonTextColorDisabled = 'var(--login-form-button-text-disabled)',
    timerTextColor = 'var(--login-view-text-secondary)',
    successTextColor = '#10b981',
    errorTextColor = 'var(--login-form-error-text)',
    otpResendWaitSeconds = 60,
    otpExpireSeconds = 300,
}) => {
    const [step, setStep] = useState<OTPFlowStep>('email');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Timer for OTP expiration (5 minutes)
    const otpTimer = useOTPTimer({
        initialSeconds: otpExpireSeconds,
        onComplete: () => {
            setError('OTP expired. Please request a new one.');
            setStep('email');
        },
    });

    // Timer for resend button (60 seconds)
    const resendTimer = useOTPTimer({
        initialSeconds: otpResendWaitSeconds,
    });

    const handleRequestOTP = async () => {
        setError('');
        setSuccessMessage('');

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Call your API to send OTP
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to send OTP');
            }

            setStep('otp');
            setSuccessMessage('OTP sent to your email. Check your inbox!');
            otpTimer.start();
            resendTimer.start();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError('');
        setSuccessMessage('');
        setOtp('');

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/send-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to resend OTP');
            }

            setSuccessMessage('OTP resent to your email!');
            otpTimer.reset();
            otpTimer.start();
            resendTimer.reset();
            resendTimer.start();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setError('');
        setSuccessMessage('');

        if (!otp || otp.length !== 6) {
            setError('Please enter the complete OTP code');
            return;
        }

        setIsLoading(true);

        try {
            setStep('verify');
            const success = await onSubmit(email, otp);

            if (success) {
                setSuccessMessage('Email verified successfully!');
                otpTimer.stop();
                resendTimer.stop();
                // You can redirect or call a callback here
            } else {
                setError('Invalid OTP. Please try again.');
                setStep('otp');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
            setStep('otp');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToEmail = () => {
        setError('');
        setSuccessMessage('');
        setOtp('');
        setEmail('');
        setStep('email');
        otpTimer.stop();
        resendTimer.stop();
    };

    return (
        <div className="w-full space-y-6">
            {step === 'email' && (
                <div className="space-y-4">
                    <div className="text-center space-y-2">
                        <Mail size={40} style={{ margin: '0 auto', color: buttonBgColor }} />
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: emailInputTextColor }}
                        >
                            Email Verification
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: timerTextColor }}
                        >
                            Enter your email to receive an OTP code
                        </p>
                    </div>

                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        disabled={isLoading}
                        autoComplete="email"
                        className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none"
                        style={{
                            backgroundColor: emailInputBgColor,
                            borderColor: email ? emailInputBorderColorFocus : emailInputBorderColor,
                            color: emailInputTextColor,
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = emailInputBorderColorFocus;
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = email
                                ? emailInputBorderColorFocus
                                : emailInputBorderColor;
                        }}
                    />

                    {error && (
                        <div className="flex items-center gap-2" style={{ color: errorTextColor }}>
                            <AlertCircle size={18} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <Button
                        onClick={handleRequestOTP}
                        disabled={!email.trim() || isLoading}
                        className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
                        style={{
                            backgroundColor: !email.trim() || isLoading ? buttonBgColorDisabled : buttonBgColor,
                            color: !email.trim() || isLoading ? buttonTextColorDisabled : buttonTextColor,
                            cursor: !email.trim() || isLoading ? 'not-allowed' : 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            if (email.trim() && !isLoading) {
                                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.01)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                        }}
                    >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>

                    {onCancel && (
                        <Button
                            onClick={onCancel}
                            className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
                            style={{
                                backgroundColor: 'transparent',
                                color: buttonBgColor,
                                border: `1px solid ${buttonBgColor}`,
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            )}

            {step === 'otp' && (
                <div className="space-y-4">
                    <div className="text-center space-y-2">
                        <CheckCircle size={40} style={{ margin: '0 auto', color: successTextColor }} />
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: emailInputTextColor }}
                        >
                            Enter OTP Code
                        </h2>
                        <p
                            className="text-sm"
                            style={{ color: timerTextColor }}
                        >
                            We sent a code to <span className="font-semibold">{email}</span>
                        </p>
                    </div>

                    {successMessage && (
                        <div
                            className="flex items-center gap-2 bg-green-500/10 p-3 rounded-lg"
                            style={{ color: successTextColor, borderLeft: `3px solid ${successTextColor}` }}
                        >
                            <CheckCircle size={18} />
                            <span className="text-sm">{successMessage}</span>
                        </div>
                    )}

                    <OTPInput
                        length={6}
                        onChange={(value) => {
                            setOtp(value);
                            setError('');
                        }}
                        onComplete={handleVerifyOTP}
                        disabled={isLoading}
                        error={error}
                        inputBgColor={emailInputBgColor}
                        inputBorderColor={emailInputBorderColor}
                        inputBorderColorFocus={emailInputBorderColorFocus}
                        inputTextColor={emailInputTextColor}
                        errorTextColor={errorTextColor}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1" style={{ color: timerTextColor }}>
                            <Clock size={16} />
                            <span className="text-sm">
                                OTP expires in: <span style={{ color: buttonBgColor }}>{otpTimer.formatTime()}</span>
                            </span>
                        </div>
                        {otpTimer.seconds < 30 && (
                            <span
                                className="text-xs font-semibold"
                                style={{ color: errorTextColor }}
                            >
                                Expiring soon!
                            </span>
                        )}
                    </div>

                    <Button
                        onClick={handleVerifyOTP}
                        disabled={!otp || otp.length !== 6 || isLoading || !otpTimer.isRunning}
                        className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
                        style={{
                            backgroundColor:
                                !otp || otp.length !== 6 || isLoading || !otpTimer.isRunning
                                    ? buttonBgColorDisabled
                                    : buttonBgColor,
                            color:
                                !otp || otp.length !== 6 || isLoading || !otpTimer.isRunning
                                    ? buttonTextColorDisabled
                                    : buttonTextColor,
                            cursor:
                                !otp || otp.length !== 6 || isLoading || !otpTimer.isRunning
                                    ? 'not-allowed'
                                    : 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            if (otp && otp.length === 6 && !isLoading && otpTimer.isRunning) {
                                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.01)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                        }}
                    >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Button>

                    <div className="text-center space-y-3">
                        <p className="text-sm" style={{ color: timerTextColor }}>
                            Didn&#x27;t receive the code?
                        </p>
                        <Button
                            onClick={handleResendOTP}
                            disabled={resendTimer.isRunning || isLoading}
                            className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200"
                            style={{
                                backgroundColor: 'transparent',
                                color: resendTimer.isRunning ? timerTextColor : buttonBgColor,
                                border: `1px solid ${resendTimer.isRunning ? timerTextColor : buttonBgColor}`,
                                cursor: resendTimer.isRunning ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {resendTimer.isRunning
                                ? `Resend in ${resendTimer.formatTime()}`
                                : 'Resend OTP'}
                        </Button>

                        <Button
                            onClick={handleBackToEmail}
                            className="w-full rounded-lg px-4 py-2 font-semibold transition-all duration-200 text-sm"
                            style={{
                                backgroundColor: 'transparent',
                                color: timerTextColor,
                                cursor: 'pointer',
                            }}
                        >
                            Change email
                        </Button>
                    </div>
                </div>
            )}

            {step === 'verify' && (
                <div className="text-center space-y-4">
                    <div className="space-y-3">
                        <div style={{ fontSize: '3rem' }}>✓</div>
                        <h2
                            className="text-lg font-semibold"
                            style={{ color: emailInputTextColor }}
                        >
                            {successMessage || 'Verification Complete!'}
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTPEmailFlow;

