import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import Button from './Button'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/tracking', label: 'Tracking' },
  { to: '/records', label: 'Records' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/consultation', label: 'Consultation' },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClasses = ({ isActive }) =>
    `rounded-2xl px-4 py-2 text-sm font-semibold transition-colors ${
      isActive ? 'bg-brand-light text-brand-primary' : 'text-slate-600 hover:text-brand-primary'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="secondary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>
        </div>

        <button
          className="rounded-2xl border border-slate-200 p-2 text-slate-600 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        {open && (
          <div className="absolute left-4 right-4 top-20 flex flex-col gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-xl md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={linkClasses}
              >
                {link.label}
              </NavLink>
            ))}
            <SignedOut>
              <SignInButton mode="modal">
                <Button onClick={() => setOpen(false)} variant="secondary" fullWidth>
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'w-10 h-10',
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar

