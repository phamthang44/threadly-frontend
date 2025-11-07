// services/mockAuthService.ts
export const login = async (email: string, password: string) => {
    return new Promise<{ accessToken: string; user: { name: string } }>((resolve) => {
        setTimeout(() => {
            resolve({
                accessToken: "mock-token-123",
                user: { name: "Threadly User" },
            });
        }, 500);
    });
};

export const refreshToken = async () => {
    return new Promise<{ accessToken: string }>((resolve) => {
        setTimeout(() => resolve({ accessToken: "mock-token-456" }), 500);
    });
};
