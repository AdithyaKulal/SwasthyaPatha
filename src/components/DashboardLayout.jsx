import Sidebar from './Sidebar'

function DashboardLayout({ title, subtitle, action, children }) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <Sidebar />
      <section className="flex-1 rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-lg backdrop-blur">
        <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              {title}
            </p>
            {subtitle && <h2 className="mt-2 text-2xl font-semibold text-slate-900">{subtitle}</h2>}
          </div>
          {action}
        </div>
        {children}
      </section>
    </div>
  )
}

export default DashboardLayout

