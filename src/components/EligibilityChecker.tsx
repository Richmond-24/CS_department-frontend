import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import {ArrowLeft, Check, X, XCircle, PlusCircle, AlertTriangle, AlertCircle, ChevronDown} from "lucide-react";

// CONFIG — external links
// ===========================================================================

const APPLY_URL = "https://admissions.uenr.edu.gh/login";

// GRADE SCALE — Computation logic
const GRADE_INFO = {
  A1: { rank: 1, points: 8 },
  B2: { rank: 2, points: 7 },
  B3: { rank: 3, points: 6 },
  C4: { rank: 4, points: 5 },
  C5: { rank: 5, points: 4 },
  C6: { rank: 6, points: 3 },
  D7: { rank: 7, points: 2 },
  E8: { rank: 8, points: 1 },
  F9: { rank: 9, points: 0 },
} as const;

type GradeKey = keyof typeof GRADE_INFO;
type Grade = GradeKey | "";

const GRADE_OPTIONS = Object.keys(GRADE_INFO) as GradeKey[];

function getGradeRank(grade: Grade): number {
  if (!grade) return Number.POSITIVE_INFINITY;
  return GRADE_INFO[grade].rank;
}

function gradePoints(grade: Grade): number {
  if (!grade) return 0;
  return GRADE_INFO[grade].points;
}

// ===========================================================================
// ADMISSION RULES — single source of truth for thresholds.
// Change a number here and the logic updates. (Copy in the FAQs / Requirements
// panels reads from the label constants below.)
// ===========================================================================

/** Worst rank accepted for the BSc (6 = C6). */
const BSC_MAX_RANK = 6;
/** Worst rank accepted for the Diploma electives (8 = E8). */
const DIPLOMA_MAX_RANK = 8;
/** Diploma relaxes Elective Mathematics too. Set to false to keep it at C6. */
const DIPLOMA_RELAXES_ELECTIVE_MATH = true;

const BSC_RANGE_LABEL = "A1 – C6";
const DIPLOMA_RANGE_LABEL = "A1 – E8";
const BSC_MIN_LABEL = "C6";
const DIPLOMA_MIN_LABEL = "E8";

type SubjectKind = "core" | "electiveMath" | "elective";
type SubjectStatus = "bsc" | "diploma" | "fail";
type Outcome = "bsc" | "diploma" | "none";

function subjectStatus(grade: Grade, kind: SubjectKind): SubjectStatus {
  if (!grade) return "fail";
  const { rank } = GRADE_INFO[grade];
  if (rank <= BSC_MAX_RANK) return "bsc";
  const canRelax =
    kind === "elective" || (kind === "electiveMath" && DIPLOMA_RELAXES_ELECTIVE_MATH);
  if (canRelax && rank <= DIPLOMA_MAX_RANK) return "diploma"; // D7, E8
  return "fail"; // cores never relax
}

// ELIGIBILITY LOGIC

interface EligibilityFormData {
  english: Grade;
  mathCore: Grade;
  integratedScience: Grade;
  mathElective: Grade;
  physics: Grade;
  chemistry: Grade;
  biology: Grade;
  electiveIct: Grade;
  customElective1Name: string;
  customElective1Grade: Grade;
  customElective2Name: string;
  customElective2Grade: Grade;
}

const EMPTY_FORM: EligibilityFormData = {
  english: "",
  mathCore: "",
  integratedScience: "",
  mathElective: "",
  physics: "",
  chemistry: "",
  biology: "",
  electiveIct: "",
  customElective1Name: "",
  customElective1Grade: "",
  customElective2Name: "",
  customElective2Grade: "",
};

// Names that already have a dedicated field. Typing one of these into a custom
// slot would double-count the subject, so custom entries matching them are ignored.
const RESERVED_SUBJECT_NAMES = new Set([
  "physics",
  "chemistry",
  "biology",
  "ict",
  "elective ict",
  "mathematics",
  "maths",
  "math",
  "elective mathematics",
  "elective maths",
  "elective math",
  "mathematics (elective)",
  "core mathematics",
  "core maths",
  "core math",
  "mathematics (core)",
  "english",
  "english language",
  "integrated science",
]);

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Returns a user-facing problem with a custom elective slot, or null. */
function customElectiveIssue(name: string, grade: Grade): string | null {
  const trimmed = name.trim();
  if (trimmed && grade === "") return "Select a grade for this subject, or clear the name.";
  if (!trimmed && grade !== "") return "Enter the subject name, or clear the grade.";
  if (trimmed && RESERVED_SUBJECT_NAMES.has(normalizeName(trimmed))) {
    return "This subject already has its own field above. Enter a different subject.";
  }
  return null;
}

interface SubjectCheck {
  id: string;
  label: string;
  grade: Grade;
  required: boolean;
  status: SubjectStatus;
  isEvaluatedInTop6?: boolean;
}

interface EligibilityResult {
  outcome: Outcome;
  /** True for BSc or Diploma. Kept so existing "eligible" checks still work. */
  eligible: boolean;
  qualifyingElectiveCount: number;
  totalElectivesEntered: number;
  hasElectiveMath: boolean;
  subjects: SubjectCheck[];
  isIncomplete: boolean;
}

function makeSubject(
  id: string,
  label: string,
  grade: Grade,
  kind: SubjectKind,
  required: boolean,
): SubjectCheck {
  return { id, label, grade, required, status: subjectStatus(grade, kind) };
}

function checkEligibility(form: EligibilityFormData): EligibilityResult {
  const coreSubjects: SubjectCheck[] = [
    makeSubject("english", "English Language", form.english, "core", true),
    makeSubject("math-core", "Mathematics (Core)", form.mathCore, "core", true),
    makeSubject("integrated-science", "Integrated Science", form.integratedScience, "core", true),
  ];

  const mathElective = makeSubject(
    "math-elective",
    "Mathematics (Elective)",
    form.mathElective,
    "electiveMath",
    true,
  );

  const rawOtherElectives: SubjectCheck[] = [
    makeSubject("physics", "Physics", form.physics, "elective", false),
    makeSubject("chemistry", "Chemistry", form.chemistry, "elective", false),
    makeSubject("biology", "Biology", form.biology, "elective", false),
    makeSubject("elective-ict", "Elective ICT", form.electiveIct, "elective", false),
  ];

  // Custom electives: skip partial entries and anything that duplicates a named field
  // (or the other custom slot).
  const seenCustom = new Set<string>();
  const addCustom = (id: string, name: string, grade: Grade) => {
    const trimmed = name.trim();
    if (!trimmed || grade === "") return;
    const key = normalizeName(trimmed);
    if (RESERVED_SUBJECT_NAMES.has(key) || seenCustom.has(key)) return;
    seenCustom.add(key);
    rawOtherElectives.push(makeSubject(id, trimmed, grade, "elective", false));
  };
  addCustom("custom-1", form.customElective1Name, form.customElective1Grade);
  addCustom("custom-2", form.customElective2Name, form.customElective2Grade);

  const filledOtherElectives = rawOtherElectives.filter((s) => s.grade !== "");
  const hasElectiveMath = form.mathElective !== "";
  const totalElectivesEntered = filledOtherElectives.length + (hasElectiveMath ? 1 : 0);

  const isIncomplete = totalElectivesEntered < 3 || !hasElectiveMath;

  // Ordering by rank is monotonic for both tracks, so the best two electives
  // are the right ones to test for BSc and for Diploma.
  const top2Electives = [...filledOtherElectives]
    .sort((a, b) => getGradeRank(a.grade) - getGradeRank(b.grade))
    .slice(0, 2);
  const top2Ids = new Set(top2Electives.map((s) => s.id));

  const coreOk = coreSubjects.every((s) => s.status === "bsc");
  const bscMath = mathElective.status === "bsc";
  const diplomaMath = mathElective.status !== "fail";
  const top2Bsc = top2Electives.filter((s) => s.status === "bsc").length;
  const top2Diploma = top2Electives.filter((s) => s.status !== "fail").length;

  const outcome: Outcome =
    !isIncomplete && coreOk && bscMath && top2Bsc >= 2
      ? "bsc"
      : !isIncomplete && coreOk && diplomaMath && top2Diploma >= 2
        ? "diploma"
        : "none";

  const subjects: SubjectCheck[] = [
    ...coreSubjects.map((s) => ({ ...s, isEvaluatedInTop6: true })),
    { ...mathElective, isEvaluatedInTop6: true },
    ...rawOtherElectives.map((s) => ({
      ...s,
      isEvaluatedInTop6: top2Ids.has(s.id),
    })),
  ];

  return {
    outcome,
    eligible: outcome !== "none",
    qualifyingElectiveCount: outcome === "bsc" ? top2Bsc : top2Diploma,
    totalElectivesEntered,
    hasElectiveMath,
    subjects,
    isIncomplete,
  };
}

// ===========================================================================
// CS AREA MATCHING — 7 areas, boosted math-driven formulas + requirement caps
// ===========================================================================
//
// Design:
//   1. Non-linear scoring (boosted = points²) — strong grades dominate.
//   2. Math strength = best of Elective/Core Math + 30% bonus from the other.
//   3. Piecewise remap: all-C6 → 35% (Fair floor), all-A1 → 100%, and profiles
//      weaker than all-C6 spread across 0–35% instead of flattening at 35%.
//      This keeps BSc scores identical while letting Diploma-level profiles
//      (D7/E8 electives) still rank areas against each other.
//   4. Requirement caps — if a student misses the minimum bar for an area's
//      essential subjects (e.g. weak math for AI/ML), the score is capped at
//      a low ceiling.
//   5. A subject that wasn't taken (Physics) is not scored as 0; a proxy from
//      the student's other science electives is used instead.

interface AreaMatch {
  key: string;
  name: string;
  fitPercent: number;
  fitLabel: "Strong" | "Good" | "Fair" | "Exploratory";
  description: string;
  careers: string[];
}

function fitLabelFor(percent: number): AreaMatch["fitLabel"] {
  if (percent >= 75) return "Strong";
  if (percent >= 55) return "Good";
  if (percent >= 35) return "Fair";
  return "Exploratory";
}

function toArea(
  key: string,
  name: string,
  rawPercent: number,
  description: string,
  careers: string[],
): AreaMatch {
  const clamped = Math.max(0, Math.min(100, rawPercent));
  const fitPercent = Math.round(clamped);
  return {
    key,
    name,
    fitPercent,
    fitLabel: fitLabelFor(fitPercent),
    description,
    careers,
  };
}

// --- Boosted scoring helpers ---------------------------------------------

function boosted(points: number): number {
  return points * points;
}

function mathStrength(mathE: number, mathCore: number): number {
  const best = Math.max(mathE, mathCore);
  const other = Math.min(mathE, mathCore);
  return boosted(best) + 0.3 * boosted(other);
}

const RAW_ZERO = 1 / 64; // all-E8 profile
const RAW_FLOOR = 9 / 64; // all-C6 profile
const RAW_CEIL = 1.0;
const TARGET_FLOOR = 0.35;
const TARGET_CEIL = 1.0;

function remap(raw: number): number {
  if (raw < RAW_FLOOR) {
    const t = Math.max(0, (raw - RAW_ZERO) / (RAW_FLOOR - RAW_ZERO));
    return t * TARGET_FLOOR * 100; // 0–35%
  }
  const t = (Math.min(RAW_CEIL, raw) - RAW_FLOOR) / (RAW_CEIL - RAW_FLOOR);
  return (TARGET_FLOOR + t * (TARGET_CEIL - TARGET_FLOOR)) * 100;
}

// --- Requirement caps ----------------------------------------------------
//
// Points reference: A1=8, B2=7, B3=6, C4=5, C5=4, C6=3, D7=2, E8=1, F9=0.
// "mathE: 5" means the student must have at least C4 in Elective Math.

interface StudentPoints {
  mathE: number;
  mathCore: number;
  ict: number;
  physics: number;
  english: number;
}

interface AreaRequirement {
  minimums: Partial<Record<keyof StudentPoints, number>>;
  capIfBelow: number;
}

const AREA_REQUIREMENTS: Record<string, AreaRequirement> = {
  "ai-ml": {
    minimums: { mathE: 5, mathCore: 5 },   // C4 or better in both maths
    capIfBelow: 22,
  },
  "data-science": {
    minimums: { mathE: 5, mathCore: 5 },   // C4 or better in both maths
    capIfBelow: 22,
  },
  "cybersecurity": {
    minimums: { mathE: 4, ict: 4 },        // C5 or better in math-e & ICT
    capIfBelow: 28,
  },
  "software-engineering": {
    minimums: { mathE: 4, ict: 5 },        // C5 in math-e AND C4 in ICT
    capIfBelow: 30,
  },
  "systems-networking": {
    minimums: { ict: 4 },                  // C5 in ICT
    capIfBelow: 35,
  },
  "information-systems": {
    minimums: {},                          // soft — no cap
    capIfBelow: 100,
  },
  "software-product": {
    minimums: {},                          // soft — no cap
    capIfBelow: 100,
  },
};

function applyRequirementCap(
  fitPercent: number,
  points: StudentPoints,
  req: AreaRequirement,
): number {
  for (const key of Object.keys(req.minimums) as (keyof StudentPoints)[]) {
    const min = req.minimums[key];
    if (min !== undefined && points[key] < min) {
      return Math.min(fitPercent, req.capIfBelow);
    }
  }
  return fitPercent;
}

function matchCsAreas(form: EligibilityFormData): AreaMatch[] {
  const english = gradePoints(form.english);
  const mathCore = gradePoints(form.mathCore);
  const mathE = gradePoints(form.mathElective);
  const chemistry = gradePoints(form.chemistry);
  const biology = gradePoints(form.biology);
  const ict = gradePoints(form.electiveIct);

  // Physics is optional. If it wasn't taken, don't score it as 0 — use the
  // student's best other science elective as a stand-in.
  const physics =
    form.physics !== "" ? gradePoints(form.physics) : Math.max(chemistry, biology);

  const MAX_BOOST = boosted(8);
  const MAX_MATH = mathStrength(8, 8);
  const mStrength = mathStrength(mathE, mathCore);
  const sciTiebreak = Math.max(boosted(biology), boosted(chemistry));

  // --- Raw fits (before caps) -------------------------------------------
  const aiMlRaw =
    (mStrength * 5 + boosted(physics) * 3 + boosted(ict) * 1) /
    (MAX_MATH * 5 + MAX_BOOST * 3 + MAX_BOOST * 1);

  const cybersecurityRaw =
    (mStrength * 3 + boosted(ict) * 4 + boosted(english) * 1) /
    (MAX_MATH * 3 + MAX_BOOST * 4 + MAX_BOOST * 1);

  const dataScienceRaw =
    (mStrength * 6 + boosted(ict) * 2 + sciTiebreak * 2) /
    (MAX_MATH * 6 + MAX_BOOST * 2 + MAX_BOOST * 2);

  const systemsNetworkingRaw =
    (boosted(ict) * 4 + boosted(physics) * 3 + mStrength * 2) /
    (MAX_BOOST * 4 + MAX_BOOST * 3 + MAX_MATH * 2);

  const softwareEngineeringRaw =
    (boosted(ict) * 3 + mStrength * 3 + boosted(english) * 1) /
    (MAX_BOOST * 3 + MAX_MATH * 3 + MAX_BOOST * 1);

  // Product & UX leans on communication; IS leans on a balance with some math.
  // (These used to share one formula, so they always tied.)
  const softwareProductRaw =
    (boosted(english) * 4 + boosted(ict) * 3 + mStrength * 1) /
    (MAX_BOOST * 4 + MAX_BOOST * 3 + MAX_MATH * 1);

  const informationSystemsRaw =
    (boosted(english) * 3 + boosted(ict) * 3 + mStrength * 2) /
    (MAX_BOOST * 3 + MAX_BOOST * 3 + MAX_MATH * 2);

  // --- Apply caps based on per-area minimum requirements ----------------
  const points: StudentPoints = { mathE, mathCore, ict, physics, english };

  const aiMl = applyRequirementCap(remap(aiMlRaw), points, AREA_REQUIREMENTS["ai-ml"]);
  const cybersecurity = applyRequirementCap(remap(cybersecurityRaw), points, AREA_REQUIREMENTS["cybersecurity"]);
  const dataScience = applyRequirementCap(remap(dataScienceRaw), points, AREA_REQUIREMENTS["data-science"]);
  const systemsNetworking = applyRequirementCap(remap(systemsNetworkingRaw), points, AREA_REQUIREMENTS["systems-networking"]);
  const softwareEngineering = applyRequirementCap(remap(softwareEngineeringRaw), points, AREA_REQUIREMENTS["software-engineering"]);
  const softwareProduct = applyRequirementCap(remap(softwareProductRaw), points, AREA_REQUIREMENTS["software-product"]);
  const informationSystems = applyRequirementCap(remap(informationSystemsRaw), points, AREA_REQUIREMENTS["information-systems"]);

  const areas: AreaMatch[] = [
    toArea(
      "ai-ml",
      "Artificial Intelligence & Machine Learning",
      aiMl,
      "Your performance in Elective Mathematics, Physics, and ICT supports this mathematically intensive pathway.",
      [
        "Machine Learning Engineer",
        "Data Scientist",
        "AI Research Scientist",
        "Computer Vision Engineer",
        "NLP Specialist",
      ],
    ),
    toArea(
      "cybersecurity",
      "Cybersecurity & Cryptography",
      cybersecurity,
      "Strong grades in ICT and Mathematics support work in systems protection, threat detection, and secure communication.",
      [
        "Security Analyst",
        "Penetration Tester (Ethical Hacker)",
        "Security Engineer",
        "Forensic Computer Analyst",
        "Cryptography Engineer",
      ],
    ),
    toArea(
      "data-science",
      "Data Science & Analytics",
      dataScience,
      "A solid foundation in Mathematics and analytical subjects supports this data-driven pathway.",
      [
        "Data Analyst",
        "Data Engineer",
        "Business Intelligence Developer",
        "Quantitative Analyst",
        "Machine Learning Analyst",
      ],
    ),
    toArea(
      "systems-networking",
      "Systems & Networking Infrastructure",
      systemsNetworking,
      "Your performance in ICT and Physics supports work designing, deploying, and maintaining computing infrastructure.",
      [
        "Network Engineer",
        "Cloud Engineer",
        "Systems Administrator",
        "DevOps Engineer",
        "Site Reliability Engineer",
      ],
    ),
    toArea(
      "software-engineering",
      "Software Engineering & Full-Stack Development",
      softwareEngineering,
      "Strong grades in Elective Mathematics and ICT support building and shipping software systems end-to-end.",
      [
        "Full-Stack Developer",
        "Backend Developer",
        "Mobile Applications Developer",
        "Front-End Developer",
        "DevOps Engineer",
      ],
    ),
    toArea(
      "software-product",
      "Software Product & UX",
      softwareProduct,
      "Strong grades in English and ICT support work at the intersection of technology, users, and product design.",
      [
        "UX Designer",
        "Product Manager",
        "Technical Writer",
        "Front-End Developer",
        "UX Researcher",
      ],
    ),
    toArea(
      "information-systems",
      "Information Systems & IT Management",
      informationSystems,
      "Balanced performance in ICT and English supports bridging business needs with technology solutions.",
      [
        "IT Manager",
        "Business Analyst",
        "ERP Specialist",
        "IT Consultant",
        "Systems Analyst",
      ],
    ),
  ];

  return areas.sort((a, b) => b.fitPercent - a.fitPercent);
}

// SHARED UI PRIMITIVES
type Tab = "checker" | "requirements" | "faqs";
type Step =
  | { kind: "form" }
  | { kind: "result" }
  | { kind: "areas" }
  | { kind: "career"; area: AreaMatch };

const labelClass =
  "mb-1 block text-[12.5px] font-semibold text-[#080b50] sm:text-[13.5px]";

const focusRing =
  "focus:border-[#203b82] focus:ring-2 focus:ring-[#203b82]/20 outline-none";

// GradeSelect — responsive, compact dropdown
interface GradeSelectProps {
  value: Grade;
  onChange: (g: Grade) => void;
  label: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  anchorId?: string;
}

function GradeSelect({
  value,
  onChange,
  label,
  placeholder = "Select a grade",
  helperText,
  required = false,
  anchorId,
}: GradeSelectProps) {
  const autoId = useId();
  const id = anchorId ?? autoId;
  const helperId = helperText ? `${id}-helper` : undefined;

  return (
    <div className="w-full min-w-0 sm:max-w-[280px]">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as Grade)}
          aria-required={required}
          aria-describedby={helperId}
          className={[
            "w-full appearance-none rounded-md border border-gray-300 bg-white",
            "py-2 pl-2.5 pr-8 text-[15px] sm:py-1.5 sm:text-[14px]",
            "text-[#080b50] transition-colors",
            "min-h-[42px] sm:min-h-[38px]",
            focusRing,
          ].join(" ")}
        >
          <option value="">{placeholder}</option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500"
        />
      </div>

      {helperText && (
        <p id={helperId} className="mt-1 text-[11.5px] text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

// TextInput
interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
  label: string;
  placeholder?: string;
}

function TextInput({ value, onChange, label, placeholder }: TextInputProps) {
  const id = useId();

  return (
    <div className="w-full min-w-0 sm:max-w-[280px]">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full rounded-md border border-gray-300 bg-white",
          "px-2.5 py-2 text-[15px] sm:py-1.5 sm:text-[14px]",
          "text-[#080b50] transition-colors placeholder:text-gray-400",
          "min-h-[42px] sm:min-h-[38px]",
          focusRing,
        ].join(" ")}
      />
    </div>
  );
}

// FieldNote — inline warning under a form field
function FieldNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="status" className="text-[11.5px] leading-snug text-amber-700">
      {message}
    </p>
  );
}

// MainHeader
function MainHeader() {
  return (
    <div className="mb-6 text-center sm:mb-10">
      <h1 className="text-[24px] font-extrabold leading-tight tracking-[-0.5px] text-[#18337A] xs:text-[28px] sm:text-[36px] md:text-[42px]">
        <span className="block">Computer Science</span>
        <span className="block">Admission Assistant</span>
      </h1>
      <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-relaxed text-[#18337A] sm:mt-4 sm:text-[18px] md:text-[20px]">
        Enter your WASSCE results to find out whether you meet the minimum requirements for Computer Science.
      </p>
    </div>
  );
}

// TabBar — with tab/tabpanel wiring and arrow-key navigation
const TAB_ITEMS: { key: Tab; label: string; short: string }[] = [
  { key: "checker", label: "Eligibility Checker", short: "Checker" },
  { key: "requirements", label: "Requirements", short: "Requirements" },
  { key: "faqs", label: "FAQs", short: "FAQs" },
];

function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({
    checker: null,
    requirements: null,
    faqs: null,
  });

  function onKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    const idx = TAB_ITEMS.findIndex((t) => t.key === tab);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % TAB_ITEMS.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + TAB_ITEMS.length) % TAB_ITEMS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = TAB_ITEMS.length - 1;
    else return;
    e.preventDefault();
    const nextKey = TAB_ITEMS[next].key;
    setTab(nextKey);
    refs.current[nextKey]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="Eligibility sections"
      onKeyDown={onKeyDown}
      className="mb-6 flex w-full items-stretch gap-1 overflow-x-auto border-b border-gray-200 sm:mb-8"
    >
      {TAB_ITEMS.map((t) => {
        const selected = tab === t.key;
        return (
          <button
            key={t.key}
            ref={(el) => {
              refs.current[t.key] = el;
            }}
            id={`tab-${t.key}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`panel-${t.key}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => setTab(t.key)}
            className={[
              "flex-1 min-w-0 whitespace-nowrap border-b-2 px-2 pb-3 pt-1 text-center",
              "text-[11px] font-semibold transition-colors xs:text-[12px] sm:text-[15px] md:text-[16px]",
              "min-h-[44px]",
              selected
                ? "border-[#080b50] text-[#080b50]"
                : "border-transparent text-gray-400 hover:text-[#203b82]",
            ].join(" ")}
          >
            <span className="xs:hidden">{t.short}</span>
            <span className="hidden xs:inline">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// IncompleteModal — Portal, scroll-locked, always centered in viewport(scroll effect)
function IncompleteModal({
  totalElectivesEntered,
  hasElectiveMath,
  onClose,
}: {
  totalElectivesEntered: number;
  hasElectiveMath: boolean;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Keep the latest onClose in a ref so the effects below run once, instead of
  // re-running (and re-stealing focus) every time the parent re-renders.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      // Minimal focus trap: the dialog has a single focusable control.
      if (e.key === "Tab") {
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, []);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-[100vh] h-[100dvh] w-screen items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[500px] overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-4 pt-6 text-center shadow-xl sm:max-h-[calc(100dvh-2rem)] sm:p-8 sm:pt-10"
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-1.5 bg-purple-600 transition-all duration-500 ease-out sm:h-2"
          style={{ width: `${progress}%` }}
        />

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-purple-50 text-purple-600 sm:mb-6 sm:h-20 sm:w-20">
          <AlertCircle size={36} strokeWidth={1.75} aria-hidden="true" className="sm:hidden" />
          <AlertCircle size={44} strokeWidth={1.75} aria-hidden="true" className="hidden sm:block" />
        </div>

        <h2 id={titleId} className="text-[18px] font-bold text-[#080b50] sm:text-[25px]">
          More information required
        </h2>

        <p className="mx-auto mt-3 max-w-[360px] text-[14px] leading-relaxed text-gray-600 sm:text-[17px]">
          {!hasElectiveMath ? (
            <>
              Please select a grade for <strong>Elective Mathematics</strong> and enter at least 3 electives in total to continue.
            </>
          ) : (
            <>
              You have entered only {totalElectivesEntered} elective
              {totalElectivesEntered === 1 ? "" : "s"}. Please provide at least 3 electives, including Elective Mathematics, to continue.
            </>
          )}
        </p>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="mt-6 min-h-[44px] rounded-lg border border-[#080b50] px-6 py-2.5 text-[14px] font-semibold text-[#080b50] transition-colors hover:bg-gray-50 active:bg-gray-100 sm:mt-8 sm:px-8 sm:text-[15px]"
        >
          Back to Form
        </button>
      </div>
    </div>,
    document.body,
  );
}

function InfoBanner() {
  return (
    <div className="mt-8 flex gap-3 rounded-lg border border-[#203b82]/20 bg-[#D9EEFF] p-3.5 sm:mt-10 sm:gap-4 sm:p-5">
      <div className="flex shrink-0 flex-col items-center pt-0.5">
        <AlertTriangle
          className="h-4 w-4 shrink-0 text-[#060740] sm:h-5 sm:w-5"
          aria-hidden="true"
        />
        <div className="mt-1.5 w-[1.5px] flex-1 bg-[#18337A]/70" />
      </div>
      <div className="min-w-0">
        <p className="text-[12.5px] font-bold leading-snug text-[#060740] sm:text-[13.5px]">
          Important: Minimum Requirements ≠ Guaranteed Admission
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-[#060740]/85 sm:text-[13px]">
          Meeting the minimum academic requirements means that you meet the basic
          eligibility criteria for consideration. Admission may still depend on the
          University&apos;s admission process, programme capacity, and any additional
          requirements.
        </p>
      </div>
    </div>
  );
}

function PanelCta({
  prompt,
  onSwitchToChecker,
}: {
  prompt: string;
  onSwitchToChecker: () => void;
}) {
  return (
    <div className="relative mt-10 sm:mt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white"
      />

      <p className="text-center text-[13px] font-medium text-[#080b50] sm:text-[14px]">
        {prompt}
      </p>

      <button
        type="button"
        onClick={onSwitchToChecker}
        className="mt-4 min-h-[48px] w-full rounded-lg bg-[#080b50] px-6 py-3 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 sm:mx-auto sm:block sm:max-w-[420px] sm:text-[15px]"
      >
        Check My Eligibility
      </button>
    </div>
  );
}

// RequirementsPanel
interface PanelProps {
  onSwitchToChecker: () => void;
}

function RequirementsPanel({ onSwitchToChecker }: PanelProps) {
  return (
    <div className="py-3 text-[#080b50] sm:py-6">
      <h2 className="mb-5 text-[20px] font-semibold leading-tight text-[#080b50] sm:mb-6 sm:text-[26px]">
        Computer Science Admission Requirements
      </h2>

      {/* Undergraduate Entry */}
      <section className="mb-6 sm:mb-8">
        <h3 className="mb-2 text-[18px] font-bold text-[#080b50] sm:text-[17px]">
          Undergraduate Entry
        </h3>
        <p className="text-[14px] leading-relaxed text-[#060740] sm:text-[15px]">
          To study Computer Science, applicants must satisfy the general university
          admission requirements <strong>and the programme-specific subject requirements.</strong>
        </p>
      </section>

      {/* WASSCE (SSCE) Applicants */}
      <section className="mb-6 sm:mb-8">
        <h3 className="mb-2 text-[15px] font-bold text-[#080b50] sm:text-[17px]">
          WASSCE (SSCE) Applicants: BSc Computer Science
        </h3>
        <p className="mb-3 text-[14px] leading-relaxed text-[#060740] sm:text-[15px]">
          You must have:
        </p>

        <div className="mb-3">
          <p className="text-[14px] font-semibold text-[#080b50] sm:text-[14.5px]">
            Three Core Subjects
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13.5px] leading-relaxed text-[#060740] sm:text-[14px]">
            <li>English Language — <strong>{BSC_RANGE_LABEL}</strong></li>
            <li>Core Mathematics — <strong>{BSC_RANGE_LABEL}</strong></li>
            <li>Integrated Science — <strong>{BSC_RANGE_LABEL}</strong></li>
          </ul>
        </div>

        <div className="mb-3">
          <p className="text-[14px] font-semibold text-[#080b50] sm:text-[14.5px]">
            Three Relevant Electives
          </p>
          <ul className="mt-1 list-disc space-y-0.5 pl-5 text-[13px] leading-relaxed text-[#060740] sm:text-[14px]">
            <li>Elective Mathematics — <strong>{BSC_RANGE_LABEL}</strong></li>
            <li>
              Plus at least two of (each <strong>{BSC_RANGE_LABEL}</strong>):
              <ul className="mt-0.5 list-[circle] space-y-0.5 pl-5 text-[#080b50]">
                <li>Physics</li>
                <li>Chemistry</li>
                <li>Biology</li>
                <li>Elective ICT or</li>
                <li>Any relevant General Science-related elective.</li>
              </ul>
            </li>
          </ul>
        </div>

        <p className="text-[13.5px] font-semibold text-[#080b50] sm:text-[14.5px]">
          In short:{" "}
          <span className="font-normal text-[#060740]">
            3 Core Subjects + Elective Mathematics + 2 relevant electives
          </span>
        </p>
      </section>

      {/* Diploma */}
      <section className="mb-6 sm:mb-8">
        <h3 className="mb-2 text-[15px] font-bold text-[#080b50] sm:text-[17px]">
          WASSCE (SSCE) Applicants: Diploma in Computer Science
        </h3>
        <p className="mb-3 text-[13.5px] leading-relaxed text-[#060740] sm:text-[15px]">
          The Diploma uses the same subject structure as the BSc, with a more
          relaxed minimum grade in the electives.
        </p>
        <ul className="list-disc space-y-0.5 pl-5 text-[13.5px] leading-relaxed text-[#060740] sm:text-[14px]">
          <li>
            English Language, Core Mathematics and Integrated Science — still{" "}
            <strong>{BSC_RANGE_LABEL}</strong>
          </li>
          <li>
            Elective Mathematics —{" "}
            <strong>{diplomaMathLabel()}</strong>
          </li>
          <li>
            At least two other relevant electives — <strong>{DIPLOMA_RANGE_LABEL}</strong>
          </li>
        </ul>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[#060740] sm:text-[14px]">
          A grade of F9 does not qualify for either programme.
        </p>
      </section>

      {/* Other Entry Routes */}
      <section className="mb-6 sm:mb-8">
        <h3 className="mb-2 text-[15px] font-bold text-[#080b50] sm:text-[17px]">
          Other Entry Routes
        </h3>
        <p className="text-[13.5px] leading-relaxed text-[#060740] sm:text-[15px]">
          Applicants with qualifications other than WASSCE may also be considered,
          subject to the University&apos;s admission regulations and the specific
          requirements of the programme.
        </p>
      </section>

      {/* Mature Applicants */}
      <section className="mb-6 sm:mb-8">
        <h4 className="mb-1.5 text-[14px] font-bold text-[#080b50] sm:text-[15.5px]">
          Mature Applicants
        </h4>
        <p className="text-[13.5px] leading-relaxed text-[#060740] sm:text-[15px]">
          Applicants who meet the University&apos;s mature-entry age requirement may
          apply through the mature admissions route and may be required to pass an
          entrance examination and/or interview. UENR and other Ghanaian
          universities commonly use <strong>25 years</strong> as the mature-entry
          threshold.
        </p>
      </section>

      {/* Diploma / HND Holders */}
      <section className="mb-6 sm:mb-8">
        <h4 className="mb-1.5 text-[14px] font-bold text-[#080b50] sm:text-[15.5px]">
          Diploma / HND Holders
        </h4>
        <p className="text-[13.5px] leading-relaxed text-[#060740] sm:text-[15px]">
          Applicants with relevant diplomas or HND qualifications may be considered
          for admission or advanced placement, subject to assessment of their
          qualification and the University&apos;s regulations. UENR explicitly
          recognizes professional/technical qualifications as an entry route.
        </p>
      </section>

      {/* International Applicants */}
      <section className="mb-6 sm:mb-8">
        <h4 className="mb-1.5 text-[14px] font-bold text-[#080b50] sm:text-[15.5px]">
          International Applicants
        </h4>
        <p className="text-[13.5px] leading-relaxed text-[#060740] sm:text-[15px]">
          Applicants with foreign qualifications may be considered where their
          qualifications are recognized as equivalent to the relevant Ghanaian
          qualifications. Foreign certificates may require evaluation by the
          appropriate national authority.
        </p>
      </section>

      <InfoBanner />

      <PanelCta
        prompt="Need to know if your results qualify?"
        onSwitchToChecker={onSwitchToChecker}
      />
    </div>
  );
}

function diplomaMathLabel(): string {
  return DIPLOMA_RELAXES_ELECTIVE_MATH ? DIPLOMA_RANGE_LABEL : BSC_RANGE_LABEL;
}

// FaqsPanel — one-at-a-time accordion
interface FaqItem {
  q: string;
  a: ReactNode[];
}

const FAQS: FaqItem[] = [
  {
    q: "What grades do I need to study Computer Science?",
    a: [
      <>For the <strong>BSc</strong>, WASSCE applicants must obtain <strong>{BSC_RANGE_LABEL}</strong> in:</>,
      <ul key="core" className="list-disc space-y-0.5 pl-5">
        <li>English Language</li>
        <li>Core Mathematics</li>
        <li>Integrated Science</li>
        <li>Elective Mathematics</li>
      </ul>,
      <>You must also obtain <strong>{BSC_RANGE_LABEL}</strong> in at least two of the following relevant electives:</>,
      <ul key="electives" className="list-disc space-y-0.5 pl-5">
        <li>Physics</li>
        <li>Chemistry</li>
        <li>Biology</li>
        <li>Elective ICT</li>
      </ul>,
      <>
        In short: <strong>3 Core Subjects + Elective Mathematics + 2 Relevant Electives.</strong>
      </>,
      <>
        If your elective grades fall short of the BSc requirement, you may still qualify for the Diploma. See the
        question about the Diploma below.
      </>,
    ],
  },
  {
    q: "Is there a Diploma option if my elective grades are lower?",
    a: [
      <>
        Yes. The Diploma in Computer Science uses the same structure as the BSc
        (3 core subjects, Elective Mathematics and 2 other relevant electives), but accepts
        grades down to <strong>{DIPLOMA_MIN_LABEL}</strong> in the electives.
      </>,
      <>
        Your three core subjects (English Language, Core Mathematics and Integrated Science) must
        still be <strong>{BSC_RANGE_LABEL}</strong>.
      </>,
      <>When you apply, make sure you select the Diploma programme.</>,
    ],
  },
  {
    q: "Is Elective Mathematics compulsory?",
    a: [
      <>
        Yes. Elective Mathematics is a required elective for admission to the
        Computer Science programme.
      </>,
      <>
        You must obtain <strong>{BSC_RANGE_LABEL}</strong> for the BSc
        {DIPLOMA_RELAXES_ELECTIVE_MATH ? (
          <>
            , or <strong>{DIPLOMA_RANGE_LABEL}</strong> for the Diploma.
          </>
        ) : (
          <>.</>
        )}
      </>,
    ],
  },
  {
    q: "How many elective subjects do I need?",
    a: [
      <>You need at least <strong>three qualifying electives</strong>:</>,
      <ul key="list" className="list-disc space-y-0.5 pl-5">
        <li>Elective Mathematics</li>
        <li>Two additional relevant electives</li>
      </ul>,
      <>
        The two additional electives may be selected from Physics, Chemistry,
        Biology, or Elective ICT. They need <strong>{BSC_RANGE_LABEL}</strong> for the BSc or{" "}
        <strong>{DIPLOMA_RANGE_LABEL}</strong> for the Diploma.
      </>,
    ],
  },
  {
    q: "Which grades are considered qualifying grades?",
    a: [
      <>
        For the <strong>BSc</strong>: <strong>A1, B2, B3, C4, C5 and C6.</strong>
      </>,
      <>
        For the <strong>Diploma</strong>, the electives may also be <strong>D7 or E8</strong>. Core subjects must
        still be C6 or better.
      </>,
      <>F9 does not qualify for either programme.</>,
    ],
  },
  {
    q: "Can I qualify if I did not take Elective Mathematics?",
    a: [
      <>
        No. Elective Mathematics is a compulsory subject requirement for the
        Computer Science programmes under the stated WASSCE criteria.
      </>,
    ],
  },
  {
    q: "Can Elective ICT count as one of my relevant electives?",
    a: [
      <>
        Yes. Elective ICT may count as one of the two additional relevant
        electives, alongside Physics, Chemistry, or Biology, provided the required
        grade is obtained.
      </>,
    ],
  },
  {
    q: "What if I have more than two qualifying relevant electives?",
    a: [
      <>
        That&apos;s fine. You only need at least two additional qualifying
        electives besides Elective Mathematics.
      </>,
      <>
        For example, if you have qualifying grades in Physics, Chemistry, Biology,
        and Elective ICT, you meet the elective-subject requirement as long as
        Elective Mathematics also meets the requirement.
      </>,
    ],
  },
  {
    q: "If I meet the requirements, am I automatically admitted?",
    a: [
      <>
        No. Meeting the minimum academic requirements means that you are eligible
        to apply, but it does <strong>not</strong> guarantee admission.
      </>,
      <>
        Final admission is subject to the university&apos;s admission process,
        available spaces, and any other applicable admission conditions.
      </>,
    ],
  },
];

function FaqsPanel({ onSwitchToChecker }: PanelProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="py-3 text-[#080b50] sm:py-6">
      <h2 className="mb-5 text-[20px] font-extrabold leading-tight text-[#080b50] sm:mb-6 sm:text-[26px]">
        Got questions about studying Computer Science?
      </h2>

      <ul className="space-y-2.5 sm:space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <li
              key={i}
              className="overflow-hidden rounded-lg bg-[#D9EEFF] transition-colors"
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex min-h-[52px] w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-[#CDE8FF] sm:gap-4 sm:px-4 sm:py-3.5"
              >
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-[12px] font-bold text-[#080b50] sm:h-8 sm:w-8 sm:text-[13px]"
                >
                  {i + 1}
                </span>

                <span className="flex-1 text-[13.5px] font-semibold leading-snug text-[#080b50] sm:text-[15px]">
                  {item.q}
                </span>

                <span aria-hidden="true" className="shrink-0 text-[#080b50]">
                  {isOpen ? (
                    <XCircle className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
                  ) : (
                    <PlusCircle className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
                  )}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={[
                  "grid transition-all duration-300 ease-out",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2.5 px-3 pb-4 pl-[52px] text-[13px] leading-relaxed text-[#080b50]/90 sm:px-4 sm:pb-5 sm:pl-[64px] sm:text-[14px]">
                    {item.a.map((para, j) => (
                      <div key={j}>{para}</div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <InfoBanner />

      <PanelCta
        prompt="Still unsure about your eligibility?"
        onSwitchToChecker={onSwitchToChecker}
      />
    </div>
  );
}

// ===========================================================================
// ApplyLink
// ===========================================================================

interface ApplyLinkProps {
  label?: string;
  className?: string;
}

function ApplyLink({ label = "Apply Now", className = "" }: ApplyLinkProps) {
  return (
    <a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={[
        "flex min-h-[48px] items-center justify-center rounded-lg bg-[#080b50] py-3 text-center text-[14px] font-bold text-white transition-opacity hover:opacity-90 sm:py-3.5 sm:text-[16px]",
        className,
      ].join(" ")}
    >
      {label}
    </a>
  );
}

// StatusMark — per-subject marker on the result screen
function StatusMark({ status }: { status: SubjectStatus }) {
  if (status === "bsc") {
    return <Check className="text-[#73D2F6]" size={22} strokeWidth={2.5} aria-label="Meets BSc requirement" />;
  }
  if (status === "diploma") {
    return (
      <span
        className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold leading-none text-amber-800 sm:text-[11px]"
        aria-label="Meets Diploma requirement only"
      >
        Diploma
      </span>
    );
  }
  return <X size={22} className="text-red-500" aria-label="Does not meet requirement" />;
}

// ===========================================================================
// Main component
// ===========================================================================

export default function CheckEligibility() {
  const [tab, setTab] = useState<Tab>("checker");
  const [step, setStep] = useState<Step>({ kind: "form" });
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [form, setForm] = useState<EligibilityFormData>(() => ({ ...EMPTY_FORM }));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [step.kind]);

  const update = <K extends keyof EligibilityFormData>(
    key: K,
    value: EligibilityFormData[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const result = useMemo(() => checkEligibility(form), [form]);
  const areas = useMemo(() => matchCsAreas(form), [form]);
  const evaluatedSixSubjects = useMemo(
    () => result.subjects.filter((s) => s.isEvaluatedInTop6),
    [result],
  );

  const coresFilled = Boolean(form.english && form.mathCore && form.integratedScience);

  const custom1Issue = customElectiveIssue(form.customElective1Name, form.customElective1Grade);
  const custom2Issue = customElectiveIssue(form.customElective2Name, form.customElective2Grade);

  function handleCheck() {
    if (result.isIncomplete) setShowIncompleteModal(true);
    else setStep({ kind: "result" });
  }

  function handleCloseModal() {
    setShowIncompleteModal(false);
    if (!result.hasElectiveMath) {
      requestAnimationFrame(() => {
        document
          .getElementById("field-math-elective")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  function handleSwitchToChecker() {
    setTab("checker");
    setStep({ kind: "form" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }

  const isBsc = result.outcome === "bsc";
  const isDiploma = result.outcome === "diploma";

  return (
    <section className="w-full overflow-x-hidden bg-white py-6 text-[#080b50] sm:py-12">
      {showIncompleteModal && (
        <IncompleteModal
          totalElectivesEntered={result.totalElectivesEntered}
          hasElectiveMath={result.hasElectiveMath}
          onClose={handleCloseModal}
        />
      )}

      <div className="mx-auto w-full max-w-[900px] px-3 sm:px-6">
        <MainHeader />

        <div className="rounded-lg bg-white p-0 sm:p-6">
          <TabBar tab={tab} setTab={setTab} />

          <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
          {tab === "requirements" && (
            <RequirementsPanel onSwitchToChecker={handleSwitchToChecker} />
          )}
          {tab === "faqs" && (
            <FaqsPanel onSwitchToChecker={handleSwitchToChecker} />
          )}

          {/* --------------------------- STEP: FORM --------------------------- */}
          {tab === "checker" && step.kind === "form" && (
            <div className="py-3 sm:py-6">
              <div className="mb-6 flex gap-3 rounded-md border border-[#203b82]/30 bg-[#77D4FF]/30 p-3 text-[12px] leading-relaxed text-[#060740] sm:mb-8 sm:gap-4 sm:p-5 sm:text-[13px]">
                <div className="flex shrink-0 flex-col items-center pt-0.5">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-[#060740]" aria-hidden="true" />
                  <div className="mt-2 w-[1.5px] flex-1 bg-[#18337A]" />
                </div>

                <div className="min-w-0 space-y-1.5">
                  <div>
                    <p className="mb-1 text-[14px] font-bold sm:text-base">Before You Start</p>
                    <p>Enter your WASSCE grades exactly as they appear on your results.</p>
                  </div>
                  <div>
                    <p className="font-bold">Core Subjects</p>
                    <p className="text-gray-700">
                      • English Language, Core Mathematics and Integrated Science are required.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Electives</p>
                    <p className="text-gray-700">
                      • Elective Mathematics is required. Select at least two additional electives.
                    </p>
                  </div>
                  <div>
                    <p className="font-bold">Minimum Grades</p>
                    <p className="text-gray-700">
                      • BSc: {BSC_RANGE_LABEL} in all required subjects.
                    </p>
                    <p className="text-gray-700">
                      • Diploma: electives may be as low as {DIPLOMA_MIN_LABEL}; core subjects stay at {BSC_MIN_LABEL}.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 text-[15px] font-bold sm:mb-4 sm:text-[17px]">
                1 — Core Subjects (Required)
              </h3>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4">
                <GradeSelect
                  label="English Language"
                  value={form.english}
                  onChange={(g) => update("english", g)}
                />
                <GradeSelect
                  label="Mathematics (Core)"
                  value={form.mathCore}
                  onChange={(g) => update("mathCore", g)}
                />
                <GradeSelect
                  label="Integrated Science"
                  value={form.integratedScience}
                  onChange={(g) => update("integratedScience", g)}
                  helperText={`Minimum required grade is ${BSC_MIN_LABEL}.`}
                />
              </div>

              <h3 className="mb-3 text-[15px] font-bold sm:mb-4 sm:text-[17px]">
                2 — Elective Subjects
              </h3>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <GradeSelect
                  anchorId="field-math-elective"
                  label="Mathematics (Elective)"
                  value={form.mathElective}
                  onChange={(g) => update("mathElective", g)}
                  required
                />
                <GradeSelect label="Physics" value={form.physics} onChange={(g) => update("physics", g)} />
                <GradeSelect label="Chemistry" value={form.chemistry} onChange={(g) => update("chemistry", g)} />
                <GradeSelect label="Biology" value={form.biology} onChange={(g) => update("biology", g)} />
                <GradeSelect label="Elective ICT" value={form.electiveIct} onChange={(g) => update("electiveIct", g)} />
              </div>

              <h3 className="mb-3 text-[15px] font-bold sm:mb-4 sm:text-[17px]">Optional Subjects</h3>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:mb-8 sm:grid-cols-2 sm:gap-4">
                <div className="space-y-3">
                  <TextInput
                    label="Other Elective 1 — Subject Name"
                    placeholder="e.g. Further Mathematics"
                    value={form.customElective1Name}
                    onChange={(v) => update("customElective1Name", v)}
                  />
                  <GradeSelect
                    label="Other Elective 1 — Grade"
                    value={form.customElective1Grade}
                    onChange={(g) => update("customElective1Grade", g)}
                  />
                  <FieldNote message={custom1Issue} />
                </div>
                <div className="space-y-3">
                  <TextInput
                    label="Other Elective 2 — Subject Name"
                    placeholder="e.g. Geography"
                    value={form.customElective2Name}
                    onChange={(v) => update("customElective2Name", v)}
                  />
                  <GradeSelect
                    label="Other Elective 2 — Grade"
                    value={form.customElective2Grade}
                    onChange={(g) => update("customElective2Grade", g)}
                  />
                  <FieldNote message={custom2Issue} />
                </div>
              </div>

              <button
                type="button"
                disabled={!coresFilled}
                onClick={handleCheck}
                className="min-h-[48px] w-full rounded-md bg-[#080b50] py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Check My Eligibility
              </button>
            </div>
          )}

          {/* -------------------------- STEP: RESULT -------------------------- */}
          {tab === "checker" && step.kind === "result" && (
            <div className="py-2">
              <button
                type="button"
                onClick={() => setStep({ kind: "form" })}
                className="mb-5 flex min-h-[44px] items-center gap-1.5 text-[14px] font-medium text-[#080b50] hover:opacity-80 sm:mb-6 sm:text-[15px]"
              >
                <ArrowLeft size={18} aria-hidden="true" /> Back
              </button>

              <div className="text-center">
                <div className="inline-block border-b-2 border-[#080b50] pb-1">
                  <h2 className="text-[14px] font-semibold tracking-wider text-[#080b50] sm:text-[20px]">
                    YOUR ELIGIBILITY RESULT
                  </h2>
                </div>

                <div className="mb-6 mt-6 flex flex-col items-center justify-center sm:mt-8">
                  {isBsc && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#73D2F6] text-white sm:h-10 sm:w-10">
                        <Check size={22} strokeWidth={3} aria-hidden="true" className="sm:hidden" />
                        <Check size={25} strokeWidth={3} aria-hidden="true" className="hidden sm:block" />
                      </div>
                      <span className="text-[22px] font-semibold tracking-wide text-[#080b50] sm:text-[32px]">
                        ELIGIBLE
                      </span>
                    </div>
                  )}
                  {isDiploma && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white sm:h-10 sm:w-10">
                        <Check size={22} strokeWidth={3} aria-hidden="true" className="sm:hidden" />
                        <Check size={25} strokeWidth={3} aria-hidden="true" className="hidden sm:block" />
                      </div>
                      <span className="text-[20px] font-semibold tracking-wide text-[#080b50] sm:text-[30px]">
                        DIPLOMA ELIGIBLE
                      </span>
                    </div>
                  )}
                  {result.outcome === "none" && (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <XCircle className="fill-red-500 text-white" size={38} aria-hidden="true" />
                      <span className="text-[22px] font-semibold tracking-wide text-[#080b50] sm:text-[32px]">
                        INELIGIBLE
                      </span>
                    </div>
                  )}
                </div>

                <p className="mx-auto mt-2 max-w-[420px] px-2 text-[13px] font-medium text-[#080b50] sm:text-[15px]">
                  {isBsc && "You meet the minimum requirements for BSc Computer Science."}
                  {isDiploma &&
                    "You don't meet the BSc minimum, but you meet the requirements for the Diploma in Computer Science."}
                  {result.outcome === "none" &&
                    "You currently do not meet the minimum WASSCE requirements for the Computer Science programmes."}
                </p>

                <div className="my-6 border-b border-[#080b50] sm:my-8" />

                <p className="-mt-4 mb-6 text-[12px] font-extrabold uppercase tracking-wider text-[#080b50] sm:-mt-5 sm:mb-8 sm:text-[15px]">
                  REQUIREMENT CHECK
                </p>

                <ul className="mx-auto max-w-[460px] space-y-3 text-left sm:space-y-4">
                  {evaluatedSixSubjects.map((s) => (
                    <li
                      key={s.id}
                      className="flex items-center justify-between gap-2 text-[13px] font-medium sm:gap-3 sm:text-[15px]"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-[#080b50] sm:gap-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#080b50]" />
                        <span className="truncate">{s.label}</span>
                      </span>
                      <div className="flex shrink-0 items-center gap-2 sm:gap-8 lg:gap-12">
                        <span className="w-7 text-right text-[#080b50] sm:w-8">{s.grade || "—"}</span>
                        <div className="flex w-14 justify-end sm:w-16">
                          <StatusMark status={s.status} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {isDiploma && (
                  <p className="mx-auto mt-5 max-w-[420px] px-2 text-center text-[12px] text-gray-500 sm:mt-6 sm:text-[13px]">
                    Subjects marked <strong>Diploma</strong> are below the BSc minimum ({BSC_MIN_LABEL}) but
                    accepted for the Diploma.
                  </p>
                )}

                <div className="mx-auto mt-8 flex max-w-[620px] flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-5">
                  {result.eligible && (
                    <>
                      <button
                        type="button"
                        onClick={() => setStep({ kind: "areas" })}
                        className="min-h-[48px] flex-1 rounded-lg border-2 border-[#080b50] py-3 text-[14px] font-bold text-[#080b50] transition-opacity hover:opacity-80 sm:py-3.5 sm:text-[16px]"
                      >
                        Explore Potential CS Areas
                      </button>
                      <ApplyLink className="flex-1" />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------- STEP: AREAS --------------------------- */}
          {tab === "checker" && step.kind === "areas" && (
            <div className="py-4 sm:py-8">
              <button
                type="button"
                onClick={() => setStep({ kind: "result" })}
                className="mb-5 flex min-h-[44px] items-center gap-1 text-[13px] font-semibold text-[#18337A] hover:opacity-80 sm:mb-8 sm:text-[14px]"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>

              <div className="mb-6 text-center sm:mb-10">
                <span className="inline-block border-b-2 border-[#080b50] pb-1 text-[13px] font-extrabold uppercase tracking-wider text-[#080b50] sm:text-[18px]">
                  POTENTIAL CS AREAS MATCH RATING
                </span>
                <p className="mx-auto mt-4 max-w-[520px] px-2 text-[13px] leading-relaxed text-gray-600 sm:mt-6 sm:text-[16px]">
                  {isDiploma
                    ? "Based on your subjects and grades, these are the areas closest to your profile. Select an area to see career options."
                    : "Based on your subjects and grades, these are the top 3 areas best matched to your profile. Select an area to see career options."}
                </p>
              </div>

              <div className="mx-auto max-w-[680px] space-y-5 sm:space-y-6">
                {areas.slice(0, 3).map((area) => (
                  <button
                    key={area.key}
                    type="button"
                    onClick={() => setStep({ kind: "career", area })}
                    className="block w-full rounded-lg p-1.5 text-left transition-colors hover:bg-[#D9EEFF]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#203b82]/40 sm:p-2"
                    aria-label={`${area.name}, ${area.fitLabel} match. View careers.`}
                  >
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                      <span className="shrink-0 text-[13px] font-bold text-[#080b50] sm:w-1/3 sm:text-[16px]">
                        {area.name}
                      </span>

                      <div className="flex flex-1 items-center gap-2 sm:gap-3">
                        {/* Track: #77D4FF (light blue). Fill: #060740 (dark navy). */}
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#77D4FF] sm:h-2">
                          <div
                            className="h-full rounded-full bg-[#060740] transition-all duration-500 ease-out"
                            style={{ width: `${Math.max(6, area.fitPercent)}%` }}
                          />
                        </div>
                        <span className="min-w-[60px] text-right text-[12px] font-bold text-[#080b50] sm:min-w-[70px] sm:text-[14px]">
                          {area.fitLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mx-auto mb-4 mt-10 flex max-w-[580px] flex-col gap-3 sm:mb-6 sm:mt-14 sm:flex-row sm:gap-5 sm:px-4">
                <button
                  type="button"
                  onClick={() => setStep({ kind: "career", area: areas[0] })}
                  className="min-h-[48px] flex-1 rounded-xl border-2 border-[#080b50] px-4 py-3 text-[14px] font-bold text-[#080b50] transition-all hover:bg-[#080b50] hover:text-white sm:px-6 sm:py-4 sm:text-[15px]"
                >
                  Explore Career Opportunities
                </button>
                <ApplyLink className="flex-1 rounded-xl px-4 py-3 sm:px-6 sm:py-4 sm:text-[15px]" />
              </div>
            </div>
          )}

          {/* -------------------------- STEP: CAREER -------------------------- */}
          {tab === "checker" && step.kind === "career" && (
            <div className="py-4 sm:py-8">
              <button
                type="button"
                onClick={() => setStep({ kind: "areas" })}
                className="mb-5 flex min-h-[44px] items-center gap-1 text-[13px] font-semibold text-[#18337A] hover:opacity-80 sm:mb-8 sm:text-[14px]"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>

              <div className="mb-6 text-center">
                <h3 className="inline-block border-b-2 border-[#080b50] pb-2 text-[18px] font-extrabold uppercase tracking-wide text-[#080b50] sm:text-[28px]">
                  {step.area.name}
                </h3>
                <p className="mx-auto mt-4 max-w-[520px] px-2 text-[13px] leading-relaxed text-gray-600 sm:mt-5 sm:text-[16px]">
                  {step.area.description}
                </p>
              </div>

              <div className="my-8 border-t-2 border-[#080b50] sm:my-10" />

              <p className="mb-6 text-center text-[12px] font-extrabold uppercase tracking-wider text-[#080b50] sm:mb-8 sm:text-[15px]">
                CAREER OPPORTUNITIES
              </p>

              <div className="mx-auto max-w-[700px] text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] font-semibold text-[#080b50] sm:gap-x-3 sm:gap-y-3 sm:text-[16px]">
                  {step.area.careers.map((career, index) => (
                    <div key={career} className="flex items-center gap-2 sm:gap-3">
                      <span className="transition-colors hover:text-[#0798d1]">{career}</span>
                      {index < step.area.careers.length - 1 && (
                        <span className="select-none font-bold text-[#0798d1]" aria-hidden="true">
                          |
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <ApplyLink className="mt-10 w-full rounded-xl py-3.5 sm:mt-14 sm:py-4 sm:text-[16px]" />
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}