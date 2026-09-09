
import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  return (
    <main className="w-full bg-white text-[#080b50]">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative h-[560px] overflow-hidden lg:h-[650px]">

        {/* Background Image */}
        <img
          src="/f.jpg"
          alt="Computer Science students"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Main Overlay */}
        <div className="absolute inset-0 bg-[#172b61]/50" />

        {/* Left Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#172b61]/85 via-[#172b61]/45 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1400px] items-center px-6 lg:px-16">

          <div className="max-w-[720px]">

            <h1 className="text-[48px] font-extrabold leading-[1.05] tracking-[-2px] text-white sm:text-[58px] lg:text-[68px]">

              Start Your
              <br />

              Journey In
              <br />

              Computer Science

            </h1>

            <p className="mt-5 text-[18px] font-medium text-white sm:text-[20px]">
              Explore opportunities to study and grow with us.
            </p>

            <div className="mt-7">
              <a
                href="#programmes"
                className="inline-flex items-center gap-3 rounded-md bg-[#0798d1] px-7 py-4 text-[16px] font-bold text-white transition hover:bg-[#0787bb]"
              >
                Explore Programmes
                <ArrowRight size={19} />
              </a>
            </div>

          </div>

        </div>

        {/* Previous Button */}
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 z-20 flex h-[50px] w-[38px] -translate-y-1/2 items-center justify-center rounded-r-full bg-white/85 text-[#173678] transition hover:bg-white sm:h-[54px] sm:w-[42px]"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-0 top-1/2 z-20 flex h-[50px] w-[50px] -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#173678] transition hover:bg-white sm:h-[54px] sm:w-[54px]"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          <span className="h-2 w-7 rounded-full bg-white" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/50" />
        </div>

      </section>


     

   

    </main>
  );
};


/* =========================================================
   PROGRAMME CARD
========================================================= */

type ProgrammeCardProps = {
  number: string;
  title: string;
  description: string;
};

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ number, title, description }) => {
  return (
    <div className="group bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="mb-8 flex h-14 w-14 items-center justify-center bg-[#203b82] text-lg font-bold text-white">
        {number}
      </div>

      <h3 className="text-2xl font-bold text-[#080b50]">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-gray-600">
        {description}
      </p>

      <ArrowRight
        size={22}
        className="mt-7 text-[#203b82] transition-transform duration-300 group-hover:translate-x-2"
      />

    </div>
  );
};

export default Home;