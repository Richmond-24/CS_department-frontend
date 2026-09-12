{/* Programmes component design page */}


const Programmes = () => {
  const programmes = [
    {
      title: "Dip. Computer Science",
      duration: "Duration: 2 Years",
    },
    {
      title: "BSc. Computer Science",
      duration: "Duration: 4 Years",
    },
    {
      title: "MPhil/MSc. Computer Science",
      duration: "Duration: 2/1 Years",
    },
    {
      title: "PhD Computer Science",
      duration: "Duration: 4 Years",
    },
  ];

  return (
    <section className="w-full bg-white px-6 py-12 md:px-16 lg:px-20">
      {/* Section Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-[#080d4f] md:text-3xl">
          Explore Our Programmes
        </h2>

        <p className="mt-2 text-base font-medium leading-6 text-[#080d4f] md:text-lg">
          Discover programmes designed to equip you with the knowledge
          <br className="hidden md:block" />
          and practical skills needed to thrive in the digital world.
        </p>
      </div>

      {/* Programme Cards */}
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2">
        {programmes.map((programme, index) => (
          <div
            key={index}
            className="group flex min-h-[160px] items-center rounded-2xl border border-[#079bd3] border-l-[8px] bg-[#f9faff] px-8 py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Arrow Circle */}
            <div className="mr-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0794ce] text-2xl text-white transition-transform duration-300 group-hover:translate-x-1">
              →
            </div>

            {/* Programme Information */}
            <div>
              <h3 className="text-[25px] font-bold leading-tight text-[#080d4f] md:text-[28px]">
                {programme.title}
              </h3>

              <p className="mt-1 text-base font-semibold text-black md:text-lg">
                {programme.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programmes;