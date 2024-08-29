"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { redirect } from "next/navigation";

import { checkSession, clearSession } from "@/services/auth";

interface AuthContextValues {
  role: string | null;
  name: string | null;
  email: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialUserState: AuthContextValues = {
  role: null,
  name: null,
  email: null,
};

const AuthContext = createContext<AuthContextValues | null>(null);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthContextValues>(initialUserState);

  useLayoutEffect(() => {
    if (checkSession()) {
      // const token = local∏Storage.getItem("token");
      const profile = localStorage.getItem("profile");

      // const tokenPayload = parseJwt(token!);
      const userStorage = JSON.parse(profile ?? "{}");

      setUser({
        role: "administrator",
        name: userStorage?.name ?? null,
        email: userStorage?.email ?? null,
      });
    } else {
      clearSession();
      redirect("/login");
    }
  }, []);

  const value = useMemo(() => user, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
