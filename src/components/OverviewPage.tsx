const WhyChooseCSI = () => {
  return (
    <section className="w-full bg-white px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[20px] bg-[#e6f7fc] p-6 md:flex-row md:p-10 lg:p-10">
        
        {/* Left Content */}
        <div className="flex w-full flex-col justify-center px-4 py-6 md:w-[38%] md:px-0 lg:pr-8">
          <h2 className="text-3xl font-bold tracking-tight text-black">
            Why Choose CSI?
          </h2>

          {/* Blue underline */}
          <div className="mt-4 h-[8px] w-[100px] rounded-full bg-[#0794ce]" />

          <p className="mt-5 text-[17px] font-medium leading-[1.45] text-black">
            Discover a learning environment where technology,
            innovation, research, and real-world problem solving
            come together.
          </p>

          {/* Benefits */}
          <ul className="mt-5 space-y-1.5 text-[17px] font-semibold text-black">
            <li className="flex items-start">
              <span className="mr-1.5 text-[#0794ce]">●</span>
              <span>Learn real-world tech skills.</span>
            </li>

            <li className="flex items-start">
              <span className="mr-1.5 text-[#0794ce]">●</span>
              <span>Prepare for tech careers.</span>
            </li>

            <li className="flex items-start">
              <span className="mr-1.5 text-[#0794ce]">●</span>
              <span>Develop critical thinking.</span>
            </li>

            <li className="flex items-start">
              <span className="mr-1.5 text-[#0794ce]">●</span>
              <span>Turn ideas into solutions.</span>
            </li>

            <li className="flex items-start">
              <span className="mr-1.5 text-[#0794ce]">●</span>
              <span>Gain practical experience.</span>
            </li>
          </ul>
        </div>

        {/* Right Image / Video */}
        <div className="relative mt-6 w-full md:mt-0 md:w-[62%]">
          <div className="relative h-full min-h-[330px] overflow-hidden rounded-[18px]">
            <img
              src="/f.jpg"
              alt="CSI students"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Play Button */}
            <button
              type="button"
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/40 backdrop-blur-sm transition hover:scale-110"
            >
              <span className="ml-1 text-2xl text-red-600">
                ▶
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseCSI;