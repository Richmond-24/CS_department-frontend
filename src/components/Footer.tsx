"use client";

import { useEffect, useState, useRef } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Camera,
  BriefcaseBusiness,
  Send,
} from "lucide-react";

// --- Custom Hook for Scroll Animations ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing once visible to save resources
          // observer.disconnect(); 
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

const socialLinks = [
  { label: "Facebook", icon: Camera, href: "https://www.facebook.com" },
  { label: "Instagram", icon: Camera, href: "https://www.instagram.com" },
  { label: "LinkedIn", icon: BriefcaseBusiness, href: "https://www.linkedin.com" },
  { label: "X", icon: Send, href: "https://x.com" },
];

const Footer = () => {
  // Hook to trigger animation when footer enters viewport
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <footer 
      ref={ref}
      className="relative overflow-hidden bg-[#07145c] font-[var(--font-body,Inter,sans-serif)] text-white transition-all duration-1000 ease-out"
    >
      {/* Background Image & Overlays */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: "url('/u.webp')" }}
      />
      <div className="absolute inset-0 bg-[#07145c]/65" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07145c]/75 via-[#07145c]/55 to-[#07145c]/70" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          
          {/* Column 1: Contact Info */}
          <div 
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-[16px] font-bold uppercase leading-5 tracking-wide text-white">
              Computer Science
              <br />
              and Informatics
            </h3>

            <h2 className="mt-5 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-semibold leading-tight">
              Get in Touch
            </h2>

            <div className="mt-4 space-y-3 text-[15px] text-white/95">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call us"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-[#0794ce]"
                >
                  <Phone size={14} />
                </a>
                <a href="tel:+2330000000" className="transition hover:text-cyan-300">
                  +233 00 000 0000
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/23300000000"
                  aria-label="Message us on WhatsApp"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-[#0794ce]"
                >
                  <MessageCircle size={14} />
                </a>
                <a href="https://wa.me/23300000000" className="transition hover:text-cyan-300">
                  WhatsApp
                </a>
              </div>

              <a href="mailto:info@uenr.csi.edu.gh" className="flex items-center gap-3 transition hover:text-cyan-300">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Mail size={14} />
                </span>
                <span>info@uenr.csi.edu.gh</span>
              </a>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <MapPin size={14} />
                </span>
                <span className="leading-5">
                  Sunyani-Berekum Road,
                  <br />
                  Fiapre, Sunyani
                </span>
              </div>
            </div>

            <h2 className="mt-7 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-xl font-semibold leading-tight">
              Admissions Call Center
            </h2>

            <div className="mt-3 space-y-3 text-[15px] text-white/95">
              <div className="flex items-center gap-3">
                <a
                  href="tel:+2330000000"
                  aria-label="Call admissions"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-[#0794ce]"
                >
                  <Phone size={14} />
                </a>
                <a href="tel:+2330000000" className="transition hover:text-cyan-300">
                  +233 00 000 0000
                </a>
              </div>

              <a href="mailto:info@uenr.csi.edu.gh" className="flex items-center gap-3 transition hover:text-cyan-300">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Mail size={14} />
                </span>
                <span>info@uenr.csi.edu.gh</span>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div 
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-semibold">
              Explore
            </h2>

            <ul className="mt-5 space-y-3 text-[15px] font-medium text-white/90">
              {[
                { label: 'About', href: '#about' },
                { label: 'Programmes', href: '#programmes' },
                { label: 'Research', href: '#research' },
                { label: 'News & Events', href: '#news' },
                { label: 'Careers', href: '#careers' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-cyan-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Students */}
          <div 
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-semibold">
              Students
            </h2>

            <ul className="mt-5 space-y-3 text-[15px] font-medium text-white/90">
              {[
                { label: 'Student Portal', href: '#home' },
                { label: 'Resources', href: '#resources' },
                { label: 'Academic Information', href: '#programmes' },
                { label: 'Eligibility Checker', href: '#eligibility-checker' },
                { label: 'FAQs', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition hover:text-cyan-300">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <div 
            className={`transform transition-all duration-700 ease-out ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-2xl font-semibold leading-tight">
              Subscribe to Newsletter
            </h2>

            <form className="mt-5">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="h-11 w-full rounded-lg border border-white/20 bg-white/95 px-4 text-[15px] text-slate-900 outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="submit"
                className="mt-2 h-11 w-full rounded-lg bg-[#0794ce] text-[15px] font-bold text-white transition hover:bg-[#067eaf]"
              >
                Subscribe
              </button>
            </form>

            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-white/90 text-[#07145c] transition hover:-translate-y-0.5 hover:bg-[#0794ce] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="mt-12 text-[10px] leading-4 text-white/75">
              <p>
                © 2026 Computer Science & Informatics
                <br />
                Department. All rights reserved
              </p>

              <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                <a href="#about" className="transition hover:text-white">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="#resources" className="transition hover:text-white">
                  Terms
                </a>
                <span>|</span>
                <a href="#home" className="transition hover:text-white">
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