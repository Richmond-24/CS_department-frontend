const researchAreas = [
  {
    title: 'AI and Data Science',
    description: 'Exploring machine learning, intelligent systems, and data-driven solutions for social and industrial impact.',
  },
  {
    title: 'Cybersecurity and Systems',
    description: 'Researching resilient networks, digital protection, secure architectures, and trusted computing environments.',
  },
  {
    title: 'Software Engineering',
    description: 'Advancing software quality, reliable systems design, collaboration models, and modern engineering practice.',
  },
  {
    title: 'Applied Informatics',
    description: 'Driving practical innovation through technology adoption in education, health, governance, and community development.',
  },
];

export default function ResearchPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Research & Innovation</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Research that shapes tomorrow</h1>
          <p className="mt-4 text-lg text-slate-700">
            Our department connects teaching, scholarship, and applied technology to solve real-world problems and build research capability.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {researchAreas.map((area) => (
            <article key={area.title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-[#080b50]">{area.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{area.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
