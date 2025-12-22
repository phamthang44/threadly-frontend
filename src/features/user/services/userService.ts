/**
 * User Service
 * Handles user-related API calls
 */

import axiosClient from "@/lib/axiosClient";

/**
 * User Profile Response
 * Matches: com.thang.threadly.user.api.dto.response.UserProfileResponse
 */
export interface UserProfileResponse {
  displayName: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  backgroundUrl?: string;
  birthDate?: string; // ISO date string (yyyy-MM-dd)
  followers?: number;
  followings?: number;
  postsCount?: number;
  visibility?: "public" | "private"; // Privacy enum
  userId: number; // Long -> number
  username: string;
  email: string;
}

/**
 * User Service
 */
export const userService = {
  /**
   * Get current user profile
   * Matches: GET /api/v1/users/me
   * @returns Promise resolving to UserProfileResponse
   */
  getCurrentUserProfile: (): Promise<UserProfileResponse> => {
    return axiosClient
      .get<UserProfileResponse>("/api/v1/users/me")
      .then((response) => response.data);
  },
};
