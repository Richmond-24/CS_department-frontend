export default function Faculty() {
  return (
    <main className="bg-white px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Faculty</p>
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">Faculty members</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Prof. Ada Owusu', 'Computing, software engineering, and research leadership'],
            ['Dr. Kofi Mensah', 'Distributed systems and intelligent software design'],
            ['Dr. Nancy Yeboah', 'Machine learning, AI, and applied analytics'],
          ].map(([name, bio]) => (
            <article key={name} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6f7ff] text-xl font-bold text-[#203b82]">
                {name
                  .split(' ')
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <h2 className="text-2xl font-bold text-[#080b50]">{name}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{bio}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
