"use client"
import React, { ReactNode } from 'react'
import Navbar from './navbar'
import { useAuth } from '@/hooks/useAuth'
import { SessionProvider } from 'next-auth/react'

interface PageContainerProps {
  children: ReactNode
  protected?: boolean
}

const PageContainer: React.FC<PageContainerProps> = ({ children, protected: isProtected = false }) => {
  const { isAuthenticated } = useAuth()

  const showContent = !isProtected || (isProtected && isAuthenticated)

  return (
    <SessionProvider>
        <>
        <Navbar />
        <div className="flex flex-col p-4">
            {showContent ? (
            children
            ) : (
            <div className="text-center text-red-600 font-semibold mt-10">
                This resource is only available to authenticated users.
            </div>
            )}
        </div>
        </>
    </SessionProvider>
  )
}

export default PageContainer
