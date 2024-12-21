'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            platforms: ['waitlist']
          }
        }
      })

      if (signUpError) throw signUpError

      if (signUpData.user) {
        const response = await fetch('/api/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            supabaseId: signUpData.user.id,
            platforms: ['waitlist']
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to create client record')
        }
      }

      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Check your email</h2>
        <p className="text-gray-600">
          We've sent you a verification link. Please check your email to verify your account.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl text-gray-700 font-semibold text-center mb-8">
            Create your account
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 border rounded-md focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Full name"
              />
            </div>
            
            <div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border rounded-md focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Email address"
              />
            </div>
            
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border rounded-md focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                placeholder="Password"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-gray-800 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}