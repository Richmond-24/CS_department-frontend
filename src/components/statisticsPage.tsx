
import {
  UserRound,
  GraduationCap,
  Building2,
  ArrowUpRight,
} from "lucide-react";

const Statistics = () => {
  const statistics = [
    {
      value: "600+",
      label: "Students",
      description: "Currently enrolled",
      icon: UserRound,
    },
    {
      value: "50k+",
      label: "Graduates",
      description: "Alumni community",
      icon: GraduationCap,
    },
    {
      value: "5+",
      label: "Years",
      description: "Building computing talent",
      icon: Building2,
    },
  ];

  return (
    <main className="min-h-screen bg-white px-5 py-12 text-[#080b50] sm:px-6 md:px-10 lg:px-12 lg:py-16">
      <section className="mx-auto max-w-[1200px]">

        {/* PAGE HEADER */}
        <div className="mb-8 text-center md:mb-10">
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
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-[#e6f7ff] p-5 transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 hover:border-[#c5eaf7] hover:shadow-[0_14px_35px_rgba(8,11,80,0.08)] sm:p-6 md:min-h-[220px]"
              >
                {/* TOP ROW */}
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#080b50] shadow-sm">
                    <Icon size={22} strokeWidth={2.3} />
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[#203b82] transition-transform duration-300 group-hover:rotate-45 active:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* NUMBER + LABEL */}
                <div className="mt-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[42px] font-extrabold leading-none tracking-[-2.5px] text-[#080b50] sm:text-[44px]">
                      {stat.value}
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
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#203b82] transition-all duration-300 group-hover:w-full active:w-full" />
              </article>
            );
          })}
        </div>

        {/* ABOUT */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-2xl font-extrabold tracking-[-0.03em] text-[#080b50] sm:text-3xl">
            About
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The Department of Computer Science and Informatics is committed to
            providing quality computing education, developing innovative
            solutions, and preparing students with the knowledge and skills
            needed to contribute meaningfully to the technology industry and
            society.
          </p>
        </div>

      </section>
    </main>
  );
};

export default Statistics;