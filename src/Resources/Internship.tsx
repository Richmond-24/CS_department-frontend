import { ArrowRight, BriefcaseBusiness, CheckCircle2, FileText, Mail, Phone } from 'lucide-react';

export default function InternshipPage() {
  return (
    <main className="bg-white text-[#080d4f]">
      <section className="px-6 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#079bd3]">
            Resources
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Internship Information
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-[#526078] md:text-lg">
            Students can use this page to understand internship requirements, the application process,
            and the information needed to request a formal internship letter from the department.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-[#e3f6fc] p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#079bd3]">
                <BriefcaseBusiness size={22} />
              </div>
              <h2 className="text-2xl font-bold">Internship Overview</h2>
              <p className="mt-4 text-base leading-7 text-[#526078]">
                Internship placements are designed to provide students with practical industry experience,
                professional exposure, and the opportunity to apply academic learning in real-world settings.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#e3f6fc] text-[#079bd3]">
                <FileText size={22} />
              </div>
              <h2 className="text-2xl font-bold">Requirements</h2>
              <ul className="mt-4 space-y-3 text-base text-[#526078]">
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#079bd3]" />Completed relevant academic coursework</li>
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#079bd3]" />Approved placement or internship opportunity</li>
                <li className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 text-[#079bd3]" />Student identification and programme information</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <h2 className="text-2xl font-bold">Application / Request Process</h2>
            <ol className="mt-5 space-y-4 text-base leading-7 text-[#526078]">
              <li>1. Confirm the internship placement details and host organization.</li>
              <li>2. Prepare the required student information and proof of enrolment.</li>
              <li>3. Submit the request to the department through the contact channel below.</li>
              <li>4. Await confirmation and collection of the internship letter.</li>
            </ol>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-bold">Required Documents</h3>
              <ul className="mt-4 space-y-3 text-base text-[#526078]">
                <li>• Student ID / registration details</li>
                <li>• Placement confirmation from host organization</li>
                <li>• Start and end dates of internship</li>
                <li>• Supervisor or contact details (if applicable)</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#080d4f] p-7 text-white shadow-sm">
              <h3 className="text-xl font-bold text-white">Department Contact</h3>
              <div className="mt-5 space-y-4 text-sm text-white/85">
                <div className="flex items-center gap-3">
                  <Mail size={17} className="text-[#79d7ff]" />
                  <span>info@uenr.csi.edu.gh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={17} className="text-[#79d7ff]" />
                  <span>+233 00 000 0000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#resources"
              className="inline-flex items-center gap-2 rounded-md bg-[#079bd3] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#067ea9]"
            >
              Back to Resources
              <ArrowRight size={16} />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-[#080d4f] px-6 py-3 text-sm font-bold text-[#080d4f] transition hover:bg-[#080d4f] hover:text-white"
            >
              Contact Department
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
