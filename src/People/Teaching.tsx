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
    image: "/tech0.webp",

    email: "patrick.mensah@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/patrick-mensah",
  },

  {
    name: "Assoc. prof. Obed",
    role: "Senior Lecturer",
    specialization: "Information Technology & Networks",
    image: "/tech3.jpg",

    email: "fred.asante@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/fred-asante",
  },

  {
    name: "Dr. Vivian ",
    role: "Senior Lecturer",
    specialization: "Quantum Computing",
    image: "/tech4.jpg",

    email: "peter.mensah@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/peter-mensah",
  },

  {
    name: "Dr. Faiza",
    role: "Lecturer",
    specialization: "Data Science & Machine Learning",
    image: "/tech8.jpg",

    email: "ama.owusu@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/ama-owusu",
  },

  {
    name: "Dr.Mighty Aydzoe",
    role: "Lecturer",
    specialization: "Software Engineering",
    image: "/tech1.jpg",

    email: "daniel.boateng@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/daniel-boateng",
  },
   
  {
    name: "Dr.Awarigi Nicomdemus",
    role: "Lecturer",
    specialization: "Cybersecurity & Computer Networks",
    image: "/tech2.jpg",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/michael-asare",
  },

  {
    name: "Dr. Peter Nimbe",
    role: "Lecturer",
    specialization: "Cybersecurity & Computer Networks",
    image: "/tech5.jpg",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/michael-asare",
  },

   
    {
    name: "Dr. Peter Nimbe",
    role: "Lecturer",
    specialization: "Cybersecurity & Computer Networks",
    image: "/tech7.jpg",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/michael-asare",
  },
    {
    name: "Mr.",
    role: "Lecturer",
    specialization: "Cybersecurity & Computer Networks",
    image: "/",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "#people/michael-asare",
  },
    {
    name: "Dr. Peter Nimbe",
    role: "Lecturer",
    specialization: "Cybersecurity & Computer Networks",
    image: "/",

    email: "michael.asare@uenr.edu.gh",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/people/michael-asare",
  },
];

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
   STAFF CARD
============================================================ */

function StaffCard({
  person,
}: {
  person: (typeof teachingStaff)[number];
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
          STAFF IMAGE
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

        {/* Image overlay (visible on mobile, hover on larger screens) */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#080d4f]/80
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
            translate-y-0
            sm:translate-y-5
            gap-2
            opacity-100
            sm:opacity-0
            transition-all
            duration-500
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
          STAFF INFORMATION
      ======================================================= */}

      <div className="px-2 pb-2 pt-5">

        <h3 className="text-lg font-bold leading-snug text-[#080d4f]">
          {person.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#078bc5] sm:text-base">
          {person.role}
        </p>

        <p className="mt-2 min-h-[48px] text-sm leading-[1.7] text-[#526078]">
          {person.specialization}
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

export default function TeachingStaffPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative min-h-[380px] overflow-hidden sm:min-h-[440px] md:min-h-[520px]">

        <Image
          src="/f.jpg"
          alt="Teaching Staff"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080d4f]/80" />

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

          <div className="max-w-2xl">

            <div className="mb-5 h-1 w-16 rounded-full bg-[#078bc5]" />

            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                text-white
                sm:text-5xl
                md:text-6xl
              "
            >
              Teaching Staff
            </h1>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                leading-[1.8]
                text-white/85
                sm:text-lg
                md:text-xl
              "
            >
              Meet the dedicated lecturers and academic professionals
              shaping the next generation of computer scientists through
              teaching, research, innovation, and mentorship.
            </p>

          </div>

        </div>
      </section>

      {/* ======================================================
          STAFF SECTION
      ======================================================= */}

      <section
        className="
          bg-white
          px-6
          py-20
          sm:px-10
          sm:py-24
          md:px-16
          lg:px-20
        "
      >

        <div className="mx-auto max-w-7xl">

          {/* Heading */}

          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-end
              md:justify-between
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
                Our People
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-bold
                  text-[#080d4f]
                  sm:text-4xl
                  md:text-5xl
                "
              >
                Teaching Staff
              </h2>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#078bc5]" />

            </div>

            <p
              className="
                max-w-xl
                text-base
                leading-[1.8]
                text-[#526078]
                sm:text-lg
              "
            >
              Our teaching staff combine academic knowledge, practical
              experience, research, and mentorship to provide students
              with a strong foundation in computing.
            </p>

          </div>

          {/* ==================================================
              STAFF CARDS
          =================================================== */}

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

            {teachingStaff.map((person) => (
              <StaffCard
                key={person.name}
                person={person}
              />
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}