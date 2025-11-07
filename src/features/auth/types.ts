// types.ts chứa định nghĩa TypeScript type/interface riêng cho module đó.

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    displayName: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        email: string;
        displayName: string;
        avatarUrl?: string;
    };
}
