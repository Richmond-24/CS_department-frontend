import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";

/* ============================================================
   COURSE DATA
============================================================ */

const undergraduatePrograms = [
  {
    name: "BSc Computer Science",
    description:
      "A comprehensive undergraduate programme covering computing, software development, algorithms, data, artificial intelligence, networks, and modern information systems.",
    href: "/programmes/undergraduate/computer-science",
  },
  {
    name: "Diploma Computer Science",
    description:
      "A practical programme designed to provide students with foundational knowledge and practical skills in computer science and information technology.",
    href: "/programmes/undergraduate/diploma-computer-science",
  },
];

/* ============================================================
   SAMPLE COURSE DATA
============================================================ */

const courses = [
  {
    code: "CS 101",
    title: "Introduction to Computer Science",
    level: "Level 100",
    semester: "Semester 1",
  },
  {
    code: "CS 102",
    title: "Introduction to Programming",
    level: "Level 100",
    semester: "Semester 1",
  },
  {
    code: "CS 103",
    title: "Computer Systems",
    level: "Level 100",
    semester: "Semester 2",
  },
  {
    code: "CS 104",
    title: "Discrete Mathematics",
    level: "Level 100",
    semester: "Semester 2",
  },
  {
    code: "CS 201",
    title: "Data Structures and Algorithms",
    level: "Level 200",
    semester: "Semester 1",
  },
  {
    code: "CS 202",
    title: "Database Systems",
    level: "Level 200",
    semester: "Semester 1",
  },
  {
    code: "CS 203",
    title: "Object-Oriented Programming",
    level: "Level 200",
    semester: "Semester 2",
  },
  {
    code: "CS 204",
    title: "Computer Networks",
    level: "Level 200",
    semester: "Semester 2",
  },
  {
    code: "CS 301",
    title: "Software Engineering",
    level: "Level 300",
    semester: "Semester 1",
  },
  {
    code: "CS 302",
    title: "Operating Systems",
    level: "Level 300",
    semester: "Semester 1",
  },
  {
    code: "CS 303",
    title: "Web Application Development",
    level: "Level 300",
    semester: "Semester 2",
  },
  {
    code: "CS 304",
    title: "Artificial Intelligence",
    level: "Level 300",
    semester: "Semester 2",
  },
  {
    code: "CS 401",
    title: "Machine Learning",
    level: "Level 400",
    semester: "Semester 1",
  },
  {
    code: "CS 402",
    title: "Information Security",
    level: "Level 400",
    semester: "Semester 1",
  },
  {
    code: "CS 403",
    title: "Final Year Project",
    level: "Level 400",
    semester: "Semester 2",
  },
  {
    code: "CS 404",
    title: "Advanced Computer Science",
    level: "Level 400",
    semester: "Semester 2",
  },
];

/* ============================================================
   COURSE ROW
============================================================ */

function CourseRow({
  course,
}: {
  course: (typeof courses)[number];
}) {
  return (
    <div
      className="
        group
        grid
        grid-cols-1
        gap-3
        border-t
        border-[#a9deed]
        px-4
        py-4
        transition-colors
        duration-300
        hover:bg-[#f3fbfd]
        sm:grid-cols-[100px_1fr_120px_120px]
        sm:items-center
        sm:gap-4
      "
    >
      {/* Course Code */}

      <div>
        <span
          className="
            text-xs
            font-bold
            text-[#079bd3]
            sm:text-sm
          "
        >
          {course.code}
        </span>
      </div>

      {/* Course Title */}

      <div>
        <h3
          className="
            text-sm
            font-semibold
            text-[#080d4f]
            transition-colors
            duration-300
            group-hover:text-[#079bd3]
            sm:text-base
          "
        >
          {course.title}
        </h3>
      </div>

      {/* Level */}

      <div>
        <span className="text-xs text-[#526078]">
          {course.level}
        </span>
      </div>

      {/* Semester */}

      <div>
        <span className="text-xs text-[#526078]">
          {course.semester}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function ListCourses() {
  return (
    <main className="min-h-screen bg-white">

      {/* ======================================================
          HERO
      ======================================================= */}

      <section
        className="
          relative
          h-[230px]
          overflow-hidden
          sm:h-[270px]
          md:h-[310px]
        "
      >
        <img
          src="/resources-hero.jpg"
          alt="Courses and course titles"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
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
            to-[#080d4f]/50
          "
        />

        {/* Hero content */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            max-w-6xl
            items-center
            px-6
            sm:px-10
            lg:px-12
          "
        >
          <div>

            <p
              className="
                mb-3
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#079bd3]
                sm:text-sm
              "
            >
              Academic Programmes
            </p>

            <h1
              className="
                text-3xl
                font-bold
                leading-tight
                text-white
                sm:text-4xl
                md:text-5xl
              "
            >
              Courses & Course Titles
            </h1>

            <div className="mt-4 h-[3px] w-16 bg-[#079bd3]" />

            <p
              className="
                mt-4
                max-w-xl
                text-xs
                leading-6
                text-white/80
                sm:text-sm
              "
            >
              Explore courses offered by the Department of Computer
              Science and view the academic structure of our programmes.
            </p>

          </div>
        </div>
      </section>

      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <section
        className="
          bg-white
          px-6
          py-12
          sm:px-10
          sm:py-16
          md:px-12
          md:py-20
        "
      >
        <div className="mx-auto max-w-6xl">

          {/* ==================================================
              BACK TO RESOURCES
          =================================================== */}

          <a
            href="/resources"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              text-xs
              font-semibold
              text-[#526078]
              transition-colors
              duration-300
              hover:text-[#079bd3]
              sm:text-sm
            "
          >
            <ArrowLeft size={15} />
            Back to Student Resources
          </a>

          {/* ==================================================
              PROGRAMMES
          =================================================== */}

          <div className="mb-16">

            <div className="mb-7">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#079bd3]
                "
              >
                Programmes
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-[#080d4f]
                  sm:text-3xl
                "
              >
                Undergraduate Programmes
              </h2>

              <div className="mt-3 h-[3px] w-10 bg-[#080d4f]" />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {undergraduatePrograms.map((program) => (
                <article
                  key={program.name}
                  className="
                    group
                    rounded-xl
                    border
                    border-[#c9edf5]
                    bg-[#e5f7fc]
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                >

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#bceafa]
                      text-[#080d4f]
                      transition-all
                      duration-300
                      group-hover:bg-[#079bd3]
                      group-hover:text-white
                    "
                  >
                    <GraduationCap size={23} />
                  </div>

                  {/* Title */}

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-bold
                      text-[#080d4f]
                      sm:text-xl
                    "
                  >
                    {program.name}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-7
                      text-[#526078]
                    "
                  >
                    {program.description}
                  </p>

                  {/* Link */}

                  <a
                    href={program.href}
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-xs
                      font-bold
                      text-[#079bd3]
                      transition-all
                      duration-300
                      hover:text-[#080d4f]
                    "
                  >
                    View Programme
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
              ))}

            </div>
          </div>

          {/* ==================================================
              COURSE LIST
          =================================================== */}

          <section>

            <div className="mb-7">

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#079bd3]
                "
              >
                Course Catalogue
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-[#080d4f]
                  sm:text-3xl
                "
              >
                Computer Science Courses
              </h2>

              <div className="mt-3 h-[3px] w-10 bg-[#080d4f]" />

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-[#526078]
                "
              >
                Browse the courses and course titles available within
                the Computer Science programme.
              </p>

            </div>

            {/* Course table */}

            <div
              className="
                overflow-hidden
                rounded-xl
                border
                border-[#c9edf5]
                bg-white
                shadow-sm
              "
            >

              {/* Table header */}

              <div
                className="
                  hidden
                  border-t-[3px]
                  border-[#079bd3]
                  bg-[#e5f7fc]
                  px-4
                  py-4
                  sm:grid
                  sm:grid-cols-[100px_1fr_120px_120px]
                  sm:items-center
                  sm:gap-4
                "
              >
                <span className="text-xs font-bold text-[#080d4f]">
                  Code
                </span>

                <span className="text-xs font-bold text-[#080d4f]">
                  Course Title
                </span>

                <span className="text-xs font-bold text-[#080d4f]">
                  Level
                </span>

                <span className="text-xs font-bold text-[#080d4f]">
                  Semester
                </span>
              </div>

              {/* Mobile header */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-t-[3px]
                  border-[#079bd3]
                  bg-[#e5f7fc]
                  px-4
                  py-4
                  sm:hidden
                "
              >
                <BookOpen
                  size={16}
                  className="text-[#079bd3]"
                />

                <span className="text-xs font-bold text-[#080d4f]">
                  Course Catalogue
                </span>
              </div>

              {/* Courses */}

              {courses.map((course) => (
                <CourseRow
                  key={`${course.code}-${course.title}`}
                  course={course}
                />
              ))}

            </div>

          </section>

        </div>
      </section>

      {/* ======================================================
          BOTTOM CTA
      ======================================================= */}

      <section
        className="
          bg-[#080d4f]
          px-6
          py-14
          sm:px-10
          sm:py-16
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-5xl
            flex-col
            items-center
            justify-between
            gap-6
            text-center
            md:flex-row
            md:text-left
          "
        >

          <div>

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#079bd3]
              "
            >
              Need More Information?
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                text-white
                sm:text-3xl
              "
            >
              Explore our programmes
            </h2>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-white/70
              "
            >
              Discover the programmes and academic opportunities
              available in the Department of Computer Science.
            </p>

          </div>

          <a
            href="/programmes"
            className="
              inline-flex
              shrink-0
              items-center
              gap-2
              rounded-md
              bg-[#079bd3]
              px-6
              py-3
              text-xs
              font-bold
              text-white
              transition-all
              duration-300
              hover:bg-white
              hover:text-[#080d4f]
            "
          >
            View Programmes
            <ArrowRight size={15} />
          </a>

        </div>
      </section>

    </main>
  );
}