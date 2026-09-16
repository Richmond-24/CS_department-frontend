"use client";

import { useEffect, useRef, useState } from "react";

const Eligibility = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          // Reset visibility when scrolling away to re-animate on scroll back up
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
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

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden transition-all duration-1000 ease-out"
      style={{
        fontFamily: "Lufga, sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      {/* Background Image with Parallax-like Fade */}
      <img
        src="/a.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2000ms] ease-out"
        style={{
          transform: isVisible ? 'scale(1.05)' : 'scale(1.15)',
        }}
      />

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 0.6 : 0.8,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-[370px] flex-col items-center justify-center px-6 text-center text-white">
        
        {/* Heading Animation */}
        <h2 
          className="text-3xl font-bold md:text-4xl transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '200ms',
          }}
        >
          Check My Eligibility
        </h2>

        {/* Description Animation */}
        <p 
          className="mt-4 max-w-2xl text-base font-medium leading-6 md:text-xl transition-all duration-700 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '400ms',
          }}
        >
          Find out which Computer Science and Informatics programmes
          <br className="hidden md:block" />
          you may qualify for based on your results.
        </p>

        {/* Button Animation */}
        <button
          type="button"
          onClick={() => {
            window.location.hash = '#eligibility-checker'
          }}
          className="group mt-10 rounded-xl bg-[#0794ce] px-5 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-[#067eaf] hover:shadow-xl active:scale-95"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '600ms',
          }}
        >
          <span className="flex items-center gap-2">
            Check Eligibility
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Eligibility;