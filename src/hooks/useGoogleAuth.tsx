"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  email: string;
  backup_email?: string;
  name: string;
  roll_number?: string;
  department?: string;
  programme?: string;
  role: string;
}

interface Tokens {
  access: string;
  refresh: string;
}

export function useGoogleAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState(false);

  // Get API URL with fallback
  const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'https://elevate-backend-5ort.onrender.com/';
  };

  // Restore from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedTokens = localStorage.getItem("tokens");
    if (storedUser && storedTokens) {
      try {
        setUser(JSON.parse(storedUser));
        setTokens(JSON.parse(storedTokens));
      } catch (error) {
        console.error("Error parsing stored auth data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
      }
    }
  }, []);

  const login = useCallback(async (credential: string) => {
    setLoading(true);
    try {
      console.log("Starting Google OAuth login...");
      
      // Decode Google token to extract user info
      const decoded: any = jwtDecode(credential);
      console.log("Decoded token:", { email: decoded.email, name: decoded.name });
      
      // Extract roll number and department from email if it's an NITC email
      let roll_number = "";
      let department = "";
      let programme = "";
      
      if (decoded.email && decoded.email.endsWith('@nitc.ac.in')) {
        const emailParts = decoded.email.split('@')[0].split('_');
        if (emailParts.length >= 2) {
          roll_number = emailParts[1];
          // Roll number format: XYYNNNNBB
          // X: B (BTech), M (MTech), P (PhD)
          // BB: department code (CS, ME, EE, EC, etc.)
          programme = roll_number[0].toUpperCase() === 'B' ? 'BTech' :
                     roll_number[0].toUpperCase() === 'M' ? 'MTech' :
                     roll_number[0].toUpperCase() === 'P' ? 'PhD' : '';
          const deptCode = roll_number.slice(-2).toUpperCase();
          department = {
            'CS': 'Computer Science',
            'ME': 'Mechanical Engineering',
            'EE': 'Electrical Engineering',
            'EC': 'Electronics and Communication Engineering',
            // Add more as needed
          }[deptCode] || deptCode;
        }
      }

      const apiUrl = getApiUrl();
      const requestData = {
        id_token: credential,
        email: decoded.email,
        name: decoded.name,
        roll_number: roll_number,
        department: department,
        programme: programme,
      };

      console.log("Sending request to:", `${apiUrl}/api/user/google-oauth`);
      console.log("Request data:", requestData);

      const response = await axios.post(
        `${apiUrl}/api/user/google-oauth`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log("Backend response:", response.data);

      if (response.data.success) {
        const { tokens, user } = response.data;

        setUser(user);
        setTokens(tokens);

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tokens", JSON.stringify(tokens));

        console.log("Login successful:", user);
        return { success: true, user };
      } else {
        throw new Error(response.data.message || 'Authentication failed');
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      console.error("Error response:", err.response?.data);
      
      setUser(null);
      setTokens(null);
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
      
      const errorMessage = err.response?.data?.message || err.message || "Login failed";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    console.log("Logging out user");
    setUser(null);
    setTokens(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
  }, []);

  // Function to get authenticated axios instance
  const getAuthenticatedAxios = useCallback(() => {
    const accessToken = tokens?.access;
    
    if (!accessToken) {
      throw new Error('No access token available');
    }

    return axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }, [tokens]);

  return { 
    user, 
    tokens, 
    login, 
    logout, 
    loading, 
    getAuthenticatedAxios,
    isAuthenticated: !!user && !!tokens 
  };
}
