import { Link } from 'react-router-dom'
import { Activity, BellRing, FileText, Stethoscope } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react'
import Button from '../components/Button'
import Card from '../components/Card'

const features = [
  {
    title: 'Health Tracking',
    description: 'Log vitals in seconds and visualize trends for smarter care decisions.',
    icon: Activity,
    to: '/tracking',
  },
  {
    title: 'Records Vault',
    description: 'Store prescriptions, lab reports, and scans in one safe place.',
    icon: FileText,
    to: '/records',
  },
  {
    title: 'Smart Reminders',
    description: 'Never miss medicines, tests, or checkups with proactive alerts.',
    icon: BellRing,
    to: '/reminders',
  },
  {
    title: 'Consultations',
    description: 'Browse expert doctors and book a slot instantly (coming soon).',
    icon: Stethoscope,
    to: '/consultation',
  },
]

function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-2xl bg-brand-light px-4 py-2 text-sm font-semibold text-brand-primary">
             A Smarter Way to Stay Healthy Every Day
          </p>
          <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
            SwasthyaPatha: Empowering You to Take Control of Your Health
          </h1>
          <p className="text-lg text-slate-600">
            Track vitals, organize medical records, set intelligent reminders, and stay connected
            with care providers — all from one intuitive dashboard built for humans, not hospital
            admins.
          </p>
          <div className="flex flex-wrap gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button variant="secondary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button as={Link} to="/dashboard">
                Go to Dashboard
              </Button>
            </SignedIn>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="font-semibold text-brand-primary">1000+ users</span>
            <span>Zero paperwork. 100% clarity.</span>
          </div>
        </div>
        <div className="relative">
          <div className="floating-card absolute -left-6 top-8 rounded-3xl border border-white/80 bg-white/80 p-5 shadow-soft backdrop-blur">
            <p className="text-sm font-semibold text-slate-500">Today&apos;s reminders</p>
            <ul className="mt-3 space-y-2 text-slate-700">
              <li>• Morning medication</li>
              <li>• Hydration check</li>
              <li>• Evening walk</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80"
            alt="Healthcare hero"
            className="h-full w-full rounded-[2.5rem] object-cover shadow-soft"
          />
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">
            Features
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Built for proactive health</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} title={feature.title} icon={feature.icon}>
              <p className="mb-4 text-slate-600">{feature.description}</p>
              <Button as={Link} to={feature.to} variant="secondary">
                Explore
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

