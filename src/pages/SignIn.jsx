import { SignIn as ClerkSignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

function SignIn() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-6xl items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Logo />
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-slate-600">Sign in to access your health dashboard</p>
        </div>
        <div className="flex justify-center">
          <ClerkSignIn
            appearance={{
              elements: {
                rootBox: 'mx-auto',
                card: 'shadow-soft rounded-3xl border border-slate-100',
                headerTitle: 'text-2xl font-bold text-slate-900',
                headerSubtitle: 'text-slate-600',
                socialButtonsBlockButton:
                  'rounded-2xl border border-slate-200 transition-all duration-300 hover:border-brand-primary hover:bg-brand-light',
                formButtonPrimary:
                  'bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl transition-all duration-300 hover:shadow-lg',
                footerActionLink: 'text-brand-primary font-semibold hover:text-brand-secondary',
              },
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        </div>
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="font-semibold text-brand-primary hover:text-brand-secondary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn

