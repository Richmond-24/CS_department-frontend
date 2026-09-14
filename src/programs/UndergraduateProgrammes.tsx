import Image from "../components/Image";
import {
  Clock3,
  Globe2,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const careers = [
  "Software Engineer / Developer",
  "Database Administrator",
  "Web Developer",
  "Systems Analyst",
  "Mobile App Developer",
  "Network Engineer",
  "Data Scientist (Analyst)",
  "UI/UX Designer",
  "AI / ML Engineer",
  "IT Consultant",
  "Cybersecurity Analyst",
  "Researcher / Academic",
  "Cloud / DevOps Engineer",
];

export default function UndergraduateProgrammes() {
  return (
    <main className="min-h-screen bg-white pb-10 text-[#080d4f]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#080d4f]">
        <div className="absolute inset-0">
          <Image
            src="/img2.jpeg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#080d4f]/75" />

          {/* Blue overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/95 via-[#080d4f]/70 to-[#080d4f]/30" />
        </div>

        <div className="relative mx-auto flex min-h-[360px] max-w-6xl items-center px-5 py-16 sm:px-8 sm:py-20 md:min-h-[430px] md:px-12 lg:min-h-[470px]">
          <div className="max-w-3xl">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#4cc6f0] sm:text-sm">
              Academic Programmes
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Undergraduate
              <br />
              Programmes
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8 md:text-lg">
              Build the knowledge, technical skills, and practical experience
              needed to succeed in the rapidly evolving world of computing
              and technology.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://admissions.uenr.edu.gh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#079bd3] px-5 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-[#0689bb] hover:-translate-y-0.5"
              >
                Apply Online
                <ArrowRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 md:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-[1fr_0.4fr] md:items-center lg:gap-16">

            {/* TEXT */}
            <div>
              <div className="h-1 w-16 rounded-full bg-[#079bd3]" />

              <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#080d4f] sm:text-3xl md:text-4xl">
                Build. Innovate. Shape the Future.
              </h2>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
                Our undergraduate programmes provide students with a strong
                foundation in computing and information science, combining
                rigorous academic learning with practical, hands-on
                experience. Students develop the knowledge, technical skills,
                and problem-solving abilities needed to design and build
                impactful solutions for today's rapidly evolving technological
                landscape.
              </p>

              <p className="mt-5 max-w-3xl text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
                Through exposure to areas such as software development,
                artificial intelligence, cybersecurity, data, networking, and
                emerging technologies, our programmes prepare students to
                become capable computing professionals and innovators.
              </p>
            </div>


            {/* QUICK INFO CARD */}
            <div className="rounded-2xl bg-[#e6f7ff] p-6 sm:p-7">

              {/* DURATION */}
              <div>
                <div className="flex items-center gap-2 text-[#203b82]">
                  <Clock3 size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                    Duration
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#080d4f]">
                  Degree (BSc): <strong>4 years</strong>
                  <br />
                  Diploma (Dipl): <strong>2 years</strong>
                </p>
              </div>

              <div className="my-5 h-px bg-[#203b82]/20" />

              {/* LANGUAGE */}
              <div>
                <div className="flex items-center gap-2 text-[#203b82]">
                  <Globe2 size={18} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                    Language
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium text-[#080d4f]">
                  English
                </p>
              </div>

              <div className="my-5 h-px bg-[#203b82]/20" />

              {/* ACTIONS */}
              <div className="space-y-2">
                <a
                  href="https://admissions.uenr.edu.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg border border-[#203b82] px-4 py-2.5 text-sm font-semibold text-[#080d4f] transition-all hover:bg-[#080d4f] hover:text-white"
                >
                  Contact Admissions
                </a>

                <a
                  href="https://admissions.uenr.edu.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center rounded-lg bg-[#079bd3] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0689bb]"
                >
                  Apply Online
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          BSC COMPUTER SCIENCE
      ====================================================== */}
      <section className="bg-[#e8f8fc] px-5 py-14 sm:px-8 sm:py-18 md:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-4xl">

            <div className="h-1 w-14 rounded-full bg-[#080d4f]" />

            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#080d4f] sm:text-3xl md:text-4xl">
              Bachelor of Science in Computer Science &amp; Informatics
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
              The <strong>BSc Computer Science</strong> programme develops
              professionals with a strong foundation in mathematics,
              science, computing, and technology. Students learn to analyse
              complex problems, design and implement computing solutions, and
              apply their knowledge across industry, academia, government, and
              other sectors.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
              The programme provides opportunities to explore areas including
              software engineering, artificial intelligence, cybersecurity,
              data science, networking, robotics, and emerging technologies,
              while developing the analytical and practical skills required
              for advanced study and professional practice.
            </p>

            {/* DETAILS */}
            <div className="mt-7 space-y-2 text-sm text-[#182052] sm:text-base">
              <p>
                Duration: <strong>4 Years</strong>
              </p>

              <p>
                Award:{" "}
                <strong>
                  Bachelor of Science (BSc.) in Computer Science
                </strong>
              </p>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#080d4f] underline underline-offset-4 transition-colors hover:text-[#079bd3] sm:text-base"
            >
              Apply Now
              <ArrowRight size={16} />
            </a>

          </div>
        </div>
      </section>


      {/* =====================================================
          DIPLOMA
      ====================================================== */}
      <section className="bg-white px-5 py-14 sm:px-8 sm:py-18 md:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">

          <div className="max-w-4xl">

            <div className="h-1 w-14 rounded-full bg-[#080d4f]" />

            <h2 className="mt-4 text-2xl font-extrabold tracking-[-0.04em] text-[#080d4f] sm:text-3xl md:text-4xl">
              Diploma in Computer Science &amp; Informatics
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
              The <strong>Diploma in Computer Science</strong> provides a
              practical foundation in computing and information technology
              for students seeking to develop industry-relevant technical
              skills.
            </p>

            <p className="mt-5 text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
              Students are introduced to fundamental areas of computer
              science, programming, software development, databases,
              networking, and problem-solving, providing a strong foundation
              for employment, further study, or progression into a degree
              programme.
            </p>

            {/* DETAILS */}
            <div className="mt-7 space-y-2 text-sm text-[#182052] sm:text-base">
              <p>
                Duration: <strong>2 Years</strong>
              </p>

              <p>
                Award: <strong>Diploma in Computer Science</strong>
              </p>
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#080d4f] underline underline-offset-4 transition-colors hover:text-[#079bd3] sm:text-base"
            >
              Apply Now
              <ArrowRight size={16} />
            </a>

          </div>
        </div>
      </section>


      {/* =====================================================
          TOP CAREERS
      ====================================================== */}
      <section className="bg-[#e8f8fc] px-5 py-14 sm:px-8 sm:py-18 md:px-12 lg:py-20">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="text-center">

            <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#080d4f] sm:text-3xl md:text-4xl">
              Top Careers in Computer Science
            </h2>

            <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-[#079bd3]" />

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#182052] sm:text-base sm:leading-8">
              A computer science education opens doors to a wide range of
              careers across technology, business, research, and other
              industries. You could build a career as a:
            </p>
          </div>

          {/* CAREER LIST */}
          <div className="mx-auto mt-8 grid max-w-4xl gap-x-10 gap-y-3 sm:grid-cols-2">

            {careers.map((career) => (
              <div
                key={career}
                className="flex items-start gap-3 text-sm text-[#182052] sm:text-base"
              >
                <CheckCircle2
                  size={15}
                  className="mt-1 shrink-0 text-[#079bd3]"
                />

                <span>{career}</span>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="relative overflow-hidden pb-6">
        <div className="absolute inset-0">
          <Image
            src="/w.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-[#080d4f]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/85 via-[#080d4f]/65 to-[#080d4f]/40" />
        </div>

        <div className="relative mx-auto flex min-h-[360px] max-w-5xl items-center justify-center px-5 py-16 text-center sm:px-8 sm:py-20 md:min-h-[420px]">

          <div className="max-w-3xl">

            {/* BADGE */}
            <div className="mx-auto inline-flex rounded-full bg-[#079bd3]/80 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
              Applications Open
            </div>

            <h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl md:text-5xl">
              Begin Your Journey in Computer Science
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
              Take the next step toward an education in computer science.
              Explore our programmes and discover the opportunities available
              at the Department of Computer Science and Informatics.
            </p>

            {/* BUTTONS */}
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#079bd3] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#0689bb]"
              >
                Apply Online
                <ArrowRight size={16} />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/70 bg-white/5 px-7 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#080d4f]"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}