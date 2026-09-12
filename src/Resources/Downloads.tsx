export default function Downloads() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Downloads</p>
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">Documents and downloadable resources</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Prospectus', 'Departmental information, programme structure, and admissions guidance.'],
            ['Student Handbook', 'Rules, policies, support channels, and academic expectations.'],
            ['Forms and Templates', 'Application, approval, and administrative forms used across student services.'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-[#080b50]">{title}</h2>
              <p className="text-base leading-7 text-slate-700">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
