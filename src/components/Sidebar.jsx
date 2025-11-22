import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Activity,
  BellRing,
  FileText,
  Home,
  LayoutDashboard,
  Stethoscope,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Tracking', to: '/tracking', icon: Activity },
  { label: 'Records', to: '/records', icon: FileText },
  { label: 'Reminders', to: '/reminders', icon: BellRing },
  { label: 'Consultation', to: '/consultation', icon: Stethoscope },
  { label: 'Home', to: '/', icon: Home },
]

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <aside
      className={`relative h-full w-full max-w-xs rounded-3xl border border-slate-100 bg-white p-4 shadow-lg transition-all duration-500 ${
        collapsed ? 'md:max-w-[5rem]' : ''
      }`}
    >
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="absolute -right-4 top-4 hidden rounded-full border border-slate-200 bg-white p-2 shadow md:block"
      >
        {collapsed ? <Menu size={18} /> : <X size={18} />}
      </button>

      <div className="flex items-center gap-3 px-2 py-4">
        <div className="rounded-2xl bg-brand-light p-3 text-brand-primary">
          <LayoutDashboard />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-slate-700">Health Modules</p>
            <p className="text-xs text-slate-400">Navigate your care</p>
          </div>
        )}
      </div>

      <nav className="mt-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-brand-light text-brand-primary'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Icon size={20} />
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

