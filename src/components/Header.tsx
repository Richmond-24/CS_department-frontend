
import React from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="w-full bg-white">
    
      {/* color designs for the header */}
      <div className="bg-[#203b82]">
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-end px-6 lg:px-16">
          <nav className="hidden items-center gap-8 tex t-[17px] font-semibold text-white md:flex">
            <a
              href="#research"
              className="transition-opacity hover:opacity-80"
            >
              Research & Innovation
            </a>

            <button
              type="button"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <span>News & Media</span>
              <ChevronDown size={18} strokeWidth={2} />
            </button>

            <a
              href="#contact"
              className="transition-opacity hover:opacity-80"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>

      {/* ================= MAIN NAVIGATION ================= */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex h-[112px] max-w-[1400px] items-center justify-between px-6 lg:px-16">
          
          {/* LOGO */}
          <a
            href="/"
            className="text-[28px] font-extrabold tracking-[-1px] text-[#080b50]"
          >
            CSI Logo
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-9 md:flex">
            
            <a
              href="/"
              className="text-[19px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              Home
            </a>

            <a
              href="/about"
              className="text-[19px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              About
            </a>

            {/* PROGRAMMES */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-[19px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              <span>Programmes</span>
              <ChevronDown size={19} strokeWidth={2} />
            </button>

            {/* PEOPLE */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-[19px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              <span>People</span>
              <ChevronDown size={19} strokeWidth={2} />
            </button>

            {/* RESOURCES */}
            <button
              type="button"
              className="flex items-center gap-1.5 text-[19px] font-semibold text-[#080b50] transition-colors hover:text-[#203b82]"
            >
              <span>Resources</span>
              <ChevronDown size={19} strokeWidth={2} />
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-[#080b50] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* ================= MOBILE NAV ================= */}
        {mobileOpen && (
          <div className="border-t border-gray-100 bg-white px-6 pb-6 md:hidden">
            <nav className="flex flex-col">
              <a
                href="/"
                className="border-b border-gray-100 py-4 text-lg font-semibold text-[#080b50]"
              >
                Home
              </a>

              <a
                href="/about"
                className="border-b border-gray-100 py-4 text-lg font-semibold text-[#080b50]"
              >
                About
              </a>

              <button
                type="button"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-left text-lg font-semibold text-[#080b50]"
              >
                Programmes
                <ChevronDown size={20} />
              </button>

              <button
                type="button"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-left text-lg font-semibold text-[#080b50]"
              >
                People
                <ChevronDown size={20} />
              </button>

              <button
                type="button"
                className="flex items-center justify-between border-b border-gray-100 py-4 text-left text-lg font-semibold text-[#080b50]"
              >
                Resources
                <ChevronDown size={20} />
              </button>

              {/* MOBILE TOP LINKS */}
              <div className="mt-4 flex flex-col gap-4">
                <a
                  href="#research"
                  className="text-base font-semibold text-[#203b82]"
                >
                  Research & Innovation
                </a>

                <a
                  href="#news"
                  className="text-base font-semibold text-[#203b82]"
                >
                  News & Media
                </a>

                <a
                  href="#contact"
                  className="text-base font-semibold text-[#203b82]"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;