"use client";

import React from "react";
import Image from "../components/Image";
import { Mail, ArrowRight } from "lucide-react";

// Minimal inline LinkedIn icon to avoid depending on a non-exported member from lucide-react
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-14h4v2" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const teachingStaff = [
  {
    name: "Prof. Patrick K. Mensah",
    role: "Head of Department",
    specialization: "Artificial Intelligence & Computer Science",
    image: "/images/people/patrick-mensah.jpg",
    email: "patrick.mensah@example.com",
    linkedin: "#",
  },
  {
    name: "Assoc. Prof. Fred Asante",
    role: "Senior Lecturer",
    specialization: "Information Technology & Networks",
    image: "/images/people/fred-asante.jpg",
    email: "fred.asante@example.com",
    linkedin: "#",
  },
  {
    name: "Dr. Peter Mensah",
    role: "Senior Lecturer",
    specialization: "Quantum Computing",
    image: "/images/people/peter-mensah.jpg",
    email: "peter.mensah@example.com",
    linkedin: "#",
  },
  {
    name: "Dr. Ama Owusu",
    role: "Lecturer",
    specialization: "Data Science & Machine Learning",
    image: "/images/people/ama-owusu.jpg",
    email: "ama.owusu@example.com",
    linkedin: "#",
  },
  {
    name: "Dr. Daniel Boateng",
    role: "Lecturer",
    specialization: "Software Engineering",
    image: "/images/people/daniel-boateng.jpg",
    email: "daniel.boateng@example.com",
    linkedin: "#",
  },
  {
    name: "Dr. Michael Asare",
    role: "Lecturer",
    specialization: "Cybersecurity",
    image: "/images/people/michael-asare.jpg",
    email: "michael.asare@example.com",
    linkedin: "#",
  },
];

const nonTeachingStaff = [
  {
    name: "Mrs. Patience Mensah",
    role: "Department Administrator",
    specialization: "Administrative Support",
    image: "/images/people/patience-mensah.jpg",
    email: "patience.mensah@example.com",
    linkedin: "#",
  },
  {
    name: "Mr. Fred Asante",
    role: "Department Assistant",
    specialization: "Student & Department Support",
    image: "/images/people/fred-assistant.jpg",
    email: "fred.assante@example.com",
    linkedin: "#",
  },
  {
    name: "Mr. Peter Mensah",
    role: "Technical Officer",
    specialization: "Laboratory & Technical Support",
    image: "/images/people/peter-assistant.jpg",
    email: "peter.mensah@example.com",
    linkedin: "#",
  },
  {
    name: "Mrs. Ama Owusu",
    role: "Administrative Assistant",
    specialization: "Department Administration",
    image: "/images/people/ama-assistant.jpg",
    email: "ama.owusu@example.com",
    linkedin: "#",
  },
  {
    name: "Mr. Daniel Boateng",
    role: "Laboratory Technician",
    specialization: "Computing Laboratory Support",
    image: "/images/people/daniel-technician.jpg",
    email: "daniel.boateng@example.com",
    linkedin: "#",
  },
  {
    name: "Mr. Michael Asare",
    role: "Support Staff",
    specialization: "Department Operations",
    image: "/images/people/michael-support.jpg",
    email: "michael.asare@example.com",
    linkedin: "#",
  },
];

type StaffMember = {
  name: string;
  role: string;
  specialization: string;
  image: string;
  email: string;
  linkedin: string;
};

function StaffCard({ person }: { person: StaffMember }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-[#dff6fc] p-3 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl sm:p-4">
      {/* Staff image */}
      <div className="relative aspect-[4/4.6] overflow-hidden rounded-xl bg-white">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#080d4f]/90 via-[#080d4f]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="flex w-full gap-3 p-5">
            <a
              href={`mailto:${person.email}`}
              aria-label={`Email ${person.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#080d4f] transition-all duration-300 hover:scale-110 hover:bg-[#079bd3] hover:text-white"
            >
              <Mail size={17} />
            </a>

            <a
              href={person.linkedin}
              aria-label={`LinkedIn profile of ${person.name}`}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#080d4f] transition-all duration-300 hover:scale-110 hover:bg-[#079bd3] hover:text-white"
            >
              <LinkedinIcon width={17} height={17} />
            </a>
          </div>
        </div>
      </div>

      {/* Information */}
      <div className="px-2 pb-2 pt-4 sm:px-1">
        <h3 className="text-sm font-bold leading-snug text-[#080d4f] sm:text-base">
          {person.name}
        </h3>

        <p className="mt-1 text-xs font-semibold text-[#080d4f] sm:text-sm">
          {person.role}
        </p>

        <p className="mt-1 text-[11px] leading-relaxed text-[#526078] sm:text-xs">
          {person.specialization}
        </p>
      </div>
    </article>
  );
}

function StaffSection({
  title,
  description,
  staff,
  background,
}: {
  title: string;
  description: string;
  staff: StaffMember[];
  background: "white" | "blue";
}) {
  return (
    <section
      className={`w-full px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 ${
        background === "blue" ? "bg-[#e8f8fc]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#080d4f] sm:text-xl md:text-2xl">
              {title}
            </h2>

            <div className="mt-2 h-[3px] w-12 rounded-full bg-[#079bd3]" />
          </div>

          <p className="max-w-xl text-sm leading-[1.7] text-[#4b5566] sm:text-base">
            {description}
          </p>
        </div>

        {/* Staff cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {staff.map((person) => (
            <StaffCard key={person.name} person={person} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default function PeoplePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[260px] overflow-hidden sm:min-h-[320px] md:min-h-[380px]">
        <Image
          src="/images/people/people-hero.jpg"
          alt="People of the Department"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080d4f]/75" />

        {/* Hero content */}
        <div className="relative mx-auto flex min-h-[260px] max-w-6xl items-center px-5 sm:min-h-[320px] sm:px-8 md:min-h-[380px] md:px-12 lg:px-16">
          <div className="max-w-2xl">

            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
              Our{" "}
              <span className="relative inline-block">
                People
                <span className="absolute -bottom-2 left-0 h-[4px] w-full rounded-full bg-[#079bd3]" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-[1.8] text-white/85 sm:text-base md:text-lg">
              Meet the people behind CS. Discover the lecturers, staff,
              students, and alumni who contribute to the growth and success
              of the department.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          TEACHING STAFF
      ====================================================== */}
      <StaffSection
        title="Teaching Staff"
        description="Meet our dedicated lecturers and academic professionals committed to teaching, research, and student development."
        staff={teachingStaff}
        background="white"
      />

      {/* =====================================================
          NON-TEACHING STAFF
      ====================================================== */}
      <StaffSection
        title="Non-Teaching Staff"
        description="Meet the team supporting the department's daily operations, administration, laboratories, and student services."
        staff={nonTeachingStaff}
        background="blue"
      />

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}
      <section className="bg-[#080d4f] px-5 py-16 sm:px-8 sm:py-20 md:px-12">
        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            The People Behind Our Department
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-[1.8] text-white/70 sm:text-base">
            Our department is built by people who teach, research, support,
            innovate, and create opportunities for the next generation of
            computing professionals.
          </p>

          <div className="mt-7 flex justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-[#079bd3] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#057eae] hover:shadow-lg"
            >
              Get in Touch
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