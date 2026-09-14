import React from "react";
import Image from "../components/Image";
import teachingStaff from "../data/staffData";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  ArrowLeft,
  Send,
} from "lucide-react";

/* -------------------------------------------------------
   LinkedIn Icon
   ------------------------------------------------------- */
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

/* -------------------------------------------------------
   Profile Page
   ------------------------------------------------------- */
const PersonProfile: React.FC = () => {
  /* ---------------------------------------------
     Read staff ID from hash

     Example:
     #people/patrick-mensah
     --------------------------------------------- */
  const raw = (window.location.hash || "")
    .replace("#people/", "")
    .replace("#", "");

  const slug = raw.split("/").pop() || raw;

  const person = teachingStaff.find(
    (staff: any) => staff.id === slug
  );

  /* ---------------------------------------------
     Profile not found
     --------------------------------------------- */
  if (!person) {
    return (
      <div className="min-h-screen bg-[#f7fbfd] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#080d4f]">
            Profile Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The staff profile you are looking for does not exist.
          </p>

          <button
            onClick={() => {
              window.location.hash = "people";
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#078bc5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0679aa]"
          >
            <ArrowLeft size={16} />
            Back to Teaching Staff
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------
     Safe fallbacks
     --------------------------------------------- */
  const researchInterests =
    person.researchInterests &&
    person.researchInterests.length > 0
      ? person.researchInterests
      : person.specialization
      ? [person.specialization]
      : ["Computer Science"];

  const qualifications = person.qualifications || [];
  const courses = person.courses || [];

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-gray-800">

      {/* ==================================================
          HERO
          ================================================== */}
      <section className="relative h-[190px] sm:h-[230px] overflow-hidden">
        
        {/* Background */}
        <Image
          src="/f.jpg"
          alt="Computer Science Department"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#080d4f]/85" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl items-center px-6 sm:px-10">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#55c8f2]">
              Computer Science & Informatics
            </p>

            <h1 className="text-3xl font-bold text-white sm:text-5xl">
              Profile
            </h1>

            <div className="mt-3 h-[2px] w-12 bg-[#078bc5]" />

            <p className="mt-3 max-w-xl text-xs leading-5 text-white/75 sm:text-sm">
              Academic staff profile and professional information.
            </p>
          </div>
        </div>
      </section>


      {/* ==================================================
          MAIN CONTENT
          ================================================== */}
      <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-10">

        {/* ==================================================
            PROFILE INTRO
            ================================================== */}
        <section className="border-b border-gray-200 pb-7">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr]">

            {/* Profile image */}
            <div className="flex justify-center md:justify-start">
              <div className="h-[180px] w-[180px] overflow-hidden rounded-md bg-[#c9f0fb]">
                {person.image ? (
                  <Image
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-[#078bc5]">
                    {person.name?.charAt(0)}
                  </div>
                )}
              </div>
            </div>


            {/* Profile details */}
            <div className="min-w-0">

              <h2 className="text-xl font-bold text-[#080d4f] sm:text-2xl">
                {person.name}
              </h2>

              {/* Role */}
              {person.role && (
                <p className="mt-2 text-xs font-semibold text-[#078bc5] sm:text-sm">
                  {person.role}
                </p>
              )}

              {/* Specialization */}
              {person.specialization && (
                <div className="mt-3 inline-block rounded border border-[#b7e8f7] bg-[#eefaff] px-3 py-1">
                  <span className="text-[10px] font-medium text-[#087aa9] sm:text-xs">
                    {person.specialization}
                  </span>
                </div>
              )}


              {/* Research tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                {researchInterests.slice(0, 4).map(
                  (interest: string, index: number) => (
                    <span
                      key={index}
                      className="rounded border border-[#a9e4f7] bg-white px-3 py-1 text-[10px] font-medium text-[#080d4f]"
                    >
                      {interest}
                    </span>
                  )
                )}
              </div>


              {/* Short biography */}
              {person.biography && (
                <p className="mt-4 max-w-3xl text-[11px] leading-5 text-gray-600 sm:text-xs">
                  {person.biography}
                </p>
              )}


              {/* Contact buttons */}
              <div className="mt-4 flex flex-wrap gap-2">

                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#078bc5] px-3 py-2 text-[10px] font-semibold text-white transition hover:bg-[#0679aa]"
                  >
                    <Mail size={13} />
                    Email
                  </a>
                )}

                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#078bc5] bg-white px-3 py-2 text-[10px] font-semibold text-[#078bc5] transition hover:bg-[#eefaff]"
                  >
                    <LinkedinIcon width={13} height={13} />
                    LinkedIn
                  </a>
                )}

              </div>
            </div>
          </div>
        </section>


        {/* ==================================================
            BIOGRAPHY
            ================================================== */}
        <section className="border-b border-gray-200 py-7">

          <h2 className="mb-3 text-base font-bold text-[#080d4f] sm:text-lg">
            Biography
          </h2>

          <div className="mb-3 h-[2px] w-10 bg-[#078bc5]" />

          <p className="text-[11px] leading-5 text-gray-600 sm:text-xs sm:leading-6">
            {person.biography ||
              `${person.name} is a member of the academic staff of the Computer Science and Informatics department. Their academic and professional interests contribute to teaching, research and innovation within the department.`}
          </p>

        </section>


        {/* ==================================================
            RESEARCH INTERESTS
            ================================================== */}
        <section className="border-b border-gray-200 py-7">

          <h2 className="mb-3 text-base font-bold text-[#080d4f] sm:text-lg">
            Research Interests
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">

            {researchInterests.map(
              (interest: string, index: number) => (
                <div
                  key={index}
                  className="flex min-h-[42px] items-center rounded-md border border-[#9ddff2] border-l-[3px] border-l-[#078bc5] bg-white px-4 py-2 shadow-sm"
                >
                  <span className="text-[10px] font-medium text-[#080d4f] sm:text-xs">
                    {interest}
                  </span>
                </div>
              )
            )}

          </div>

        </section>


        {/* ==================================================
            QUALIFICATIONS + COURSES
            ================================================== */}
        <section className="py-7">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {/* ---------------------------------------------
                Academic Qualifications
                --------------------------------------------- */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">

              {/* Card header */}
              <div className="border-t-[3px] border-[#078bc5] px-5 py-4">

                <div className="flex items-center gap-2">
                  <GraduationCap
                    size={17}
                    className="text-[#078bc5]"
                  />

                  <h2 className="text-sm font-bold text-[#080d4f]">
                    Academic Qualifications
                  </h2>
                </div>

              </div>


              {/* Qualifications */}
              <div className="px-5 pb-4">

                {qualifications.length > 0 ? (
                  <div>
                    {qualifications.map(
                      (qualification: any, index: number) => (
                        <div
                          key={index}
                          className="border-b border-gray-100 py-3 last:border-b-0"
                        >

                          <p className="text-[10px] font-semibold text-[#080d4f] sm:text-xs">
                            {qualification.degree}
                          </p>

                          {qualification.university && (
                            <p className="mt-1 text-[9px] text-gray-500">
                              {qualification.university}
                            </p>
                          )}

                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="py-3 text-[10px] text-gray-400">
                    Academic qualifications will be updated soon.
                  </div>
                )}

              </div>
            </div>


            {/* ---------------------------------------------
                Courses Taught
                --------------------------------------------- */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">

              {/* Card header */}
              <div className="border-t-[3px] border-[#078bc5] px-5 py-4">

                <div className="flex items-center gap-2">

                  <BookOpen
                    size={17}
                    className="text-[#078bc5]"
                  />

                  <h2 className="text-sm font-bold text-[#080d4f]">
                    Courses Taught
                  </h2>

                </div>

              </div>


              {/* Courses */}
              <div className="px-5 pb-4">

                {courses.length > 0 ? (
                  <ul className="space-y-2 py-2">

                    {courses.map(
                      (course: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-[10px] text-gray-600 sm:text-xs"
                        >
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#078bc5]" />
                          {course}
                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <div className="py-3 text-[10px] text-gray-400">
                    Courses taught will be updated soon.
                  </div>
                )}

              </div>
            </div>

          </div>
        </section>


        {/* ==================================================
            CONTACT INFORMATION
            ================================================== */}
        <section className="rounded-md bg-[#dff6fc] px-5 py-7 sm:px-8">

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

            {/* ---------------------------------------------
                Contact information
                --------------------------------------------- */}
            <div>

              <h2 className="text-base font-bold text-[#080d4f] sm:text-lg">
                Contact Information
              </h2>

              <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">
                Reach out for academic and professional enquiries.
              </p>


              <div className="mt-5 space-y-4">

                {/* Email */}
                {person.email && (
                  <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white text-[#078bc5]">
                      <Mail size={15} />
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                        Email
                      </p>

                      <a
                        href={`mailto:${person.email}`}
                        className="break-all text-[10px] font-medium text-[#080d4f] hover:text-[#078bc5]"
                      >
                        {person.email}
                      </a>
                    </div>

                  </div>
                )}


                {/* Phone */}
                {person.phone && (
                  <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white text-[#078bc5]">
                      <Phone size={15} />
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                        Phone
                      </p>

                      <p className="text-[10px] font-medium text-[#080d4f]">
                        {person.phone}
                      </p>
                    </div>

                  </div>
                )}


                {/* Office */}
                {person.office && (
                  <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-white text-[#078bc5]">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                        Office
                      </p>

                      <p className="text-[10px] font-medium text-[#080d4f]">
                        {person.office}
                      </p>
                    </div>

                  </div>
                )}

              </div>
            </div>


            {/* ---------------------------------------------
                Contact form
                --------------------------------------------- */}
            <div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="space-y-3"
              >

                <input
                  type="text"
                  placeholder="Name"
                  className="h-9 w-full rounded-md border border-white bg-white px-3 text-[10px] outline-none transition placeholder:text-gray-400 focus:border-[#078bc5]"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="h-9 w-full rounded-md border border-white bg-white px-3 text-[10px] outline-none transition placeholder:text-gray-400 focus:border-[#078bc5]"
                />

                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full resize-none rounded-md border border-white bg-white px-3 py-2 text-[10px] outline-none transition placeholder:text-gray-400 focus:border-[#078bc5]"
                />

                <button
                  type="submit"
                  className="flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#078bc5] text-[10px] font-semibold text-white transition hover:bg-[#0679aa]"
                >
                  <Send size={13} />
                  Send Message
                </button>

              </form>

            </div>

          </div>
        </section>


        {/* ==================================================
            BACK BUTTON
            ================================================== */}
        <div className="pt-7">

          <button
            onClick={() => {
              window.location.hash = "people";
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#078bc5] transition hover:text-[#080d4f]"
          >
            <ArrowLeft size={15} />
            Back to Teaching Staff
          </button>

        </div>

      </main>
    </div>
  );
};

export default PersonProfile;