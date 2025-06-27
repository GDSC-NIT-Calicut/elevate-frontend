'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import axios from 'axios'


type Company = {
  id: number
  name: string
  logo: string 
  description: string
  website: string
}

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post('/api/auth/verify-and-get-tokens')
        console.log("Token response:", response.data)
        setToken(response.data.tokens.access)
      } catch (err: any) {
        setError('Failed to get backend token')
      }
    }
    if (status === 'authenticated') {
      getToken()
    }
  }, [status])

  useEffect(() => {
    if (!token) return
    setLoading(true)
    console.log("Using token:", token)
    axios.get('http://localhost:8000/api/company', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log("API Response:", res)
        setCompanies(res.data)
      })
      .catch((err) => {
        console.log("Full error:", err)
        console.log("Error response:", err.response)
        setError('Failed to fetch companies')
        console.error("Fetch companies error:", err)
      })
      .finally(() => setLoading(false))
  }, [token])
  const handleCompanyClick = (id: number) => {
    console.log('Navigating to company with ID:', id);
    router.push(`/companies/${id}`)
    // window.location.href = `/companies/${id}`;
  }
  if (status === 'loading' || loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Companies</h2>
      {companies.map(company => (
        <div
          key={company.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          // onClick={() => router.push(`/companies/${company.id}`)} 
        onClick={() => handleCompanyClick(company.id)}
        >
          <img
            src={company.logo}
            alt={company.name}
            style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{company.name}</h3>
            <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CompaniesPage