export interface SignInParams {
  email: string;
  password: string;
}

interface RefreshToken {
  id: string;
  userId: string;
  expiresIn: number;
}

export interface SignInResponse {
  token: string;
  refreshToken: RefreshToken;
}
