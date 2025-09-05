'use client'

import { createContext, useContext } from 'react'
import { useGoogleAuth } from '@/hooks/useGoogleAuth'

interface AuthContextType {
  user: any
  tokens: any
  loading: boolean
  isAuthenticated: boolean
  login: (credential: string) => Promise<any>
  logout: () => void
  getAuthenticatedAxios: () => any
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  tokens: null,
  loading: false,
  isAuthenticated: false,
  login: async () => ({}),
  logout: () => {},
  getAuthenticatedAxios: () => null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const googleAuth = useGoogleAuth()

  return (
    <AuthContext.Provider value={googleAuth}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
