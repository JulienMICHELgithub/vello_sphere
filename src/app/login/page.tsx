'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabaseClient'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
        }
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
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="rounded-md bg-black px-4 py-2 text-white text-sm hover:bg-gray-800"
                    >
                        Log In
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
