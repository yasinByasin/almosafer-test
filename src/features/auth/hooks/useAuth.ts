import { useState } from 'react';
import { useAuthStore } from '../store';

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);

  const {
    getAccessToken,
  } = useAuthStore();

  const getCurrentToken = async () => {
    const { access_token } = await getAccessToken!();
    return access_token;
  };

  const clearError = () => setError(null);

  return {
    getCurrentToken,
    error,
    clearError,
  };
}; 