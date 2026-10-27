"use client";

import { useEffect, useState, useRef } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Globe,
  X,
} from "lucide-react";

const InstagramMark = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedinMark = ({ size = 18 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.3 9.5h3.8v11H3.3v-11Zm6.1 0H13v1.5h.1c.5-.9 1.7-1.9 3.5-1.9 3.8 0 4.5 2.5 4.5 5.7v5.7h-3.8v-5.1c0-1.2 0-2.8-1.8-2.8s-2.1 1.3-2.1 2.7v5.2H9.4v-11Z" />
  </svg>
);

// --- Custom Hook for Scroll Animations ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
  { label: "Website", icon: Globe, href: "https://www.uenr.edu.gh" },
  { label: "Instagram", icon: InstagramMark, href: "https://www.instagram.com" },
  { label: "LinkedIn", icon: LinkedinMark, href: "https://www.linkedin.com" },
  { label: "X", icon: X, href: "https://x.com" },
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

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-10">
          
          {/* Column 1: Contact Info */}
          <div
            className={`col-span-2 transform transition-all duration-700 ease-out md:col-span-1 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-[14px] sm:text-[16px] font-bold uppercase leading-5 tracking-wide text-white">
              Computer Science
              <br />
              and Informatics
            </h3>

            <h2 className="mt-3 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-lg font-semibold leading-tight sm:mt-5 sm:text-2xl">
              Get in Touch
            </h2>

            <div className="mt-3 space-y-2 text-sm text-white/95 sm:mt-4 sm:space-y-3 sm:text-[15px]">
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

            <h2 className="mt-5 font-[var(--font-display,'Space_Grotesk',sans-serif)] text-base font-semibold leading-tight sm:mt-7 sm:text-xl">
              Admissions Call Center
            </h2>

            <div className="mt-2 space-y-2 text-sm text-white/95 sm:mt-3 sm:space-y-3 sm:text-[15px]">
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
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-xl sm:text-2xl font-semibold">
              Explore
            </h2>

            <ul className="mt-3 space-y-2 text-sm font-medium text-white/90 sm:mt-5 sm:space-y-3 sm:text-[15px]">
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
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-xl sm:text-2xl font-semibold">
              Students
            </h2>

            <ul className="mt-3 space-y-2 text-sm font-medium text-white/90 sm:mt-5 sm:space-y-3 sm:text-[15px]">
              {[
                { label: 'Student Portal', href: 'https://sis.uenr.edu.gh' },
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

          {/* Column 4: Socials & Copyright */}
          <div
            className={`col-span-2 transform transition-all duration-700 ease-out md:col-span-1 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h2 className="font-[var(--font-display,'Space_Grotesk',sans-serif)] text-xl font-semibold leading-tight sm:text-2xl">
              Connect With Us
            </h2>

            {/* Social Media Icons */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg shadow-black/10 backdrop-blur-sm transition duration-200 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-blue-600 hover:shadow-cyan-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Copyright & Legal Links */}
            <div className="mt-6 text-[10px] leading-4 text-white/75 sm:mt-12">
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
