import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    accessToken: string | null;
    user: any | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<{ accessToken: string; user: any }>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.accessToken = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
