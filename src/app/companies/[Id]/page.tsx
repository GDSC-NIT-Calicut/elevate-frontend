'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import axios from 'axios'

type Company = {
  id: number
  name: string
  logo: string
  description: string
  website: string
}

const CompanyDetails = () => {
  const params = useParams()
  const id = params?.id
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    console.log('Company ID:', id) // Debugging
    if (!id) {
      setError('No company ID provided')
      setLoading(false)
      return
    }
  }, [id])

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.post('/api/auth/verify-and-get-tokens')
        setToken(response.data.tokens.access)
      } catch (err) {
        console.error("Token error:", err)
        setError('Failed to get backend token')
      }
    }
    if (status === 'authenticated') getToken()
  }, [status])

 useEffect(() => {
  console.log('Token:', token);
  console.log('ID:', id);
  if (!token || !id) return
  
  setLoading(true)
  console.log(`Making request to: http://localhost:8000/api/company/${id}/`);
  axios.get(`http://localhost:8000/api/company/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      console.log('Response data:', res.data);
      setCompany(res.data)
    })
    .catch((err) => {
      console.error("Error details:", err.response?.data || err.message);
      setError('Failed to fetch company details')
    })
    .finally(() => setLoading(false))
}, [token, id])

  if (status === 'loading') return <div>Checking authentication...</div>
  if (loading) return <div>Loading company details...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!company) return <div>No company found.</div>

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 32 }}>
      <button onClick={() => router.back()} style={{ marginBottom: 24 }}>← Back</button>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
        <img
          src={company.logo}
          alt={company.name}
          style={{ width: 100, height: 100, objectFit: 'contain', marginRight: 32 }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/default-company.png'
          }}
        />
        <div>
          <h1 style={{ margin: 0 }}>{company.name}</h1>
          <a href={company.website} target="_blank" rel="noopener noreferrer">
            {company.website}
          </a>
        </div>
      </div>
      <div>
        <h3>Description</h3>
        <p>{company.description}</p>
      </div>
    </div>
  )
}

export default CompanyDetails