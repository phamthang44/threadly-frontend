// lib/axiosClient.ts
import axios from "axios";
import { store } from "@/store";
import { loginSuccess, logout } from "@/store/authSlice";

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (res) => res,
    async (err) => {
        const originalRequest = err.config;
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = await axios.post("/auth/refresh", {}, { withCredentials: true });
                store.dispatch(loginSuccess(refresh.data));
                originalRequest.headers.Authorization = `Bearer ${refresh.data.accessToken}`;
                return axiosClient(originalRequest);
            } catch {
                store.dispatch(logout());
            }
        }
        return Promise.reject(err);
    }
);

export default axiosClient;
