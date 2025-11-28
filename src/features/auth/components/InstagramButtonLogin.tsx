import { InstagramIconBrand } from "@/components/ui";
import React from "react";

interface InstagramButtonLoginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

const InstagramButtonLogin: React.FC<InstagramButtonLoginProps> = ({
                                                                       onClick,
                                                                       disabled,
                                                                       isLoading = false,
                                                                       className,
                                                                       ...props
                                                                   }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={className}
            {...props}
        >
            <div className="flex items-center gap-3 flex-1">
                <div className="rounded-lg p-2">
                    <InstagramIconBrand className="w-10 h-10 p-1 rounded-lg" style={{
                        background: 'linear-gradient(135deg, #feda75 0%, #fa7e1e 25%, #d92e7f 50%, #9b36b7 75%, #515bd4 100%)',
                        fill: 'white'
                    }} />
                </div>
                <div className="text-left">
                    <p className="text-sm font-semibold">Continue with Instagram</p>
                </div>
            </div>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    );
};

export default InstagramButtonLogin;
