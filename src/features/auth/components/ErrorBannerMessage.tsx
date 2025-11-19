import React from "react";
import { XCircle } from "lucide-react";

const ErrorBanner: React.FC = () => {
    return (
        <>
            <div className="border border-red-500 bg-red-300/10 rounded-lg px-4 py-4 flex items-center gap-2">
                <div>
                    <XCircle className="text-red-600" />
                </div>
                <div>
                    <p className="font-medium">Something went wrong</p>
                </div>
            </div>
        </>
    );
}

export default ErrorBanner;