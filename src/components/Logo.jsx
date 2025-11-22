import { Link } from 'react-router-dom'

function Logo({ className = '' }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary p-2 text-white shadow-lg shadow-brand-primary/30">
        SP
      </span>
      <div className="leading-tight">
        <p className="text-lg font-bold text-slate-900">SwasthyaPatha</p>
        <p className="text-xs uppercase tracking-widest text-brand-primary">
          health is wealth
        </p>
      </div>
    </Link>
  )
}

export default Logo

