import { refreshTokenRequest } from "@/services/http/auth";
import { useEffect } from "react";

export function useAuth() {
  useEffect(() => {
    const refreshToken = async () => {
      const storedToken = localStorage.getItem("token");
      const storedRefreshToken = JSON.parse(
        localStorage.getItem("refreshToken") || "{}"
      );

      if (!storedToken || !storedRefreshToken.id) return;

      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

      if (isTokenExpired) {
        try {
          const { token, refreshToken } = await refreshTokenRequest(
            storedRefreshToken.id
          );

          if (refreshToken) {
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
          }

          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Error renewing token: ", error);
        }
      }
    };

    refreshToken();

    const interval = setInterval(refreshToken, 1000 * 60 * 15);

    return () => clearInterval(interval);
  }, []);
}
