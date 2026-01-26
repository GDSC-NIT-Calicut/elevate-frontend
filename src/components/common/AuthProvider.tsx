"use client";

import React, { createContext, useContext } from "react";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useGoogleAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
