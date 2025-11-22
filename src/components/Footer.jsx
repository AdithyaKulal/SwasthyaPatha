function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} SwasthyaPatha. Built for the National Hackathon.</p>
        <div className="flex flex-wrap gap-4 font-medium text-slate-600">
          <p className="text-brand-primary">Stay proactive. Stay healthy.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

