import { GetAuthTokenResponse } from "../types/authTypes";

export interface AuthState extends GetAuthTokenResponse {
  // Actions
  getAuthToken: () => Promise<void>;
  getAccessToken: () => Promise<{ access_token: string; expires_in: number }>;
} 