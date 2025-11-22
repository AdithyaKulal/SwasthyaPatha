import { Link } from 'react-router-dom'
import { Activity, BellRing, FileText, Stethoscope, ArrowRight } from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'

const cards = [
  {
    title: 'Tracking',
    icon: Activity,
    description: 'Log vitals and watch trends in real-time.',
    to: '/tracking',
    stat: '4 vitals updated',
  },
  {
    title: 'Records',
    icon: FileText,
    description: 'Store medical files securely and access any time.',
    to: '/records',
    stat: '12 documents stored',
  },
  {
    title: 'Reminders',
    icon: BellRing,
    description: 'Smart alerts for medicines, tests, and check-ups.',
    to: '/reminders',
    stat: '3 due today',
  },
  {
    title: 'Consultation',
    icon: Stethoscope,
    description: 'Browse specialists and reserve slots (coming soon).',
    to: '/consultation',
    stat: '5 doctors online',
  },
]

function Dashboard() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <DashboardLayout
        title={`Welcome back, ${user?.firstName || user?.emailAddresses[0]?.emailAddress || 'User'}!`}
        subtitle="Clean overview of everything your health needs."
        action={
          <Button as={Link} to="/tracking" variant="secondary">
            Update vitals
          </Button>
        }
      >
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <Card key={card.title} title={card.title} icon={card.icon} highlight>
              <p className="text-slate-600">{card.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>{card.stat}</span>
                <Link to={card.to} className="flex items-center gap-2 text-brand-primary">
                  Open <ArrowRight size={16} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard

