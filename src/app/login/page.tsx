'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmail } from '@/app/services/auth'
import { useRedirectIfAuthed } from '@/app/hooks/useAuthRedirect'

export default function LoginPage() {
    useRedirectIfAuthed('/dashboard')

    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)

        const { error } = await signInWithEmail(email, password)
        if (error) {
            setError(error.message)
            setSubmitting(false)
            return
        }
        router.push('/dashboard')
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl mb-2 tracking-[-.01em] font-semibold text-black">Log In</h3>
                    <p className="text-sm tracking-[-.01em] text-black">
                        Use your email and password to log in
                    </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col space-y-4 bg-white px-4 py-8 sm:px-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="rounded-md border text-black border-gray-300 px-4 py-2 text-sm"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="Your Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="rounded-md border text-black border-gray-300 px-4 py-2 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800 disabled:opacity-60"
                    >
                        {submitting ? 'Connexion…' : 'Log In'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {"Don't have an account? "}
                        <a href="/register" className="font-semibold text-gray-800">
                            Sign Up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}
