'use client';

import {Button, Input} from "@/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeClosed } from "lucide-react";
import {ErrorBanner} from "@/features/auth/components";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginFields = { email: string; password: string };

const schema = yup.object({
    email: yup.string().required("Email is required!").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please enter a valid email address"),
    password: yup.string().required("Password is required"),
});

interface LoginFormProps {
    handleManualLogin: (data: LoginFields) => Promise<void>;
}

const LoginForm:React.FC<LoginFormProps> = ({handleManualLogin}) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFields>({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });
    const [show, setShow] = useState(false);
    const onSubmit = async (data: LoginFields) => {
        await handleManualLogin(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {errors && Object.keys(errors).length > 0 && (<ErrorBanner />)}
                <Input
                    {...register("email")}
                    name="email"
                    type="text"
                    placeholder="Username, phone or email"
                    autoComplete="off"
                    className="w-full bg-[#1e1e1e] border-1 border-[#383939] focus:border-[#b8b8b8] rounded-lg px-4 py-4 text-white placeholder-[#777777] focus:outline-none transition"
                    error={<p className="text-left ml-2">{errors.email?.message}</p>}
                />
                <div className="relative">
                    <Input
                        {...register("password")}
                        name="password"
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        autoComplete="off"
                        className="w-full bg-[#1e1e1e] border-1 border-[#383939] focus:border-[#b8b8b8] rounded-xl px-4 py-4 text-white placeholder-[#777777] focus:outline-none transition"
                        error={<p className="text-left ml-2">{errors.password?.message}</p>}
                    />
                    <div className="absolute right-4 top-7 transform -translate-y-1/2 cursor-pointer text-[#777777]" onClick={() => setShow(!show)}>
                        {show ? <EyeIcon /> : <EyeClosed />}
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#ffffff] border-1 border-[#383939] text-[#555658] cursor-pointer hover:scale-[101%] font-semibold py-3 rounded-lg transition duration-200"
                >
                    <span className="pointer-events-none select-none">Log in</span>
                </Button>
            </form>
        </>
    );
}

export default LoginForm;