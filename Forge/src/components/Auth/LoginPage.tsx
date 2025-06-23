// src/components/Auth/LoginPage.tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePrivy } from '@privy-io/react-auth'
import './Auth.css'

export function LoginPage() {
    const { user, login, logout, ready, authenticated } = usePrivy()
    const navigate = useNavigate()

    // This top‐level log shows you each render.
    // console.log('LoginPage render:', { ready, authenticated, user })

    useEffect(() => {
        // Redirect to overview page when user successfully authenticates
        if (ready && authenticated && user) {
            navigate('/dashboard')
        }
    }, [ready, authenticated, user, navigate])

    if (!ready) {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <h1>Loading...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                {authenticated && user ? (
                    <>
                        <h1>Welcome, {user?.twitter?.username}!</h1>
                        <button className="auth-button" onClick={() => logout()}>
                            Log out
                        </button>
                    </>
                ) : (
                    <>
                        <h1>Sign in to Forge</h1>
                        <button
                            className="auth-button"
                            onClick={() => login()}
                        >
                            Sign in with Privy
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
