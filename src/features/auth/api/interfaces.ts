import { GetAuthTokenRequest, GetAuthTokenResponse } from '../types/authTypes';

export interface AuthApiInterface {
  getAuthToken(credentials: GetAuthTokenRequest): Promise<GetAuthTokenResponse>;
} 