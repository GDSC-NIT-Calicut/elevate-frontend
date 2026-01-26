"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export interface User {
  email: string;
  name: string;
  roll_number?: string;
  department?: string;
  programme?: string;
  role: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      try {
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [tokens, setTokens] = useState<Tokens | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("tokens");
      try {
        return saved ? JSON.parse(saved) : null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = useCallback(async (credential: string) => {
    setLoading(true);
    try {
      const decoded: any = jwtDecode(credential);
      let roll_number = "";
      let department = "";
      let programme = "";

      if (decoded.email?.endsWith("@nitc.ac.in")) {
        const parts = decoded.email.split("@")[0].split("_");
        if (parts.length >= 2) {
          roll_number = parts[1];
          programme =
            roll_number[0].toUpperCase() === "B" ? "BTech" : "PostGrad";
          department = roll_number.slice(-2).toUpperCase();
        }
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "https://elevate-backend-5ort.onrender.com/"}/api/user/google-oauth`,
        {
          id_token: credential,
          email: decoded.email,
          name: decoded.name,
          roll_number,
          department,
          programme,
        },
      );

      if (response.data.success) {
        const { tokens: newTokens, user: newUser } = response.data;
        setUser(newUser);
        setTokens(newTokens);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("tokens", JSON.stringify(newTokens));
        return { success: true };
      }
      throw new Error("Failed");
    } catch (err) {
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  }, []);

  return {
    user,
    tokens,
    loading,
    login,
    logout,
    isAuthenticated: !!user && !!tokens,
  };
}
