import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  GraduationCap,
  Lightbulb,
  Monitor,
  Users,
} from "lucide-react";

const resources = [
  {
    title: "Student Portal",
    category: "Academic",
    description:
      "Access your academic information, course registration, timetable, results, announcements, and other essential student services.",
    details: "Registration • Results • Timetable • Notices",
    image: "/images/resources/student-portal.jpg",
    icon: Monitor,
    action: "Open Portal",
    featured: true,
  },
  {
    title: "Academic Support",
    category: "Learning",
    description:
      "Find academic guidance, study resources, departmental support, and information to help you stay on track throughout your programme.",
    details: "Study Support • Guidance • Advising",
    image: "/images/resources/academic-support.jpg",
    icon: GraduationCap,
    action: "Explore Support",
  },
  {
    title: "Course Materials",
    category: "Learning",
    description:
      "Access course-related materials, lecture resources, references, assignments, and other resources provided to support your studies.",
    details: "Lectures • Assignments • References",
    image: "/images/resources/course-materials.jpg",
    icon: BookOpen,
    action: "View Materials",
  },
  {
    title: "Student Projects",
    category: "Innovation",
    description:
      "Discover projects created by Computer Science students and explore ideas, research, software, and solutions developed within the department.",
    details: "Projects • Research • Student Work",
    image: "/images/resources/student-projects.jpg",
    icon: Lightbulb,
    action: "View Projects",
  },
  {
    title: "Career & Internships",
    category: "Career",
    description:
      "Explore internships, graduate opportunities, career resources, professional development programmes, and industry connections.",
    details: "Internships • Jobs • Mentorship",
    image: "/images/resources/career-support.jpg",
    icon: BriefcaseBusiness,
    action: "Explore Careers",
  },
  {
    title: "Innovation & Entrepreneurship",
    category: "Opportunities",
    description:
      "Find opportunities to turn your ideas into real products through innovation programmes, competitions, startup activities, and entrepreneurship support.",
    details: "Startups • Competitions • Innovation",
    image: "/images/resources/innovation.jpg",
    icon: Lightbulb,
    action: "Explore Opportunities",
  },
  {
    title: "Academic Calendar",
    category: "Planning",
    description:
      "Keep track of important academic dates including registration periods, examinations, semester activities, and departmental events.",
    details: "Semesters • Exams • Important Dates",
    image: "/images/resources/academic-calendar.jpg",
    icon: CalendarDays,
    action: "View Calendar",
  },
  {
    title: "Student Handbook",
    category: "Information",
    description:
      "Find important information about departmental policies, academic requirements, student expectations, programmes, and university procedures.",
    details: "Policies • Requirements • Guidelines",
    image: "/images/resources/student-handbook.jpg",
    icon: FileText,
    action: "Read Handbook",
  },
  {
    title: "Student Community",
    category: "Community",
    description:
      "Connect with fellow Computer Science students, student organizations, events, activities, and opportunities to get involved.",
    details: "Clubs • Events • Community",
    image: "/images/resources/student-community.jpg",
    icon: Users,
    action: "Explore Community",
  },
];

export default function StudentResources() {
  return (
    <main className="min-h-screen bg-slate-50 text-[#080b50]">
      {/* Hero */}
      <section className="px-6 pb-14 pt-16 md:px-10 lg:px-16 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#203b82]">
              Student Hub
            </p>

            <h1 className="text-4xl font-extrabold tracking-[-0.04em] md:text-5xl lg:text-6xl">
              Everything you need to succeed.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Access the tools, academic resources, opportunities, and
              support services available to Computer Science students.
            </p>
          </div>

          {/* Quick access */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Monitor className="mb-5 h-6 w-6 text-[#203b82]" />
              <p className="text-lg font-bold">Student Portal</p>
              <p className="mt-1 text-sm text-slate-500">
                Academic services & registration
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <BookOpen className="mb-5 h-6 w-6 text-[#203b82]" />
              <p className="text-lg font-bold">Learning</p>
              <p className="mt-1 text-sm text-slate-500">
                Materials & academic support
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <BriefcaseBusiness className="mb-5 h-6 w-6 text-[#203b82]" />
              <p className="text-lg font-bold">Careers</p>
              <p className="mt-1 text-sm text-slate-500">
                Internships & opportunities
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <Lightbulb className="mb-5 h-6 w-6 text-[#203b82]" />
              <p className="text-lg font-bold">Innovation</p>
              <p className="mt-1 text-sm text-slate-500">
                Projects & entrepreneurship
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#203b82]">
              Resources
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              Explore student resources
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = resource.icon;

              return (
                <article
                  key={resource.title}
                  className={`group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${
                    resource.featured ? "md:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {/* Image */}
                  <div
                    className={`relative overflow-hidden bg-slate-100 ${
                      resource.featured ? "h-72" : "h-60"
                    }`}
                  >
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#080b50]/75 via-[#080b50]/10 to-transparent" />

                    {/* Category */}
                    <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#080b50] shadow-sm">
                      {resource.category}
                    </div>

                    {/* Icon */}
                    <div className="absolute bottom-5 left-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#080b50] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Arrow */}
                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#080b50] shadow-sm transition-transform duration-300 group-hover:rotate-45">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold tracking-tight text-[#080b50]">
                      {resource.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {resource.description}
                    </p>

                    <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3">
                      <p className="text-xs font-medium text-slate-500">
                        Includes
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-700">
                        {resource.details}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                      <span className="text-sm font-medium text-slate-400">
                        Student resource
                      </span>

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full bg-[#080b50] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#203b82]"
                      >
                        {resource.action}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[28px] bg-[#080b50] px-7 py-10 text-white md:px-10 md:py-12 lg:px-14">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#e6f7ff]">
                  Need Help?
                </p>

                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  We are here to support your journey.
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-300 md:text-base">
                  Can't find what you're looking for? Reach out to the
                  department for assistance with academic, career, or student
                  matters.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#080b50] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Contact Department
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

