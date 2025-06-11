// hooks/useAuth.ts
import { useSession } from "next-auth/react"
import { useState } from "react"

import axios from "axios"

// hooks/useAuth.ts
type AuthState = {
  isAuthenticated: boolean
  user: null | { id: string; email: string; name: string }
  tokens: null | { access: string; refresh: string }
  loading: boolean
  error: null | string
}

export const useAuth = () => {
  const { data: session, status } = useSession()
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    tokens: null,
    loading: true,
    error: null,
  })

  const getDjangoTokens = async () => {
    if (!session) return

    try {
      const response = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/verify-and-get-tokens`)
      const { tokens, user } = response.data
      
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)
      
      setAuthState({
        isAuthenticated: true,
        user,
        tokens,
        loading: false,
        error: null,
      })
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Failed to authenticate with backend',
      }))
    }
  }

  // Additional implementation...
}
