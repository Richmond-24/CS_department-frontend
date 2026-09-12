import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

type Slide = {
  image: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  button: string;
  buttonLink: string;
};

const slides: Slide[] = [
  {
    image: "/img1.webp",
    eyebrow: "COMPUTER SCIENCE & INFORMATICS",
    title: (
      <>
        Start Your
        <br />
        Journey In
        <br />
        Computer Science
      </>
    ),
    description:
      "Explore opportunities to study, innovate and grow with us.",
    button: "Explore Programmes",
    buttonLink: "#programmes",
  },

  {
    image: "/img2.webp",
    eyebrow: "INNOVATION & TECHNOLOGY",
    title: (
      <>
        Build The
        <br />
        Future With
        <br />
        Technology
      </>
    ),
    description:
      "Develop the skills, knowledge and creativity to solve real-world problems.",
    button: "Explore Resources",
    buttonLink: "#resources",
  },

  {
    image: "/img3.webp",
    eyebrow: "LEARN • CREATE • INNOVATE",
    title: (
      <>
        Turn Your
        <br />
        Ideas Into
        <br />
        Solutions
      </>
    ),
    description:
      "Learn through practical experiences, research and collaborative projects.",
    button: "About CSI",
    buttonLink: "#about",
  },

  {
    image: "/img4.webp",
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: (
      <>
        Prepare For
        <br />
        The Digital
        <br />
        World
      </>
    ),
    description:
      "Gain practical technology skills that prepare you for the careers of tomorrow.",
    button: "News & Media",
    buttonLink: "#news",
  },

  {
    image: "/img5.webp",
    eyebrow: "COMPUTER SCIENCE & INFORMATICS",
    title: (
      <>
        Shape The
        <br />
        Future With
        <br />
        CSI
      </>
    ),
    description:
      "Join a community of students passionate about technology, research and innovation.",
    button: "Contact Us",
    buttonLink: "#contact",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  /* Auto slide every 3 seconds */
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  /* Next slide */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  /* Previous slide */
  const previousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  /* Select slide */
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <main
      className="w-full bg-white text-[#080b50] font-['Lufga']"
      style={{ fontFamily: "Lufga, sans-serif" }}
    >
      {/* =====================================================
          HERO SLIDER
      ===================================================== */}
      <section
        className="relative h-[560px] overflow-hidden lg:h-[650px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* =================================================
            BACKGROUND SLIDES
        ================================================= */}
        {slides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.eyebrow}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === currentSlide
                  ? "scale-105"
                  : "scale-100"
              }`}
            />

            {/* Main overlay */}
            <div className="absolute inset-0 bg-[#101c52]/45" />

            {/* Stronger left overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#080d4f]/95 via-[#101f5c]/65 to-transparent" />

            {/* Bottom overlay */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        ))}

        {/* =================================================
            HERO CONTENT
        ================================================= */}
        <div className="relative z-20 mx-auto flex h-full max-w-[1400px] items-center px-6 lg:px-16">
          <div
            key={currentSlide}
            className="max-w-[760px] animate-[fadeIn_.7s_ease-in-out]"
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-[3px] w-10 rounded-full bg-[#0798d1]" />

              <span className="text-[12px] font-semibold tracking-[2px] text-white/90 sm:text-[14px]">
                {slide.eyebrow}
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-[44px] font-bold leading-[1.03] tracking-[-2px] text-white sm:text-[56px] lg:text-[68px]">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-[610px] text-[16px] font-medium leading-7 text-white/95 sm:text-[19px]">
              {slide.description}
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                href={slide.buttonLink}
                className="group inline-flex items-center gap-3 rounded-lg bg-[#0798d1] px-7 py-4 text-[16px] font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0787bb] hover:shadow-xl"
              >
                {slide.button}

                <ArrowRight
                  size={19}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================
            PREVIOUS BUTTON
        ================================================= */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="group absolute left-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#080b50] sm:left-6"
        >
          <ChevronLeft
            size={25}
            strokeWidth={2}
            className="transition-transform group-hover:-translate-x-0.5"
          />
        </button>

        {/* =================================================
            NEXT BUTTON
        ================================================= */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="group absolute right-4 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#080b50] sm:right-6"
        >
          <ChevronRight
            size={25}
            strokeWidth={2}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </button>

        {/* =================================================
            SLIDE INDICATORS
        ================================================= */}
        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "w-9 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* =================================================
            SLIDE NUMBER
        ================================================= */}
        <div className="absolute bottom-7 right-6 z-30 hidden items-center gap-2 text-[13px] font-semibold text-white sm:flex">
          <span>
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-8 bg-white/50" />

          <span className="text-white/50">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* =================================================
            AUTO SLIDE PROGRESS
        ================================================= */}
        {!isPaused && (
          <div
            key={currentSlide}
            className="absolute bottom-0 left-0 z-30 h-[3px] bg-[#0798d1] animate-[sliderProgress_3s_linear]"
          />
        )}
      </section>

      {/* =====================================================
          OTHER HOMEPAGE CONTENT
      ===================================================== */}

      {/* Add About, Programmes, Why Choose CSI etc. below */}
    </main>
  );
};

export default Home;