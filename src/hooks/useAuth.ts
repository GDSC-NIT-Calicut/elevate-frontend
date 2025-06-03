"use client"
// hooks/useAuth.js
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Example logic: check for token in localStorage
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  return { isAuthenticated }
}
