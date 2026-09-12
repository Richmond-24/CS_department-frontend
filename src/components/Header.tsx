
import React from "react";
import { ChevronDown } from "lucide-react";

type HeaderProps = {
  onNavigate: (route: string, label: string) => void;
  activeRoute: string;
};

const newsMediaLinks = [
  { route: "#news", label: "News" },
  { route: "#gallery", label: "Gallery" },
  { route: "#events", label: "Event" },
  { route: "#announcements", label: "Updates and Announcements" },
];

const peopleLinks = [
  { route: "#people/teaching", label: "Teaching" },
  { route: "#people/non-teaching", label: "Non-Teaching" },
  { route: "#people/executives", label: "Executives" },
  { route: "#people/alumni", label: "Alumni" },
];

const Header: React.FC<HeaderProps> = ({
  onNavigate,
  activeRoute,
}) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openMobileSection, setOpenMobileSection] =
    React.useState<string | null>(null);

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

  const toggleMobileSection = (section: string) => {
    setOpenMobileSection((current) =>
      current === section ? null : section,
    );
  };

  const navLinkClasses = (route: string) =>
    `rounded-lg px-2.5 py-1.5 text-[18px] font-semibold transition-all duration-200 ${
      activeRoute === route
        ? "bg-[#e6f7ff] text-[#203b82]"
        : "text-[#080b50] hover:bg-[#e6f7ff] hover:text-[#203b82]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* =========================================================
          DESKTOP TOP BAR
          Hidden completely on mobile
      ========================================================== */}
      <div className="hidden bg-[#203b82] md:block">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-end px-6 lg:px-16">
          <nav className="flex items-center gap-8 text-[17px] font-semibold text-white">
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
            <div className="group relative z-50">
              <button
                type="button"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <span>News & Media</span>
                <ChevronDown size={16} />
              </button>

              <div className="invisible absolute right-0 top-full mt-2 w-56 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {newsMediaLinks.map(({ route, label }) => (
                  <a
                    key={route}
                    href={route}
                    onClick={(event) =>
                      handleNavigate(event, route, label)
                    }
                    className="block px-4 py-2.5 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              onClick={(event) =>
                handleNavigate(event, "#contact", "Contact")
              }
              className="transition-opacity hover:opacity-80"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================== */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[82px] w-full max-w-[1400px] items-center justify-between px-5 sm:px-6 md:h-[104px] lg:px-16">
          
          {/* LOGO */}
          <a
            href="#home"
            onClick={(event) =>
              handleNavigate(event, "#home", "Home")
            }
            className="flex shrink-0 items-center text-[24px] font-extrabold tracking-[-0.8px] text-[#080b50] transition-opacity hover:opacity-80 sm:text-[26px] md:text-[28px]"
          >
            CSI Logo
          </a>

          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
            <a
              href="#home"
              onClick={(event) =>
                handleNavigate(event, "#home", "Home")
              }
              className={navLinkClasses("#home")}
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(event) =>
                handleNavigate(event, "#about", "About")
              }
              className={navLinkClasses("#about")}
            >
              About
            </a>

            {/* Programmes */}
            <div className="group relative z-50">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[18px] font-semibold text-[#080b50] transition-all duration-200 hover:bg-[#e6f7ff] hover:text-[#203b82]"
              >
                <span>Programmes</span>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute left-0 top-full mt-2 w-48 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href="#programmes"
                  onClick={(event) =>
                    handleNavigate(
                      event,
                      "#programmes",
                      "Programmes",
                    )
                  }
                  className="block px-4 py-2.5 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff]"
                >
                  All Programmes
                </a>

                <a
                  href="#undergraduate"
                  onClick={(event) =>
                    handleNavigate(
                      event,
                      "#undergraduate",
                      "Undergraduate",
                    )
                  }
                  className="block px-4 py-2.5 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff]"
                >
                  Undergraduate
                </a>

                <a
                  href="#postgraduate"
                  onClick={(event) =>
                    handleNavigate(
                      event,
                      "#postgraduate",
                      "Postgraduate",
                    )
                  }
                  className="block px-4 py-2.5 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff]"
                >
                  Postgraduate
                </a>
              </div>
            </div>

            {/* People */}
            <div className="group relative z-50">
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[18px] font-semibold text-[#080b50] transition-all duration-200 hover:bg-[#e6f7ff] hover:text-[#203b82]"
              >
                <span>People</span>
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="invisible absolute left-0 top-full mt-2 w-48 translate-y-1 rounded-xl border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {peopleLinks.map(({ route, label }) => (
                  <a
                    key={route}
                    href={route}
                    onClick={(event) =>
                      handleNavigate(event, route, label)
                    }
                    className="block px-4 py-2.5 text-sm text-[#080b50] transition-colors hover:bg-[#e6f7ff]"
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
                handleNavigate(event, "#resources", "Resources")
              }
              className={navLinkClasses("#resources")}
            >
              Resources
            </a>
          </nav>

          {/* =====================================================
              MODERN MOBILE MENU BUTTON
          ====================================================== */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((current) => !current);

              if (mobileOpen) {
                setOpenMobileSection(null);
              }
            }}
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 hover:bg-slate-50 active:scale-95 md:hidden"
            aria-label={
              mobileOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={mobileOpen}
          >
            <span className="relative flex h-5 w-6 flex-col justify-between">
              {/* Top line */}
              <span
                className={`block h-[2px] w-6 origin-center rounded-full bg-[#080b50] transition-all duration-300 ease-out ${
                  mobileOpen
                    ? "translate-y-[9px] rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />

              {/* Middle line */}
              <span
                className={`block h-[2px] w-4 self-end rounded-full bg-[#203b82] transition-all duration-200 ${
                  mobileOpen
                    ? "w-6 opacity-0"
                    : "w-4 opacity-100"
                }`}
              />

              {/* Bottom line */}
              <span
                className={`block h-[2px] w-6 origin-center rounded-full bg-[#080b50] transition-all duration-300 ease-out ${
                  mobileOpen
                    ? "-translate-y-[9px] -rotate-45"
                    : "translate-y-0 rotate-0"
                }`}
              />
            </span>
          </button>
        </div>

        {/* =======================================================
            MOBILE NAVIGATION
        ======================================================== */}
        <div
          className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 ease-out md:hidden ${
            mobileOpen
              ? "max-h-[800px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-5 pb-6 pt-2">
            {/* Home */}
            <a
              href="#home"
              onClick={(event) =>
                handleNavigate(event, "#home", "Home")
              }
              className="flex items-center border-b border-slate-100 py-4 text-[17px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              Home
            </a>

            {/* About */}
            <a
              href="#about"
              onClick={(event) =>
                handleNavigate(event, "#about", "About")
              }
              className="flex items-center border-b border-slate-100 py-4 text-[17px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              About
            </a>

            {/* Programmes */}
            <div className="border-b border-slate-100">
              <button
                type="button"
                onClick={() =>
                  toggleMobileSection("programmes")
                }
                className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-[#080b50]"
                aria-expanded={
                  openMobileSection === "programmes"
                }
              >
                <span>Programmes</span>

                <ChevronDown
                  size={19}
                  className={`transition-transform duration-300 ${
                    openMobileSection === "programmes"
                      ? "rotate-180 text-[#203b82]"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openMobileSection === "programmes"
                    ? "grid-rows-[1fr] pb-3 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <a
                    href="#programmes"
                    onClick={(event) =>
                      handleNavigate(
                        event,
                        "#programmes",
                        "Programmes",
                      )
                    }
                    className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#e6f7ff] hover:text-[#080b50]"
                  >
                    All Programmes
                  </a>

                  <a
                    href="#undergraduate"
                    onClick={(event) =>
                      handleNavigate(
                        event,
                        "#undergraduate",
                        "Undergraduate",
                      )
                    }
                    className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#e6f7ff] hover:text-[#080b50]"
                  >
                    Undergraduate
                  </a>

                  <a
                    href="#postgraduate"
                    onClick={(event) =>
                      handleNavigate(
                        event,
                        "#postgraduate",
                        "Postgraduate",
                      )
                    }
                    className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#e6f7ff] hover:text-[#080b50]"
                  >
                    Postgraduate
                  </a>
                </div>
              </div>
            </div>

            {/* People */}
            <div className="border-b border-slate-100">
              <button
                type="button"
                onClick={() =>
                  toggleMobileSection("people")
                }
                className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-[#080b50]"
                aria-expanded={
                  openMobileSection === "people"
                }
              >
                <span>People</span>

                <ChevronDown
                  size={19}
                  className={`transition-transform duration-300 ${
                    openMobileSection === "people"
                      ? "rotate-180 text-[#203b82]"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openMobileSection === "people"
                    ? "grid-rows-[1fr] pb-3 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  {peopleLinks.map(({ route, label }) => (
                    <a
                      key={route}
                      href={route}
                      onClick={(event) =>
                        handleNavigate(event, route, label)
                      }
                      className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#e6f7ff] hover:text-[#080b50]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Resources */}
            <a
              href="#resources"
              onClick={(event) =>
                handleNavigate(event, "#resources", "Resources")
              }
              className="flex items-center border-b border-slate-100 py-4 text-[17px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              Resources
            </a>

            {/* News & Media */}
            <div className="border-b border-slate-100">
              <button
                type="button"
                onClick={() =>
                  toggleMobileSection("news-media")
                }
                className="flex w-full items-center justify-between py-4 text-left text-[17px] font-semibold text-[#080b50]"
                aria-expanded={
                  openMobileSection === "news-media"
                }
              >
                <span>News & Media</span>

                <ChevronDown
                  size={19}
                  className={`transition-transform duration-300 ${
                    openMobileSection === "news-media"
                      ? "rotate-180 text-[#203b82]"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openMobileSection === "news-media"
                    ? "grid-rows-[1fr] pb-3 opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  {newsMediaLinks.map(({ route, label }) => (
                    <a
                      key={route}
                      href={route}
                      onClick={(event) =>
                        handleNavigate(event, route, label)
                      }
                      className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-[#e6f7ff] hover:text-[#080b50]"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Research + Contact */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href="#research"
                onClick={(event) =>
                  handleNavigate(
                    event,
                    "#research",
                    "Research & Innovation",
                  )
                }
                className="rounded-xl bg-[#e6f7ff] px-4 py-3 text-center text-sm font-semibold text-[#203b82] transition-colors hover:bg-[#d8f1fc]"
              >
                Research
              </a>

              <a
                href="#contact"
                onClick={(event) =>
                  handleNavigate(event, "#contact", "Contact")
                }
                className="rounded-xl bg-[#080b50] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#203b82]"
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
