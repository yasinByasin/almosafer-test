const BASE_URL = "https://test.api.amadeus.com/v1/";


// API endpoints
export const AUTH_ENDPOINTS = {
  AUTH_TOKEN: 'security/oauth2/token',
} as const;

// Constants
export const AUTH_CONSTANTS = {
  SESSION_STORAGE_KEY: 'auth',
} as const;

// Credentials
export const AUTH_CREDENTIALS = {
  CLIENT_ID: "X91AGFmh6GjwGtIbEbPA1KMw0Lvw5V4s",
  CLIENT_SECRET: "yY3Z6uYteijvY5md",
  GRANT_TYPE: "client_credentials",
} as const;

// Configuration object
export const authConfig = {
  apiBaseUrl: BASE_URL,
  endpoints: AUTH_ENDPOINTS,
  constants: AUTH_CONSTANTS,
  credentials: AUTH_CREDENTIALS,
} as const; 