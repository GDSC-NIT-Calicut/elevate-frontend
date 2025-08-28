// hooks/useAuth.ts
import { useGoogleLogin, TokenResponse } from "@react-oauth/google"
import { useState } from "react"
import axios from "axios"

type AuthState = {
  isAuthenticated: boolean
  user: null | {
    email: string
    name: string
    roll_number?: string
    department?: string
    programme?: string
    role?: string
  }
  tokens: null | { access: string; refresh: string }
  loading: boolean
  error: null | string
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    tokens: null,
    loading: false,
    error: null,
  })

  // Google login hook
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        // Send Google's id_token to your Django backend
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/google-oauth`,
          {
            id_token: tokenResponse.access_token, // Google id_token
          }
        )

        const { tokens, user } = response.data

        localStorage.setItem("access_token", tokens.access)
        localStorage.setItem("refresh_token", tokens.refresh)

        setAuthState({
          isAuthenticated: true,
          user,
          tokens,
          loading: false,
          error: null,
        })
      } catch (err: any) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          tokens: null,
          loading: false,
          error: err.response?.data?.message || "Login failed",
        })
      }
    },
    onError: () => {
      setAuthState({
        isAuthenticated: false,
        user: null,
        tokens: null,
        loading: false,
        error: "Google login failed",
      })
    },
  })

  return { ...authState, loginWithGoogle }
}
