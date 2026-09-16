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
    image: "/img2.jpeg",
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
    image: "/c.jpg",
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
    image: "/f.jpg",
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
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  /* Mount animation */
  useEffect(() => {
    setMounted(true);
  }, []);

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

  /* Touch handlers for mobile swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }
    
    setTouchStartX(null);
  };

  const slide = slides[currentSlide];

  return (
    <main
      className="w-full bg-white text-[#060740]"
      style={{ fontFamily: "Lufga, sans-serif" }}
    >
      {/* =====================================================
          HERO SLIDER
      ===================================================== */}
      <section
        className="relative h-[560px] overflow-hidden lg:h-[650px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* =================================================
            BACKGROUND SLIDES
        ================================================= */}
        {slides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            }`}
            style={{
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)',
            }}
          >
            {/* Image with parallax effect */}
            <img
              src={item.image}
              alt={item.eyebrow}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === currentSlide
                  ? "scale-105"
                  : "scale-100"
              }`}
            />

            {/* Main overlay with gradient animation */}
            <div 
              className="absolute inset-0 bg-[#101c52]/45 transition-opacity duration-1000"
              style={{
                opacity: index === currentSlide ? 0.45 : 0.3,
              }}
            />

            {/* Stronger left overlay with animated gradient */}
            <div 
              className="absolute inset-0 transition-all duration-1000"
              style={{
                background: index === currentSlide 
                  ? 'linear-gradient(to right, rgba(6,7,64,0.95) 0%, rgba(24,51,122,0.65) 50%, transparent 100%)'
                  : 'linear-gradient(to right, rgba(6,7,64,0.85) 0%, rgba(24,51,122,0.55) 50%, transparent 100%)',
              }}
            />

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
            className="max-w-[760px]"
          >
            {/* Eyebrow with line animation */}
            <div 
              className="mb-5 flex items-center gap-3 animate-slideInLeft"
              style={{
                animationDelay: '200ms',
                opacity: mounted ? 1 : 0,
              }}
            >
              <span 
                className="h-[3px] rounded-full bg-[#02befe]"
                style={{
                  width: mounted ? '40px' : '0px',
                  transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transitionDelay: '300ms',
                }}
              />

              <span 
                className="text-[12px] font-semibold tracking-[2px] text-[#02befe] sm:text-[14px]"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateX(0)' : 'translateX(-20px)',
                  transition: 'all 0.7s ease-out',
                  transitionDelay: '400ms',
                }}
              >
                {slide.eyebrow}
              </span>
            </div>

            {/* Main heading with staggered word animation */}
            <h1 
              className="text-[44px] font-bold leading-[1.03] tracking-[-2px] text-white sm:text-[56px] lg:text-[68px]"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transitionDelay: '500ms',
              }}
            >
              {slide.title}
            </h1>

            {/* Description with fade-up */}
            <p 
              className="mt-6 max-w-[610px] text-[16px] font-medium leading-7 text-white/95 sm:text-[19px]"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out',
                transitionDelay: '600ms',
              }}
            >
              {slide.description}
            </p>

            {/* CTA with hover effects */}
            <div 
              className="mt-8"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out',
                transitionDelay: '700ms',
              }}
            >
              <a
                href={slide.buttonLink}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-lg bg-[#0387C5] px-7 py-4 text-[16px] font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-[#18337a] hover:shadow-xl active:scale-95"
                style={{
                  boxShadow: '0 10px 30px rgba(3,135,197,0.3)',
                }}
              >
                {/* Shine effect */}
                <span
                  className="absolute -left-20 top-0 h-full w-20 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-[120%]"
                />
                
                {/* Ripple on click */}
                <span className="absolute inset-0 bg-white/0 active:bg-white/10 transition-colors duration-150 rounded-lg" />

                {slide.button}

                <ArrowRight
                  size={19}
                  strokeWidth={2.5}
                  className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>

        {/* =================================================
            PREVIOUS BUTTON - Hidden on mobile
        ================================================= */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="group absolute left-4 top-1/2 z-30 hidden sm:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0387C5] hover:border-[#0387C5] active:scale-95 sm:left-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(-50%)' : 'translateY(-50%) scale(0.8)',
            transition: 'all 0.5s ease-out',
            transitionDelay: '800ms',
          }}
        >
          <ChevronLeft
            size={25}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </button>

        {/* =================================================
            NEXT BUTTON - Hidden on mobile
        ================================================= */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="group absolute right-4 top-1/2 z-30 hidden sm:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0387C5] hover:border-[#0387C5] active:scale-95 sm:right-6"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(-50%)' : 'translateY(-50%) scale(0.8)',
            transition: 'all 0.5s ease-out',
            transitionDelay: '900ms',
          }}
        >
          <ChevronRight
            size={25}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        {/* =================================================
            SLIDE INDICATORS
        ================================================= */}
        <div 
          className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
            transition: 'all 0.6s ease-out',
            transitionDelay: '1000ms',
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="relative h-2 rounded-full transition-all duration-500 overflow-hidden"
              style={{
                width: index === currentSlide ? '36px' : '8px',
                backgroundColor: index === currentSlide ? '#02befe' : 'rgba(255,255,255,0.5)',
                boxShadow: index === currentSlide ? '0 0 12px rgba(2,190,254,0.5)' : 'none',
              }}
            >
              {/* Progress fill for active indicator */}
              {index === currentSlide && !isPaused && (
                <span
                  className="absolute inset-0 bg-white/40 animate-progressFill"
                  style={{
                    animationDuration: '3s',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* =================================================
            SLIDE NUMBER - Hidden on mobile
        ================================================= */}
        <div 
          className="absolute bottom-7 right-6 z-30 hidden items-center gap-2 text-[13px] font-semibold text-white sm:flex"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease-out',
            transitionDelay: '1100ms',
          }}
        >
          <span
            className="tabular-nums"
            style={{
              transition: 'all 0.3s ease-out',
            }}
          >
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <span className="h-px w-8 bg-white/50" />

          <span className="text-white/50">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* =================================================
            AUTO SLIDE PROGRESS BAR
        ================================================= */}
        {!isPaused && (
          <div
            key={currentSlide}
            className="absolute bottom-0 left-0 z-30 h-[3px] bg-gradient-to-r from-[#0387C5] to-[#02befe] animate-sliderProgress"
            style={{
              boxShadow: '0 0 10px rgba(2,190,254,0.5)',
            }}
          />
        )}

        {/* Mobile swipe hint */}
        <div 
          className="absolute bottom-20 left-1/2 z-30 -translate-x-1/2 text-white/60 text-xs sm:hidden animate-pulse"
          style={{
            opacity: mounted ? 0.6 : 0,
            transition: 'opacity 0.5s ease-out',
            transitionDelay: '1200ms',
          }}
        >
          Swipe to explore →
        </div>
      </section>

      {/* Add custom keyframe animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        @keyframes sliderProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        
        .animate-sliderProgress {
          animation: sliderProgress 3s linear;
        }
        
        @keyframes progressFill {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0%);
          }
        }
        
        .animate-progressFill {
          animation: progressFill 3s linear;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Smooth scrollbar for webkit */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #0387C5;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #18337a;
        }
      `}</style>

      {/* =====================================================
          OTHER HOMEPAGE CONTENT
      ===================================================== */}

      {/* Add About, Programmes, Why Choose CSI etc. below */}
    </main>
  );
};

export default Home;