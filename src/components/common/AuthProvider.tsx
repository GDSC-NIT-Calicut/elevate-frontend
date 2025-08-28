'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useGoogleLogin, TokenResponse } from '@react-oauth/google'
import axios from 'axios'

interface Tokens {
  access: string
  refresh: string
}

interface User {
  email: string
  backup_email: string | null
  name: string
  roll_number: string
  department: string
  programme: string
  role: 'student' | 'admin'
}

interface AuthContextType {
  user: User | null
  tokens: Tokens | null
  loading: boolean
  isAuthenticated: boolean
  loginWithGoogle: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  tokens: null,
  loading: true,
  isAuthenticated: false,
  loginWithGoogle: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [tokens, setTokens] = useState<Tokens | null>(null)
  const [loading, setLoading] = useState(true)

  // Restore from localStorage on mount
  useEffect(() => {
    const storedAccess = localStorage.getItem('accessToken')
    const storedRefresh = localStorage.getItem('refreshToken')
    const storedUser = localStorage.getItem('user')

    if (storedAccess && storedRefresh && storedUser) {
      setTokens({ access: storedAccess, refresh: storedRefresh })
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Google login hook
  const loginWithGoogle = useGoogleLogin({
    flow: 'implicit', // gets id_token
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        // Send Google id_token to Django
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/google-oauth`,
          { id_token: tokenResponse.access_token }
        )

        if (res.data.success) {
          const { tokens, user } = res.data

          localStorage.setItem('accessToken', tokens.access)
          localStorage.setItem('refreshToken', tokens.refresh)
          localStorage.setItem('user', JSON.stringify(user))

          setTokens(tokens)
          setUser(user)
        } else {
          console.warn('Google OAuth failed:', res.data.message)
        }
      } catch (err) {
        console.error('Google OAuth error:', err)
      }
    },
    onError: () => {
      console.error('Google login failed')
    },
  })

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    setUser(null)
    setTokens(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        loading,
        isAuthenticated: !!user && !!tokens,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
