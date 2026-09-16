"use client";

import { useEffect, useRef, useState } from "react";
import {
  UserRound,
  GraduationCap,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const Statistics = () => {
  const statistics = [
    {
      value: 2000,
      suffix: "+",
      label: "Students",
      description: "Currently enrolled",
      icon: UserRound,
    },
    {
      value: 50000,
      suffix: "+",
      label: "Graduates",
      description: "Alumni community",
      icon: GraduationCap,
    },
    {
      value: 5,
      suffix: "+",
      label: "Years",
      description: "Building computing talent",
      icon: Building2,
    },
  ];

  // Store the animated numbers
  const [counts, setCounts] = useState<number[]>(
    statistics.map(() => 0)
  );

  // Detect when the statistics section enters the screen
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          if (!hasStarted) {
            setHasStarted(true);
            // We don't disconnect here anymore so we can toggle visibility on scroll out/in
            // But we only want the number animation to run once
          }
        } else {
          // Optional: Reset visibility when scrolling away to re-animate fade
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasStarted]);

  // Animate all numbers automatically
  useEffect(() => {
    if (!hasStarted) return;

    const durations = [1800, 2200, 1200];

    const timers = statistics.map((stat, index) => {
      const target = stat.value;
      const duration = durations[index];
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth ease-out animation
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const currentValue = Math.floor(target * easeOut);

        setCounts((previous) => {
          const updated = [...previous];
          updated[index] = currentValue;
          return updated;
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCounts((previous) => {
            const updated = [...previous];
            updated[index] = target;
            return updated;
          });
        }
      };

      return requestAnimationFrame(animate);
    });

    return () => {
      timers.forEach((timer) => cancelAnimationFrame(timer));
    };
  }, [hasStarted]);

  return (
    <main 
      className="min-h-screen bg-white px-5 py-12 text-[#080b50] sm:px-6 md:px-10 lg:px-12 lg:py-16 transition-all duration-1000 ease-out"
      style={{ 
        fontFamily: "Lufga, sans-serif",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <section
        ref={sectionRef}
        className="mx-auto max-w-[1200px]"
      >
        {/* PAGE HEADER */}
        <div 
          className="mb-8 text-center md:mb-10 transition-all duration-700 ease-out delay-100"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#203b82]">
            Computer Science and Informatics Department
          </p>

          <h1 className="text-3xl font-extrabold tracking-[-0.04em] md:text-4xl">
            Statistics
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
            A growing community of students and graduates shaping the future
            of computing.
          </p>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#e6f7ff] p-5 transition-all duration-500 hover:-translate-y-1 active:-translate-y-1 hover:border-[#c5eaf7] hover:shadow-[0_14px_35px_rgba(8,11,80,0.08)] sm:p-6 md:min-h-[220px]"
                style={{
                  transitionDelay: `${300 + (index * 150)}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                }}
              >
                {/* TOP ROW */}
                <div className="flex items-start justify-between">
                  <div 
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#080b50] shadow-sm transition-transform duration-500 group-hover:rotate-6"
                    style={{
                      transitionDelay: `${400 + (index * 150)}ms`,
                    }}
                  >
                    <Icon size={22} strokeWidth={2.3} />
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#203b82] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#203b82] group-hover:text-white active:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* NUMBER + LABEL */}
                <div className="mt-8">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[42px] font-extrabold leading-none tracking-[-2.5px] text-[#080b50] sm:text-[44px]"
                      aria-label={`${counts[index]}${stat.suffix} ${stat.label}`}
                    >
                      {counts[index].toLocaleString()}
                      {stat.suffix}
                    </span>
                  </div>

                  <h2 className="mt-2 text-lg font-bold text-[#080b50]">
                    {stat.label}
                  </h2>

                  <p className="mt-1 text-sm text-[#203b82]/75">
                    {stat.description}
                  </p>
                </div>

                {/* DECORATIVE LINE */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#203b82] transition-all duration-500 group-hover:w-full active:w-full" />
              </article>
            );
          })}
        </div>

       
      </section>
    </main>
  );
};

export default Statistics;