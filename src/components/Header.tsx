import React from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";

type HeaderProps = {
  onNavigate: (route: string, label: string) => void;
  activeRoute: string;
};


/* =========================================================
   NAVIGATION DATA
========================================================= */

const newsMediaLinks = [
  { route: "#news", label: "News" },
  { route: "#gallery", label: "Gallery" },
  { route: "#events", label: "Events" },
  { route: "#announcements", label: "Updates & Announcements" },
];

const peopleLinks = [
  { route: "#people/teaching", label: "Teaching Staff" },
  { route: "#people/non-teaching", label: "Non-Teaching Staff" },
  { route: "#people/executives", label: "Executives" },
  { route: "#people/alumni", label: "Alumni" },
];

const programmeLinks = [
  { route: "#programmes", label: "All Programmes" },
  { route: "#undergraduate", label: "Undergraduate" },
  { route: "#postgraduate", label: "Postgraduate" },
];


/* =========================================================
   HEADER
========================================================= */

const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeRoute,
}) => {

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openMobileSection, setOpenMobileSection] =
    React.useState<string | null>(null);


  /* =======================================================
     PREVENT PAGE SCROLL WHEN MOBILE MENU IS OPEN
  ======================================================= */

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


  /* =======================================================
     ESC KEY CLOSE
  ======================================================= */

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
        setOpenMobileSection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);


  /* =======================================================
     NAVIGATION HANDLER
  ======================================================= */

  const handleNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    route: string,
    label: string,
  ) => {
    event.preventDefault();

    onNavigate(route, label);

    setMobileOpen(false);
    setOpenMobileSection(null);
  };


  /* =======================================================
     TOGGLE MOBILE DROPDOWN
  ======================================================= */

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((current) =>
      current === section ? null : section,
    );
  };


  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMobileSection(null);
  };


  /* =======================================================
     DESKTOP NAV LINK
  ======================================================= */

  const navLinkClasses = (route: string) =>
    `rounded-xl px-3 py-2 text-[17px] font-semibold transition-all duration-200 ${
      activeRoute === route
        ? "bg-[#e6f7ff] text-[#203b82]"
        : "text-[#080b50] hover:bg-[#e6f7ff] hover:text-[#203b82]"
    }`;


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <header className="sticky top-0 z-[100] w-full bg-white">

      {/* =====================================================
          DESKTOP TOP BAR
      ===================================================== */}

      <div className="hidden bg-[#203b82] md:block">

        <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-end px-6 lg:px-16">

          <nav className="flex items-center gap-8 text-[16px] font-semibold text-white">

            {/* Clubs */}
            <a
              href="#clubs"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#clubs",
                  "Clubs",
                )
              }
              className={`transition-opacity hover:opacity-80 ${
                activeRoute === "#clubs"
                  ? "font-bold text-[#dfeeff]"
                  : ""
              }`}
            >
              Clubs
            </a>
            {/* Research */}
            <a
              href="#research"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#research",
                  "Research & Innovation",
                )
              }
              className={`transition-opacity hover:opacity-80 ${
                activeRoute === "#research"
                  ? "font-bold text-[#dfeeff]"
                  : ""
              }`}
            >
              Research & Innovation
            </a>


            {/* News & Media */}
            <div className="group relative z-100">

              <button
                type="button"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <span>News & Media</span>

                <ChevronDown
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>


              <div className="invisible absolute right-0 top-full mt-2 w-60 translate-y-2 rounded-2xl border border-slate-200 bg-white py-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {newsMediaLinks.map(({ route, label }) => (
                  <a
                    key={route}
                    href={route}
                    onClick={(event) =>
                      handleNavigate(event, route, label)
                    }
                    className="block px-5 py-3 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff] hover:text-[#203b82]"
                  >
                    {label}
                  </a>
                ))}

              </div>

            </div>


            {/* Contact */}
            <a
              href="#contact"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#contact",
                  "Contact",
                )
              }
              className="transition-opacity hover:opacity-80"
            >
              Contact
            </a>

          </nav>

        </div>

      </div>



      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <div className="relative border-b border-gray-100 bg-white">

        <div className="mx-auto flex h-[82px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-6 md:h-[104px] lg:px-16">


          {/* =================================================
              LOGO
          ================================================= */}

          <a
            href="#home"
            onClick={(event) =>
              handleNavigate(
                event,
                "#home",
                "Home",
              )
            }
            className="relative z-[120] flex shrink-0 items-center text-[25px] font-extrabold tracking-[-0.8px] text-[#080b50] transition-opacity hover:opacity-80 sm:text-[27px] md:text-[29px]"
          >
            CSI Logo
          </a>



          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <nav className="hidden items-center gap-3 md:flex lg:gap-5">


            {/* Home */}
            <a
              href="#home"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#home",
                  "Home",
                )
              }
              className={navLinkClasses("#home")}
            >
              Home
            </a>


            {/* About */}
            <a
              href="#about"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#about",
                  "About",
                )
              }
              className={navLinkClasses("#about")}
            >
              About
            </a>


            {/* =================================================
                PROGRAMMES
            ================================================= */}

            <div className="group relative z-50">

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[17px] font-semibold text-[#080b50] transition-all duration-200 hover:bg-[#e6f7ff] hover:text-[#203b82]"
              >

                <span>Programmes</span>

                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />

              </button>


              <div className="invisible absolute left-0 top-full mt-2 w-52 translate-y-2 rounded-2xl border border-slate-200 bg-white py-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {programmeLinks.map(({ route, label }) => (
                  <a
                    key={route}
                    href={route}
                    onClick={(event) =>
                      handleNavigate(
                        event,
                        route,
                        label,
                      )
                    }
                    className="block px-5 py-3 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff] hover:text-[#203b82]"
                  >
                    {label}
                  </a>
                ))}

              </div>

            </div>



            {/* =================================================
                PEOPLE
            ================================================= */}

            <div className="group relative z-50">

              <button
                type="button"
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[17px] font-semibold text-[#080b50] transition-all duration-200 hover:bg-[#e6f7ff] hover:text-[#203b82]"
              >

                <span>People</span>

                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />

              </button>


              <div className="invisible absolute left-0 top-full mt-2 w-52 translate-y-2 rounded-2xl border border-slate-200 bg-white py-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">

                {peopleLinks.map(({ route, label }) => (
                  <a
                    key={route}
                    href={route}
                    onClick={(event) =>
                      handleNavigate(
                        event,
                        route,
                        label,
                      )
                    }
                    className="block px-5 py-3 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff] hover:text-[#203b82]"
                  >
                    {label}
                  </a>
                ))}

              </div>

            </div>



            {/* Resources */}
            <a
              href="#resources"
              onClick={(event) =>
                handleNavigate(
                  event,
                  "#resources",
                  "Resources",
                )
              }
              className={navLinkClasses("#resources")}
            >
              Resources
            </a>

          </nav>



          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);

              if (mobileOpen) {
                setOpenMobileSection(null);
              }
            }}
            className="group relative z-[120] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-50 transition-all duration-200 hover:bg-[#e6f7ff] active:scale-90 md:hidden"
            aria-label={
              mobileOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >

            <span className="relative flex h-6 w-7 flex-col justify-between">

              {/* TOP */}
              <span
                className={`absolute left-0 top-[2px] block h-[2.5px] w-7 origin-center rounded-full bg-[#080b50] transition-all duration-300 ease-[cubic-bezier(.68,-.6,.32,1.6)] ${
                  mobileOpen
                    ? "top-[11px] rotate-45"
                    : ""
                }`}
              />


              {/* MIDDLE */}
              <span
                className={`absolute left-0 top-[11px] block h-[2.5px] rounded-full bg-[#203b82] transition-all duration-200 ${
                  mobileOpen
                    ? "w-0 opacity-0"
                    : "w-5"
                }`}
              />


              {/* BOTTOM */}
              <span
                className={`absolute left-0 top-[20px] block h-[2.5px] w-7 origin-center rounded-full bg-[#080b50] transition-all duration-300 ease-[cubic-bezier(.68,-.6,.32,1.6)] ${
                  mobileOpen
                    ? "top-[11px] -rotate-45"
                    : ""
                }`}
              />

            </span>

          </button>

        </div>



        {/* =====================================================
            MOBILE FULL-SCREEN MENU
        ===================================================== */}

        <div
          className={`fixed inset-0 z-[110] bg-[#080b50] md:hidden ${
            mobileOpen
              ? "pointer-events-auto visible"
              : "pointer-events-none invisible"
          }`}
        >


          {/* =================================================
              BACKDROP / GLOW
          ================================================= */}

          <div
            onClick={closeMobileMenu}
            className={`absolute inset-0 bg-[#080b50] transition-opacity duration-500 ${
              mobileOpen
                ? "opacity-100"
                : "opacity-0"
            }`}
          >

            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#203b82]/40 blur-3xl" />

            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#078bc5]/20 blur-3xl" />

          </div>



          {/* =================================================
              MENU PANEL
          ================================================= */}

          <div
            className={`relative h-full w-full overflow-y-auto bg-[#080b50] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
              mobileOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-8 opacity-0"
            }`}
          >


            {/* =================================================
                MOBILE MENU HEADER
            ================================================= */}

            <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-5">


              <button
                type="button"
                onClick={closeMobileMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:bg-white/10 active:scale-90"
                aria-label="Close navigation"
              >

                <span className="relative h-5 w-5">

                  <span className="absolute left-0 top-1/2 h-[2px] w-5 rotate-45 rounded-full bg-white" />

                  <span className="absolute left-0 top-1/2 h-[2px] w-5 -rotate-45 rounded-full bg-white" />

                </span>

              </button>

            </div>



            {/* =================================================
                MENU CONTENT
            ================================================= */}

            <nav className="px-5 pb-10 pt-5">


              {/* =================================================
                  HOME
              ================================================= */}

              <a
                href="#home"
                onClick={(event) =>
                  handleNavigate(
                    event,
                    "#home",
                    "Home",
                  )
                }
                className={`group flex items-center justify-between border-b border-white/10 py-5 text-[26px] font-semibold tracking-[-0.5px] transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-5 opacity-0"
                } ${
                  activeRoute === "#home"
                    ? "text-[#55c8f2]"
                    : "text-white"
                }`}
              >

                <span>Home</span>

                <ArrowUpRight
                  size={22}
                  className="opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>



              {/* =================================================
                  ABOUT
              ================================================= */}

              <a
                href="#about"
                onClick={(event) =>
                  handleNavigate(
                    event,
                    "#about",
                    "About",
                  )
                }
                className={`group flex items-center justify-between border-b border-white/10 py-5 text-[26px] font-semibold tracking-[-0.5px] text-white transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100 delay-75"
                    : "-translate-x-5 opacity-0"
                }`}
              >

                <span>About</span>

                <ArrowUpRight
                  size={22}
                  className="opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>



              {/* =================================================
                  PROGRAMMES
              ================================================= */}

              <div
                className={`border-b border-white/10 transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100 delay-100"
                    : "-translate-x-5 opacity-0"
                }`}
              >

                <button
                  type="button"
                  onClick={() =>
                    toggleMobileSection("programmes")
                  }
                  className="flex w-full items-center justify-between py-5 text-left text-[26px] font-semibold tracking-[-0.5px] text-white"
                  aria-expanded={
                    openMobileSection === "programmes"
                  }
                >

                  <span>Programmes</span>

                  <ChevronDown
                    size={25}
                    className={`transition-transform duration-300 ${
                      openMobileSection === "programmes"
                        ? "rotate-180 text-[#55c8f2]"
                        : "text-white/60"
                    }`}
                  />

                </button>


                {/* Dropdown */}
                <div
                  className={`grid transition-all duration-400 ${
                    openMobileSection === "programmes"
                      ? "grid-rows-[1fr] pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >

                  <div className="overflow-hidden pl-2">

                    {programmeLinks.map(
                      ({ route, label }, index) => (

                        <a
                          key={route}
                          href={route}
                          onClick={(event) =>
                            handleNavigate(
                              event,
                              route,
                              label,
                            )
                          }
                          className="group flex items-center justify-between rounded-xl px-4 py-3 text-base text-white/60 transition-all hover:bg-white/5 hover:text-white"
                          style={{
                            transitionDelay:
                              openMobileSection ===
                              "programmes"
                                ? `${index * 50}ms`
                                : "0ms",
                          }}
                        >

                          <span>{label}</span>

                          <ArrowUpRight
                            size={16}
                            className="opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          />

                        </a>

                      ),
                    )}

                  </div>

                </div>

              </div>



              {/* =================================================
                  PEOPLE
              ================================================= */}

              <div
                className={`border-b border-white/10 transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100 delay-150"
                    : "-translate-x-5 opacity-0"
                }`}
              >

                <button
                  type="button"
                  onClick={() =>
                    toggleMobileSection("people")
                  }
                  className="flex w-full items-center justify-between py-5 text-left text-[26px] font-semibold tracking-[-0.5px] text-white"
                  aria-expanded={
                    openMobileSection === "people"
                  }
                >

                  <span>People</span>

                  <ChevronDown
                    size={25}
                    className={`transition-transform duration-300 ${
                      openMobileSection === "people"
                        ? "rotate-180 text-[#55c8f2]"
                        : "text-white/60"
                    }`}
                  />

                </button>


                {/* Dropdown */}
                <div
                  className={`grid transition-all duration-400 ${
                    openMobileSection === "people"
                      ? "grid-rows-[1fr] pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >

                  <div className="overflow-hidden pl-2">

                    {peopleLinks.map(
                      ({ route, label }, index) => (

                        <a
                          key={route}
                          href={route}
                          onClick={(event) =>
                            handleNavigate(
                              event,
                              route,
                              label,
                            )
                          }
                          className="group flex items-center justify-between rounded-xl px-4 py-3 text-base text-white/60 transition-all hover:bg-white/5 hover:text-white"
                          style={{
                            transitionDelay:
                              openMobileSection ===
                              "people"
                                ? `${index * 50}ms`
                                : "0ms",
                          }}
                        >

                          <span>{label}</span>

                          <ArrowUpRight
                            size={16}
                            className="opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          />

                        </a>

                      ),
                    )}

                  </div>

                </div>

              </div>



              {/* =================================================
                  RESOURCES
              ================================================= */}

              <a
                href="#resources"
                onClick={(event) =>
                  handleNavigate(
                    event,
                    "#resources",
                    "Resources",
                  )
                }
                className={`group flex items-center justify-between border-b border-white/10 py-5 text-[26px] font-semibold tracking-[-0.5px] text-white transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100 delay-200"
                    : "-translate-x-5 opacity-0"
                }`}
              >

                <span>Resources</span>

                <ArrowUpRight
                  size={22}
                  className="opacity-50 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />

              </a>



              {/* =================================================
                  NEWS & MEDIA
              ================================================= */}

              <div
                className={`border-b border-white/10 transition-all duration-300 ${
                  mobileOpen
                    ? "translate-x-0 opacity-100 delay-250"
                    : "-translate-x-5 opacity-0"
                }`}
              >

                <button
                  type="button"
                  onClick={() =>
                    toggleMobileSection("news-media")
                  }
                  className="flex w-full items-center justify-between py-5 text-left text-[26px] font-semibold tracking-[-0.5px] text-white"
                  aria-expanded={
                    openMobileSection === "news-media"
                  }
                >

                  <span>News & Media</span>

                  <ChevronDown
                    size={25}
                    className={`transition-transform duration-300 ${
                      openMobileSection === "news-media"
                        ? "rotate-180 text-[#55c8f2]"
                        : "text-white/60"
                    }`}
                  />

                </button>


                {/* Dropdown */}
                <div
                  className={`grid transition-all duration-400 ${
                    openMobileSection === "news-media"
                      ? "grid-rows-[1fr] pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >

                  <div className="overflow-hidden pl-2">

                    {newsMediaLinks.map(
                      ({ route, label }, index) => (

                        <a
                          key={route}
                          href={route}
                          onClick={(event) =>
                            handleNavigate(
                              event,
                              route,
                              label,
                            )
                          }
                          className="group flex items-center justify-between rounded-xl px-4 py-3 text-base text-white/60 transition-all hover:bg-white/5 hover:text-white"
                          style={{
                            transitionDelay:
                              openMobileSection ===
                              "news-media"
                                ? `${index * 50}ms`
                                : "0ms",
                          }}
                        >

                          <span>{label}</span>

                          <ArrowUpRight
                            size={16}
                            className="opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                          />

                        </a>

                      ),
                    )}

                  </div>

                </div>

              </div>



              {/* =================================================
                  BOTTOM ACTION BUTTONS
              ================================================= */}

              <div
                className={`mt-8 grid grid-cols-2 gap-3 transition-all duration-500 ${
                  mobileOpen
                    ? "translate-y-0 opacity-100 delay-300"
                    : "translate-y-5 opacity-0"
                }`}
              >
                {/* Clubs */}
                    <a
                      href="#clubs"
                      onClick={(event) =>
                        handleNavigate(
                          event,
                          "#clubs",
                          "Clubs",
                        )
                      }
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                    >
                      Clubs
                    </a>

                {/* Research */}
                <a
                  href="#research"
                  onClick={(event) =>
                    handleNavigate(
                      event,
                      "#research",
                      "Research & Innovation",
                    )
                  }
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  Research
                </a>


                {/* Contact */}
                <a
                  href="#contact"
                  onClick={(event) =>
                    handleNavigate(
                      event,
                      "#contact",
                      "Contact",
                    )
                  }
                  className="rounded-2xl bg-[#078bc5] px-4 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-[#078bc5]/20 transition-all hover:bg-[#0679aa] active:scale-[0.98]"
                >
                  Contact Us
                </a>

              </div>



              {/* =================================================
                  FOOTER TEXT
              ================================================= */}

              <div
                className={`mt-10 border-t border-white/10 pt-6 transition-all duration-500 ${
                  mobileOpen
                    ? "opacity-100 delay-500"
                    : "opacity-0"
                }`}
              >

                <p className="text-xs leading-5 text-white/40">
                  Department of Computer Science & Informatics
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Academic • Research • Innovation
                </p>

              </div>

            </nav>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;