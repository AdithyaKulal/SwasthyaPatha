import clsx from 'clsx'

function Card({ title, icon: Icon, children, className = '', highlight }) {
  return (
    <div
      className={clsx(
        'rounded-3xl bg-white p-6 shadow-lg shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft',
        highlight &&
          'bg-gradient-to-br from-brand-light via-white to-white border border-brand-primary/20',
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <span className="rounded-2xl bg-brand-light p-3 text-brand-primary">
            <Icon size={22} />
          </span>
        )}
        {title && <h3 className="text-lg font-semibold text-slate-800">{title}</h3>}
      </div>
      <div className="text-slate-600">{children}</div>
    </div>
  )
}

export default Card

