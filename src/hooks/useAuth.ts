import { refreshTokenRequest } from "@/services/http/auth";
import { useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";

export function useAuth() {
  useEffect(() => {
    const refreshToken = async () => {
      const cookies = parseCookies();
      const storedToken = cookies["token"];
      const storedRefreshToken = cookies["refreshToken"];

      if (!storedToken || !storedRefreshToken) return;

      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1]));
      const isTokenExpired = tokenPayload.exp * 1000 < Date.now();

      if (isTokenExpired) {
        try {
          const { token, refreshToken } = await refreshTokenRequest(
            storedRefreshToken
          );

          setCookie(null, "token", token, {
            maxAge: 60 * 20,
            path: "/",
          });
          if (refreshToken) {
            setCookie(null, "refreshToken", refreshToken.id, {
              maxAge: 60 * 60 * 24 * 7,
              path: "/",
            });
          }
        } catch (error) {
          console.error("Error renewing token: ", error);
          destroyCookie(null, "token");
          destroyCookie(null, "refreshToken");
        }
      }
    };

    refreshToken();

    const interval = setInterval(refreshToken, 1000 * 60 * 20);

    return () => clearInterval(interval);
  }, []);
}
