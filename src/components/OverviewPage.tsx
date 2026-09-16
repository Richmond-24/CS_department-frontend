

import { useEffect, useRef, useState } from 'react';

const WhyChooseCSI = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-slate-50 to-white px-4 py-12 sm:px-6 md:px-8 lg:px-16 xl:px-24"
    >
      <div className={`mx-auto max-w-7xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Main Card Container */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-50 via-blue-50 to-white shadow-2xl shadow-cyan-100/50">
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-400/10 blur-3xl" />
          
          <div className="relative flex flex-col lg:flex-row">
            
            {/* Left Content */}
            <div className="flex w-full flex-col justify-center px-6 py-10 sm:px-8 md:px-10 lg:w-5/12 lg:py-16 xl:px-14">
              
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 rounded-full bg-cyan-100/80 px-4 py-2 text-sm font-semibold text-cyan-700 backdrop-blur-sm transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                <span className="h-2 w-2 rounded-full bg-cyan-600 animate-pulse" />
                Excellence in Education
              </div>

              {/* Heading */}
              <h2 className={`mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                Why Choose{' '}
                <span className="relative inline-block">
                  CSI?
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 8C50 2 150 2 198 8"
                      stroke="#0ea5e9"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <p className={`mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                Discover a learning environment where technology, innovation, research, and real-world problem solving come together.
              </p>

              {/* Benefits List */}
              <ul className="mt-8 space-y-4">
                {[
                  'Learn real-world tech skills.',
                  'Prepare for tech careers.',
                  'Develop critical thinking.',
                  'Turn ideas into solutions.',
                  'Gain practical experience.'
                ].map((item, index) => (
                  <li 
                    key={index}
                    className={`group flex items-start gap-3 transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-800 group-hover:text-cyan-700 transition-colors">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                className={`mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-cyan-200/50 transition-all duration-700 hover:shadow-xl hover:shadow-cyan-300/50 hover:-translate-y-0.5 active:translate-y-0 delay-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Get Started Today
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>

            {/* Right Image / Video */}
            <div className="relative w-full lg:w-7/12">
              <div className="relative h-[300px] min-h-[300px] sm:h-[400px] md:h-[450px] lg:h-full lg:min-h-[500px]">
                
                {/* Image Container with Gradient Overlay */}
                <div className="absolute inset-0">
                  <img
                    src="/f.jpg"
                    alt="CSI students collaborating on innovative projects"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Play Button */}
                <button
                  type="button"
                  aria-label="Play video"
                  className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-110 hover:bg-white group sm:h-20 sm:w-20"
                >
                  <div className="relative">
                    <svg
                      className="h-6 w-6 text-cyan-600 ml-0.5 sm:h-8 sm:w-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
                  </div>
                </button>

                {/* Stats Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto">
                  <div className="inline-flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md px-4 py-3 shadow-xl sm:px-5 sm:py-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
                      <svg
                        className="h-5 w-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 sm:text-sm">Success Rate</p>
                      <p className="text-lg font-bold text-gray-900 sm:text-xl">95%+</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCSI;

