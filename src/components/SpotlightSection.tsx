
"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Quote,
} from "lucide-react";

const spotlights = [
  {
    name: "Pierre Labroche",
    programme: "BS|MS ’26 Computer Science",
    image: "/images/spotlight/pierre-labroche.jpg",
    quote:
      "I am focusing on the research topic of large-scale AI neural networks mapping onto structures of the human brain. For me, decoding the brain’s neural activity serves as a stepping stone for truly understanding the inner workings of the human brain.",
    focus: "Artificial Intelligence & Neuroscience",
  },
  {
    name: "Ama Mensah",
    programme: "BSc ’25 Computer Science",
    image: "/images/spotlight/ama-mensah.jpg",
    quote:
      "Computer science has given me the confidence to approach difficult problems differently. I want to use technology to build practical solutions that improve everyday life.",
    focus: "Software Engineering",
  },
  {
    name: "Kwame Asante",
    programme: "BSc ’24 Computer Science",
    image: "/images/spotlight/kwame-asante.jpg",
    quote:
      "The most valuable part of my experience has been learning how to turn an idea into something people can actually use.",
    focus: "Data Science & Innovation",
  },
  {
    name: "Abigail Mensah",
    programme: "BSc ’26 Computer Science",
    image: "/images/spotlight/abigail-mensah.jpg",
    quote:
      "My experience in computer science has shown me that technology is not only about writing code. It is about understanding problems and building solutions that matter.",
    focus: "Data Science & Machine Learning",
  },
  {
    name: "Daniel Osei",
    programme: "BSc ’25 Computer Science",
    image: "/images/spotlight/daniel-osei.jpg",
    quote:
      "Working with other students has taught me that some of the best ideas come from combining different perspectives, experiences, and ways of thinking.",
    focus: "Cybersecurity & Systems",
  },
];

export default function Spotlight() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /*
   * Automatically change spotlight every 5 seconds.
   */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((current) =>
        current === spotlights.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === spotlights.length - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? spotlights.length - 1 : current - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <main
      className="min-h-screen overflow-hidden bg-white text-[#080d4f]"
      style={{ fontFamily: "Lufga, sans-serif" }}
    >
      {/* =========================================
          PAGE INTRO
      ========================================== */}
      <section className="border-b border-[#080d4f]/8">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-20 sm:px-8 sm:pb-20 sm:pt-28 lg:px-10 lg:pt-32">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.18em] text-[#078bc5]">
              Student Spotlight
            </p>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-[#080d4f] sm:text-5xl lg:text-[58px]">
              Preparing Our Students to Make Meaningful Contributions to the
              World
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-[#4b5566] sm:text-lg sm:leading-8">
              Meet the students, researchers, and graduates using computer
              science to explore important questions, create new ideas, and
              make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          STUDENT SPOTLIGHT
      ========================================== */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {/* Spotlight header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#078bc5]" />

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#078bc5]">
              Spotlight
            </p>
          </div>

          {/* Slide counter */}
          <p className="text-sm font-medium text-[#4b5566]">
            <span className="text-[#080d4f]">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>

            <span className="mx-1.5 text-[#080d4f]/30">/</span>

            {String(spotlights.length).padStart(2, "0")}
          </p>
        </div>

        {/* =========================================
            CAROUSEL
        ========================================== */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {spotlights.map((student) => (
              <article
                key={student.name}
                className="w-full shrink-0"
                aria-hidden={
                  student.name !== spotlights[currentSlide].name
                }
              >
                <div className="grid items-start gap-8 lg:grid-cols-[135px_1fr] lg:gap-8">
                  {/* =================================
                      STUDENT IMAGE
                  ================================= */}
                  <div className="flex justify-start">
                    <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full bg-[#e6f7ff] ring-1 ring-[#080d4f]/10 transition-all duration-500 sm:h-[130px] sm:w-[130px]">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* =================================
                      STUDENT MESSAGE
                  ================================= */}
                  <div className="max-w-4xl">
                    {/* Student information */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base text-[#080d4f] sm:text-lg">
                      <span className="font-semibold">
                        Spotlight:
                      </span>

                      <span>{student.name},</span>

                      <span>{student.programme}</span>
                    </div>

                    {/* Quote */}
                    <div className="relative mt-7">
                      <Quote
                        size={28}
                        strokeWidth={1.5}
                        className="absolute -left-1 -top-4 text-[#078bc5]/30 sm:-left-8 sm:-top-3"
                      />

                      <blockquote className="relative text-[22px] font-normal leading-[1.65] tracking-[-0.015em] text-[#17213b] sm:text-[27px] sm:leading-[1.6] lg:text-[30px]">
                        “{student.quote}”
                      </blockquote>
                    </div>

                    {/* Area of focus */}
                    <div className="mt-8">
                      <span className="inline-flex rounded-full bg-[#e6f7ff] px-4 py-2 text-sm font-medium text-[#080d4f]">
                        {student.focus}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================
            CAROUSEL CONTROLS
        ========================================== */}
        <div className="mt-12 flex items-center justify-between border-t border-[#080d4f]/10 pt-6">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {spotlights.map((student, index) => (
              <button
                key={student.name}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Show ${student.name}`}
                aria-current={
                  currentSlide === index ? "true" : undefined
                }
                className="group flex h-6 items-center"
              >
                <span
                  className={`
                    block h-1.5 rounded-full transition-all duration-300
                    ${
                      currentSlide === index
                        ? "w-8 bg-[#078bc5]"
                        : "w-2 bg-[#080d4f]/20 group-hover:bg-[#078bc5]/50"
                    }
                  `}
                />
              </button>
            ))}
          </div>

          {/* Previous / Next */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous student"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#080d4f]/10 text-[#080d4f] transition-all duration-300 hover:border-[#078bc5] hover:bg-[#e6f7ff] hover:text-[#078bc5]"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next student"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#080b50] text-white transition-all duration-300 hover:bg-[#078bc5]"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* =========================================
            AUTO-SLIDE PROGRESS
        ========================================== */}
        <div className="mt-5 h-[2px] w-full overflow-hidden bg-[#080d4f]/8">
          {!isPaused && (
            <div
              key={currentSlide}
              className="h-full origin-left bg-[#078bc5] animate-[spotlightProgress_5s_linear]"
            />
          )}
        </div>
      </section>

      {/* =========================================
          ANIMATION
      ========================================== */}
      <style>{`
        @keyframes spotlightProgress {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </main>
  );
}