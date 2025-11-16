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
