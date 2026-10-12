"use client";

import { Award, ArrowRight, Compass, Cpu, FlaskConical, GraduationCap, Lightbulb, Palette, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/* ---------- scroll reveal: fade + slide + de-blur ---------- */
type Dir = "up" | "down" | "left" | "right" | "scale";

function FadeIn({ children, delay = 0, direction = "up", className = "" }: { children: ReactNode; delay?: number; direction?: Dir; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const hidden: Record<Dir, string> = { up: "translate-y-10", down: "-translate-y-10", left: "-translate-x-10", right: "translate-x-10", scale: "scale-90" };
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${on ? "translate-x-0 translate-y-0 scale-100 opacity-100 blur-0" : `opacity-0 blur-[6px] ${hidden[direction]}`} ${className}`}>
      {children}
    </div>
  );
}

const WORDS = [
  { label: "Creativity", icon: Palette },
  { label: "Innovation", icon: Lightbulb },
  { label: "Community", icon: Users },
  { label: "Teaching", icon: GraduationCap },
  { label: "Research", icon: FlaskConical },
  { label: "Mentorship", icon: Compass },
  { label: "Technology", icon: Cpu },
  { label: "Leadership", icon: Award },
];

export default function About() {
  return (
    <main className="relative overflow-hidden bg-white text-[#080d4f] sm:bg-[#F6FAFD]">
      <style>{`
        @keyframes ab-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes ab-float2{0%,100%{transform:translateY(0)}50%{transform:translateY(10px)}}
        @keyframes ab-blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}
        @keyframes ab-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes ab-shine{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes ab-ring{0%{transform:scale(.8);opacity:.7}100%{transform:scale(2.2);opacity:0}}
        .ab-float{animation:ab-float 6s ease-in-out infinite}.ab-float2{animation:ab-float2 7s ease-in-out infinite}
        .ab-blob{animation:ab-blob 16s ease-in-out infinite}
        .ab-marquee{animation:ab-marquee 30s linear infinite}.ab-marquee:hover{animation-play-state:paused}
        .ab-text{background:linear-gradient(90deg,#0387c5,#02befe,#6366f1,#0387c5);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:ab-shine 5s linear infinite}
        .ab-ring{animation:ab-ring 2.4s ease-out infinite}
        @media(max-width:639px){.ab-text{background:none;color:#080d4f;animation:none}.ab-ring{display:none}}
        @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      {/* ambient blobs */}
      <div className="ab-blob pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 rounded-full bg-[#02befe]/20 blur-3xl sm:block" />
      <div className="ab-blob pointer-events-none absolute -right-24 top-[28%] hidden h-80 w-80 rounded-full bg-[#6366f1]/15 blur-3xl sm:block" style={{ animationDelay: "-7s" }} />

      {/* ================= HERO ================= */}
      <section className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <FadeIn direction="down">
              <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-[#079bd3]/30 bg-white px-5 py-2.5 text-[13px] font-black uppercase tracking-[.16em] text-[#0387c5] shadow-sm sm:text-base">
                <span className="relative flex h-3 w-3"><span className="ab-ring absolute inset-0 rounded-full bg-[#02befe]" /><span className="relative h-3 w-3 rounded-full bg-[#02befe]" /></span>
                About the Department
              </span>
            </FadeIn>

            <FadeIn delay={120}>
              <h1 className="mt-6 text-[40px] font-black leading-[1.02] tracking-[-0.05em] sm:text-6xl lg:text-[72px]">
                We build futures through <span className="ab-text">computing</span>, creativity &amp; purpose.
              </h1>
            </FadeIn>

            <FadeIn delay={240}>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-[#080d4f]/70 sm:text-lg">
                The Department of Computer Science and Informatics is committed to shaping confident graduates who can create innovative solutions, explore research, and thrive in a rapidly changing digital world.
              </p>
            </FadeIn>

            <FadeIn delay={360} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#about" onClick={(e) => { e.preventDefault(); window.location.hash = "#about"; }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#080d4f] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_35px_-12px_rgba(8,13,79,.55)] transition duration-300 hover:-translate-y-1 hover:bg-[#0387c5] active:scale-95">
                Read More <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

            </FadeIn>
          </div>

          {/* single image card */}
          <FadeIn direction="scale" delay={200}>
            <div className="group relative overflow-hidden rounded-[32px] shadow-[0_40px_80px_-35px_rgba(8,13,79,.5)] ring-1 ring-[#080d4f]/10">
              <img
                src="/img2.webp"
                alt="Computer Science and Informatics students"
                className="h-[400px] w-full object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105 sm:h-[480px] lg:h-[560px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-5">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] sm:text-[11px]">
                  <span className="h-2 w-2 rounded-full bg-[#02befe]" />CSI Community
                </div>
                <p className="mt-2 text-lg font-bold leading-snug sm:text-xl">Empowering minds and shaping the future through technology.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="relative overflow-hidden border-y border-[#080d4f]/10 bg-white py-6">
        <div className="ab-marquee flex w-max">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
              {WORDS.map(({ label, icon: Icon }) => (
                <div key={`${k}-${label}`} className="group mx-2.5 flex items-center gap-3 rounded-full border border-slate-200 bg-white py-2 pl-2 pr-6 transition duration-300 md:hover:-translate-y-1 md:hover:border-transparent md:hover:shadow-[0_14px_30px_-14px_rgba(8,13,79,.4)] sm:mx-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-[#080d4f] transition duration-300 md:group-hover:scale-110 md:group-hover:border-[#0387c5] md:group-hover:bg-[#0387c5] md:group-hover:text-white sm:h-12 sm:w-12">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <span className="whitespace-nowrap text-xl font-extrabold tracking-tight text-[#080d4f] sm:text-2xl">{label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />
      </div>
    </main>
  );
}
