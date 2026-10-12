"use client";

import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
import Image from "../components/Image";
import {
  Compass,
  Target,
  ShieldCheck,
  Lightbulb,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

/* =========================================================
   REUSABLE FADE-IN ANIMATION COMPONENT
========================================================= */
type FadeInDirection = "up" | "down" | "left" | "right";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: FadeInDirection;
  className?: string;
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }: FadeInProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  const directions: Record<FadeInDirection, string> = {
    up: "translate-y-12",
    down: "-translate-y-12",
    left: "translate-x-12",
    right: "-translate-x-12",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${directions[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   DATA
========================================================= */
const galleryImages = [
  { src: "/img1.webp", alt: "Computer science student", className: "col-start-1 row-start-1" },
  { src: "/img2.webp", alt: "Department technology message", className: "col-start-2 row-start-1 row-span-2", overlay: true },
  { src: "/img1.jpg", alt: "Computer science students", className: "col-start-3 row-start-1" },
  { src: "/img2.jpeg", alt: "Computer science student", className: "col-start-1 row-start-2" },
  { src: "/a.jpg", alt: "Computer laboratory", className: "col-start-3 row-start-2" },
];

const ABOUT_STORAGE_KEY = "department_about_content";
const ABOUT_API_URLS = [
  "https://uenr-csisd-backend.onrender.com/api/v1/department/about",
  "https://uenr-csisd-backend.onrender.com/api/v1/department",
  "https://uenr-csisd-backend.onrender.com/api/v1/about",
];

const defaultAboutContent = {
  sectionHeading: "Welcome to the Department of Computer Science & Informatics",
  bodyText1:
    "It is my pleasure to welcome you to our department, where we are committed to excellence in teaching, research, innovation, and technology. We strive to equip our students with the knowledge, skills, and values needed to solve real-world problems and shape the future.",
  bodyText2:
    "Discover a vibrant academic community committed to quality education, innovative research, and practical solutions that prepare students for the future of technology.",
  image: "/tech0.webp",
  visionStatement:
    "To be a leading centre of excellence in computer science and informatics, inspiring innovation, advancing knowledge, and shaping technology-driven solutions for society.",
  missionStatement:
    "To deliver a computing education grounded in current practice, support research that solves problems beyond the campus, and prepare every graduate to keep learning after they leave us.",
  focusAreas: [
    { id: "1", title: "Teaching & Learning", description: "Academic programmes and practical computing education.", icon: null },
    { id: "2", title: "Research", description: "Research and knowledge creation.", icon: null },
    { id: "3", title: "Innovation", description: "Technology and problem-solving.", icon: null },
    { id: "4", title: "Community", description: "Student, faculty and industry collaboration.", icon: null },
  ],
  coreValues: [
    { id: "1", title: "Excellence", description: "Striving for high standards in learning, teaching, research, and professional development.", icon: null },
    { id: "2", title: "Integrity", description: "Promoting honesty, responsibility, transparency, and ethical conduct in all we do.", icon: null },
    { id: "3", title: "Innovation", description: "Encouraging creativity and new ideas that solve real-world challenges.", icon: null },
    { id: "4", title: "Collaboration", description: "Working together to share knowledge, ideas, and achieve meaningful goals.", icon: null },
    { id: "5", title: "Leadership", description: "Inspiring students and staff to lead with confidence, purpose, and impact.", icon: null },
  ],
};

function normalizeAboutContent(source: any) {
  const incoming = source && typeof source === "object" ? source : {};

  const normalizeItems = (items: any[] | undefined, fallback: any[]) => {
    if (!Array.isArray(items) || items.length === 0) {
      return fallback;
    }

    return items.map((item, index) => ({
      id: item?.id ?? item?._id ?? `${index + 1}`,
      title: item?.title ?? item?.name ?? "New item",
      description: item?.description ?? item?.text ?? "",
      icon: item?.icon ?? item?.image ?? item?.iconUrl ?? null,
    }));
  };

  return {
    sectionHeading: incoming.sectionHeading ?? incoming.section_heading ?? incoming.heading ?? defaultAboutContent.sectionHeading,
    bodyText1: incoming.bodyText1 ?? incoming.body_text_1 ?? incoming.intro ?? defaultAboutContent.bodyText1,
    bodyText2: incoming.bodyText2 ?? incoming.body_text_2 ?? incoming.summary ?? defaultAboutContent.bodyText2,
    image: incoming.image ?? incoming.heroImage ?? defaultAboutContent.image,
    visionStatement: incoming.visionStatement ?? incoming.vision_statement ?? defaultAboutContent.visionStatement,
    missionStatement: incoming.missionStatement ?? incoming.mission_statement ?? defaultAboutContent.missionStatement,
    focusAreas: normalizeItems(incoming.focusAreas ?? incoming.focus_areas, defaultAboutContent.focusAreas),
    coreValues: normalizeItems(incoming.coreValues ?? incoming.core_values, defaultAboutContent.coreValues),
  };
}

async function loadAboutContent() {
  if (typeof window !== "undefined") {
    try {
      const cached = window.localStorage.getItem(ABOUT_STORAGE_KEY);
      if (cached) {
        return normalizeAboutContent(JSON.parse(cached));
      }
    } catch {
      // Ignore malformed cache entries and use the live API data if available.
    }
  }

  for (const url of ABOUT_API_URLS) {
    try {
      const response = await fetch(url, { headers: { Accept: "application/json" } });
      if (!response.ok) {
        continue;
      }

      const payload = await response.json();
      const normalized = normalizeAboutContent(payload);
      if (normalized) {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(normalized));
        }
        return normalized;
      }
    } catch {
      continue;
    }
  }

  return defaultAboutContent;
}

const historyMilestones = [
  { year: "2014", title: "Department founded", description: "Established as a unit within the university to meet growing demand for computing education in the region." },
  { year: "2015", title: "First postgraduate cohort", description: "Introduced MSc programmes in Computer Science, expanding beyond undergraduate education." },
  { year: "2016", title: "Research centre opened", description: "Opened a dedicated research and innovation lab supporting student and faculty projects." },
  { year: "2017", title: "Curriculum renewed", description: "Rebuilt the undergraduate curriculum around current industry practice, including data science and systems tracks." },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */
export default function About() {
  const [content, setContent] = useState(defaultAboutContent);

  useEffect(() => {
    let active = true;

    const syncContent = async () => {
      const nextContent = await loadAboutContent();
      if (active) {
        setContent(normalizeAboutContent(nextContent));
      }
    };

    syncContent();

    const handleContentUpdate = () => {
      syncContent();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("department-about-content:updated", handleContentUpdate);
    }

    return () => {
      active = false;
      if (typeof window !== "undefined") {
        window.removeEventListener("department-about-content:updated", handleContentUpdate);
      }
    };
  }, []);

  const overviewItems = (content.focusAreas ?? defaultAboutContent.focusAreas).map((item) => ({
    icon: BookOpen,
    title: item.title || "Department Focus",
    items: [item.description || "Department focus area."],
  }));

  // Updated Core Values Data Mapping
  const coreValues = (content.coreValues ?? defaultAboutContent.coreValues).map((value, index) => {
    // More specific icons for each value
    const iconMap = [Star, ShieldCheck, Lightbulb, Users, TrendingUp];
    const Icon = iconMap[index % iconMap.length];

    return {
      icon: Icon,
      title: value.title || "Excellence",
      description: value.description || "A department value that guides our work.",
    };
  });

  return (
    <main className="min-h-screen bg-white overflow-x-hidden font-sans">

      {/* =====================================================
          TOP IMAGE COLLAGE
      ====================================================== */}
      <section className="px-5 pt-8 sm:px-8 md:px-12 lg:px-16">
        <FadeIn>
          <div className="mx-auto max-w-4xl">
            {/* Mobile View */}
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {galleryImages.slice(0, 2).map((image, index) => (
                <FadeIn key={`mobile-${image.src}`} delay={index * 150}>
                  <div className="relative h-80 w-full overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} fill priority={index === 0} sizes="50vw" className="object-cover" />
                    <div className="absolute inset-0 flex items-end bg-[#080d4f]/80 p-4">
                      <p className="text-sm font-bold leading-tight text-white">Technology is the future</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden h-[320px] grid-cols-3 grid-rows-2 gap-2 sm:grid sm:h-[420px] sm:gap-3">
              {galleryImages.map((image, index) => (
                <FadeIn key={image.src} delay={index * 100} className={image.className}>
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
                    <Image src={image.src} alt={image.alt} fill priority={index < 2} sizes="(max-width: 768px) 33vw, 300px" className="object-cover transition-transform duration-700 hover:scale-105" />
                    {image.overlay && (
                      <div className="absolute inset-0 flex items-end bg-[#080d4f]/80 p-3 sm:p-5">
                        <p className="max-w-[190px] text-[12px] font-semibold leading-tight text-white sm:text-base">
                          Empowering Minds.<br />Shaping the Future<br />Through Technology.
                        </p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* =====================================================
          MESSAGE FROM HOD - NEW DESIGN
      ====================================================== */}
      <section className="relative px-5 py-16 sm:px-8 sm:py-24 md:px-12 lg:py-32 bg-slate-50">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#079bd3]/5 blur-3xl" />
           <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#080d4f]/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Text Content Side */}
            <FadeIn direction="right" delay={200} className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="h-px w-8 bg-[#079bd3]"></span>
                  <span className="text-sm font-bold tracking-widest uppercase text-[#079bd3]">Message from the HOD</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#080d4f] leading-[1.1] mb-8">
                  Shaping the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#079bd3] to-[#080d4f]">Future</span> of Computing
                </h1>

                <div className="relative pl-6 border-l-4 border-[#079bd3]/30 space-y-6">
                  <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-medium">
                    "{content.bodyText1 || defaultAboutContent.bodyText1}"
                  </p>
                  <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                    {content.bodyText2 || defaultAboutContent.bodyText2}
                  </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button className="group inline-flex items-center gap-2 rounded-full bg-[#080d4f] px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-[#079bd3] hover:shadow-lg hover:shadow-[#079bd3]/25 hover:-translate-y-1">
                    Explore Our Programs
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-bold text-[#080d4f] transition-all duration-300 hover:border-[#080d4f] hover:bg-slate-50">
                    Contact Us
                  </button>
                </div>

                {/* Signature Area */}
                <div className="mt-12 flex items-center gap-4">
                   <div className="h-px flex-1 bg-slate-200"></div>
                   <div className="text-right">
                      <p className="text-sm font-bold text-[#080d4f]">Head of Department</p>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Computer Science & Informatics</p>
                   </div>
                </div>
              </div>
            </FadeIn>

            {/* Image Side */}
            <FadeIn direction="left" delay={400} className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative">
                {/* Main Image Frame */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-[#080d4f]/10">
                  <Image 
                    src={content.image || defaultAboutContent.image} 
                    alt="Head of Department" 
                    fill 
                    sizes="(max-width: 1024px) 100vw, 40vw" 
                    className="object-cover object-top" 
                    priority 
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d4f]/90 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
                       <div className="h-12 w-12 rounded-full bg-[#079bd3] flex items-center justify-center text-white shadow-lg">
                          <Award size={24} />
                       </div>
                       <div>
                          <p className="text-white font-bold text-lg">Prof. PK. Mensah</p>
                          <p className="text-white/70 text-xs">Head of Department</p>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Dots */}
                <div className="absolute -z-10 -bottom-6 -right-6 grid grid-cols-4 gap-2">
                   {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-[#079bd3]/20" />
                   ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* =====================================================
          VISION & MISSION
      ====================================================== */}
      <section className="px-5 pb-12 sm:px-8 sm:pb-16 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <FadeIn delay={0}>
              <article className="group relative overflow-hidden rounded-xl border border-slate-200 border-t-4 border-t-[#079bd3] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#e8f8fc] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 text-[#080d4f] transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110">
                    <Compass size={27} strokeWidth={1.8} />
                  </div>
                  <h2 className="text-base font-bold text-[#080d4f] sm:text-lg">Our Vision</h2>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#182052] sm:text-[15px]">
                    {content.visionStatement || defaultAboutContent.visionStatement}
                  </p>
                </div>
              </article>
            </FadeIn>

            <FadeIn delay={150}>
              <article className="group relative overflow-hidden rounded-xl border border-slate-200 border-t-4 border-t-[#079bd3] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#e8f8fc] opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-3 text-[#080d4f] transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110">
                    <Target size={27} strokeWidth={1.8} />
                  </div>
                  <h2 className="text-base font-bold text-[#080d4f] sm:text-lg">Our Mission</h2>
                  <p className="mt-2 text-[13px] leading-[1.7] text-[#182052] sm:text-[15px]">
                    {content.missionStatement || defaultAboutContent.missionStatement}
                  </p>
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>
    
      {/* =====================================================
          DEPARTMENT OVERVIEW
      ====================================================== */}
      <section className="border-y border-[#079bd3]/30 bg-white px-5 py-12 sm:px-8 sm:py-16 md:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#079bd3] sm:text-sm">Who We Are</p>
              <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[#080d4f] sm:text-4xl md:text-5xl">Department Overview</h2>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#182052] sm:text-base sm:leading-8 md:text-lg">
                {content.bodyText2 || defaultAboutContent.bodyText2}
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 md:mt-12">
            {overviewItems.map((item, index) => (
              <FadeIn key={item.title} delay={index * 100}>
                <article className="group relative min-h-[155px] overflow-hidden rounded-[16px] border border-[#8ed8f3] border-l-[4px] border-l-[#079bd3] bg-white px-6 py-6 transition-all duration-500 hover:-translate-y-1 hover:bg-[#f8fdff] hover:border-[#079bd3] hover:shadow-[0_12px_30px_rgba(7,155,211,0.12)] sm:min-h-[170px] sm:px-7 sm:py-7 md:min-h-[180px] md:px-8 md:py-8">
                  <h3 className="text-xl font-bold leading-tight tracking-[-0.025em] text-[#080d4f] sm:text-2xl">{item.title}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm leading-6 text-[#182052] sm:text-base">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#079bd3]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#079bd3] transition-all duration-300 group-hover:w-full" />
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
 
      {/* =====================================================
          CORE VALUES - BLUE THEME
      ====================================================== */}
      <section className="relative bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm">
                <Sparkles className="h-4 w-4 text-[#079bd3]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#080d4f]">Our Foundation</span>
              </div>
              <h2 className="mt-6 text-3xl font-bold tracking-[-0.04em] text-[#080d4f] sm:text-4xl md:text-5xl">Core Values</h2>
              <p className="mt-4 text-base font-medium text-slate-600 max-w-2xl mx-auto">
                These principles are the compass that guides our academic journey, research endeavors, and community interactions.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <FadeIn key={value.title} delay={index * 100}>
                  <article className="group relative h-full overflow-hidden rounded-2xl bg-blue-50 p-6 shadow-sm ring-1 ring-blue-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:ring-blue-300 hover:bg-white">
                    
                    {/* Icon Container */}
                    <div className="relative mb-6">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-blue-100 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:border-blue-200">
                        <Icon className="h-7 w-7 text-[#079bd3]" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-lg font-bold text-[#080d4f] mb-2">{value.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600 font-medium">
                        {value.description}
                      </p>
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#079bd3] transition-all duration-500 group-hover:w-full" />
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          HISTORY
      ====================================================== */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#079bd3] sm:text-sm">Our Journey</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#080d4f] sm:text-4xl md:text-5xl">Our History</h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#4b5566] sm:text-base sm:leading-8 md:text-lg">
                A journey of growth, innovation, research, and commitment to computing education.
              </p>
            </div>
          </FadeIn>

          <div className="mx-auto mt-12 max-w-4xl md:mt-16">
            {historyMilestones.map((milestone, index) => (
              <FadeIn key={milestone.year} delay={index * 150}>
                <div className="group relative flex gap-5 pb-12 sm:gap-8 sm:pb-14">
                  {index !== historyMilestones.length - 1 && (
                    <span className="absolute left-[30px] top-[64px] h-[calc(100%-40px)] w-[2px] bg-[#079bd3]/20 sm:left-[38px]" aria-hidden="true" />
                  )}
                  <div className="relative z-10 flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border-2 border-[#079bd3]/20 bg-[#e8f8fc] text-xs font-bold text-[#080d4f] transition-all duration-300 group-hover:scale-110 group-hover:border-[#079bd3] group-hover:bg-[#079bd3] group-hover:text-white sm:h-[76px] sm:w-[76px] sm:text-sm">
                    {milestone.year}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <h3 className="text-lg font-bold tracking-[-0.02em] text-[#080d4f] sm:text-xl md:text-2xl">{milestone.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-[#4b5566] sm:text-base sm:leading-8 md:text-lg">{milestone.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
