import { ArrowRight, GraduationCap, BookOpen } from "lucide-react";

const programmes = [
  {
    title: "Undergraduate Programmes",
    description:
      "Explore our undergraduate programmes designed to provide students with strong foundations in computer science, practical technical skills, problem-solving abilities, and the knowledge needed to succeed in today's technology-driven world.",
    button: "Explore Programmes",
    image: "/images/programmes/undergraduate.jpg",
    imageAlt: "Computer Science undergraduate student",
    reverse: false,
    icon: GraduationCap,
  },
  {
    title: "Postgraduate Programmes",
    description:
      "Take your expertise further through our postgraduate programmes. Develop advanced knowledge, conduct meaningful research, and build the skills required to contribute to innovation and the future of computing.",
    button: "Explore Postgraduate",
    image: "/images/programmes/postgraduate.jpg",
    imageAlt: "Computer Science postgraduate students",
    reverse: true,
    icon: BookOpen,
  },
];

export default function Programmes() {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[600px] lg:min-h-[650px]">
        <img
          src="/images/programmes/programmes-hero.jpg"
          alt="Computer Science students"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#06145b]/80" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06145b]/95 via-[#06145b]/75 to-[#06145b]/25" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-7xl items-center px-6 py-24 md:min-h-[600px] md:px-10 lg:min-h-[650px] lg:px-12">
          <div className="max-w-2xl text-white">
            <div className="mb-6 inline-flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#079bd3]" />
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">
                Computer Science
              </span>
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Our
              <br />
              <span className="text-[#079bd3]">Programmes</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Discover programmes designed to equip you with the knowledge,
              technical skills, and practical experience needed to thrive in
              the rapidly evolving world of technology.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#programmes"
                className="inline-flex items-center gap-3 rounded-md bg-[#079bd3] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#068abb] hover:shadow-xl"
              >
                Explore Our Programmes
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-24 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#079bd3]">
              Academic Programmes
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#080d4f] sm:text-5xl lg:text-6xl">
              Build the future
              <br />
              through technology.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#526078] sm:text-lg">
              Whether you are beginning your journey in computing or looking
              to advance your expertise, our programmes provide a strong
              academic foundation combined with practical learning,
              innovation, and research.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROGRAMMES
      ========================================================= */}
      <section id="programmes">
        {programmes.map((programme, index) => {
          const Icon = programme.icon;

          return (
            <section
              key={programme.title}
              className={`${
                index === 1 ? "bg-[#e8f8fd]" : "bg-white"
              } px-6 py-20 md:px-10 md:py-28 lg:px-12`}
            >
              <div
                className={`mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-20 ${
                  programme.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-[48%]">
                  <div className="group relative mx-auto max-w-[560px] overflow-hidden rounded-xl">
                    <img
                      src={programme.image}
                      alt={programme.imageAlt}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06145b]/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Number */}
                    <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white/95 text-lg font-bold text-[#080d4f] shadow-lg">
                      0{index + 1}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-[52%]">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#079bd3]/10 text-[#079bd3]">
                      <Icon size={22} />
                    </div>

                    <span className="text-sm font-bold uppercase tracking-[0.18em] text-[#079bd3]">
                      Programme {index + 1}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold leading-tight text-[#080d4f] sm:text-5xl lg:text-6xl">
                    {programme.title}
                  </h2>

                  <div className="mt-6 h-1 w-16 rounded-full bg-[#079bd3]" />

                  <p className="mt-7 max-w-xl text-base leading-8 text-[#526078] sm:text-lg">
                    {programme.description}
                  </p>

                  <a
                    href="#"
                    className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#079bd3] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#068abb] hover:shadow-lg"
                  >
                    {programme.button}
                    <ArrowRight size={17} />
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </section>

      {/* =========================================================
          WHY STUDY WITH US
      ========================================================= */}
      <section className="bg-white px-6 py-20 md:px-10 md:py-28 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#079bd3]">
              Why Computer Science
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#080d4f] sm:text-5xl lg:text-6xl">
              Learn. Create.
              <br />
              Innovate.
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#526078]">
              Our programmes combine academic knowledge with practical
              experiences that prepare students for careers, research, and
              entrepreneurship in technology.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Practical Learning",
                text: "Develop practical technical skills through projects, laboratories, and real-world applications.",
              },
              {
                number: "02",
                title: "Research & Innovation",
                text: "Explore emerging technologies and participate in research that addresses real-world challenges.",
              },
              {
                number: "03",
                title: "Career Ready",
                text: "Build the technical and professional skills needed to succeed in the global technology industry.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#079bd3]/30 hover:shadow-xl"
              >
                <span className="text-5xl font-bold text-[#079bd3]/20 transition-colors duration-300 group-hover:text-[#079bd3]">
                  {item.number}
                </span>

                <h3 className="mt-6 text-2xl font-bold text-[#080d4f]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-[#526078]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          START YOUR JOURNEY
      ========================================================= */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[580px] lg:min-h-[620px]">
        <img
          src="/images/programmes/start-journey.jpg"
          alt="Computer Science students working together"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#050c3e]/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050c3e]/95 via-[#06145b]/80 to-[#06145b]/50" />

        <div className="relative z-10 flex min-h-[520px] items-center justify-center px-6 py-20 text-center md:min-h-[580px] lg:min-h-[620px]">
          <div className="max-w-3xl text-white">
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#079bd3]">
              Begin Your Journey
            </p>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Begin Your Journey
              <br />
              <span className="text-[#079bd3]">
                in Computer Science
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Take the next step toward an education that prepares you to
              solve problems, build innovative technology, and shape the
              future.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 rounded-md bg-[#079bd3] px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#068abb]"
              >
                Apply Online
                <ArrowRight size={17} />
              </a>

              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 rounded-md border border-white/50 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#080d4f]"
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