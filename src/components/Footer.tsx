import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Camera,
  BriefcaseBusiness,
  Send,
} from "lucide-react";

const socialLinks = [
  {
    label: "Facebook",
    icon: Camera,
    href: "#",
  },
  {
    label: "Instagram",
    icon: Camera,
    href: "#",
  },
  {
    label: "LinkedIn",
    icon: BriefcaseBusiness,
    href: "#",
  },
  {
    label: "X",
    icon: Send,
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer
      className="
        relative
        overflow-hidden
        font-[var(--font-body,Inter,sans-serif)]
        text-white
      "
    >
      {/* =====================================================
          FULL CAMPUS IMAGE BACKGROUND
      ===================================================== */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/u.webp')",
        }}
      />

      {/* =====================================================
          BLUE OVERLAY
          Lower opacity keeps the campus visible
      ===================================================== */}
      <div className="absolute inset-0 bg-[#07145c]/55" />

      {/* =====================================================
          SUBTLE GRADIENT FOR TEXT READABILITY
      ===================================================== */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#07145c]/60 via-[#07145c]/40 to-[#07145c]/55" />

      {/* =====================================================
          FOOTER CONTENT
      ===================================================== */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-12
          sm:px-8
          lg:px-12
          lg:py-14
        "
      >
        {/* ===================================================
            FOUR COLUMN FOOTER
        =================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-12
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
          "
        >
          {/* =================================================
              COLUMN 1 — CONTACT
          ================================================= */}
          <div>
            {/* Department */}
            <h3
              className="
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-[16px]
                font-bold
                uppercase
                leading-5
                tracking-wide
                text-white
              "
            >
              Computer Science
              <br />
              and Informatics
            </h3>

            {/* Get in Touch */}
            <h2
              className="
                mt-5
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-2xl
                font-semibold
                leading-tight
              "
            >
              Get in Touch
            </h2>

            {/* Contact Details */}
            <div className="mt-4 space-y-3 text-[15px] text-white/95">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call us"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    transition
                    hover:bg-[#0794ce]
                  "
                >
                  <Phone size={14} />
                </a>

                <a
                  href="tel:+2330000000"
                  className="transition hover:text-cyan-300"
                >
                  +233 00 000 0000
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/23300000000"
                  aria-label="Message us on WhatsApp"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    transition
                    hover:bg-[#0794ce]
                  "
                >
                  <MessageCircle size={14} />
                </a>

                <a
                  href="https://wa.me/23300000000"
                  className="transition hover:text-cyan-300"
                >
                  WhatsApp
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:info@uenr.csi.edu.gh"
                className="
                  flex
                  items-center
                  gap-3
                  transition
                  hover:text-cyan-300
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                  "
                >
                  <Mail size={14} />
                </span>

                <span>info@uenr.csi.edu.gh</span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <span
                  className="
                    mt-0.5
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                  "
                >
                  <MapPin size={14} />
                </span>

                <span className="leading-5">
                  Sunyani-Berekum Road,
                  <br />
                  Fiapre, Sunyani
                </span>
              </div>
            </div>

            {/* =================================================
                ADMISSIONS
            ================================================= */}
            <h2
              className="
                mt-7
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-xl
                font-semibold
                leading-tight
              "
            >
              Admissions Call Center
            </h2>

            <div className="mt-3 space-y-3 text-[15px] text-white/95">
              {/* Phone */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call admissions"
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                    transition
                    hover:bg-[#0794ce]
                  "
                >
                  <Phone size={14} />
                </a>

                <a
                  href="tel:+2330000000"
                  className="transition hover:text-cyan-300"
                >
                  +233 00 000 0000
                </a>
              </div>

              {/* Email */}
              <a
                href="mailto:info@uenr.csi.edu.gh"
                className="
                  flex
                  items-center
                  gap-3
                  transition
                  hover:text-cyan-300
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-white/15
                  "
                >
                  <Mail size={14} />
                </span>

                <span>info@uenr.csi.edu.gh</span>
              </a>
            </div>
          </div>

          {/* =================================================
              COLUMN 2 — EXPLORE
          ================================================= */}
          <div>
            <h2
              className="
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-2xl
                font-semibold
              "
            >
              Explore
            </h2>

            <ul
              className="
                mt-5
                space-y-3
                text-[15px]
                font-medium
                text-white/90
              "
            >
              {[
                "About",
                "Programmes",
                "Research",
                "News & Events",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      transition
                      hover:text-cyan-300
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              COLUMN 3 — STUDENTS
          ================================================= */}
          <div>
            <h2
              className="
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-2xl
                font-semibold
              "
            >
              Students
            </h2>

            <ul
              className="
                mt-5
                space-y-3
                text-[15px]
                font-medium
                text-white/90
              "
            >
              {[
                "Student Portal",
                "Resources",
                "Academic Information",
                "Eligibility Checker",
                "FAQs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      transition
                      hover:text-cyan-300
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* =================================================
              COLUMN 4 — NEWSLETTER
          ================================================= */}
          <div>
            <h2
              className="
                font-[var(--font-display,'Space_Grotesk',sans-serif)]
                text-2xl
                font-semibold
                leading-tight
              "
            >
              Subscribe to Newsletter
            </h2>

            {/* Newsletter Form */}
            <form className="mt-5">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="
                  h-11
                  w-full
                  rounded-lg
                  border
                  border-white/20
                  bg-white/95
                  px-4
                  text-[15px]
                  text-slate-900
                  outline-none
                  placeholder:text-slate-500
                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

              <button
                type="submit"
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-lg
                  bg-[#0794ce]
                  text-[15px]
                  font-bold
                  text-white
                  transition
                  hover:bg-[#067eaf]
                "
              >
                Subscribe
              </button>
            </form>

            {/* =================================================
                SOCIAL MEDIA
            ================================================= */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(
                ({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-md
                      bg-white/90
                      text-[#07145c]
                      transition
                      hover:-translate-y-0.5
                      hover:bg-[#0794ce]
                      hover:text-white
                    "
                  >
                    <Icon size={16} />
                  </a>
                ),
              )}
            </div>

            {/* =================================================
                COPYRIGHT
            ================================================= */}
            <div
              className="
                mt-12
                text-[10px]
                leading-4
                text-white/75
              "
            >
              <p>
                © 2026 Computer Science & Informatics
                <br />
                Department. All rights reserved
              </p>

              <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Privacy Policy
                </a>

                <span>|</span>

                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  Terms
                </a>

                <span>|</span>

                <a
                  href="#"
                  className="transition hover:text-white"
                >
                  University Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;