export default function Staff() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Staff</p>
        <h1 className="mb-8 text-4xl font-extrabold tracking-tight md:text-5xl">Administrative and technical staff</h1>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            ['Samuel Addo', 'Laboratory coordinator and practical training support'],
            ['Grace Boateng', 'Student support and academic administration'],
            ['Isaac Tetteh', 'IT systems and digital infrastructure maintenance'],
          ].map(([name, bio]) => (
            <article key={name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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
