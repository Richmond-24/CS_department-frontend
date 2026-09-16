"use client";

import { useEffect, useState, useRef } from "react";
import { 
  BookOpen, 
  Download, 
  GraduationCap, 
  Library, 
  ArrowRight 
} from "lucide-react";

// --- Custom Hook for Scroll Animations ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

const resourceList = [
  {
    title: 'Student Portal',
    description: 'Access academic information, timetables, registration services, and departmental notifications.',
    icon: GraduationCap,
    color: 'bg-blue-50 text-[#203b82]'
  },
  {
    title: 'Library',
    description: 'Discover books, journals, digital collections, and research repositories aligned with computing disciplines.',
    icon: Library,
    color: 'bg-indigo-50 text-[#203b82]'
  },
  {
    title: 'Downloads',
    description: 'Find forms, documents, departmental handbooks, and learning material shared by the faculty team.',
    icon: Download,
    color: 'bg-cyan-50 text-[#0B9BD7]'
  },
  {
    title: 'Academic Information',
    description: 'View regulations, course structures, grading policies, and degree progression guidance for students.',
    icon: BookOpen,
    color: 'bg-slate-50 text-slate-700'
  },
];

export default function AllResources() {
  const headerReveal = useScrollReveal(0.2);
  const gridReveal = useScrollReveal(0.1);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-24 text-[#080b50] md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div 
          ref={headerReveal.ref}
          className={`mb-16 max-w-3xl transition-all duration-1000 ease-out ${
            headerReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="h-8 w-1.5 rounded-full bg-[#0B9BD7]" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#203b82]">
              Resources Hub
            </p>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight text-[#080b50] md:text-6xl lg:text-7xl">
            Support for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B9BD7] to-[#203b82]">
              learning and growth
            </span>
          </h1>
          
          <p className="mt-6 text-xl leading-relaxed text-slate-600 md:max-w-2xl">
            We provide a wide set of academic and administrative resources to help students and staff stay informed, supported, and productive throughout their journey.
          </p>
        </div>

        {/* Grid Section */}
        <div 
          ref={gridReveal.ref}
          className="grid gap-8 md:grid-cols-2"
        >
          {resourceList.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <article
                key={resource.title}
                className={`
                  group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#0B9BD7]/30 hover:shadow-[0_20px_40px_-10px_rgba(8,11,80,0.1)]
                  ${gridReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Decorative Background Blob */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    {/* Icon Header */}
                    <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${resource.color} transition-colors duration-300 group-hover:bg-[#203b82] group-hover:text-white`}>
                      <Icon size={28} strokeWidth={2} />
                    </div>

                    <h2 className="text-2xl font-bold text-[#080b50] group-hover:text-[#203b82] transition-colors duration-300">
                      {resource.title}
                    </h2>
                    
                    <p className="mt-4 text-lg leading-7 text-slate-600">
                      {resource.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#0B9BD7] transition-all duration-300 group-hover:gap-4 group-hover:text-[#203b82]">
                    <span>Explore Resource</span>
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </main>
  );
}