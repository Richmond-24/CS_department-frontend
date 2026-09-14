import type { ReactNode } from "react";
import {
  CalendarDays,
  Clock3,
  Download,
  FileText,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  description: string;
}

interface ResourceRowProps {
  title: string;
  last: boolean;
}

interface DateRowProps {
  event: string;
  date: string;
  last: boolean;
  upcoming?: boolean;
}

/* =========================================================
   DATA
========================================================= */

const academicResources: string[] = [
  "General Academic Timetable",
  "Departmental Academic Timetable",
  "Departmental Calendar",
  "General Calendar",
];

const importantDates: {
  event: string;
  date: string;
}[] = [
  {
    event: "First-Year Project Proposal Submission",
    date: "TBA",
  },
  {
    event: "Project Supervisor Allocation",
    date: "TBA",
  },
  {
    event: "Project Defense",
    date: "TBA",
  },
  {
    event: "Course Registration Deadline",
    date: "TBA",
  },
  {
    event: "Departmental Orientation",
    date: "TBA",
  },
  {
    event: "Seminar Dates",
    date: "TBA",
  },
  {
    event: "Internship Documentation Submission",
    date: "TBA",
  },
  {
    event: "Thesis/Dissertation Submission",
    date: "TBA",
  },
  {
    event: "Departmental Examinations",
    date: "TBA",
  },
];

const upcomingEvents: {
  event: string;
  date: string;
}[] = [
  {
    event: "Freshers Orientation",
    date: "TBA",
  },
  {
    event: "Final-Year Project Proposal Defense",
    date: "TBA",
  },
  {
    event: "Mid-Semester Examinations",
    date: "TBA",
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DepartmentalCalendar() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071936] via-[#0b2857] to-[#123d73]">

        {/* Circuit Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(255,255,255,0.25) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  rgba(255,255,255,0.25) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "42px 42px",
            }}
          />
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

          <div className="max-w-4xl">

            <div className="mb-5 flex items-center gap-3">
              <span className="h-1 w-12 rounded-full bg-cyan-400" />

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                Academic Resources
              </span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Calendar & Timetable
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8 lg:text-xl">
              Stay updated with academic schedules, important deadlines,
              examinations and upcoming departmental events.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-20">

        {/* ===================================================
            ACADEMIC CALENDAR
        =================================================== */}
        <section>

          <SectionHeader
            icon={<CalendarDays className="h-6 w-6" />}
            title="Academic Calendar & Timetable"
            description="Access the latest academic schedules and calendars."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="hidden grid-cols-[1fr_170px] border-b border-slate-200 bg-slate-50 px-7 py-5 sm:grid">

              <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Resource
              </span>

              <span className="text-right text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Action
              </span>

            </div>

            {academicResources.map((resource, index) => (
              <ResourceRow
                key={resource}
                title={resource}
                last={index === academicResources.length - 1}
              />
            ))}

          </div>
        </section>

        {/* ===================================================
            IMPORTANT DATES
        =================================================== */}
        <section className="mt-16 sm:mt-20">

          <SectionHeader
            icon={<Clock3 className="h-6 w-6" />}
            title="Important Dates & Deadlines"
            description="Keep track of important academic activities and deadlines."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="hidden grid-cols-[1fr_170px] border-b border-slate-200 bg-slate-50 px-7 py-5 sm:grid">

              <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Event / Activity
              </span>

              <span className="text-right text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Date
              </span>

            </div>

            {importantDates.map((item, index) => (
              <DateRow
                key={item.event}
                event={item.event}
                date={item.date}
                last={index === importantDates.length - 1}
              />
            ))}

          </div>
        </section>

        {/* ===================================================
            UPCOMING
        =================================================== */}
        <section className="mt-16 sm:mt-20">

          <SectionHeader
            icon={<CalendarDays className="h-6 w-6" />}
            title="Upcoming"
            description="View upcoming academic activities and departmental events."
          />

          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Table Header */}
            <div className="hidden grid-cols-[1fr_170px] border-b border-slate-200 bg-slate-50 px-7 py-5 sm:grid">

              <span className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Event / Activity
              </span>

              <span className="text-right text-sm font-extrabold uppercase tracking-wider text-slate-500">
                Date
              </span>

            </div>

            {upcomingEvents.map((item, index) => (
              <DateRow
                key={item.event}
                event={item.event}
                date={item.date}
                upcoming
                last={index === upcomingEvents.length - 1}
              />
            ))}

          </div>
        </section>

      </main>
    </div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-4">

      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 sm:h-14 sm:w-14">
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0">

        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {title}
        </h2>

        <div className="mt-3 h-1 w-14 rounded-full bg-cyan-500" />

        <p className="mt-3 text-base leading-6 text-slate-500 sm:text-lg">
          {description}
        </p>

      </div>
    </div>
  );
}

/* =========================================================
   RESOURCE ROW
========================================================= */

function ResourceRow({
  title,
  last,
}: ResourceRowProps) {
  return (
    <div
      className={`group px-5 py-6 transition-all duration-200 hover:bg-blue-50 sm:px-7 ${
        !last ? "border-b border-slate-200" : ""
      }`}
    >

      <div className="flex flex-col gap-5 sm:grid sm:grid-cols-[1fr_170px] sm:items-center">

        {/* Resource Name */}
        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-blue-100 group-hover:text-blue-700">
            <FileText className="h-5 w-5" />
          </div>

          <span className="text-base font-semibold leading-6 text-slate-800 sm:text-lg lg:text-xl">
            {title}
          </span>

        </div>

        {/* Download */}
        <button
          type="button"
          className="
            flex w-full items-center justify-center gap-2
            rounded-xl border border-blue-200
            bg-white px-5 py-3
            text-sm font-bold text-blue-700
            transition-all duration-200
            hover:border-blue-700
            hover:bg-blue-700
            hover:text-white
            sm:w-auto
          "
        >
          <Download className="h-4 w-4" />

          <span>
            Download
          </span>
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   DATE ROW
========================================================= */

function DateRow({
  event,
  date,
  last,
  upcoming = false,
}: DateRowProps) {
  return (
    <div
      className={`group px-5 py-6 transition-all duration-200 hover:bg-slate-50 sm:px-7 ${
        !last ? "border-b border-slate-200" : ""
      }`}
    >

      <div className="flex items-center justify-between gap-5">

        {/* Event */}
        <div className="flex min-w-0 items-center gap-4">

          {/* Color Indicator */}
          <div
            className={`hidden h-11 w-1 shrink-0 rounded-full sm:block ${
              upcoming ? "bg-cyan-500" : "bg-blue-600"
            }`}
          />

          <span className="text-base font-semibold leading-6 text-slate-800 sm:text-lg lg:text-xl">
            {event}
          </span>

        </div>

        {/* Date */}
        <span
          className="
            shrink-0
            rounded-full
            bg-slate-100
            px-4 py-2
            text-sm
            font-bold
            text-slate-600
            sm:min-w-[90px]
            sm:text-center
          "
        >
          {date}
        </span>

      </div>
    </div>
  );
}