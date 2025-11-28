'use client';

import { Button, Input } from "@/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import { ErrorBanner } from "@/features/auth/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFields = { email: string; password: string };

const schema = yup.object({
    email: yup
        .string()
        .required("Email is required!")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
    password: yup.string().required("Password is required"),
});

interface LoginFormProps {
    handleManualLogin: (data: LoginFields) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleManualLogin }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        watch,
    } = useForm<LoginFields>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [show, setShow] = useState(false);
    const email = watch("email");
    const password = watch("password");

    const isFormValid = isDirty && isValid && !isSubmitting;

    const onSubmit = async (data: LoginFields) => {
        await handleManualLogin(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errors && Object.keys(errors).length > 0 && <ErrorBanner />}

                <div>
                    <Input
                        {...register("email")}
                        name="email"
                        type="text"
                        placeholder="Username, phone or email"
                        autoComplete="off"
                        className="w-full rounded-lg px-4 py-4 border-1 transition-all duration-200 focus:outline-none"
                        style={{
                            backgroundColor: 'var(--login-form-input-bg)',
                            borderColor: email ? 'var(--login-form-input-border-focus)' : 'var(--login-form-input-border)',
                            color: 'var(--login-form-input-text)',
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--login-form-input-border-focus)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = email
                                ? 'var(--login-form-input-border-focus)'
                                : 'var(--login-form-input-border)';
                        }}
                    />
                    {errors.email && (
                        <p
                            className="text-left ml-2 mt-2 text-xs font-medium"
                            style={{ color: 'var(--login-form-error-text)' }}
                        >
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <Input
                            {...register("password")}
                            name="password"
                            type={show ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="off"
                            className="w-full rounded-lg px-4 py-4 pr-12 border-1 transition-all duration-200 focus:outline-none"
                            style={{
                                backgroundColor: 'var(--login-form-input-bg)',
                                borderColor: password ? 'var(--login-form-input-border-focus)' : 'var(--login-form-input-border)',
                                color: 'var(--login-form-input-text)',
                            }}
                            onFocus={(e) => {
                                e.currentTarget.style.borderColor = 'var(--login-form-input-border-focus)';
                            }}
                            onBlur={(e) => {
                                e.currentTarget.style.borderColor = password
                                    ? 'var(--login-form-input-border-focus)'
                                    : 'var(--login-form-input-border)';
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShow(!show)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200 p-1"
                            style={{
                                color: 'var(--login-form-icon-color)',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget.firstChild as SVGElement).style.color =
                                    'var(--login-form-input-text)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget.firstChild as SVGElement).style.color =
                                    'var(--login-form-icon-color)';
                            }}
                        >
                            {show ? <EyeIcon size={20} /> : <EyeClosed size={20} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p
                            className="text-left ml-2 mt-2 text-xs font-medium"
                            style={{ color: 'var(--login-form-error-text)' }}
                        >
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="w-full rounded-lg px-4 py-3 font-semibold transition-all duration-200 flex items-center justify-center"
                    style={{
                        backgroundColor: isFormValid
                            ? 'var(--login-form-button-bg)'
                            : 'var(--login-form-button-bg-disabled)',
                        color: isFormValid
                            ? 'var(--login-form-button-text)'
                            : 'var(--login-form-button-text-disabled)',
                        cursor: isFormValid ? 'pointer' : 'not-allowed',
                    }}
                    onMouseEnter={(e) => {
                        if (isFormValid) {
                            (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.01)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
                    }}
                >
                    <span className="pointer-events-none select-none">
                        {isSubmitting ? "Logging in..." : "Log in"}
                    </span>
                </Button>
            </form>
        </>
    );
};

export default LoginForm;
