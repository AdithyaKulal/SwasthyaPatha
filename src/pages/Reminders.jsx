import { useState } from 'react'
import { BellRing, CheckCircle2 } from 'lucide-react'
import DashboardLayout from '../components/DashboardLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

const initialReminders = [
  { title: 'Morning Medicine', time: '8:00 AM', note: 'Blood pressure pill' },
  { title: 'Hydration Check', time: '11:00 AM', note: 'Drink 500ml water' },
]

function Reminders() {
  const [reminders, setReminders] = useState(initialReminders)
  const [form, setForm] = useState({ title: '', time: '', note: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.time) return
    setReminders([{ ...form }, ...reminders])
    setForm({ title: '', time: '', note: '' })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <DashboardLayout
        title="Smart Reminders"
        subtitle="Plan medicines, tests, checkups, and lifestyle habits."
        action={
          <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-2 text-sm text-emerald-600">
            <CheckCircle2 size={16} />
            Sync ready for mobile app
          </div>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow"
          >
            <Input label="Reminder Title" name="title" value={form.title} onChange={handleChange} />
            <Input label="Time" name="time" type="time" value={form.time} onChange={handleChange} />
            <Input
              label="Note"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Optional notes"
            />
            <Button type="submit" fullWidth>
              Add Reminder
            </Button>
          </form>

          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <Card key={`${reminder.title}-${index}`} title={reminder.title} icon={BellRing}>
                <p className="text-sm font-semibold text-brand-primary">{reminder.time}</p>
                {reminder.note && <p className="mt-2 text-slate-600">{reminder.note}</p>}
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Reminders

