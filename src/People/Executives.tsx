"use client";

import React from "react";
import Image from "../components/Image";
import { Mail, ArrowRight } from "lucide-react";

/* ============================================================
   LINKEDIN ICON
============================================================ */

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

/* ============================================================
   TIKTOK ICON
============================================================ */

function TikTokIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.5 4.2C16.1 6.1 17.5 7.4 19.4 7.7V10.8C17.9 10.7 16.5 10.2 15.3 9.4V15.7C15.3 19.2 12.6 21.2 9.6 21.2C6.5 21.2 4.2 19.1 4.2 16C4.2 12.8 6.7 10.5 9.7 10.5C10.2 10.5 10.7 10.6 11.2 10.7V13.9C10.8 13.7 10.4 13.6 9.9 13.6C8.6 13.6 7.5 14.5 7.5 15.9C7.5 17.3 8.5 18.2 9.7 18.2C11 18.2 12 17.4 12 15.7V3H15.5V4.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ============================================================
   STUDENT EXECUTIVES
============================================================ */

const studentExecutives = [
  {
    name: "John Mensah",
    position: "President",
    programme: "BSc. Computer Science",
    level: "Level 400",
    image: "/executives/president.jpg",

    email: "john.mensah@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/john-mensah",
  },

  {
    name: "Ama Owusu",
    position: "Vice President",
    programme: "BSc. Computer Science",
    level: "Level 400",
    image: "/executives/vice-president.jpg",

    email: "ama.owusu@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/ama-owusu",
  },

  {
    name: "Michael Asare",
    position: "General Secretary",
    programme: "BSc. Computer Science",
    level: "Level 400",
    image: "/executives/general-secretary.jpg",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/michael-asare",
  },

  {
    name: "Abigail Mensah",
    position: "Financial Secretary",
    programme: "BSc. Computer Science",
    level: "Level 300",
    image: "/executives/financial-secretary.jpg",

    email: "abigail.mensah@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/abigail-mensah",
  },

  {
    name: "Daniel Boateng",
    position: "Organizing Secretary",
    programme: "BSc. Computer Science",
    level: "Level 300",
    image: "/executives/organizing-secretary.jpg",

    email: "daniel.boateng@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/daniel-boateng",
  },

  {
    name: "Esther Asante",
    position: "Public Relations Officer",
    programme: "BSc. Computer Science",
    level: "Level 300",
    image: "/executives/pro.jpg",

    email: "esther.asante@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/esther-asante",
  },

  {
    name: "Samuel Osei",
    position: "Welfare Officer",
    programme: "BSc. Computer Science",
    level: "Level 300",
    image: "/executives/welfare.jpg",

    email: "samuel.osei@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/samuel-osei",
  },

  {
    name: "Grace Addo",
    position: "Women's Commissioner",
    programme: "BSc. Computer Science",
    level: "Level 200",
    image: "/executives/womens-commissioner.jpg",

    email: "grace.addo@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/grace-addo",
  },

  {
    name: "Richard Asante",
    position: "Academic Coordinator",
    programme: "BSc. Computer Science",
    level: "Level 300",
    image: "/executives/academic-coordinator.jpg",

    email: "richard.asante@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#executives/richard-asante",
  },
];

/* ============================================================
   EXECUTIVE CARD
============================================================ */

function ExecutiveCard({
  person,
}: {
  person: (typeof studentExecutives)[number];
}) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-2xl
        bg-[#dff6fc]
        p-4
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
        sm:p-5
      "
    >
      {/* ======================================================
          EXECUTIVE IMAGE
      ======================================================= */}

      <div className="relative aspect-[4/4.5] overflow-hidden rounded-xl bg-white">
        <Image
          src={person.image}
          alt={person.name}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            33vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#080d4f]/85
            via-transparent
            to-transparent
            opacity-100
            sm:opacity-0
            transition-opacity
            duration-500
            sm:group-hover:opacity-100
          "
        />

        {/* ==================================================
            SOCIAL ICONS
        =================================================== */}

        <div
          className="
            absolute
            bottom-4
            left-1/2
            flex
            -translate-x-1/2
            gap-2
            opacity-100
            sm:translate-y-5
            sm:opacity-0
            sm:transition-all
            sm:duration-500
            sm:group-hover:translate-y-0
            sm:group-hover:opacity-100
          "
        >
          {/* LinkedIn */}
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn profile of ${person.name}`}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#080d4f]
              shadow-lg
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#078bc5]
              hover:text-white
            "
          >
            <LinkedinIcon width={19} height={19} />
          </a>

          {/* Email */}
          <a
            href={`mailto:${person.email}`}
            aria-label={`Email ${person.name}`}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#080d4f]
              shadow-lg
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#078bc5]
              hover:text-white
            "
          >
            <Mail size={19} />
          </a>

          {/* TikTok */}
          <a
            href={person.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`TikTok profile of ${person.name}`}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#080d4f]
              shadow-lg
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[#078bc5]
              hover:text-white
            "
          >
            <TikTokIcon size={19} />
          </a>
        </div>
      </div>

      {/* ======================================================
          EXECUTIVE INFORMATION
      ======================================================= */}

      <div className="px-2 pb-2 pt-5">
        <h3 className="text-lg font-bold leading-snug text-[#080d4f] sm:text-xl">
          {person.name}
        </h3>

        {/* Position */}
        <p className="mt-2 text-sm font-bold text-[#078bc5] sm:text-base">
          {person.position}
        </p>

        {/* Programme */}
        <p className="mt-2 text-sm leading-6 text-[#526078]">
          {person.programme}
        </p>

        {/* Level */}
        <p className="text-sm font-medium text-[#526078]">
          {person.level}
        </p>

        {/* ==================================================
            VIEW FULL PROFILE
        =================================================== */}

        <a
          href={person.profile}
          className="
            group/profile
            mt-5
            inline-flex
            items-center
            gap-2
            rounded-lg
            bg-[#078bc5]
            px-4
            py-2.5
            text-sm
            font-bold
            text-white
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-[#080d4f]
            hover:shadow-lg
          "
        >
          View Full Profile

          <ArrowRight
            size={16}
            className="
              transition-transform
              duration-300
              group-hover/profile:translate-x-1
            "
          />
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function StudentExecutivesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative min-h-[380px] overflow-hidden sm:min-h-[440px] md:min-h-[520px]">
        <Image
          src="/student-executives-hero.jpg"
          alt="Computer Science Student Executives"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080d4f]/80" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/95 via-[#080d4f]/75 to-transparent" />

        <div
          className="
            relative
            mx-auto
            flex
            min-h-[380px]
            max-w-7xl
            items-center
            px-6
            sm:min-h-[440px]
            sm:px-10
            md:min-h-[520px]
            md:px-16
            lg:px-20
          "
        >
          <div className="max-w-3xl">
            {/* Small label */}
            <div className="mb-5 h-1 w-16 rounded-full bg-[#078bc5]" />

            <p
              className="
                mb-4
                text-sm
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#079bd3]
                sm:text-base
              "
            >
              Student Leadership
            </p>

            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Student
              <br />
              Executives
            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                leading-[1.8]
                text-white/85
                sm:text-lg
                md:text-xl
              "
            >
              Meet the student leaders representing the Department of
              Computer Science and working to build a stronger, more
              connected, and innovative student community.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================
          INTRODUCTION
      ======================================================= */}

      <section
        className="
          bg-white
          px-6
          py-20
          sm:px-10
          sm:py-24
          md:px-16
          md:py-28
          lg:px-20
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1fr_1.1fr]
              lg:items-end
            "
          >
            <div>
              <p
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#078bc5]
                  sm:text-base
                "
              >
                Student Leadership
              </p>

              <h2
                className="
                  mt-3
                  text-4xl
                  font-bold
                  leading-tight
                  text-[#080d4f]
                  sm:text-5xl
                  md:text-6xl
                "
              >
                Leading.
                <br />
                Representing.
                <br />
                Inspiring.
              </h2>

              <div className="mt-5 h-1 w-16 rounded-full bg-[#078bc5]" />
            </div>

            <div>
              <p
                className="
                  text-base
                  leading-[1.9]
                  text-[#526078]
                  sm:text-lg
                "
              >
                The Computer Science student executives serve as the voice
                of students within the department. They work closely with
                students, academic staff, and the department to promote
                academic excellence, student welfare, innovation, and
                meaningful engagement.
              </p>

              <p
                className="
                  mt-5
                  text-base
                  leading-[1.9]
                  text-[#526078]
                  sm:text-lg
                "
              >
                Through leadership, collaboration, and student-focused
                initiatives, the executive team contributes to creating a
                vibrant and supportive Computer Science community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          EXECUTIVES SECTION
      ======================================================= */}

      <section
        className="
          bg-[#f7fbfd]
          px-6
          py-20
          sm:px-10
          sm:py-24
          md:px-16
          md:py-28
          lg:px-20
        "
      >
        <div className="mx-auto max-w-7xl">

          {/* Section heading */}
          <div className="max-w-3xl">
            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-[#078bc5]
                sm:text-base
              "
            >
              Meet The Team
            </p>

            <h2
              className="
                mt-3
                text-4xl
                font-bold
                text-[#080d4f]
                sm:text-5xl
                md:text-6xl
              "
            >
              Our Student Executives
            </h2>

            <div className="mt-5 h-1 w-16 rounded-full bg-[#078bc5]" />

            <p
              className="
                mt-6
                text-base
                leading-[1.8]
                text-[#526078]
                sm:text-lg
              "
            >
              Get to know the students leading the department and
              representing the interests of their fellow students.
            </p>
          </div>

          {/* Executive cards */}
          <div
            className="
              mt-14
              grid
              grid-cols-1
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {studentExecutives.map((person) => (
              <ExecutiveCard
                key={person.name}
                person={person}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          STUDENT LEADERSHIP CTA
      ======================================================= */}

      <section className="relative overflow-hidden bg-[#080d4f] px-6 py-24 sm:px-10 md:px-16 lg:px-20">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#079bd3]/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-[#079bd3]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p
            className="
              text-sm
              font-bold
              uppercase
              tracking-[0.2em]
              text-[#079bd3]
            "
          >
            Student Community
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
            Your voice.
            <br />
            <span className="text-[#079bd3]">
              Your community.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-white/75
              sm:text-lg
            "
          >
            Connect with your student executives, get involved in
            departmental activities, and contribute to building the future
            of Computer Science.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#executives"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-lg
                bg-[#079bd3]
                px-7
                py-4
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#068abb]
                hover:shadow-xl
              "
            >
              Meet The Executives
              <ArrowRight size={18} />
            </a>

            <a
              href="#people/executives"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-lg
                border
                border-white/30
                px-7
                py-4
                text-sm
                font-bold
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-[#080d4f]
              "
            >
              Contact Student Leadership
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}