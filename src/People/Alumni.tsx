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

const alumni = [
  {
    name: "Kwame Mensah",
    programme: "BSc Computer Science",
    year: "2018",
    role: "Software Engineer",
    organization: "Technology Industry",
    image: "/images/alumni/kwame-mensah.jpg",

    email: "kwame.mensah@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/kwame-mensah",
  },

  {
    name: "Ama Boateng",
    programme: "BSc Computer Science",
    year: "2019",
    role: "Data Scientist",
    organization: "Technology & Data",
    image: "/images/alumni/ama-boateng.jpg",

    email: "ama.boateng@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/ama-boateng",
  },

  {
    name: "Daniel Asare",
    programme: "BSc Computer Science",
    year: "2020",
    role: "Cybersecurity Analyst",
    organization: "Cybersecurity",
    image: "/images/alumni/daniel-asare.jpg",

    email: "daniel.asare@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/daniel-asare",
  },

  {
    name: "Michael Owusu",
    programme: "BSc Computer Science",
    year: "2021",
    role: "Machine Learning Engineer",
    organization: "Artificial Intelligence",
    image: "/images/alumni/michael-owusu.jpg",

    email: "michael.owusu@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/michael-owusu",
  },

  {
    name: "Abena Mensah",
    programme: "BSc Computer Science",
    year: "2022",
    role: "Product Designer",
    organization: "Technology & Design",
    image: "/images/alumni/abena-mensah.jpg",

    email: "abena.mensah@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/abena-mensah",
  },

  {
    name: "Kojo Asante",
    programme: "BSc Computer Science",
    year: "2023",
    role: "Full-Stack Developer",
    organization: "Software Engineering",
    image: "/images/alumni/kojo-asante.jpg",

    email: "kojo.asante@example.com",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
    profile: "/alumni/kojo-asante",
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
   ALUMNI CARD
============================================================ */

function AlumniCard({
  person,
}: {
  person: (typeof alumni)[number];
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

      {/* IMAGE */}

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

        {/* GRADUATION YEAR */}

        <div
          className="
            absolute
            right-4
            top-4
            rounded-full
            bg-white
            px-4
            py-2
            text-sm
            font-bold
            text-[#080d4f]
            shadow-lg
          "
        >
          Class of {person.year}
        </div>

        {/* OVERLAY (visible on mobile, hover on larger screens) */}

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

        {/* SOCIAL ICONS */}

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

      {/* INFORMATION */}

      <div className="px-2 pb-2 pt-5">

        <h3 className="text-lg font-bold text-[#080d4f] sm:text-xl">
          {person.name}
        </h3>

        <p className="mt-2 text-sm font-semibold text-[#078bc5] sm:text-base">
          {person.programme}
        </p>

        <div className="mt-4 border-t border-[#b9dfe9] pt-4">

          <p className="text-base font-bold text-[#080d4f]">
            {person.role}
          </p>

          <p className="mt-1 text-sm text-[#526078]">
            {person.organization}
          </p>

        </div>

        {/* PROFILE BUTTON */}

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

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ======================================================
          HERO
      ======================================================= */}

      <section className="relative min-h-[380px] overflow-hidden sm:min-h-[440px] md:min-h-[520px]">

        <Image
          src="/w.jpg"
          alt="Department Alumni"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

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
              Our Alumni
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
              Meet the graduates who have taken their knowledge, skills,
              and experiences beyond the department to make an impact
              across technology and society.
            </p>

          </div>

        </div>
      </section>

      {/* ======================================================
          ALUMNI
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

          {/* HEADING */}

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
                Our Community
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
                Alumni
              </h2>

              <div className="mt-4 h-1 w-16 rounded-full bg-[#078bc5]" />

            </div>

            <p className="max-w-xl text-base leading-[1.8] text-[#526078] sm:text-lg">
              Our alumni continue to contribute to the technology ecosystem
              through careers in software engineering, data science,
              artificial intelligence, cybersecurity, research, and
              entrepreneurship.
            </p>

          </div>

          {/* ALUMNI CARDS */}

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

            {alumni.map((person) => (
              <AlumniCard
                key={person.name}
                person={person}
              />
            ))}

          </div>

        </div>
      </section>

      {/* ======================================================
          CONNECT SECTION
      ======================================================= */}

      <section className="bg-[#e8f8fc] px-6 py-20 sm:px-10 sm:py-24 md:px-16">

        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#078bc5] sm:text-base">
            Stay Connected
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
            Keep in touch with the department
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.8] text-[#526078] sm:text-lg">
            Our alumni remain an important part of the department community.
            Stay connected, share your journey, and continue contributing to
            the next generation of Computer Science students.
          </p>

          <a
            href="/contact"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-lg
              bg-[#078bc5]
              px-7
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-md
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#080d4f]
              hover:shadow-xl
              sm:text-base
            "
          >
            Connect With Us

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>

      </section>

    </main>
  );
}