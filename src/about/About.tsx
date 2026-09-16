"use client";

import { useEffect, useState, useRef } from "react";
import Image from "../components/Image";
import {
  Compass,
  Target,
  ShieldCheck,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  FlaskConical,
} from "lucide-react";

// --- Custom Hook for Scroll Animations ---
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

const galleryImages = [
  { src: "/img1.webp", alt: "Computer science student", className: "col-start-1 row-start-1" },
  { src: "/img2.webp", alt: "Department technology message", className: "col-start-2 row-start-1 row-span-2", overlay: true },
  { src: "/img1.jpg", alt: "Computer science students", className: "col-start-3 row-start-1" },
  { src: "/img2.jpeg", alt: "Computer science student", className: "col-start-1 row-start-2" },
  { src: "/a.jpg", alt: "Computer laboratory", className: "col-start-3 row-start-2" },
];

const overviewItems = [
  {
    icon: BookOpen,
    title: "Teaching & Learning",
    items: ["Academic programmes", "Practical computing education"],
  },
  { icon: FlaskConical, title: "Research", items: ["Research and knowledge creation"] },
  { icon: Lightbulb, title: "Innovation", items: ["Technology and problem-solving"] },
  { icon: Users, title: "Community", items: ["Student, faculty and industry collaboration"] },
];

const coreValues = [
  {
    icon: ShieldCheck,
    title: "Excellence",
    description:
      "Striving for high standards in learning, teaching, research, and professional development.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Promoting honesty, responsibility, transparency, and ethical conduct in all we do.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Encouraging creativity and new ideas that solve real-world challenges.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Working together to share knowledge, ideas, and achieve meaningful goals.",
  },
  {
    icon: Target,
    title: "Leadership",
    description:
      "Inspiring students and staff to lead with confidence, purpose, and impact.",
  },
];

const historyMilestones = [
  {
    year: "2014",
    title: "Department founded",
    description:
      "Established as a unit within the university to meet growing demand for computing education in the region.",
  },
  {
    year: "2015",
    title: "First postgraduate cohort",
    description:
      "Introduced MSc programmes in Computer Science, expanding beyond undergraduate education.",
  },
  {
    year: "2016",
    title: "Research centre opened",
    description:
      "Opened a dedicated research and innovation lab supporting student and faculty projects.",
  },
  {
    year: "2017",
    title: "Curriculum renewed",
    description:
      "Rebuilt the undergraduate curriculum around current industry practice, including data science and systems tracks.",
  },
];

export default function About() {
  // Hooks for different sections
  const collageReveal = useScrollReveal(0.1);
  const welcomeReveal = useScrollReveal(0.2);
  const visionReveal = useScrollReveal(0.2);
  const overviewReveal = useScrollReveal(0.1);
  const valuesReveal = useScrollReveal(0.1);
  const historyReveal = useScrollReveal(0.1);
  const closingReveal = useScrollReveal(0.2);

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          TOP IMAGE COLLAGE
      ====================================================== */}
      <section 
        ref={collageReveal.ref}
        className={`px-5 pt-8 transition-all duration-1000 ease-out sm:px-8 md:px-12 lg:px-16 ${
          collageReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          
          {/* MOBILE VIEW: Only first 2 images, side-by-side, Increased Height to h-80 */}
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            {galleryImages.slice(0, 2).map((image, index) => (
              <div
                key={`mobile-${image.src}`}
                className="relative h-80 w-full overflow-hidden rounded-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index === 0}
                  sizes="50vw"
                  className="object-cover"
                />
                
                {/* Added Overlay and Text to BOTH images */}
                <div className="absolute inset-0 flex items-end bg-[#080d4f]/80 p-4">
                  <p className="text-sm font-bold leading-tight text-white">
                    Technology is the future
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP/TABLET VIEW: Original Mosaic Grid */}
          <div className="hidden h-[320px] grid-cols-3 grid-rows-2 gap-2 sm:grid sm:h-[420px] sm:gap-3">
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`relative overflow-hidden rounded-lg ${image.className}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 768px) 33vw, 300px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {image.overlay && (
                  <div className="absolute inset-0 flex items-end bg-[#080d4f]/80 p-3 sm:p-5">
                    <p className="max-w-[190px] text-[12px] font-semibold leading-tight text-white sm:text-base">
                      Empowering Minds.
                      <br />
                      Shaping the Future
                      <br />
                      Through Technology.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =====================================================
          WELCOME TO THE DEPARTMENT
      ====================================================== */}
      <section 
        ref={welcomeReveal.ref}
        className={`px-5 py-10 transition-all duration-1000 ease-out sm:px-8 sm:py-14 md:px-12 ${
          welcomeReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="group overflow-hidden rounded-xl bg-[#e8f8fc] p-3 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg sm:p-4">
            <div className="grid items-center gap-4 sm:grid-cols-[145px_1fr] md:grid-cols-[170px_1fr]">
              <div className="relative h-[220px] overflow-hidden rounded-lg sm:h-[260px]">
                <Image
                  src="/tech0.webp"
                  alt="Welcome to the Department of Computer Science and Informatics"
                  fill
                  sizes="170px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="px-2 sm:px-4">
                <p className="text-[12px] font-semibold text-[#079bd3] sm:text-sm">
                  A MESSAGE FROM THE HEAD OF DEPARTMENT
                </p>

                <h1 className="mt-2 text-lg font-bold leading-snug text-[#080d4f] sm:text-xl md:text-2xl">
                  Welcome to the Department
                  <br />
                  of Computer Science & Informatics
                </h1>

                <p className="mt-3 text-[12px] leading-[1.75] text-[#182052] sm:text-[14px] md:text-[15px]">
                  "It is my pleasure to welcome you to our department, where we
                  are committed to excellence in teaching, research,
                  innovation, and technology. We strive to equip our students
                  with the knowledge, skills, and values needed to solve
                  real-world problems and shape the future".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISION & MISSION
      ====================================================== */}
      <section 
        ref={visionReveal.ref}
        className={`px-5 pb-12 transition-all duration-1000 ease-out sm:px-8 sm:pb-16 md:px-12 ${
          visionReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Vision */}
            <article className="group relative overflow-hidden rounded-xl border border-slate-200 border-t-4 border-t-[#079bd3] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#e8f8fc] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 text-[#080d4f] transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110">
                  <Compass size={27} strokeWidth={1.8} />
                </div>

                <h2 className="text-base font-bold text-[#080d4f] sm:text-lg">
                  Our Vision
                </h2>

                <p className="mt-2 text-[13px] leading-[1.7] text-[#182052] sm:text-[15px]">
                  To be a leading centre of excellence in computer science and
                  informatics, inspiring innovation, advancing knowledge, and
                  shaping technology-driven solutions for society.
                </p>
              </div>
            </article>

            {/* Mission */}
            <article className="group relative overflow-hidden rounded-xl border border-slate-200 border-t-4 border-t-[#079bd3] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#e8f8fc] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-3 text-[#080d4f] transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110">
                  <Target size={27} strokeWidth={1.8} />
                </div>

                <h2 className="text-base font-bold text-[#080d4f] sm:text-lg">
                  Our Mission
                </h2>

                <p className="mt-2 text-[13px] leading-[1.7] text-[#182052] sm:text-[15px]">
                  To deliver a computing education grounded in current
                  practice, support research that solves problems beyond the
                  campus, and prepare every graduate to keep learning after
                  they leave us.
                </p>
              </div>
            </article>

          </div>
        </div>
      </section>
    
{/* =====================================================
    DEPARTMENT OVERVIEW
====================================================== */}
<section 
  ref={overviewReveal.ref}
  className={`border-y border-[#079bd3]/30 bg-white px-5 py-12 transition-all duration-1000 ease-out sm:px-8 sm:py-16 md:px-12 lg:py-20 ${
    overviewReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
  }`}
>
  <div className="mx-auto max-w-6xl">

    {/* SECTION HEADER */}
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#079bd3] sm:text-sm">
        Who We Are
      </p>

      <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#080d4f] sm:text-4xl md:text-5xl">
        Department Overview
      </h2>

      <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#182052] sm:text-base sm:leading-8 md:text-lg">
        Discover a vibrant academic community committed to quality education,
        innovative research, and practical solutions that prepare students
        for the future of technology.
      </p>
    </div>

    {/* OVERVIEW CARDS */}
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-12">
      {overviewItems.map((item, index) => {
        return (
          <article
            key={item.title}
            className={`
              group
              relative
              min-h-[155px]
              overflow-hidden
              rounded-[16px]
              border
              border-[#8ed8f3]
              border-l-[4px]
              border-l-[#079bd3]
              bg-white
              px-6
              py-6
              transition-all
              duration-500
              hover:-translate-y-1
              hover:bg-[#f8fdff]
              hover:border-[#079bd3]
              hover:shadow-[0_12px_30px_rgba(7,155,211,0.12)]
              sm:min-h-[170px]
              sm:px-7
              sm:py-7
              md:min-h-[180px]
              md:px-8
              md:py-8
              ${overviewReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
            style={{ transitionDelay: `${index * 150}ms` }}
          >

            {/* TITLE */}
            <h3
              className="
                text-xl
                font-bold
                leading-tight
                tracking-[-0.025em]
                text-[#080d4f]
                sm:text-2xl
              "
            >
              {item.title}
            </h3>

            {/* ITEMS */}
            <ul className="mt-5 space-y-2.5">
              {item.items.map((point) => (
                <li
                  key={point}
                  className="
                    flex
                    items-start
                    gap-2.5
                    text-sm
                    leading-6
                    text-[#182052]
                    sm:text-base
                  "
                >
                  <span
                    className="
                      mt-[9px]
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-[#079bd3]
                    "
                  />

                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* HOVER ACCENT */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-[#079bd3]
                transition-all
                duration-300
                group-hover:w-full
              "
            />
          </article>
        );
      })}
    </div>

  </div>
</section>
 
{/* =====================================================
    CORE VALUES
====================================================== */}
<section 
  ref={valuesReveal.ref}
  className={`bg-[#e8f8fc] px-5 py-16 transition-all duration-1000 ease-out sm:px-8 sm:py-20 md:px-12 lg:py-24 ${
    valuesReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
  }`}
>
  <div className="mx-auto max-w-6xl">

    {/* SECTION HEADER */}
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-[-0.04em] text-[#079bd3] sm:text-4xl md:text-5xl">
        Our Core Values
      </h2>

      <p className="mt-2 text-sm font-medium text-[#080d4f] sm:text-base md:text-lg">
        What We Stand For
      </p>
    </div>

    {/* FIRST 3 VALUES */}
    <div className="mx-auto mt-10 grid gap-3 sm:grid-cols-3 sm:gap-4 md:mt-12">
      {coreValues.slice(0, 3).map((value, index) => {
        const Icon = value.icon;

        return (
          <article
            key={value.title}
            className={`
              group
              relative
              min-h-[180px]
              overflow-hidden
              rounded-xl
              bg-gradient-to-br
              from-[#0c2a66] 
              to-[#079bd3]
              p-6
              text-white
              shadow-md
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_18px_35px_rgba(8,11,80,0.25)]
              sm:min-h-[200px]
              sm:p-7
              md:min-h-[215px]
              md:p-8
              ${valuesReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            {/* Decorative circle */}
            <div
              className="
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-white/10
                transition-transform
                duration-500
                group-hover:scale-150
              "
            />

            <div className="relative z-10">

              {/* ICON */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/20
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-white
                  group-hover:text-[#079bd3]
                "
              >
                <Icon size={20} strokeWidth={2.2} />
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  tracking-[-0.02em]
                  text-white
                  drop-shadow-sm
                  sm:text-xl
                  md:text-[22px]
                "
              >
                {value.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-3
                  max-w-[300px]
                  text-sm
                  font-medium
                  leading-6
                  text-white
                  sm:text-[15px]
                  sm:leading-6
                "
              >
                {value.description}
              </p>
            </div>

            {/* Bottom hover line */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-white
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </article>
        );
      })}
    </div>

    {/* LAST 2 VALUES */}
    <div className="mx-auto mt-3 grid gap-3 sm:grid-cols-2 sm:gap-4">
      {coreValues.slice(3).map((value, index) => {
        const Icon = value.icon;

        return (
          <article
            key={value.title}
            className={`
              group
              relative
              min-h-[180px]
              overflow-hidden
              rounded-xl
              bg-gradient-to-br
              from-[#0c2a66]
              to-[#079bd3]
              p-6
              text-white
              shadow-md
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-[0_18px_35px_rgba(8,11,80,0.25)]
              sm:min-h-[200px]
              sm:p-7
              md:min-h-[215px]
              md:p-8
              ${valuesReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
            `}
            style={{ transitionDelay: `${(index + 3) * 150}ms` }}
          >
            {/* Decorative circle */}
            <div
              className="
                absolute
                -right-10
                -top-10
                h-28
                w-28
                rounded-full
                bg-white/10
                transition-transform
                duration-500
                group-hover:scale-150
              "
            />

            <div className="relative z-10">

              {/* ICON */}
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-white/20
                  text-white
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-white
                  group-hover:text-[#079bd3]
                "
              >
                <Icon size={20} strokeWidth={2.2} />
              </div>

              {/* TITLE */}
              <h3
                className="
                  mt-5
                  text-lg
                  font-bold
                  tracking-[-0.02em]
                  text-white
                  drop-shadow-sm
                  sm:text-xl
                  md:text-[22px]
                "
              >
                {value.title}
              </h3>

              {/* DESCRIPTION */}
              <p
                className="
                  mt-3
                  max-w-xl
                  text-sm
                  font-medium
                  leading-6
                  text-white
                  sm:text-[15px]
                  sm:leading-6
                "
              >
                {value.description}
              </p>
            </div>

            {/* Bottom hover line */}
            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-white
                transition-all
                duration-500
                group-hover:w-full
              "
            />
          </article>
        );
      })}
    </div>

  </div>
</section>


{/* =====================================================
    HISTORY
====================================================== */}
<section 
  ref={historyReveal.ref}
  className={`bg-white px-5 py-16 transition-all duration-1000 ease-out sm:px-8 sm:py-20 md:px-12 lg:py-24 ${
    historyReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
  }`}
>
  <div className="mx-auto max-w-6xl">

    {/* SECTION HEADER */}
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#079bd3] sm:text-sm">
        Our Journey
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#080d4f] sm:text-4xl md:text-5xl">
        Our History
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4b5566] sm:text-base sm:leading-8 md:text-lg">
        A journey of growth, innovation, research, and commitment to
        computing education.
      </p>
    </div>

    {/* TIMELINE */}
    <div className="mx-auto mt-12 max-w-4xl md:mt-16">

      {historyMilestones.map((milestone, index) => (
        <div
          key={milestone.year}
          className={`group relative flex gap-5 pb-12 transition-all duration-700 ease-out sm:gap-8 sm:pb-14 ${
            historyReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: `${index * 200}ms` }}
        >

          {/* TIMELINE LINE */}
          {index !== historyMilestones.length - 1 && (
            <span
              className="
                absolute
                left-[30px]
                top-[64px]
                h-[calc(100%-40px)]
                w-[2px]
                bg-[#079bd3]/20
                sm:left-[38px]
              "
              aria-hidden="true"
            />
          )}

          {/* YEAR */}
          <div
            className="
              relative
              z-10
              flex
              h-[60px]
              w-[60px]
              shrink-0
              items-center
              justify-center
              rounded-full
              border-2
              border-[#079bd3]/20
              bg-[#e8f8fc]
              text-xs
              font-bold
              text-[#080d4f]
              transition-all
              duration-300
              group-hover:scale-110
              group-hover:border-[#079bd3]
              group-hover:bg-[#079bd3]
              group-hover:text-white
              sm:h-[76px]
              sm:w-[76px]
              sm:text-sm
            "
          >
            {milestone.year}
          </div>

          {/* CONTENT */}
          <div className="pt-1 sm:pt-2">

            <h3
              className="
                text-lg
                font-bold
                tracking-[-0.02em]
                text-[#080d4f]
                sm:text-xl
                md:text-2xl
              "
            >
              {milestone.title}
            </h3>

            <p
              className="
                mt-2
                max-w-3xl
                text-sm
                leading-7
                text-[#4b5566]
                sm:text-base
                sm:leading-8
                md:text-lg
              "
            >
              {milestone.description}
            </p>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>
{/* =====================================================
    CLOSING SECTION
====================================================== */}
<section 
  ref={closingReveal.ref}
  className={`bg-[#080d4f] px-5 py-14 transition-all duration-1000 ease-out sm:px-8 sm:py-16 md:px-12 lg:py-20 ${
    closingReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
  }`}
>
  <div className="mx-auto max-w-6xl">

    <div className="grid overflow-hidden rounded-[24px] bg-[#0b155d] md:grid-cols-2">

      {/* IMAGE */}
      <div className="relative min-h-[280px] overflow-hidden sm:min-h-[340px] md:min-h-[420px]">
        <img
          src="/c.jpg"
          alt="Computer Science and Informatics Department"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-105
          "
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/30 via-transparent to-[#080d4f]/20" />
      </div>

      {/* CONTENT */}
      <div className="flex items-center px-6 py-10 sm:px-8 sm:py-12 md:px-10 lg:px-14">
        <div className="max-w-xl">

          {/* ICON */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#079bd3]/20 text-[#4cc6f0] sm:h-14 sm:w-14">
            <Award size={22} strokeWidth={2} />
          </div>

          {/* HEADING */}
          <h2
            className="
              mt-5
              text-3xl
              font-bold
              leading-tight
              tracking-[-0.04em]
              text-white
              sm:text-4xl
              md:text-[42px]
            "
          >
            Empowering the Next Generation
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-5
              text-sm
              leading-7
              text-white/70
              sm:text-base
              sm:leading-8
              md:text-lg
            "
          >
            Through teaching, research, innovation, and collaboration, we
            continue to prepare students to make meaningful contributions to
            the world through computing and technology.
          </p>

          {/* DECORATIVE LINE */}
          <div className="mt-7 h-1 w-16 rounded-full bg-[#079bd3] transition-all duration-500 hover:w-24" />

        </div>
      </div>

    </div>

  </div>
</section>
    </main>
  );
}