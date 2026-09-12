const newsList = [
  {
    title: 'Department launches new AI collaboration hub',
    description: 'Students and faculty are working together on applied AI projects connected to societal and industrial needs.',
  },
  {
    title: 'Student innovations showcased at tech expo',
    description: 'A showcase of student prototypes and research posters attracted industry guests and academic mentors.',
  },
  {
    title: 'Faculty research funded for digital inclusion project',
    description: 'The department secured support for a project aimed at increasing digital literacy and access in the region.',
  },
];

export default function AllNews() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">News & Media</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Latest news and media highlights</h1>
          <p className="mt-4 text-lg text-slate-700">
            See what is happening across our academic community, public events, research wins, and student achievements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {newsList.map((item) => (
            <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#080b50]">{item.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
