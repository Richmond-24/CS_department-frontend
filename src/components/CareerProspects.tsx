import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface Career {
  id: string;
  title: string;
}

const careers: Career[] = [
  { id: "software-developer", title: "Software Developer" },
  { id: "data-analyst", title: "Data Analyst" },
  { id: "cybersecurity-specialist", title: "Cybersecurity Specialist" },
  { id: "systems-analyst", title: "Systems Analyst" },
  { id: "network-engineer", title: "Network Engineer" },
  { id: "ai-machine-learning", title: "AI / Machine Learning" },
  { id: "database-administrator", title: "Database Administrator" },
  { id: "ux-ui-designer", title: "UX/UI Designer" },
  { id: "it-consultant", title: "IT Consultant" },
];

// --- Custom Hook for Scroll Animations ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Disconnect once visible if you only want it to animate once
          // observer.disconnect(); 
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

const CareerProspects: React.FC = () => {
  const [activeCareer, setActiveCareer] = useState<string | null>(null);
  
  // Hook for the main section header
  const headerReveal = useScrollReveal(0.2);
  
  // Hook for the grid container (to trigger staggered children if needed, 
  // but here we apply it to individual items for better control)
  
  const handleCareerClick = (careerId: string) => {
    setActiveCareer(careerId);
  };

  return (
    <section className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      {/* Background Blobs */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#0798D2]/5 blur-3xl transition-opacity duration-1000" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#203B82]/5 blur-3xl transition-opacity duration-1000" />

      <div className="relative mx-auto max-w-[1180px]">
        
        {/* Header Section with Fade In */}
        <div 
          ref={headerReveal.ref}
          className={`mb-9 transform transition-all duration-1000 ease-out sm:mb-11 ${
            headerReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="mb-4 h-1 w-10 rounded-full bg-[#0798D2]" />

          <h2
            className="
              text-[28px]
              font-bold
              leading-tight
              tracking-[-0.8px]
              text-[#080B50]
              sm:text-[32px]
              md:text-[36px]
            "
          >
            Career Prospects
          </h2>

          <p
            className="
              mt-3
              max-w-[900px]
              text-[14px]
              font-medium
              leading-6
              text-[#080B50]/75
              sm:text-[15px]
              md:text-[16px]
              md:leading-7
            "
          >
            Build the skills to pursue exciting careers across technology,
            business, research, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careers.map((career, index) => {
            const isActive = activeCareer === career.id;
            
            // Create a unique reveal hook for each card to handle staggered animation
            // We use a custom inline logic here to avoid creating 9 separate hooks manually,
            // but for cleaner code in larger apps, you might map this differently.
            // For this example, we'll use a simpler CSS-class based approach triggered by a parent observer
            // OR we can just use the index to delay the animation via style.
            
            return (
              <ScrollRevealCard key={career.id} index={index}>
                 <button
                  type="button"
                  onClick={() => handleCareerClick(career.id)}
                  aria-label={`Explore ${career.title} career`}
                  className={`
                    group
                    relative
                    flex
                    min-h-[64px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[17px]
                    border
                    border-transparent
                    px-5
                    py-4
                    text-center
                    transition-all
                    duration-300
                    ease-out
                    focus:outline-none
                    focus-visible:ring-4
                    focus-visible:ring-[#0798D2]/20
                    ${
                      isActive
                        ? "scale-[0.98] border-[#0798D2] bg-[#0798D2] shadow-[0_14px_30px_rgba(7,152,210,0.22)]"
                        : "bg-[#E8F8FC] hover:-translate-y-1 hover:border-[#0798D2] hover:bg-[#0798D2] hover:shadow-[0_14px_32px_rgba(7,152,210,0.20)]"
                    }
                  `}
                >
                  <span
                    className="
                      pointer-events-none
                      absolute
                      -left-20
                      top-0
                      h-full
                      w-20
                      -skew-x-12
                      bg-white/10
                      opacity-0
                      transition-all
                      duration-700
                      group-hover:left-[120%]
                      group-hover:opacity-100
                    "
                  />

                  <span
                    className={`
                      pointer-events-none
                      absolute
                      -right-8
                      -top-8
                      h-20
                      w-20
                      rounded-full
                      bg-white/10
                      blur-xl
                      transition-all
                      duration-500
                      group-hover:scale-[2]
                      ${isActive ? "scale-[2] opacity-100" : "opacity-0"}
                    `}
                  />

                  <span
                    className={`
                      relative
                      z-10
                      text-[16px]
                      font-semibold
                      leading-6
                      tracking-[-0.25px]
                      transition-colors
                      duration-300
                      sm:text-[17px]
                      md:text-[18px]
                      ${
                        isActive
                          ? "text-white"
                          : "text-[#080B50] group-hover:text-white"
                      }
                    `}
                  >
                    {career.title}
                  </span>

                  <span
                    className={`
                      absolute
                      right-4
                      z-10
                      flex
                      h-7
                      w-7
                      items-center
                      justify-center
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "translate-x-0 bg-white text-[#0798D2] opacity-100"
                          : "translate-x-2 bg-white text-[#0798D2] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                  </span>
                </button>
              </ScrollRevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Helper Component for Staggered Grid Items ---
const ScrollRevealCard: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }} // Stagger effect
    >
      {children}
    </div>
  );
};

export default CareerProspects;