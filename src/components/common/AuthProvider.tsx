'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Tokens {
  access: string;
  refresh: string;
}

interface User {
  email: string;
  backup_email: string | null;
  name: string;
  roll_number: string;
  department: string;
  programme: string;
  role: 'student' | 'admin';
}

interface AuthContextType {
  user: User | null;
  tokens: Tokens | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  tokens: null,
  loading: true,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      if (status === 'authenticated') {
        try {
          const res = await axios.post('/api/auth/verify-and-get-tokens');

          if (res.data.success) {
            const { tokens, user } = res.data;

            // Store tokens in localStorage
            localStorage.setItem('accessToken', tokens.access);
            localStorage.setItem('refreshToken', tokens.refresh);

            setTokens(tokens);
            setUser(user);
          }
        } catch (err) {
          console.error('Token verification failed:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } finally {
          setLoading(false);
        }
      } else if (status === 'unauthenticated') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setTokens(null);
        setUser(null);
        setLoading(false);
      }
    };

    fetchTokens();
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        loading,
        isAuthenticated: !!user && !!tokens,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

