"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface Programme {
  id: string;
  title: string;
  duration?: string;
  path: string;
}

const programmes: Programme[] = [
  {
    id: "dip",
    title: "Dip. Computer Science",
    duration: "Duration: 2 Years",
    path: "#programmes",
  },
  {
    id: "bsc",
    title: "BSc. Computer Science",
    duration: "Duration: 4 Years",
    path: "#undergraduate",
  },
  {
    id: "mphil",
    title: "MPhil/MSc. Computer Science",
    duration: "Duration: 2 Years",
    path: "#postgraduate",
  },
  {
    id: "phd",
    title: "PhD Computer Science",
    duration: "Duration: 3 Years",
    path: "#programmes",
  },
];

const Programmes: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Optional: Reset to false if you want it to re-animate every time it scrolls into view
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCardClick = (programme: Programme) => {
    setActiveCard(programme.id);

    setTimeout(() => {
      if (typeof window !== "undefined" && programme.path.startsWith("#")) {
        window.location.hash = programme.path;
      }
    }, 180);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20 transition-all duration-1000 ease-out"
      style={{
        fontFamily: "Lufga, sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      {/* Animated Background Blobs */}
      <div 
        className="pointer-events-none absolute left-[-120px] top-20 h-64 w-64 rounded-full bg-[#0B9BD7]/5 blur-3xl transition-all duration-1000 delay-100"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        }}
      />
      <div 
        className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-72 w-72 rounded-full bg-[#203B82]/5 blur-3xl transition-all duration-1000 delay-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        }}
      />

      <div className="relative mx-auto max-w-[1180px]">
        <div className="mb-10 text-center sm:mb-12">
          {/* Animated Accent Line */}
          <div 
            className="mx-auto mb-4 h-1 rounded-full bg-[#0B9BD7] transition-all duration-800 ease-out"
            style={{
              width: isVisible ? '40px' : '0px',
            }}
          />

          <h2
            className={`
              text-[27px]
              font-bold
              leading-tight
              tracking-[-0.8px]
              text-[#080B50]
              sm:text-[32px]
              md:text-[36px]
              transition-all duration-700 ease-out delay-100
            `}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Explore Our Programmes
          </h2>

          <p
            className={`
              mx-auto
              mt-3
              max-w-[650px]
              text-[14px]
              font-medium
              leading-6
              text-[#080B50]/75
              sm:text-[15px]
              md:text-[16px]
              md:leading-7
              transition-all duration-700 ease-out delay-200
            `}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            Discover programmes designed to equip you with the knowledge
            <br className="hidden sm:block" />
            and practical skills needed to thrive in the digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-5">
          {programmes.map((programme, index) => {
            const isActive = activeCard === programme.id;

            return (
              <button
                key={programme.id}
                type="button"
                onClick={() => handleCardClick(programme)}
                aria-label={`View ${programme.title}`}
                className={`
                  group
                  relative
                  min-h-[145px]
                  w-full
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-[#0B9BD7]
                  text-left
                  transition-all
                  duration-500
                  ease-out
                  focus:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-[#0B9BD7]/20
                  ${
                    isActive
                      ? "scale-[0.985] border-[#0B9BD7] bg-[#0798D2] shadow-[0_15px_35px_rgba(8,155,215,0.25)]"
                      : "bg-[#F9FAFF] shadow-[0_4px_15px_rgba(8,11,80,0.02)] hover:-translate-y-1 hover:border-[#0798D2] hover:bg-[#0798D2] hover:shadow-[0_18px_40px_rgba(8,155,215,0.22)]"
                  }
                `}
                style={{
                  transitionDelay: `${300 + (index * 100)}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? (isActive ? 'scale(0.985)' : 'translateY(0)') 
                    : 'translateY(30px)',
                }}
              >
                <span
                  className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[5px]
                    rounded-l-[20px]
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-white"
                        : "bg-[#0798D2] group-hover:bg-white"
                    }
                  `}
                />

                <span
                  className={`
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-white/10
                    blur-2xl
                    transition-all
                    duration-500
                    group-hover:scale-[2]
                    ${isActive ? "scale-[2] opacity-100" : "opacity-0"}
                  `}
                />

                <div className="relative flex h-full items-center gap-4 px-6 py-7 sm:px-8">
                  <div
                    className={`
                      flex
                      h-[40px]
                      w-[40px]
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      sm:h-[44px]
                      sm:w-[44px]
                      ${
                        isActive
                          ? "bg-white text-[#0798D2]"
                          : "bg-[#0798D2] text-white group-hover:rotate-[-8deg] group-hover:bg-white group-hover:text-[#0798D2]"
                      }
                    `}
                  >
                    <ArrowRight
                      size={21}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`
                        text-[20px]
                        font-bold
                        leading-[1.1]
                        tracking-[-0.5px]
                        transition-colors
                        duration-300
                        sm:text-[23px]
                        md:text-[24px]
                        ${
                          isActive
                            ? "text-white"
                            : "text-[#080B50] group-hover:text-white"
                        }
                      `}
                    >
                      {programme.title}
                    </h3>

                    {programme.duration && (
                      <p
                        className={`
                          mt-1.5
                          text-[13px]
                          font-medium
                          transition-colors
                          duration-300
                          sm:text-[14px]
                          ${
                            isActive
                              ? "text-white/90"
                              : "text-[#11142D] group-hover:text-white/90"
                          }
                        `}
                      >
                        {programme.duration}
                      </p>
                    )}
                  </div>

                  <div
                    className={`
                      hidden
                      shrink-0
                      transition-all
                      duration-300
                      sm:block
                      ${
                        isActive
                          ? "translate-x-0 opacity-100"
                          : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    <ArrowRight size={23} strokeWidth={2} className="text-white" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Programmes;