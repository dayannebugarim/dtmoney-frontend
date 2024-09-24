import { RefreshTokenResponse, SignInParams, SignInResponse } from "./types";
import api from "@/services/api";

export const signInRequest = async (props: SignInParams) => {
  const { data: response } = await api.post("/auth/login", {
    email: props.email,
    password: props.password,
  });
  return response as SignInResponse;
};

export const refreshTokenRequest = async (refreshToken: string) => {
  const { data: response } = await api.post("/auth/refresh-token", {
    refresh_token: refreshToken,
  });
  return response as RefreshTokenResponse;
};
