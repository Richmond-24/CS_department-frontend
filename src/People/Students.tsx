export default function Students() {
  return (
    <main className="bg-white px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Students</p>
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">Student community</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Student Clubs', 'Collaborative coding, problem-solving, and innovation communities'],
            ['Hackathons', 'Opportunities to solve real-world challenges with peers and mentors'],
            ['Research Projects', 'Hands-on work guided by faculty and industry partners'],
          ].map(([title, description]) => (
            <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="mb-4 text-2xl font-bold text-[#080b50]">{title}</h2>
              <p className="text-base leading-7 text-slate-700">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
