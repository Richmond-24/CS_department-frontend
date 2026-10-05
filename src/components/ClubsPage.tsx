import { useState } from "react";
import { ArrowRight, ChevronDown, User } from "lucide-react";

// ===========================================================================
// CONFIG — wire these later
// ===========================================================================

/** Google Form URL for club registration. Swap in the real form link when ready. */
const REGISTER_URL = "#";

/** Served straight from /public, so this is a plain root-relative path, not an import. */
const HERO_IMAGE = "/clubs_hero.jpg";

// ===========================================================================
// CLUB DATA — content taken directly from the Figma design
// ===========================================================================

interface Club {
  key: string;
  name: string;
  description: string[];
  skills: string[];
  patron: string;
}

const CLUBS: Club[] = [
  {
    key: "software-engineering",
    name: "Software Engineering & DevOps",
    description: [
      "The Software Engineering & DevOps Club focuses on the principles, practices, and tools used to design, develop, test, deploy, and maintain software.",
      "Members explore programming, software development methodologies, version control, CI/CD, automation, and collaborative development while working on practical projects.",
    ],
    skills: [
      "Software development and programming",
      "Git and version control",
      "Software testing and debugging",
      "CI/CD and DevOps practices",
      "Team collaboration",
      "Project management",
      "Application deployment",
      "Problem-solving and software architecture",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "hci-ux-ui",
    name: "HCI, UX/UI",
    description: [
      "The HCI, UX/UI Club focuses on Human-Computer Interaction (HCI) and User Experience/User Interface design. Members learn how to understand users, identify problems, conduct basic user research, create wireframes and prototypes, and design intuitive digital products.",
      "The club provides opportunities to explore design thinking and collaborate on real-world digital experiences that are useful, accessible, and easy to use.",
    ],
    skills: [
      "UX research",
      "UI design",
      "User journey mapping",
      "Information architecture",
      "Wireframing",
      "Prototyping",
      "Usability testing",
      "Design thinking",
      "Figma and other design tools",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "robotics-iot",
    name: "Robotics, IoT & Embedded Systems",
    description: [
      "The Robotics, IoT & Embedded Systems Club explores the development of intelligent systems that interact with the physical world. Members learn how hardware, software, sensors, and communication technologies work together to create automated and connected systems.",
      "Through practical projects and experimentation, students can develop solutions involving robotics, smart devices, automation, and embedded technologies.",
    ],
    skills: [
      "Robotics",
      "Embedded programming",
      "Sensors and actuators",
      "Microcontrollers",
      "Internet of Things (IoT)",
      "Hardware-software integration",
      "Automation",
      "Electronics fundamentals",
      "Problem-solving",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "cloud-networking",
    name: "Cloud Computing & Networking",
    description: [
      "The Cloud Computing & Networking Club focuses on the technologies that enable modern digital communication and cloud-based services. Members explore computer networks, network architecture, cloud platforms, distributed systems, and infrastructure management.",
      "The club provides opportunities to understand how devices and systems communicate and how applications and services are deployed and managed in cloud environments.",
    ],
    skills: [
      "Computer networking",
      "Network architecture",
      "Cloud platforms",
      "Distributed systems",
      "Infrastructure management",
      "Virtualization",
      "Networking protocols",
      "System administration",
      "Problem-solving",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "ai-ml",
    name: "Artificial Intelligence & Machine Learning",
    description: [
      "The Artificial Intelligence & Machine Learning Club brings together students interested in building systems that can learn, reason, recognize patterns, and make predictions. Members explore fundamental AI and machine learning concepts through practical projects, experimentation, and discussions.",
      "The club encourages students to apply AI techniques to real-world challenges and develop an understanding of how intelligent systems are designed and evaluated.",
    ],
    skills: [
      "AI fundamentals",
      "Machine learning",
      "Model development & evaluation",
      "Data preparation",
      "Pattern recognition",
      "Predictive analysis",
      "Problem-solving",
      "AI project development",
      "Responsible use of AI",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "data-science",
    name: "Data Science, Big Data & Data Engineering",
    description: [
      "The Data Science, Big Data & Data Engineering Club focuses on transforming raw data into useful information and insights. Members explore how data is collected, cleaned, stored, processed, analyzed, and visualized.",
      "The club provides opportunities to work with datasets and understand the technologies and processes used to build reliable data systems and support data-driven decision-making.",
    ],
    skills: [
      "Data analysis",
      "Data cleaning and preparation",
      "Data preparation and visualization",
      "Data pipelines",
      "Statistical analysis",
      "Database management",
      "Big data concepts",
      "Data engineering",
      "Data-driven decision-making",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "cybersecurity",
    name: "Cybersecurity & Privacy",
    description: [
      "The Cybersecurity & Privacy Club focuses on understanding how digital systems, networks, applications, and information can be protected from security threats. Members explore cybersecurity principles, privacy protection, security awareness, ethical security practices, and common vulnerabilities through controlled learning environments and practical activities.",
      "The club promotes responsible security practices and helps students develop the knowledge needed to protect digital information and systems.",
    ],
    skills: [
      "Cybersecurity fundamentals",
      "Network security",
      "Privacy and data protection",
      "Vulnerability awareness",
      "Security testing",
      "Threat identification",
      "Security best practices",
      "Ethical security practices",
      "Incident awareness and response",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "algorithm-theory",
    name: "Algorithm & Theoretical Computing",
    description: [
      "The Algorithm & Theoretical Computing Club focuses on the fundamental principles behind efficient computation and problem-solving. Members explore algorithms, data structures, computational complexity, logic, and theoretical concepts that form the foundation of computer science.",
      "Through challenges and problem-solving activities, students develop the ability to analyze problems and design efficient computational solutions.",
    ],
    skills: [
      "Algorithm design",
      "Data structures",
      "Computational thinking",
      "Problem-solving",
      "Algorithm analysis",
      "Logical reasoning",
      "Complexity analysis",
      "Programming efficiency",
      "Competitive programming",
    ],
    patron: "Prof. Obed Appiah",
  },
  {
    key: "quantum",
    name: "Quantum Computing",
    description: [
      "The Quantum Computing Club introduces students to the emerging field of quantum computing and its potential applications. Members explore fundamental concepts such as quantum bits, quantum states, quantum gates, and quantum algorithms while developing an understanding of how quantum computers differ from traditional computers.",
      "The club encourages exploration, experimentation, and discussion around emerging quantum technologies.",
    ],
    skills: [
      "Quantum computing fundamentals",
      "Quantum algorithms",
      "Quantum programming concepts",
      "Problem-solving",
      "Mathematical reasoning",
      "Computational thinking",
      "Emerging technology awareness",
      "Research and experimentation",
      "Understanding of quantum technologies",
    ],
    patron: "Peter Nimbe",
  },
];

// ===========================================================================
// Page component
// ===========================================================================

export default function ClubsPage() {
  const [selectedKey, setSelectedKey] = useState(CLUBS[0].key);
  const [openKeyOnMobile, setOpenKeyOnMobile] = useState<string | null>(
    CLUBS[0].key,
  );

  const activeClub = CLUBS.find((c) => c.key === selectedKey) ?? CLUBS[0];

  return (
    <section className="w-full bg-white text-[#080b50]">
      {/* ---------------- HERO ---------------- */}
      {/* Figma reference is a fixed 1440×360 banner on desktop; min-h here
          approximates that at the equivalent breakpoint while staying
          responsive (full 360px height. padding instead, since a hard
          height would clip the copy on narrow or tall-text viewports). */}
      <div className="relative overflow-hidden bg-[#080b50] md:min-h-[360px]">
        <img
          src={HERO_IMAGE}
          alt="Students collaborating in the CSI department"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark navy overlay over the photo for text legibility — flat
            tint rather than the previous opaque gradient, so the photo
            stays visible underneath (matches the Figma reference). */}
        <div className="absolute inset-0 bg-[#080b50]/70" />

        <div className="relative mx-auto flex h-full max-w-[1100px] flex-col justify-center px-4 py-16 sm:px-6 sm:py-24">
          <h1 className="text-[36px] font-extrabold leading-tight tracking-[-1px] text-white sm:text-[52px] md:text-[64px]">
            CSI CLUBS
          </h1>
          <p className="mt-3 text-[16px] font-medium text-white/95 sm:text-[18px]">
            Explore. Connect. Build.
          </p>
          <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed text-white/85 sm:text-[15px]">
            Discover student clubs within the Department of Computer Science
            &amp; Informatics, connect with like-minded students, and develop
            your interests beyond the classroom.
          </p>

          {/* Opens the Google Form in a new tab — registration happens
              off-site, so the visitor's place on this page is preserved. */}
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-[44px] w-fit items-center justify-center rounded-md bg-[#2196F3] px-6 py-2.5 text-[14px] font-bold text-white transition-opacity hover:opacity-90"
          >
            Register to Join
          </a>
        </div>
      </div>

      {/* ---------------- CLUB LIST + DETAILS ---------------- */}
      <div className="mx-auto max-w-[1100px] px-4 py-10 sm:px-6 sm:py-14">
        {/* Desktop: two-column with equal-height columns.
            Mobile: accordion, single column. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[320px_1fr] md:items-stretch md:gap-8">
          {/* LEFT: Club list — left exactly as provided, unmodified. */}
          <nav aria-label="Clubs list" className="space-y-0.5">
            {CLUBS.map((club) => {
              const isActive = club.key === selectedKey;
              const isOpenMobile = openKeyOnMobile === club.key;

              return (
                <div key={club.key} className="md:contents">
                  {/* Desktop button / Mobile accordion header */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedKey(club.key);
                      setOpenKeyOnMobile((prev) =>
                        prev === club.key ? null : club.key,
                      );
                    }}
                    aria-selected={isActive}
                    aria-expanded={isOpenMobile}
                    className={[
                      "flex w-full items-center justify-between gap-3 rounded-none px-4 py-3.5 text-left",
                      "text-[13.5px] font-medium transition-colors sm:text-[14px]",
                      isActive
                        ? "bg-[#080b50] text-white"
                        : "bg-[#060740]/[0.10] text-[#080b50] hover:bg-[#060740]/[0.16]",
                    ].join(" ")}
                  >
                    <span className="min-w-0 leading-snug">{club.name}</span>
                    <ChevronDown
                      size={16}
                      aria-hidden="true"
                      className={[
                        "shrink-0 transition-transform md:hidden",
                        isOpenMobile ? "rotate-180" : "",
                      ].join(" ")}
                    />
                  </button>

                  {/* Mobile-only expanded content */}
                  {isOpenMobile && (
                    <div className="mb-3 rounded-md border border-[#0387C5]/[0.20] bg-[#0387C5]/[0.10] p-4 md:hidden">
                      <ClubDetails club={club} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* RIGHT: Details panel (desktop only).
              md:flex makes this stretch to match the grid row height. */}
          <article className="hidden md:flex">
            <ClubDetails club={activeClub} />
          </article>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// ClubDetails — reused in desktop panel and mobile accordion
// ===========================================================================

function ClubDetails({ club }: { club: Club }) {
  return (
    <div className="flex w-full min-h-[420px] flex-col rounded-md bg-[#0387C5]/[0.12] p-5 sm:p-7">
      {/* Description paragraphs */}
      <div className="space-y-3">
        {club.description.map((para, i) => (
          <p
            key={i}
            className="text-[13px] leading-relaxed text-[#1a1f3d] sm:text-[14px]"
          >
            {para}
          </p>
        ))}
      </div>

      {/* Skills & Benefits */}
      {club.skills.length > 0 && (
        <>
          <div className="my-5 border-t border-[#0387C5]/[0.30] sm:my-6" />

          <h3 className="text-[14px] font-bold text-[#080b50] sm:text-[15px]">
            Skills &amp; Benefits
          </h3>

          <ul className="mt-3 space-y-2.5">
            {/* Keyed by club.key + index rather than the skill text itself —
                static content today, but this avoids a silent duplicate-key
                collision if any future club ever repeats a skill string. */}
            {club.skills.map((skill, i) => (
              <li key={`${club.key}-skill-${i}`} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#080b50] sm:h-5 sm:w-5"
                >
                  <ArrowRight
                    className="h-2.5 w-2.5 text-white sm:h-3 sm:w-3"
                    strokeWidth={2.75}
                  />
                </span>
                <span className="text-[13px] leading-relaxed text-[#1a1f3d] sm:text-[14px]">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Patron */}
      {club.patron && (
        <>
          <div className="my-5 border-t border-[#0387C5]/[0.30] sm:my-6" />

          <h3 className="text-[14px] font-bold text-[#080b50] sm:text-[15px]">
            Patron
          </h3>

          <div className="mt-3 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#080b50] sm:h-12 sm:w-12"
            >
              <User
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                strokeWidth={2.5}
                fill="currentColor"
              />
            </span>
            <span className="text-[14px] font-medium text-[#080b50] sm:text-[15px]">
              {club.patron}
            </span>
          </div>
        </>
      )}
    </div>
  );
}