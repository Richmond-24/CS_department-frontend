import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  Camera,
  BriefcaseBusiness,
  Send,
} from "lucide-react";

/**
 * Fonts
 * -----
 * Headings use Space Grotesk — a geometric, slightly technical display face
 * that fits a Computer Science & Informatics department without reaching
 * for a generic institutional serif. Body copy stays on Inter for
 * legibility at small sizes. Add both once at the app root (e.g. in
 * `app/layout.tsx` via `next/font/google`, or a <link> in <head>) and expose
 * them as CSS variables:
 *
 *   --font-display: "Space Grotesk", sans-serif;
 *   --font-body: "Inter", sans-serif;
 *
 * This file references them as font-display / font-body below.
 */

const socialLinks = [
  { label: "Facebook", icon: Globe, href: "#" },
  { label: "Instagram", icon: Camera, href: "#" },
  { label: "LinkedIn", icon: BriefcaseBusiness, href: "#" },
  { label: "X", icon: Send, href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0b1255] font-[var(--font-body,Inter,sans-serif)] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/footer-bg.jpg')",
        }}
      />
      <div className="absolute inset-0 bg-[#0b1255]/95" />

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-12 lg:px-12">
        {/* Campus image banner */}
        <div className="relative mb-12 aspect-[21/8] w-full overflow-hidden rounded-2xl md:aspect-[21/6]">
          <img
            src="/images/campus.jpg"
            alt="University of Energy and Natural Resources, Fiapre campus"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1255] via-[#0b1255]/10 to-transparent" />
          <p className="absolute bottom-4 left-5 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-sm font-medium tracking-wide text-white/90">
            Fiapre Campus, Sunyani
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Contact */}
          <div>
            <h3 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-[15px] font-semibold leading-5 tracking-wide text-white/70">
              Computer Science
              <br />
              and Informatics
            </h3>

            <h2 className="mt-6 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-[26px] font-medium leading-tight">
              Get in touch
            </h2>

            <div className="mt-4 space-y-3 text-[16px]">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call us"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-[#0794ce] hover:text-white"
                >
                  <Phone size={15} />
                </a>
                <a
                  href="https://wa.me/23300000000"
                  aria-label="Message us on WhatsApp"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-[#0794ce] hover:text-white"
                >
                  <MessageCircle size={15} />
                </a>
                <span>+233 00 000 0000</span>
              </div>

              <a
                href="mailto:info@uenr.csi.edu.gh"
                className="flex items-center gap-3 transition hover:text-[#4cc6f0]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={15} />
                </span>
                <span>info@uenr.csi.edu.gh</span>
              </a>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin size={15} />
                </span>
                <span className="leading-5">
                  Sunyani-Berekum Road,
                  <br />
                  Fiapre, Sunyani
                </span>
              </div>
            </div>

            {/* Admissions */}
            <h2 className="mt-6 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-[22px] font-medium leading-tight">
              Admissions call center
            </h2>

            <div className="mt-3 space-y-3 text-[16px]">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call admissions"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-[#0794ce] hover:text-white"
                >
                  <Phone size={15} />
                </a>
                <a
                  href="https://wa.me/23300000000"
                  aria-label="Message admissions on WhatsApp"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-[#0794ce] hover:text-white"
                >
                  <MessageCircle size={15} />
                </a>
                <span>+233 00 000 0000</span>
              </div>

              <a
                href="mailto:info@uenr.csi.edu.gh"
                className="flex items-center gap-3 transition hover:text-[#4cc6f0]"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={15} />
                </span>
                <span>info@uenr.csi.edu.gh</span>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-medium">
              Explore
            </h2>

            <ul className="mt-4 space-y-2 text-[17px] text-white/85">
              {["About", "Programmes", "Research", "News & Events", "Careers"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition hover:text-[#4cc6f0]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Students */}
          <div>
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-medium">
              Students
            </h2>

            <ul className="mt-4 space-y-2 text-[17px] text-white/85">
              {["Student Portal", "Resources", "Academic Information", "Eligibility Checker", "FAQs"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="transition hover:text-[#4cc6f0]">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-medium">
              Subscribe to newsletter
            </h2>

            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter email address"
                className="h-12 w-full rounded-xl border-none bg-[#e7f7fc] px-4 text-[17px] text-[#080d4f] outline-none placeholder:text-[#7a86a9]"
              />
              <button
                type="submit"
                className="mt-2 h-14 w-full rounded-xl bg-[#0794ce] text-lg font-bold transition hover:bg-[#067eaf]"
              >
                Subscribe
              </button>
            </form>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90 transition hover:-translate-y-0.5 hover:border-[#0794ce] hover:bg-[#0794ce] hover:text-white"
                >
                  {Icon ? <Icon size={18} /> : <span className="text-lg font-medium">𝕏</span>}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="mt-24 text-xs leading-5 text-white/60">
              <p>
                © 2026 Computer Science & Informatics
                <br />
                Department. All rights reserved
              </p>

              <p className="mt-2 space-x-1">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-white">Terms</a>
                <span>|</span>
                <a href="#" className="hover:text-white">University Website</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;