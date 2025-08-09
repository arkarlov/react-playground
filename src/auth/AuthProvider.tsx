import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { loginRequest, logoutRequest, refreshToken } from "./authService";
import { setAccessToken } from "./authInterceptors";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const initAuth = useCallback(async () => {
    try {
      const newToken = await refreshToken();
      setIsAuthenticated(true);
      setAccessToken(newToken);
    } catch (error) {
      console.error("InitAuth error:", error);
      setIsAuthenticated(false);
      setAccessToken(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const token = await loginRequest(email, password);
    setIsAuthenticated(true);
    setAccessToken(token);
  }, []);

  const logout = useCallback(async () => {
    await logoutRequest();
    setIsAuthenticated(false);
    setAccessToken(null);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
