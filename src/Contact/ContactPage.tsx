export default function ContactPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">Contact</p>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">Get in touch with the department</h1>
        <p className="mt-4 text-lg text-slate-700">
          We welcome enquiries from prospective students, partners, researchers, and the public.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl bg-[#e6f7ff] p-6">
            <h2 className="text-xl font-bold text-[#080b50]">Phone</h2>
            <p className="mt-2 text-base text-slate-700">+233 00 000 0000</p>
          </article>
          <article className="rounded-2xl bg-[#e6f7ff] p-6">
            <h2 className="text-xl font-bold text-[#080b50]">Email</h2>
            <p className="mt-2 text-base text-slate-700">info@uenr.csi.edu.gh</p>
          </article>
        </div>
      </div>
    </main>
  );
}
