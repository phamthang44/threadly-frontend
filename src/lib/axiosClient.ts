// lib/axiosClient.ts
import axios from "axios";
import { store } from "@/store";
import { refreshAccessToken, logout } from "@/store/authSlice";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auto refresh khi token hết hạn
let refreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};
axiosClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        const status = err.response?.status;

        // Nếu bị 401 → thử refresh token
        if (status === 401 && !originalRequest._retry) {
            if (refreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosClient(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            refreshing = true;

            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = res.data.accessToken;
                store.dispatch(refreshAccessToken(newToken));
                refreshing = false;
                onRefreshed(newToken);

                // Retry request
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosClient(originalRequest);
            } catch (refreshErr) {
                refreshing = false;
                store.dispatch(logout());
                return Promise.reject(refreshErr);
            }
        }

        return Promise.reject(err);
    }
);

export default axiosClient;
