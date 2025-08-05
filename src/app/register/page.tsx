'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/app/lib/supabaseClient'

export default function SignUpPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        const supabase = getSupabaseClient()

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            if (error.message.includes('User already registered')) {
                setError('Cet email est déjà utilisé.')
            } else {
                setError(error.message)
            }
        } else {
            // Si session disponible => redirige vers page protégée
            const sessionCheck = await supabase.auth.getSession()
            if (sessionCheck.data.session) {
                router.push('/dashboard')
            } else {
                router.push('/login')
            }
        }
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
                    <h3 className="text-xl mb-2 font-semibold text-black">Sign Up for Free</h3>
                    <p className="text-sm text-black">Visualize, track, maintain, ride with peace of mind.</p>
                </div>
                <form onSubmit={handleSignUp} className="flex flex-col space-y-4 bg-white px-4 py-8 sm:px-16">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
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
                                placeholder="Your Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="rounded-md border text-black border-gray-300 px-4 py-2 text-sm"
                                required
                            />
                            <label htmlFor="confirm-password" className="mb-1 mt-4 text-sm font-medium text-gray-700">
                                Confirm password
                            </label>
                            <input
                                id="confirm-password"
                                type="password"
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="rounded-md border text-black border-gray-300 px-4 py-2 text-sm"
                                required
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
                    >
                        Sign Up
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        {"Already have an account? "}
                        <a href="/login" className="font-semibold text-gray-800">
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    )
}
