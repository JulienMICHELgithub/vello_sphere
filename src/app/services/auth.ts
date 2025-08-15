import { supabase } from '@/app/lib/supabaseClient'

function mapAuthError(err: any): string {
    const msg = (err?.message ?? '').toLowerCase()
    if (msg.includes('invalid login')) return 'Email ou mot de passe invalide.'
    if (msg.includes('email not confirmed')) return 'Veuillez confirmer votre email.'
    if (msg.includes('user already registered') || msg.includes('already exists')) {
        return 'Cet email est déjà utilisé.'
    }
    return err?.message || 'Une erreur est survenue.'
}

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { session: data.session, error: error ? new Error(mapAuthError(error)) : null }
}

export async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo:
                typeof window !== 'undefined' ? `${location.origin}/auth/callback` : undefined,
        },
    })

    const needsEmailConfirm = !data.session
    return {
        user: data.user,
        session: data.session,
        needsEmailConfirm,
        error: error ? new Error(mapAuthError(error)) : null,
    }
}

export async function signOut() {
    await supabase.auth.signOut()
}
