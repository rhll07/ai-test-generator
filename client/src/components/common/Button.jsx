const variants = {
  primary: 'bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-600',
  secondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800',
  ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500'
};

export function Button({ children, variant = 'primary', className = '', type = 'button', as: Component = 'button', ...props }) {
  const buttonProps = Component === 'button' ? { type } : {};

  return (
    <Component
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950 ${variants[variant]} ${className}`}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
}
