import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; accessToken: string }>
        ) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        },
        refreshAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, refreshAccessToken, logout } = authSlice.actions;
export default authSlice.reducer;
