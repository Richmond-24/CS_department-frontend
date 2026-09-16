import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";

const resources = [
  {
    icon: ClipboardList,
    title: "Student Resources",
    description:
      "Access important academic resources, guides, and information designed to support your student journey.",
    button: "Explore Resources",
    href: "#",
  },
  {
    icon: CalendarDays,
    title: "Calendar & Timetable",
    description:
      "View important academic dates, departmental activities, events, and your academic timetable.",
    button: "View Schedule",
    href: "#",
  },
  {
    icon: BookOpen,
    title: "Student Handbook",
    description:
      "Find important information about departmental policies, academic regulations, procedures, and requirements.",
    button: "Download Handbook",
    href: "#",
  },
  {
    icon: GraduationCap,
    title: "Courses & Course Titles",
    description:
      "Browse courses offered by the department and explore course titles and programme requirements.",
    button: "View Courses",
    href: "#",
  },
];

export default function StudentResources() {
  return (
    <main className="w-full bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[360px] overflow-hidden sm:min-h-[430px] lg:min-h-[500px]">
        <img
          src="/resources-hero.jpg"
          alt="Departmental resources"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Navy overlay */}
        <div className="absolute inset-0 bg-[#080d4f]/85" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/95 via-[#080d4f]/80 to-[#080d4f]/45" />

        <div className="relative z-10 mx-auto flex min-h-[360px] max-w-7xl items-center px-6 py-20 sm:min-h-[430px] sm:px-10 lg:min-h-[500px] lg:px-12">
          <div className="max-w-3xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-12 rounded-full bg-[#079bd3]" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#079bd3]">
                Student Support
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Departmental
              <br />
              <span className="text-[#079bd3]">
                Resources
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
              Access the essential resources, academic information, guides,
              schedules, and tools you need to make the most of your
              Computer Science journey.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          RESOURCE CARDS
      ====================================================== */}

      <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 md:px-16 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">

          {/* Section heading */}

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#079bd3]">
              Everything You Need
            </p>

            <h2 className="mt-3 text-3xl font-bold text-[#080d4f] sm:text-4xl md:text-5xl">
              Student Resources
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#079bd3]" />

            <p className="mt-5 text-base leading-7 text-[#526078] sm:text-lg">
              Find important academic resources and information to help you
              navigate life in the Department of Computer Science.
            </p>
          </div>

          {/* =================================================
              RESOURCE GRID
          ================================================== */}

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">

            {resources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.title}
                  className="
                    group
                    flex
                    min-h-[300px]
                    flex-col
                    items-center
                    rounded-2xl
                    bg-[#e5f7fc]
                    px-7
                    py-8
                    text-center
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:bg-[#dcf4fb]
                    hover:shadow-xl
                    sm:px-9
                    sm:py-10
                  "
                >

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#bceafa]
                      text-[#080d4f]
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:bg-[#079bd3]
                      group-hover:text-white
                    "
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      mt-6
                      text-xl
                      font-bold
                      text-[#080d4f]
                      transition-colors
                      duration-300
                      group-hover:text-[#079bd3]
                      sm:text-2xl
                    "
                  >
                    {resource.title}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      max-w-md
                      text-sm
                      leading-7
                      text-[#526078]
                      sm:text-base
                    "
                  >
                    {resource.description}
                  </p>

                  {/* Button */}

                  <a
                    href={resource.href}
                    className="
                      mt-auto
                      inline-flex
                      items-center
                      gap-2
                      rounded-md
                      bg-[#079bd3]
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#080d4f]
                      hover:shadow-lg
                    "
                  >
                    {resource.button}

                    <ArrowRight
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </a>

                </article>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          INTERNSHIP CTA
      ====================================================== */}

      <section className="relative min-h-[430px] overflow-hidden sm:min-h-[480px] lg:min-h-[520px]">

        <img
          src="/internship-cta.jpg"
          alt="Student internship"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}

        <div className="absolute inset-0 bg-[#050b35]/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#050b35]/95 via-[#080d4f]/80 to-[#080d4f]/45" />

        {/* CTA content */}

        <div className="relative z-10 flex min-h-[430px] items-center justify-center px-6 py-20 text-center sm:min-h-[480px] lg:min-h-[520px]">

          <div className="max-w-3xl">

            {/* Icon */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#079bd3]/20 text-[#079bd3] backdrop-blur-sm">
              <BriefcaseBusiness size={25} />
            </div>

            <p
              className="
                mt-6
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#079bd3]
              "
            >
              Career Opportunities
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-bold
                leading-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Need an Internship
              <br />
              <span className="text-[#079bd3]">
                Letter?
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-base
                leading-7
                text-white/80
                sm:text-lg
                sm:leading-8
              "
            >
              Get the support you need to begin your internship journey.
              Access information about internship requirements, procedures,
              and the steps involved in obtaining your internship letter.
            </p>

            <a
              href="#resources"
              className="
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-md
                bg-[#079bd3]
                px-7
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white
                hover:text-[#080d4f]
                hover:shadow-xl
              "
            >
              Back to Resources

              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}