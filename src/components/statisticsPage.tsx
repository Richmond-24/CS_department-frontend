import { UserRound, Building2 } from "lucide-react";

const Statistics = () => {
  const statistics = [
    {
      value: "50k+",
      label: "Students",
      icon: UserRound,
    },
    {
      value: "50k+",
      label: "Graduates",
      icon: UserRound,
    },
    {
      value: "5+",
      label: "Years",
      icon: Building2,
      flag: true,
    },
  ];

  return (
    <main className="min-h-screen bg-white px-6 py-16 lg:px-12">

      <section className="mx-auto max-w-[1200px]">

        {/* PAGE TITLE */}
        <h1 className="mb-8 text-center text-[28px] font-extrabold tracking-tight text-[#080b50]">
          Statistics
        </h1>

        {/* STATISTICS CARDS */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="flex h-[200px] items-center justify-center rounded-[20px] bg-[#c9f1fc]"
              >

                <div className="flex items-center gap-4">

                  {/* ICON */}
                  <div className="relative flex-shrink-0">

                    <Icon
                      size={62}
                      strokeWidth={2.8}
                      className="text-[#080b50]"
                    />

                    {/* Small flag detail for Years card */}
                    {stat.flag && (
                      <div className="absolute -right-1 -top-1">
                        <div className="h-[6px] w-[20px] rounded-r-sm bg-[#7c9bc1]" />
                        <div className="h-[17px] w-[5px] bg-[#7c9bc1]" />
                      </div>
                    )}

                  </div>


                  {/* TEXT */}
                  <div className="flex flex-col">

                    <span className="text-[48px] font-extrabold leading-[0.9] tracking-[-2px] text-[#080b50]">
                      {stat.value}
                    </span>

                    <span className="mt-1 text-[18px] font-medium leading-none text-[#080b50]">
                      {stat.label}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </section>

    </main>
  );
};

export default Statistics;