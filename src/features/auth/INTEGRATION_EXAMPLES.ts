// /**
//  * Integration Examples: CompleteProfile with OTP Flow
//  *
//  * This file demonstrates how to integrate the CompleteProfile component
//  * with your existing OTP verification flow.
//  */
//
// // ============================================================================
// // EXAMPLE 1: Updated OTP Verification Handler
// // ============================================================================
//
// /**
//  * Update your OTP verification handler to pass registerToken to CompleteProfile page
//  */
// const handleVerifyOTP_Example1 = async (
//     email: string,
//     otp: string
// ): Promise<boolean> => {
//     try {
//         const response = await fetch('/api/auth/verify-otp', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, otp }),
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'OTP verification failed');
//         }
//
//         const data = await response.json();
//
//         // Extract the registration token from response
//         const { registerToken } = data;
//
//         if (!registerToken) {
//             throw new Error('No registration token received');
//         }
//
//         // Store token in sessionStorage for next page
//         sessionStorage.setItem('registerToken', registerToken);
//         sessionStorage.setItem('registrationEmail', email);
//
//         // Redirect to complete profile page
//         setTimeout(() => {
//             router.push('/complete-profile');
//         }, 1000);
//
//         return true;
//     } catch (error) {
//         console.error('OTP verification error:', error);
//         return false;
//     }
// };
//
// // ============================================================================
// // EXAMPLE 2: Complete Profile Page with Token Retrieval
// // ============================================================================
//
// 'use client';
//
// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { CompleteProfile } from '@/features/auth/components';
//
// export default function CompleteProfilePage() {
//     const router = useRouter();
//     const searchParams = useSearchParams();
//     const [registerToken, setRegisterToken] = useState<string>('');
//     const [tokenError, setTokenError] = useState<string>('');
//     const [isLoading, setIsLoading] = useState(true);
//
//     useEffect(() => {
//         // Try to get token from multiple sources (in order of preference)
//
//         // 1. Check URL query parameters
//         const tokenFromQuery = searchParams.get('token');
//
//         // 2. Check sessionStorage
//         const tokenFromSession = sessionStorage.getItem('registerToken');
//
//         // 3. Check localStorage (less secure but possible)
//         const tokenFromLocal = localStorage.getItem('registerToken');
//
//         const token = tokenFromQuery || tokenFromSession || tokenFromLocal;
//
//         if (!token) {
//             setTokenError(
//                 'Registration token is missing. Please complete OTP verification first.'
//             );
//             setTimeout(() => {
//                 router.push('/signup');
//             }, 2000);
//             return;
//         }
//
//         setRegisterToken(token);
//         setIsLoading(false);
//     }, [searchParams, router]);
//
//     if (isLoading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
//             </div>
//         );
//     }
//
//     if (tokenError) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-center">
//                 <h1 className="text-2xl font-bold">{tokenError}</h1>
//             </div>
//         );
//     }
//
//     return (
//         <CompleteProfile
//             registerToken={registerToken}
//             onCancel={() => router.back()}
//             inputBgColor="var(--login-form-input-bg)"
//             inputBorderColor="var(--login-form-input-border)"
//             inputBorderColorFocus="var(--login-form-input-border-focus)"
//             inputTextColor="var(--login-form-input-text)"
//             buttonBgColor="var(--login-form-button-bg)"
//             buttonTextColor="var(--login-form-button-text)"
//             buttonBgColorDisabled="var(--login-form-button-bg-disabled)"
//             buttonTextColorDisabled="var(--login-form-button-text-disabled)"
//             errorTextColor="var(--login-form-error-text)"
//         />
//     );
// }
//
// // ============================================================================
// // EXAMPLE 3: Protected Route - Ensure Token Before Loading
// // ============================================================================
//
// 'use client';
//
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
//
// export function CompleteProfileGuard({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     const router = useRouter();
//
//     useEffect(() => {
//         // Check if user has a valid registration token
//         const hasToken =
//             sessionStorage.getItem('registerToken') ||
//             localStorage.getItem('registerToken');
//
//         if (!hasToken) {
//             // Redirect to signup if no token found
//             router.push('/signup');
//         }
//     }, [router]);
//
//     return <>{children}</>;
// }
//
// // Usage in page:
// // <CompleteProfileGuard>
// //     <CompleteProfilePage />
// // </CompleteProfileGuard>
//
// // ============================================================================
// // EXAMPLE 4: OTP Flow Component with Built-in Navigation
// // ============================================================================
//
// interface OTPFlowWithNavProps {
//     onVerified: (registerToken: string) => void;
// }
//
// export function OTPFlowWithNav({ onVerified }: OTPFlowWithNavProps) {
//     const router = useRouter();
//
//     const handleOTPVerified = async (
//         email: string,
//         otp: string
//     ): Promise<boolean> => {
//         try {
//             const response = await fetch('/api/auth/verify-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email, otp }),
//             });
//
//             if (!response.ok) throw new Error('OTP verification failed');
//
//             const { registerToken } = await response.json();
//
//             if (!registerToken) throw new Error('No token received');
//
//             // Store token
//             sessionStorage.setItem('registerToken', registerToken);
//             sessionStorage.setItem('userEmail', email);
//
//             // Notify parent component
//             onVerified(registerToken);
//
//             // Navigate to complete profile
//             router.push('/complete-profile');
//
//             return true;
//         } catch (error) {
//             console.error('Error:', error);
//             return false;
//         }
//     };
//
//     return (
//         <OTPEmailFlow
//             onSubmit={handleOTPVerified}
//             onCancel={() => router.back()}
//         />
//     );
// }
//
// // ============================================================================
// // EXAMPLE 5: Signup Flow Component Combining Both Steps
// // ============================================================================
//
// 'use client';
//
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { OTPEmailFlow, CompleteProfile } from '@/features/auth/components';
//
// type RegistrationStep = 'email' | 'otp' | 'complete-profile' | 'success';
//
// export function SignupFlowCombined() {
//     const router = useRouter();
//     const [step, setStep] = useState<RegistrationStep>('email');
//     const [registerToken, setRegisterToken] = useState('');
//     const [email, setEmail] = useState('');
//
//     const handleOTPVerified = async (
//         verifyEmail: string,
//         otp: string
//     ): Promise<boolean> => {
//         try {
//             const response = await fetch('/api/auth/verify-otp', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ email: verifyEmail, otp }),
//             });
//
//             if (!response.ok) throw new Error('Verification failed');
//
//             const data = await response.json();
//
//             setEmail(verifyEmail);
//             setRegisterToken(data.registerToken);
//             setStep('complete-profile');
//
//             return true;
//         } catch (error) {
//             console.error('Error:', error);
//             return false;
//         }
//     };
//
//     return (
//         <div>
//             {step === 'email' && (
//                 <OTPEmailFlow
//                     onSubmit={handleOTPVerified}
//                     onCancel={() => router.back()}
//                 />
//             )}
//
//             {step === 'complete-profile' && (
//                 <CompleteProfile
//                     registerToken={registerToken}
//                     onCancel={() => setStep('email')}
//                 />
//             )}
//         </div>
//     );
// }
//
// // ============================================================================
// // EXAMPLE 6: API Endpoint Response Handler
// // ============================================================================
//
// /**
//  * Expected backend response structure from register-finish endpoint
//  */
// interface RegisterFinishResponse {
//     success: boolean;
//     accessToken: string;
//     refreshToken: string;
//     user: {
//         id: string;
//         email: string;
//         displayName: string;
//         avatarUrl?: string;
//         createdAt: string;
//     };
// }
//
// /**
//  * Expected backend response structure from verify-otp endpoint
//  */
// interface VerifyOTPResponse {
//     success: boolean;
//     registerToken: string;
//     email: string;
//     expiresIn: number; // Token expiration in seconds
// }
//
// // ============================================================================
// // EXAMPLE 7: Error Handling Patterns
// // ============================================================================
//
// class RegistrationError extends Error {
//     constructor(
//         message: string,
//         public code: string,
//         public details?: unknown
//     ) {
//         super(message);
//     }
// }
//
// async function handleRegistrationError(error: unknown) {
//     if (error instanceof RegistrationError) {
//         switch (error.code) {
//             case 'INVALID_TOKEN':
//                 return 'Registration link has expired. Please sign up again.';
//             case 'INVALID_EMAIL':
//                 return 'The email address is invalid.';
//             case 'EMAIL_ALREADY_EXISTS':
//                 return 'This email is already registered.';
//             case 'INVALID_PASSWORD':
//                 return 'Password does not meet requirements.';
//             case 'DISPLAY_NAME_TAKEN':
//                 return 'Display name is already taken.';
//             default:
//                 return 'Registration failed. Please try again.';
//         }
//     }
//
//     return 'An unexpected error occurred.';
// }
//
// // ============================================================================
// // EXAMPLE 8: Complete Registration Flow Diagram
// // ============================================================================
//
// /**
//  * REGISTRATION FLOW SEQUENCE:
//  *
//  * 1. USER SIGNUP PAGE
//  *    └─> Email → Send OTP
//  *
//  * 2. OTP VERIFICATION PAGE (OTPEmailFlow component)
//  *    └─> Enter OTP code
//  *    └─> Verify with backend
//  *    └─> Backend returns registerToken
//  *    └─> Store token in sessionStorage
//  *    └─> Redirect to /complete-profile
//  *
//  * 3. COMPLETE PROFILE PAGE (CompleteProfile component)
//  *    └─> Retrieve token from sessionStorage/query params
//  *    └─> Display form with displayName & password fields
//  *    └─> User fills and submits form
//  *    └─> POST /api/v1/auth/register-finish with token & credentials
//  *    └─> Backend creates account
//  *    └─> Returns accessToken, refreshToken, user object
//  *
//  * 4. TOKEN STORAGE
//  *    ├─> Cookies (secure, for HTTP requests)
//  *    ├─> localStorage (for Redux store)
//  *    └─> Redux state (for app-wide access)
//  *
//  * 5. SUCCESS
//  *    └─> Redirect to home page
//  *    └─> User authenticated and ready to use app
//  */
//
// // ============================================================================
// // EXAMPLE 9: Testing the Integration
// // ============================================================================
//
// /**
//  * Mock test data for development/testing
//  */
// export const testData = {
//     validEmail: 'test@example.com',
//     validOtp: '123456',
//     validDisplayName: 'John Doe',
//     validPassword: 'SecurePass123',
//
//     invalidEmail: 'invalid-email',
//     invalidOtp: '000000',
//     shortPassword: 'pass',
//     weakPassword: 'password',
//
//     mockRegisterToken: 'mock_token_xyz123',
//     mockAccessToken: 'mock_access_token_abc456',
//     mockRefreshToken: 'mock_refresh_token_def789',
// };
//
// /**
//  * Mock API responses for testing
//  */
// export const mockResponses = {
//     verifyOtpSuccess: {
//         success: true,
//         registerToken: testData.mockRegisterToken,
//         email: testData.validEmail,
//         expiresIn: 300,
//     },
//
//     registerFinishSuccess: {
//         success: true,
//         accessToken: testData.mockAccessToken,
//         refreshToken: testData.mockRefreshToken,
//         user: {
//             id: 'user_123',
//             email: testData.validEmail,
//             displayName: testData.validDisplayName,
//             avatarUrl: 'https://example.com/avatar.jpg',
//             createdAt: new Date().toISOString(),
//         },
//     },
//
//     registerFinishError: {
//         success: false,
//         message: 'Invalid or expired registration token',
//         code: 'INVALID_TOKEN',
//     },
// };
//
// // ============================================================================
// // EXAMPLE 10: Redux Integration
// // ============================================================================
//
// /**
//  * How tokens are saved to Redux store
//  */
// import { useAppDispatch } from '@/store/hooks';
// import { setCredentials } from '@/store/authSlice';
//
// export function useRegistrationSuccess() {
//     const dispatch = useAppDispatch();
//
//     return (data: RegisterFinishResponse) => {
//         dispatch(
//             setCredentials({
//                 user: data.user,
//                 accessToken: data.accessToken,
//             })
//         );
//
//         // Also save to localStorage for persistence
//         localStorage.setItem('accessToken', data.accessToken);
//         localStorage.setItem('user', JSON.stringify(data.user));
//
//         if (data.refreshToken) {
//             localStorage.setItem('refreshToken', data.refreshToken);
//         }
//     };
// }
//
// // ============================================================================
// // END OF INTEGRATION EXAMPLES
// // ============================================================================
//
