"use client";

import { ArrowRight, BookOpenText, Sparkles, Users2 } from "lucide-react";

const highlights = [
  { icon: BookOpenText, title: "Teaching", text: "Research-led learning that blends theory and practice." },
  { icon: Users2, title: "Community", text: "Collaborative mentorship for students, staff, and industry partners." },
  { icon: Sparkles, title: "Innovation", text: "Creative problem solving that shapes tomorrow’s technology." },
];

export default function About() {
  return (
    <section className="scroll-reveal relative overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-16 lg:py-24">
      <div className="pointer-events-none absolute -left-16 top-10 h-52 w-52 rounded-full bg-[#0798d2]/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#203b82]/8 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div className="order-2 lg:order-1">
            <div className="about-preview-card relative overflow-hidden rounded-[28px] border border-[#d7f0fb] bg-[#f5fbff] p-3 shadow-[0_20px_60px_rgba(8,11,80,0.08)] sm:p-4">
              <div className="relative overflow-hidden rounded-[22px]">
                <img
                  src="/u.webp"
                  alt="Computer Science and Informatics students"
                  className="h-[360px] w-full object-cover sm:h-[420px] lg:h-[500px]"
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

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f8fc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0387c5] sm:text-[11px]">
              <span className="h-2 w-2 rounded-full bg-[#02befe]" />
              About Us
            </div>

            <h2 className="mt-5 text-[30px] font-black leading-[1.06] tracking-[-0.06em] text-[#060740] sm:text-[40px] lg:text-[48px]">
              We build futures through computing, creativity, and purpose.
            </h2>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#18337a]/80 sm:text-[16px] sm:leading-8">
              The Department of Computer Science and Informatics is committed to shaping confident graduates who can create innovative solutions, explore research, and thrive in a rapidly changing digital world.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {highlights.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="mobile-float rounded-2xl border border-[#dfeef8] bg-[#f9fcff] p-4 text-left shadow-[0_16px_40px_rgba(24,51,122,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0387c5] hover:shadow-[0_20px_45px_rgba(3,135,197,0.12)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8fc] text-[#0387c5]">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#060740]">{title}</h3>
                  <p className="mt-2 text-[12px] leading-5 text-[#18337a]/75">{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#about"
                onClick={(event) => {
                  event.preventDefault();
                  window.location.hash = "#about";
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0387c5] px-6 py-3.5 text-sm font-bold text-white shadow-[0_14px_25px_rgba(3,135,197,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#060740]"
              >
                Read More
                <ArrowRight size={18} strokeWidth={2.2} />
              </a>

            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
