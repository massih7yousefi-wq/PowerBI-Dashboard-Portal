import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type {
  AuthSession,
  LoginRequest,
  UserResponse,
} from '../types/auth';

import * as authService from '../services/authService';

const AUTH_STORAGE_KEY = 'hrdashboard_auth';

interface AuthContextValue {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawSession) {
      setIsLoading(false);
      return;
    }

    try {
      const storedSession = JSON.parse(rawSession) as AuthSession;

      const expiresAt = new Date(storedSession.expiresAt).getTime();

      if (
        !storedSession.token ||
        !storedSession.user ||
        Number.isNaN(expiresAt) ||
        expiresAt <= Date.now()
      ) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        setSession(null);
      } else {
        setSession(storedSession);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (request: LoginRequest) => {
    const response = await authService.login(request);

    const newSession: AuthSession = {
      token: response.token,
      expiresAt: response.expiresAt,
      user: response.user,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(newSession),
    );

    setSession(newSession);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session),
      isLoading,
      login,
      logout,
    }),
    [session, isLoading, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}