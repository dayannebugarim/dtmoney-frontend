import { createContext, useContext, useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";

interface AuthContextData {
  user: { id: string; name: string; email: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["token"];
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: tokenPayload.id,
        name: tokenPayload.name,
        email: tokenPayload.email,
      });
    }
  }, []);

  const logout = () => {
    destroyCookie(null, "token");
    destroyCookie(null, "refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
