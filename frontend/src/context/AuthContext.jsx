import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authLogin, getMe } from "../services/api";

const storageKey = "yellow-ochre-auth";
const AuthContext = createContext(null);

function readStoredAuth() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : { token: "", user: null };
  } catch {
    return { token: "", user: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: "", user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = readStoredAuth();
    setAuth(stored);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;
    try {
      if (auth.token && auth.user) {
        window.localStorage.setItem(storageKey, JSON.stringify(auth));
      } else {
        window.localStorage.removeItem(storageKey);
      }
    } catch {
      // Authentication still works for this session if storage is unavailable.
    }
  }, [auth, loading]);

  const login = useCallback(async (credentials) => {
    const response = await authLogin(credentials);
    setAuth({ token: response.token, user: response.user });
    return response;
  }, []);

  const logout = useCallback(() => {
    setAuth({ token: "", user: null });
  }, []);

  const refresh = useCallback(async () => {
    if (!auth.token) return null;
    const response = await getMe(auth.token);
    setAuth((current) => ({ ...current, user: response.user }));
    return response.user;
  }, [auth.token]);

  const value = useMemo(() => ({
    ...auth,
    loading,
    isAuthenticated: Boolean(auth.token && auth.user),
    login,
    logout,
    refresh
  }), [auth, loading, login, logout, refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
