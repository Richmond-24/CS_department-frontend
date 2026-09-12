"use client";

import {
  ArrowRight,
  Award,
  BookOpen,
  Clock3,
  FlaskConical,
  Globe2,
  GraduationCap,
} from "lucide-react";

const postgraduatePrograms = [
  {
    title: "Master of Science (MSc.) in Computer Science",
    description:
      "The MSc. Computer Science programme is designed for graduates seeking advanced knowledge and specialised skills in computer science. Students develop the ability to critically analyse complex problems, apply advanced computing techniques, and design innovative solutions to real-world challenges.",
    details:
      "The programme provides opportunities to explore areas such as artificial intelligence, software engineering, cybersecurity, data science, networking, and other emerging fields, while preparing students for advanced professional roles or further research.",
    award: "Master of Science (MSc.)",
    study: "Advanced Coursework & Research",
    duration: "2 years",
    icon: BookOpen,
  },
  {
    title: "Master of Philosophy (MPhil) in Computer Science",
    description:
      "The MPhil in Computer Science is a research-oriented programme designed for students who want to develop deeper expertise while conducting independent research in specialised areas of computing.",
    details:
      "Students work closely with academic supervisors to investigate significant problems, develop research methodologies, produce original findings, and contribute to the growing body of knowledge in computer science.",
    award: "Master of Philosophy (MPhil)",
    study: "Advanced Coursework & Research",
    duration: "2 years",
    icon: FlaskConical,
  },
  {
    title: "Doctor of Philosophy (PhD) in Computer Science",
    description:
      "The PhD in Computer Science is the highest level of academic study, designed for researchers seeking to make an original and significant contribution to the field of computing.",
    details:
      "Through sustained, independent research, doctoral candidates investigate complex and emerging problems, develop new knowledge, and contribute solutions with potential impact across academia, industry, government, and society.",
    award: "Doctor of Philosophy (PhD)",
    study: "Independent Research",
    duration: "TBA",
    icon: Award,
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: "Advanced Learning",
    description:
      "Develop advanced knowledge and specialised skills in modern computer science and emerging technologies.",
  },
  {
    icon: FlaskConical,
    title: "Research & Innovation",
    description:
      "Conduct meaningful research and develop innovative solutions to important computing and societal problems.",
  },
  {
    icon: Award,
    title: "Professional Growth",
    description:
      "Prepare for advanced careers, academic opportunities, research positions, and leadership roles in technology.",
  },
];

const PostgraduateProgrammes = () => {
  return (
    <main className="w-full overflow-hidden bg-white pb-8 text-[#080d4f]">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[560px] overflow-hidden sm:min-h-[650px] lg:min-h-[720px]">

        <img
          src="/images/programmes/postgraduate-hero.jpg"
          alt="Postgraduate Computer Science students"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#06145b]/85" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#06145b]/95 via-[#06145b]/80 to-[#06145b]/40" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-24 sm:min-h-[650px] sm:px-10 lg:min-h-[720px] lg:px-16">

          <div className="max-w-4xl">

            <div className="mb-7 flex items-center gap-4">

              <span className="h-1 w-14 rounded-full bg-[#079bd3]" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#57d3f7] sm:text-base">
                Postgraduate Studies
              </span>

            </div>

            <h1 className="text-5xl font-bold leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Postgraduate
              <span className="block text-[#079bd3]">
                Programmes
              </span>
            </h1>

            <div className="mt-8 h-1.5 w-24 rounded-full bg-[#079bd3]" />

            <p className="mt-8 max-w-3xl text-lg leading-[1.8] text-white/90 sm:text-xl lg:text-2xl">
              Advance your knowledge, conduct meaningful research, and drive
              innovation through postgraduate study in Computer Science.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <a
                href="#programmes"
                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#079bd3] px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#0687b8] hover:shadow-2xl"
              >
                Explore Programmes

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#080d4f]"
              >
                Apply Online
              </a>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 sm:py-28 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">

            <div>

              <div className="flex items-center gap-3 text-[#079bd3]">

                <GraduationCap size={32} />

                <span className="text-sm font-bold uppercase tracking-[0.18em] sm:text-base">
                  Graduate Education
                </span>

              </div>

              <h2 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
                Advance Knowledge.
                <br />
                Conduct Research.
                <br />
                Drive Innovation.
              </h2>

              <div className="mt-7 h-1.5 w-20 rounded-full bg-[#079bd3]" />

              <p className="mt-8 max-w-3xl text-lg leading-[1.9] text-[#4b5566]">
                Our postgraduate programmes provide opportunities for
                advanced study and research in computer science, enabling
                students to deepen their expertise, investigate complex
                problems, and contribute to the advancement of computing and
                technology.
              </p>

              <p className="mt-6 max-w-3xl text-lg leading-[1.9] text-[#4b5566]">
                Through rigorous coursework, independent research, and
                engagement with emerging areas of computing, our programmes
                prepare graduates for advanced professional practice,
                research, academia, and leadership in technology.
              </p>

            </div>


            {/* INFORMATION CARD */}
            <div className="rounded-3xl bg-[#e5f8fd] p-8 shadow-sm sm:p-10 lg:p-12">

              <div className="space-y-8">

                <div className="flex gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#079bd3]">
                    <Clock3 size={25} />
                  </div>

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wide">
                      Duration
                    </p>

                    <p className="mt-3 text-base leading-[1.8] text-[#526078]">
                      MSc: 2 years
                      <br />
                      MPhil: 2 years
                      <br />
                      PhD: TBA
                    </p>

                  </div>

                </div>

                <div className="h-px bg-[#080d4f]/15" />

                <div className="flex gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-[#079bd3]">
                    <Globe2 size={25} />
                  </div>

                  <div>

                    <p className="text-sm font-bold uppercase tracking-wide">
                      Language
                    </p>

                    <p className="mt-3 text-base text-[#526078]">
                      English
                    </p>

                  </div>

                </div>

                <div className="h-px bg-[#080d4f]/15" />

                <a
                  href="#contact"
                  className="flex w-full items-center justify-center rounded-xl bg-[#079bd3] px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#057eae]"
                >
                  Apply Online
                </a>

                <a
                  href="#contact"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-[#080d4f] px-6 py-4 text-base font-bold transition-all duration-300 hover:bg-[#080d4f] hover:text-white"
                >
                  Contact Us
                </a>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PROGRAMMES
      ====================================================== */}
      <section
        id="programmes"
        className="bg-[#e5f8fd] px-6 py-24 sm:px-10 sm:py-28 md:px-16 lg:px-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="max-w-4xl">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#079bd3] sm:text-base">
              Available Programmes
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Choose Your Path
            </h2>

            <div className="mt-6 h-1.5 w-20 rounded-full bg-[#079bd3]" />

            <p className="mt-7 text-lg leading-[1.8] text-[#526078]">
              Explore our postgraduate programmes and find the pathway that
              matches your academic, research, and professional goals.
            </p>

          </div>


          <div className="mt-16 space-y-10">

            {postgraduatePrograms.map((program, index) => {

              const Icon = program.icon;

              return (
                <article
                  key={program.title}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >

                  <div className="grid lg:grid-cols-[1fr_340px]">

                    <div className="p-8 sm:p-12 lg:p-14">

                      <div className="flex items-start gap-5">

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#e5f8fd] text-[#079bd3]">
                          <Icon size={30} />
                        </div>

                        <div>

                          <p className="text-sm font-bold text-[#079bd3]">
                            PROGRAMME 0{index + 1}
                          </p>

                          <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                            {program.title}
                          </h3>

                        </div>

                      </div>


                      <p className="mt-9 text-lg leading-[1.9] text-[#4b5566]">
                        {program.description}
                      </p>

                      <p className="mt-6 text-lg leading-[1.9] text-[#4b5566]">
                        {program.details}
                      </p>


                      <div className="mt-10 grid gap-6 border-t border-[#e5e7eb] pt-8 sm:grid-cols-2">

                        <div>

                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#079bd3]">
                            Award
                          </p>

                          <p className="mt-3 text-base font-semibold">
                            {program.award}
                          </p>

                        </div>

                        <div>

                          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#079bd3]">
                            Study Type
                          </p>

                          <p className="mt-3 text-base font-semibold">
                            {program.study}
                          </p>

                        </div>

                      </div>


                      <a
                        href="/admissions"
                        className="group mt-9 inline-flex items-center gap-3 text-base font-bold underline decoration-[#079bd3] decoration-2 underline-offset-4 transition-colors hover:text-[#079bd3]"
                      >
                        Apply Now

                        <ArrowRight
                          size={19}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </a>

                    </div>


                    <div className="flex flex-col justify-between bg-[#d5f2fa] p-8 sm:p-10 lg:p-9">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#079bd3]">
                          Programme Details
                        </p>

                        <div className="mt-8 space-y-7">

                          <div>

                            <p className="text-xs font-bold uppercase tracking-wide text-[#526078]">
                              Duration
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                              {program.duration}
                            </p>

                          </div>

                          <div className="h-px bg-[#080d4f]/15" />

                          <div>

                            <p className="text-xs font-bold uppercase tracking-wide text-[#526078]">
                              Language
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                              English
                            </p>

                          </div>

                          <div className="h-px bg-[#080d4f]/15" />

                          <div>

                            <p className="text-xs font-bold uppercase tracking-wide text-[#526078]">
                              Mode
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                              Contact Department
                            </p>

                          </div>

                        </div>

                      </div>


                      <a
                        href="/admissions"
                        className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-[#079bd3] px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#057eae]"
                      >
                        Apply Online
                        <ArrowRight size={18} />
                      </a>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY POSTGRADUATE
      ====================================================== */}
      <section className="bg-white px-6 py-24 sm:px-10 sm:py-28 md:px-16 lg:px-20">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-4xl text-center">

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#079bd3] sm:text-base">
              Why Postgraduate Study?
            </p>

            <h2 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl">
              Go Further With Computer Science
            </h2>

            <div className="mx-auto mt-6 h-1.5 w-20 rounded-full bg-[#079bd3]" />

            <p className="mt-7 text-lg leading-[1.8] text-[#526078]">
              Develop deeper expertise, conduct meaningful research, and
              prepare yourself for advanced opportunities in the technology
              ecosystem.
            </p>

          </div>


          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {benefits.map((benefit) => {

              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-3xl border border-[#c7eaf3] bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl sm:p-10"
                >

                  <div className="flex h-18 w-18 items-center justify-center rounded-full bg-[#e5f8fd] p-4 text-[#079bd3] transition-all duration-300 group-hover:bg-[#079bd3] group-hover:text-white">

                    <Icon size={32} />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-5 text-base leading-[1.85] text-[#526078] sm:text-lg">
                    {benefit.description}
                  </p>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          START YOUR JOURNEY
      ====================================================== */}
      <section className="relative min-h-[520px] overflow-hidden pb-6 sm:min-h-[560px] lg:min-h-[620px]">

        {/* Background image */}
        <img
          src="/w.jpg"
          alt="Computer Science student working with technology"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#06145b]/80" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06145b]/95 via-[#06145b]/80 to-[#06145b]/50" />


        {/* Decorative circles */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />

        <div className="absolute -right-32 -bottom-32 h-[500px] w-[500px] rounded-full border border-white/10" />


        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center justify-center px-6 py-24 text-center sm:min-h-[620px] sm:px-10 lg:min-h-[700px] lg:px-16">

          <div className="max-w-5xl">

            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#50d0f5] sm:text-base">
              Start Your Journey
            </p>

            <h2 className="mt-6 text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Want to advance innovation in Computer Science?
            </h2>

            <div className="mx-auto mt-8 h-1.5 w-24 rounded-full bg-[#079bd3]" />

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-[1.85] text-white/90 sm:text-xl">
              Take the next step toward an advanced education in computer
              science. Explore our programmes and discover the opportunities
              available at the Department of Computer Science.
            </p>


            <div className="mt-11 flex flex-col justify-center gap-4 sm:flex-row">

              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#079bd3] px-9 py-4 text-base font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#06a8df] hover:shadow-2xl sm:text-lg"
              >
                Apply Online

                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 bg-white/5 px-9 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#080d4f] sm:text-lg"
              >
                Contact Us
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default PostgraduateProgrammes;