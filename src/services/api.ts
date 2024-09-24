import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { refreshTokenRequest } from "./http/auth";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const cookies = parseCookies();
  const token = cookies["token"];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const cookies = parseCookies();
    const refreshToken = cookies["refreshToken"];
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const { token: newToken, refreshToken: newRefreshToken } =
          await refreshTokenRequest(refreshToken);

        setCookie(null, "token", newToken, {
          maxAge: 60 * 60 * 1,
          path: "/",
        });

        if (newRefreshToken) {
          setCookie(null, "refreshToken", newRefreshToken.id, {
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (err) {
        console.error("Error refreshing token", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
