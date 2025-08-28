"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { Button } from "./ui/button";
import { LogIn, LogOut, User, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function LoginButton({ variant = "outline", size = "sm", className = "" }: LoginButtonProps) {
  const { user, login, logout, loading, isAuthenticated } = useGoogleAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleLoginSuccess = async (res: any) => {
    setError(null);
    console.log("Google login success:", res);
    if (res.credential) {
      const result = await login(res.credential);
      console.log("Login result:", result);
      
      if (!result.success) {
        setError(result.error || "Login failed");
      }
    }
  };

  const handleLoginError = () => {
    console.error("Google login error");
    setError("Google authentication failed. Please try again.");
  };

  const handleLogout = () => {
    setError(null);
    logout();
  };

  if (loading) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant={variant}
          size={size}
          className={className}
          onClick={() => router.push('/profile')}
        >
          <User className="w-4 h-4 mr-2" />
          {user.name?.split(' ')[0] || 'Profile'}
        </Button>
        <Button
          variant="ghost"
          size={size}
          onClick={handleLogout}
          className="text-green-700 hover:text-green-800"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {error && (
        <div className="flex items-center space-x-1 text-red-600 text-xs">
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </div>
      )}
      
      <div className="flex items-center">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          theme="outline"
          size="large"
          text="signin_with"
          shape="rectangular"
          locale="en"
          useOneTap={false}
          context="signin"
        />
      </div>
    </div>
  );
}
