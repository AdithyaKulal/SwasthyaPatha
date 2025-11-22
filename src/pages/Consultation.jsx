import DashboardLayout from '../components/DashboardLayout'
import Card from '../components/Card'
import Button from '../components/Button'
import { Stethoscope, Star } from 'lucide-react'

const doctors = [
  {
    name: 'Dr. Aisha Menon',
    specialty: 'Cardiologist',
    experience: '12 yrs',
    availability: 'Mon - Thu',
  },
  {
    name: 'Dr. Karan Patel',
    specialty: 'Endocrinologist',
    experience: '9 yrs',
    availability: 'Daily',
  },
  {
    name: 'Dr. Meera Rao',
    specialty: 'General Physician',
    experience: '15 yrs',
    availability: 'Mon - Sat',
  },
]

function Consultation() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <DashboardLayout
        title="Doctor Consultation"
        subtitle="Browse specialists and pre-book appointments (API coming soon)."
        action={<Button disabled>Live soon</Button>}
      >
        <div className="grid gap-6 md:grid-cols-2">
          {doctors.map((doc) => (
            <Card key={doc.name} title={doc.name} icon={Stethoscope}>
              <p className="font-semibold text-brand-primary">{doc.specialty}</p>
              <p className="mt-2 text-sm text-slate-500">
                Experience: {doc.experience} • Availability: {doc.availability}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-600">
                  <Star size={16} /> 4.9 rating
                </span>
                <Button disabled>Book Appointment</Button>
              </div>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Consultation

