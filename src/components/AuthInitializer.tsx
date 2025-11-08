"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { refreshAccessToken, logout } from "@/store/authSlice";
import axiosClient from "@/lib/axiosClient";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { isAuthenticated, accessToken } = useAppSelector((s) => s.auth);

    useEffect(() => {
        const tryRefresh = async () => {
            try {
                // Nếu user đã login (persist giữ state) nhưng chưa có accessToken thì refresh
                if (isAuthenticated && !accessToken) {
                    const res = await axiosClient.post("/auth/refresh");
                    dispatch(refreshAccessToken(res.data.accessToken));
                }
            } catch (err) {
                console.error("Auto refresh failed:", err);
                dispatch(logout());
            }
        };

        tryRefresh();
    }, [isAuthenticated, accessToken, dispatch]);

    return <>{children}</>;
}
