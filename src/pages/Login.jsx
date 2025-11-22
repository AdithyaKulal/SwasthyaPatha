import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input'

const initialState = {
  email: '',
  password: '',
}

function Login() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return
    }
    setMessage('Login successful! Redirect logic coming after backend integration.')
    setForm(initialState)
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-[2.5rem] border border-slate-100 bg-white/90 p-10 shadow-soft backdrop-blur">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-primary">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Log into SwasthyaPatha</h1>
          <p className="mt-3 text-slate-500">Your health HQ is a login away.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Button type="submit" fullWidth>
            Login
          </Button>
          {message && <p className="rounded-2xl bg-brand-light/60 p-4 text-brand-primary">{message}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-primary">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

