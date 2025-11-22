import clsx from 'clsx'

const baseClasses =
  'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const variants = {
  primary:
    'bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-soft hover:translate-y-[-2px] hover:shadow-xl focus-visible:ring-brand-primary',
  secondary:
    'border border-brand-primary/30 text-brand-primary bg-white hover:bg-brand-light focus-visible:ring-brand-primary',
}

function Button({
  children,
  className = '',
  variant = 'primary',
  fullWidth = false,
  loading = false,
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={clsx(
        baseClasses,
        variants[variant],
        fullWidth && 'w-full',
        loading && 'opacity-70 cursor-wait',
        'px-6 py-3',
        className,
      )}
      disabled={Component === 'button' && (loading || props.disabled)}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </Component>
  )
}

export default Button

