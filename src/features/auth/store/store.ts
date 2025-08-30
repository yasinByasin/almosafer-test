/**
 * Auth store
 * Global authentication state management using Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../store/types';
import { authApi } from '../api/authApi';
import { authConfig } from '../config';
import { GetAuthTokenRequest } from '../types/authTypes';



export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      type: null,
      username: null,
      application_name: null,
      client_id: null,
      token_type: null,
      access_token: null,
      expires_in: null,
      state: null,
      scope: null,
      error: null,
      error_description: null,
      code: null,
      title: null,
      isLoading: false,

      getAuthToken: async () => {
        set({ error: null });
        const credentials = authConfig.credentials;
        try {
          const response = await authApi.getAuthToken({
            clientId: credentials.CLIENT_ID,
            clientSecret: credentials.CLIENT_SECRET,
            grantType: credentials.GRANT_TYPE,
          });

          set({
            username: response.username,
            application_name: response.application_name,
            client_id: response.client_id,
            token_type: response.token_type,
            access_token: response.access_token,
            expires_in: response.expires_in,
            scope: response.scope,
          });

        } catch (error: any) {
          const errorMessage = error instanceof Error ? error.message : 'Get Auth Token failed';
          set({
            username: null,
            application_name: null,
            client_id: null,
            token_type: null,
            access_token: null,
            expires_in: null,
            state: null,
            scope: null,
            error: error.error,
            error_description: errorMessage,
            code: error.code,
            title: error.title,
          });
          throw error;
        }
      },

      getAccessToken: async () => {
        const { access_token, expires_in, getAuthToken } = get();
        if (!access_token) {
          try {
            await getAuthToken!();
            const { access_token: newToken, expires_in: newExpiresIn } = get();
            return { access_token: newToken!, expires_in: newExpiresIn || 0 };
          } catch {
            set({ access_token: null, expires_in: null });
            throw new Error('You are not authenticated to get flights');
          }
        }
        return { access_token, expires_in: expires_in || 0 };
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: authConfig.constants.SESSION_STORAGE_KEY,
      partialize: (state) => ({
        access_token: state.access_token,
        expires_in: state.expires_in,
        username: state.username,
        application_name: state.application_name,
        client_id: state.client_id,
        token_type: state.token_type,
        scope: state.scope,
        error: state.error,
        error_description: state.error_description,
        code: state.code,
        title: state.title,
      }),
    }
  )
); 