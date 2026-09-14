// React import removed to avoid unused variable errors (JSX pragma handled by tooling)
import { Download } from "lucide-react";

const resources = [
  "Departmental Academic Guidelines",
  "Freshers' Onboarding & Orientation",
  "Fees & Fee Payment Guide",
  "Departmental Academic Guidelines",
  "Departmental Academic Guidelines",
  "Departmental Academic Guidelines",
  "Departmental Academic Guidelines",
  "Departmental Academic Guidelines",
];

export default function StudentResources() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#11194b]">

      {/* ================= HEADER ================= */}
      <section className="relative overflow-hidden bg-[#10194b]">

        {/* Circuit background */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(
                  90deg,
                  rgba(100,180,255,.4) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  rgba(100,180,255,.4) 1px,
                  transparent 1px
                )
              `,
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Decorative glow */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        {/* Header content */}
        <div className="relative mx-auto flex h-[180px] max-w-[1250px] items-center px-10 lg:px-14">
          <div>

            <h1 className="
              text-4xl
              font-extrabold
              tracking-tight
              text-white
              md:text-5xl
            ">
              Student Resources
            </h1>

            <div className="mt-3 h-[3px] w-[105px] bg-[#1597e5]" />

          </div>
        </div>
      </section>


      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-[1250px] px-10 py-14 lg:px-14">

        {/* Section heading */}
        <div className="mb-10">

          <h2 className="
            text-xl
            font-bold
            text-[#11194b]
            md:text-2xl
          ">
            Academic Guides & Handbooks
          </h2>

          <div className="mt-3 h-[4px] w-[55px] rounded-full bg-[#11194b]" />

        </div>


        {/* ================= RESOURCE TABLE ================= */}
        <div className="w-full">

          {/* Table heading */}
          <div
            className="
              grid
              grid-cols-[1fr_160px]
              border-b-2
              border-[#42a9ed]
              px-5
              pb-4
              text-sm
              text-gray-500
            "
          >
            <span>Resource</span>
            <span></span>
          </div>


          {/* Resource rows */}
          {resources.map((resource, index) => (

            <div
              key={index}
              className="
                grid
                grid-cols-[1fr_160px]
                items-center

                min-h-[58px]

                border-b
                border-[#b8dcf4]

                px-5

                text-sm
                md:text-[15px]

                transition
                hover:bg-[#f4faff]
              "
            >

              {/* Resource name */}
              <span className="font-semibold text-[#11194b]">
                {resource}
              </span>


              {/* Download */}
              <a
                href="#"
                className="
                  flex
                  items-center
                  justify-end
                  gap-1.5

                  font-semibold
                  text-[#11194b]

                  underline
                  underline-offset-4

                  transition

                  hover:text-[#1597e5]
                "
              >
                Download
                <Download
                  size={14}
                  strokeWidth={2.2}
                />
              </a>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}