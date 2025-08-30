export interface GetAuthTokenRequest {
  clientId: string;
  clientSecret: string;
  grantType: string;
}

export interface GetAuthTokenResponse {
  type: string | null,
  username: string | null,
  application_name: string | null,
  client_id: string | null,
  token_type: string | null,
  access_token: string | null,
  expires_in: number | null,
  state: string | null,
  scope: string | null,
  error?: string | null,
  error_description?: string | null,
  code?: number | null,
  title?: string | null
}
