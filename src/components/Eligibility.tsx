{/* Eligibility checker component design page */}

const Eligibility = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <img
        src="/a.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[370px] flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="text-3xl font-bold md:text-4xl">
          Check My Elegibility
        </h2>

        <p className="mt-4 max-w-2xl text-base font-medium leading-6 md:text-xl">
          Find out which Computer Science and Informatics programmes
          <br className="hidden md:block" />
          you may qualify for based on your results.
        </p>

        <button
          type="button"
          onClick={() => {
            window.location.hash = '#eligibility-checker'
          }}
          className="mt-10 rounded-xl bg-[#0794ce] px-5 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-[#067eaf] hover:shadow-lg"
        >
          Check Eligibility
        </button>
      </div>
    </section>
  );
};

export default Eligibility;