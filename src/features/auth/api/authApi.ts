import { AuthApiInterface } from './interfaces';
import { GetAuthTokenRequest, GetAuthTokenResponse } from '../types/authTypes';
import { authConfig } from '../config';
import { useAuthStore } from '../store';
import axios from 'axios';
class AuthApi implements AuthApiInterface {
  private baseUrl: string;

  constructor() {
    this.baseUrl = authConfig.apiBaseUrl!;
  }

  async getAuthToken(credentials: GetAuthTokenRequest): Promise<GetAuthTokenResponse> {

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
    const formData = new URLSearchParams();
    formData.append('client_id', credentials.clientId);
    formData.append('client_secret', credentials.clientSecret);
    formData.append('grant_type', credentials.grantType);

    const response = await fetch(`${this.baseUrl}${authConfig.endpoints.AUTH_TOKEN}`, {
      method: 'POST',
      body: formData.toString(),
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Get Auth Token failed');
    }

    const data: GetAuthTokenResponse = await response.json();

    if (!data.access_token) {
      throw new Error(data.username || 'Get Auth Token failed');
    }

    return data;
  }
}

export const authApi = new AuthApi(); 