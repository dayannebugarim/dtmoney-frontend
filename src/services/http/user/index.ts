import axios from "axios";
import { SignInParams, SignInResponse } from "./types";
import api from "@/services/api";

export const signInRequest = async (props: SignInParams) => {
  const { data: response } = await api.post("/login", {
    email: props.email,
    password: props.password,
  });
  return response as SignInResponse;
};

export const refreshTokenRequest = async (refresh_token: string) => {
  const { data: response } = await axios.post("/refresh-token", {
    refresh_token,
  });
  return response as { token: string };
};
