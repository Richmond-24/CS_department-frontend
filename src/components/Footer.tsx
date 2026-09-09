const footerColumns = {
  School: ['About', 'History', 'Leadership'],
  Academics: ['Programs', 'Courses', 'Research'],
  Students: ['Careers', 'Scholarships', 'Support'],
}

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/80 px-2 pt-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-gradient-to-br from-blue-600 via-violet-600 to-emerald-500 shadow-[0_16px_30px_rgba(124,58,237,0.35)]" aria-hidden="true">
          <span className="text-xs font-extrabold tracking-[0.06em] text-white">CS</span>
        </div>
        <div className="flex flex-col leading-none">
          <strong className="text-[1.1rem] font-semibold text-slate-900">Computer Science</strong>
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-slate-500">Department</span>
        </div>
      </div>

      <div className="mb-5 grid gap-5 md:grid-cols-3">
        {Object.entries(footerColumns).map(([title, links]) => (
          <div key={title}>
            <h4 className="mb-3 text-[0.9rem] font-bold uppercase tracking-[0.09em] text-slate-800">{title}</h4>
            <ul className="space-y-2 p-0">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-600 transition hover:text-slate-900">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-slate-500">
        <p className="m-0">© 2026 Computer Science Department</p>
        <a href="#" className="text-slate-600 transition hover:text-slate-900">Privacy Policy</a>
      </div>
    </footer>
  )
}
