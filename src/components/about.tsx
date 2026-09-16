"use client";

import { ArrowRight, BookOpenText, Sparkles, Users2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const highlights = [
  { icon: BookOpenText, title: "Teaching", text: "Research-led learning that blends theory and practice." },
  { icon: Users2, title: "Community", text: "Collaborative mentorship for students, staff, and industry partners." },
  { icon: Sparkles, title: "Innovation", text: "Creative problem solving that shapes tomorrow’s technology." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Unobserve after triggering if you only want it to animate once
          // observer.unobserve(entry.target);
        } else {
          // Optional: Reset visibility when scrolling away to re-animate on scroll back up
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15, // Trigger when 15% of the section is visible
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
      className="relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24 transition-all duration-1000 ease-out"
      style={{ 
        fontFamily: "Lufga, sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      {/* Background Blobs with staggered animation */}
      <div 
        className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-[#0798d2]/8 blur-3xl transition-all duration-1000 delay-100"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        }}
      />
      <div 
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#203b82]/8 blur-3xl transition-all duration-1000 delay-200"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          
          {/* Image Column */}
          <div 
            className="order-2 lg:order-1 transition-all duration-1000 ease-out delay-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            }}
          >
            <div className="about-preview-card relative overflow-hidden rounded-[28px] border border-[#d7f0fb] bg-[#f5fbff] p-3 shadow-[0_20px_60px_rgba(8,11,80,0.08)] sm:p-4 hover:shadow-[0_25px_70px_rgba(8,11,80,0.12)] transition-shadow duration-500">
              <div className="relative overflow-hidden rounded-[22px] group">
                <img
                  src="/img2.webp"
                  alt="Computer Science and Informatics students"
                  className="h-[360px] w-full object-cover sm:h-[420px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060740]/80 via-[#060740]/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm sm:text-[11px]">
                    <span className="h-2 w-2 rounded-full bg-[#02befe]" />
                    CSI Community
                  </div>
                  <p className="mt-4 max-w-xs text-lg font-semibold leading-snug sm:text-2xl">
                    Empowering minds and shaping the future through technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div 
            className="order-1 lg:order-2 transition-all duration-1000 ease-out delay-500"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            }}
          >
            <div 
              className="inline-flex items-center gap-2 rounded-full bg-[#e8f8fc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0387c5] sm:text-[11px] transition-all duration-500 hover:bg-[#d7f0fb]"
            >
              <span className="h-2 w-2 rounded-full bg-[#02befe]" />
              About CSI Department
            </div>

            <h2 className="mt-5 text-[30px] font-black leading-[1.06] tracking-[-0.06em] text-black sm:text-[40px] lg:text-[48px]">
              We build futures through computing, creativity, and purpose.
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-black/80 sm:text-[16px] sm:leading-8">
              The Department of Computer Science and Informatics is committed to shaping confident graduates who can create innovative solutions, explore research, and thrive in a rapidly changing digital world.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }, index) => (
                <div
                  key={title}
                  className="mobile-float rounded-2xl border border-[#dfeef8] bg-[#f9fcff] p-4 text-left shadow-[0_16px_40px_rgba(24,51,122,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#0387c5] hover:shadow-[0_20px_45px_rgba(3,135,197,0.12)]"
                  style={{
                    transitionDelay: `${600 + (index * 100)}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8fc] text-[#0387c5] transition-colors duration-300 group-hover:bg-[#0387c5] group-hover:text-white">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-black">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-black/75">{text}</p>
                </div>
              ))}
            </div>

            <div 
              className="mt-8 flex flex-col gap-3 sm:flex-row"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out',
                transitionDelay: '900ms',
              }}
            >
              <a
                href="#about"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.hash = "#about";
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0387c5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_25px_rgba(3,135,197,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#060740] active:scale-95"
              >
                Read More
                <ArrowRight size={18} strokeWidth={2.2} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}