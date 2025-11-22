import clsx from 'clsx'

function Input({
  label,
  name,
  error,
  className = '',
  type = 'text',
  ...props
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-600">
      {label}
      <input
        name={name}
        type={type}
        className={clsx(
          'rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm outline-none transition-all focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20',
          error && 'border-red-400 focus:border-red-400 focus:ring-red-200',
          className,
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </label>
  )
}

export default Input

