const resourceList = [
  {
    title: 'Student Portal',
    description: 'Access academic information, timetables, registration services, and departmental notifications.',
  },
  {
    title: 'Library',
    description: 'Discover books, journals, digital collections, and research repositories aligned with computing disciplines.',
  },
  {
    title: 'Downloads',
    description: 'Find forms, documents, departmental handbooks, and learning material shared by the faculty team.',
  },
  {
    title: 'Academic Information',
    description: 'View regulations, course structures, grading policies, and degree progression guidance for students.',
  },
];

export default function AllResources() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Resources</p>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Support for learning and growth</h1>
          <p className="mt-4 text-lg text-slate-700">
            We provide a wide set of academic and administrative resources to help students and staff stay informed, supported, and productive.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resourceList.map((resource) => (
            <article key={resource.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-[#080b50]">{resource.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate-700">{resource.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
