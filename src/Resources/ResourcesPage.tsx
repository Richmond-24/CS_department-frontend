"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";
import StudentResourcesPage from "./Student-Resources";
import DepartmentalCalendar from "./DepartmentalCalendar";
import StudentHandbook from "./StudentHandbook";
import ListCourses from "./ListCourses";
import InternshipPage from "./Internship";

/* ============================================================
   CUSTOM HOOK FOR SCROLL ANIMATIONS
============================================================ */
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

/* ============================================================
   RESOURCE LINKS
============================================================ */

type ResourcesPageProps = {
  currentPath?: string;
};

const resources = [
  {
    icon: ClipboardList,
    title: "Student Resources",
    description:
      "Access important academic resources, guides, and information designed to support your student journey.",
    button: "Explore Resources",
    href: "#resources/student-resources",
  },
  {
    icon: CalendarDays,
    title: "Calendar & Timetable",
    description:
      "View important academic dates, departmental activities, events, and your academic timetable.",
    button: "View Schedule",
    href: "#resources/calendar",
  },
  {
    icon: BookOpen,
    title: "Student Handbook",
    description:
      "Find important information about departmental policies, academic regulations, procedures, and requirements.",
    button: "Download Handbook",
    href: "#resources/handbook",
  },
  {
    icon: GraduationCap,
    title: "Courses & Course Titles",
    description:
      "Browse courses offered by the department and explore course titles and programme requirements.",
    button: "View Courses",
    href: "#resources/courses",
  },
];

/* ============================================================
   RESOURCE CARD (ORIGINAL DESIGN RESTORED + ANIMATION)
============================================================ */

function ResourceCard({
  resource,
  index,
}: {
  resource: (typeof resources)[number];
  index: number;
}) {
  const Icon = resource.icon;
  const cardReveal = useScrollReveal(0.2);

  return (
    <article
      ref={cardReveal.ref}
      className={`
        group
        flex
        min-h-[280px]
        flex-col
        items-center
        rounded-xl
        bg-[#e3f6fc]
        px-8
        py-9
        text-center
        shadow-sm
        transition-all
        duration-700
        ease-out
        hover:-translate-y-1
        hover:shadow-lg
        ${cardReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon - Original Square Style */}
      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-md
          bg-[#bceafa]
          text-[#080d4f]
          transition-all
          duration-300
          group-hover:bg-[#079bd3]
          group-hover:text-white
        "
      >
        <Icon size={26} strokeWidth={1.8} />
      </div>

      {/* Title - Original Style */}
      <h3
        className="
          mt-5
          text-lg
          font-bold
          leading-tight
          text-[#080d4f]
          sm:text-xl
        "
      >
        {resource.title}
      </h3>

      {/* Description - Original Style */}
      <p
        className="
          mt-3
          max-w-[300px]
          text-sm
          leading-[1.7]
          text-[#526078]
        "
      >
        {resource.description}
      </p>

      {/* Button - Original Pill Style */}
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
          py-2.5
          text-xs
          font-bold
          text-white
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:bg-[#080d4f]
          hover:shadow-md
          sm:text-sm
        "
      >
        {resource.button}

        <ArrowRight
          size={14}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </a>
    </article>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function ResourcesPage({ currentPath = '/resources' }: ResourcesPageProps) {
  // Hooks for section reveals
  const heroReveal = useScrollReveal(0.1);
  const gridHeaderReveal = useScrollReveal(0.2);
  const ctaReveal = useScrollReveal(0.2);

  switch (currentPath) {
    case '/resources/student-resources':
      return <StudentResourcesPage />;
    case '/resources/calendar':
      return <DepartmentalCalendar />;
    case '/resources/handbook':
      return <StudentHandbook />;
    case '/resources/courses':
      return <ListCourses />;
    case '/resources/internship':
      return <InternshipPage />;
    case '/resources':
    default:
      return (
        <main className="w-full bg-white">
          {/* =====================================================
              HERO
          ====================================================== */}

          <section 
            ref={heroReveal.ref}
            className={`relative min-h-[450px] overflow-hidden sm:min-h-[550px] lg:min-h-[650px] transition-all duration-1000 ease-out ${
              heroReveal.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src="/resources-hero.jpg"
              alt="Departmental resources"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Navy overlay */}
            <div className="absolute inset-0 bg-[#080d4f]/85" />

            {/* Gradient */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#080d4f]/95
                via-[#080d4f]/80
                to-[#080d4f]/45
              "
            />

            {/* Hero content */}
            <div
              className="
                relative
                z-10
                mx-auto
                flex
                min-h-[450px]
                max-w-7xl
                items-center
                px-6
                py-24
                sm:min-h-[550px]
                sm:px-10
                lg:min-h-[650px]
                lg:px-12
              "
            >
              <div className={`max-w-3xl transition-all duration-1000 delay-300 ease-out ${
                heroReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}>
                <div className="mb-6 flex items-center gap-3">
                  <span className="h-[3px] w-14 rounded-full bg-[#079bd3]" />

                  <span
                    className="
                      text-sm
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-[#079bd3]
                    "
                  >
                    Student Support
                  </span>
                </div>

                <h1
                  className="
                    text-5xl
                    font-bold
                    leading-[1.05]
                    text-white
                    sm:text-6xl
                    md:text-7xl
                    lg:text-8xl
                  "
                >
                  Departmental
                  <br />

                  <span className="text-[#079bd3]">Resources</span>
                </h1>

                <p
                  className="
                    mt-8
                    max-w-2xl
                    text-lg
                    leading-8
                    text-white/80
                    sm:text-xl
                    sm:leading-9
                  "
                >
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

          <section
            className="
              bg-white
              px-6
              py-24
              sm:px-10
              sm:py-32
              md:px-16
              lg:px-12
              lg:py-36
            "
          >
            <div className="mx-auto max-w-6xl">
              
              {/* Section Header */}
              <div 
                ref={gridHeaderReveal.ref}
                className={`mx-auto max-w-2xl text-center mb-16 transition-all duration-1000 ease-out ${
                  gridHeaderReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
              >
                <p
                  className="
                    text-sm
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-[#079bd3]
                  "
                >
                  Everything You Need
                </p>

                <h2
                  className="
                    mt-4
                    text-4xl
                    font-bold
                    text-[#080d4f]
                    sm:text-5xl
                    md:text-6xl
                  "
                >
                  Student Resources
                </h2>

                <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-[#079bd3]" />

                <p
                  className="
                    mt-6
                    text-lg
                    leading-8
                    text-[#526078]
                    sm:text-xl
                  "
                >
                  Find important academic resources and information to help you
                  navigate life in the Department of Computer Science.
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-8
                  sm:grid-cols-2
                "
              >
                {resources.map((resource, index) => (
                  <ResourceCard
                    key={resource.title}
                    resource={resource}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              INTERNSHIP CTA
          ====================================================== */}

          <section
            ref={ctaReveal.ref}
            className={`
              relative
              min-h-[500px]
              overflow-hidden
              sm:min-h-[600px]
              lg:min-h-[700px]
              transition-all duration-1000 ease-out
              ${ctaReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
          >
            <img
              src="/internship-cta.jpg"
              alt="Student internship"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />

            <div className="absolute inset-0 bg-[#050b35]/80" />

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-r
                from-[#050b35]/95
                via-[#080d4f]/80
                to-[#080d4f]/45
              "
            />

            <div
              className="
                relative
                z-10
                flex
                min-h-[500px]
                items-center
                justify-center
                px-6
                py-24
                text-center
                sm:min-h-[600px]
                lg:min-h-[700px]
              "
            >
              <div className="max-w-3xl">
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-[#079bd3]/20
                    text-[#079bd3]
                    backdrop-blur-sm
                  "
                >
                  <BriefcaseBusiness size={28} />
                </div>

                <p
                  className="
                    mt-8
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
                    mt-4
                    text-4xl
                    font-bold
                    leading-tight
                    text-white
                    sm:text-5xl
                    md:text-6xl
                  "
                >
                  Need an Internship
                  <br />

                  <span className="text-[#079bd3]">Letter?</span>
                </h2>

                <p
                  className="
                    mx-auto
                    mt-6
                    max-w-2xl
                    text-lg
                    leading-8
                    text-white/80
                    sm:text-xl
                    sm:leading-9
                  "
                >
                  Get the support you need to begin your internship journey.
                  Access information about internship requirements, procedures,
                  and the steps involved in obtaining your internship letter.
                </p>

                <a
                  href="#resources/internship"
                  className="
                    mt-10
                    inline-flex
                    items-center
                    gap-3
                    rounded-md
                    bg-[#079bd3]
                    px-8
                    py-4
                    text-base
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
                  Request Letter

                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </section>
        </main>
      );
  }
}