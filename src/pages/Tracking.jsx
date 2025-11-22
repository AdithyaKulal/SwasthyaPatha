import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import Input from '../components/Input'
import Button from '../components/Button'
import Card from '../components/Card'

const initialVitals = {
  heartRate: '76 bpm',
  bloodPressure: '120/80 mmHg',
  sugar: '98 mg/dL',
  weight: '68 kg',
}

function Tracking() {
  const [form, setForm] = useState({
    heartRate: '',
    bloodPressure: '',
    sugar: '',
    weight: '',
  })
  const [vitals, setVitals] = useState(initialVitals)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setVitals({
      heartRate: form.heartRate || vitals.heartRate,
      bloodPressure: form.bloodPressure || vitals.bloodPressure,
      sugar: form.sugar || vitals.sugar,
      weight: form.weight || vitals.weight,
    })
    setForm({
      heartRate: '',
      bloodPressure: '',
      sugar: '',
      weight: '',
    })
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <DashboardLayout
        title="Vitals Tracking"
        subtitle="Log heart rate, blood pressure, sugar, and weight in one flow."
        action={
          <p className="text-sm text-slate-500">
            Last synced <span className="font-semibold text-brand-primary">2 mins ago</span>
          </p>
        }
      >
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50/60 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Heart Rate (bpm)"
                name="heartRate"
                value={form.heartRate}
                onChange={handleChange}
                placeholder={vitals.heartRate}
              />
              <Input
                label="Blood Pressure (mmHg)"
                name="bloodPressure"
                value={form.bloodPressure}
                onChange={handleChange}
                placeholder={vitals.bloodPressure}
              />
              <Input
                label="Sugar Level (mg/dL)"
                name="sugar"
                value={form.sugar}
                onChange={handleChange}
                placeholder={vitals.sugar}
              />
              <Input
                label="Weight (kg)"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder={vitals.weight}
              />
            </div>
            <Button type="submit" fullWidth>
              Save vitals
            </Button>
          </form>

          <div className="space-y-4 rounded-3xl border border-slate-100 bg-white p-6 shadow">
            <h3 className="text-lg font-semibold text-slate-800">Latest vitals</h3>
            <div className="grid gap-4">
              {Object.entries(vitals).map(([key, value]) => {
                const formatted = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())
                return (
                  <Card key={key} title={formatted} highlight>
                    <p className="text-2xl font-semibold text-slate-900">{value}</p>
                    <p className="text-sm text-slate-500">Updated just now</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  )
}

export default Tracking

