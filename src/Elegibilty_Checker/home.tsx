import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {ArrowLeft, Check, X, XCircle, AlertTriangle, AlertCircle, ChevronDown,} from "lucide-react";

// GRADE SCALE
// ===========================================================================

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

function isQualifyingGrade(grade: Grade): boolean {
  if (!grade) return false;
  const { rank } = GRADE_INFO[grade];
  return rank >= 1 && rank <= 6;
}

// ELIGIBILITY LOGIC
// ===========================================================================

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

interface SubjectCheck {
  id: string;
  label: string;
  grade: Grade;
  required: boolean;
  passed: boolean;
  isEvaluatedInTop6?: boolean;
}

interface EligibilityResult {
  eligible: boolean;
  missingCore: boolean;
  missingMathElective: boolean;
  qualifyingElectiveCount: number;
  totalElectivesEntered: number;
  hasElectiveMath: boolean;
  subjects: SubjectCheck[];
  isIncomplete: boolean;
}

function checkEligibility(form: EligibilityFormData): EligibilityResult {
  const coreSubjects: SubjectCheck[] = [
    { id: "english", label: "English Language", grade: form.english, required: true, passed: isQualifyingGrade(form.english) },
    { id: "math-core", label: "Mathematics (Core)", grade: form.mathCore, required: true, passed: isQualifyingGrade(form.mathCore) },
    { id: "integrated-science", label: "Integrated Science", grade: form.integratedScience, required: true, passed: isQualifyingGrade(form.integratedScience) },
  ];

  const mathElective: SubjectCheck = {
    id: "math-elective",
    label: "Mathematics (Elective)",
    grade: form.mathElective,
    required: true,
    passed: isQualifyingGrade(form.mathElective),
  };

  const rawOtherElectives: SubjectCheck[] = [
    { id: "physics", label: "Physics", grade: form.physics, required: false, passed: isQualifyingGrade(form.physics) },
    { id: "chemistry", label: "Chemistry", grade: form.chemistry, required: false, passed: isQualifyingGrade(form.chemistry) },
    { id: "biology", label: "Biology", grade: form.biology, required: false, passed: isQualifyingGrade(form.biology) },
    { id: "elective-ict", label: "Elective ICT", grade: form.electiveIct, required: false, passed: isQualifyingGrade(form.electiveIct) },
  ];

  if (form.customElective1Name.trim() && form.customElective1Grade !== "") {
    rawOtherElectives.push({
      id: "custom-1",
      label: form.customElective1Name.trim(),
      grade: form.customElective1Grade,
      required: false,
      passed: isQualifyingGrade(form.customElective1Grade),
    });
  }

  if (form.customElective2Name.trim() && form.customElective2Grade !== "") {
    rawOtherElectives.push({
      id: "custom-2",
      label: form.customElective2Name.trim(),
      grade: form.customElective2Grade,
      required: false,
      passed: isQualifyingGrade(form.customElective2Grade),
    });
  }

  const filledOtherElectives = rawOtherElectives.filter((s) => s.grade !== "");
  const hasElectiveMath = form.mathElective !== "";
  const totalElectivesEntered = filledOtherElectives.length + (hasElectiveMath ? 1 : 0);

  const isIncomplete = totalElectivesEntered < 3 || !hasElectiveMath;

  const top2Electives = [...filledOtherElectives]
    .sort((a, b) => getGradeRank(a.grade) - getGradeRank(b.grade))
    .slice(0, 2);
  const top2Ids = new Set(top2Electives.map((s) => s.id));

  const missingCore = coreSubjects.some((s) => !s.passed);
  const missingMathElective = !mathElective.passed;
  const qualifyingTop2Count = top2Electives.filter((s) => s.passed).length;

  const eligible =
    !isIncomplete && !missingCore && !missingMathElective && qualifyingTop2Count >= 2;

  const subjects: SubjectCheck[] = [
    ...coreSubjects.map((s) => ({ ...s, isEvaluatedInTop6: true })),
    { ...mathElective, isEvaluatedInTop6: true },
    ...rawOtherElectives.map((s) => ({
      ...s,
      isEvaluatedInTop6: top2Ids.has(s.id),
    })),
  ];

  return {
    eligible,
    missingCore,
    missingMathElective,
    qualifyingElectiveCount: qualifyingTop2Count,
    totalElectivesEntered,
    hasElectiveMath,
    subjects,
    isIncomplete,
  };
}

// CS AREA MATCHING
// ===========================================================================

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
  const fitPercent = Math.round(rawPercent);
  return {
    key,
    name,
    fitPercent,
    fitLabel: fitLabelFor(fitPercent),
    description,
    careers,
  };
}

function matchCsAreas(form: EligibilityFormData): AreaMatch[] {
  const mathE = gradePoints(form.mathElective);
  const ict = gradePoints(form.electiveIct);
  const physics = gradePoints(form.physics);
  const mathCore = gradePoints(form.mathCore);
  const chemistry = gradePoints(form.chemistry);

  const MAX = 8;

  const softwareEngineering = ((mathE * 2 + ict * 2 + mathCore) / (MAX * 5)) * 100;
  const cybersecurity = ((ict * 2 + mathE + mathCore) / (MAX * 4)) * 100;
  const aiAndMl =
    ((mathE * 2 + physics + mathCore + (chemistry > 0 ? chemistry * 0.5 : 0)) / (MAX * 4.5)) * 100;

  const areas: AreaMatch[] = [
    toArea(
      "software-engineering",
      "Software Engineering",
      softwareEngineering,
      "Your performance in Elective Mathematics and ICT supports this pathway.",
      ["Software Developer", "Web Developer", "Backend Developer", "Full-Stack Developer", "QA Analyst"],
    ),
    toArea(
      "cybersecurity",
      "Cybersecurity",
      cybersecurity,
      "Strong ICT and Mathematics grades support work in systems and security.",
      ["Security Analyst", "Network Administrator", "Penetration Tester", "SOC Analyst", "IT Auditor"],
    ),
    toArea(
      "ai-ml",
      "Artificial Intelligence & ML",
      aiAndMl,
      "Mathematics and science grades support this data- and math-heavy pathway.",
      ["Machine Learning Engineer", "Data Scientist", "Data Analyst", "AI Research Assistant", "Data Engineer"],
    ),
  ];

  return areas.sort((a, b) => b.fitPercent - a.fitPercent);
}


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

// GradeSelect — RESIZED dropdown || For responsitivity.
// ===========================================================================
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
          // RESIZED: smaller chevron, tighter right offset
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


function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string; short: string }[] = [
    { key: "checker", label: "Eligibility Checker", short: "Checker" },
    { key: "requirements", label: "Requirements", short: "Requirements" },
    { key: "faqs", label: "FAQs", short: "FAQs" },
  ];

  return (
    <div
      role="tablist"
      aria-label="Eligibility sections"
      className="mb-6 flex w-full items-stretch gap-1 overflow-x-auto border-b border-gray-200 sm:mb-8"
    >
      {tabs.map((t) => {
        const selected = tab === t.key;
        return (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={selected}
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

// IncompleteModal — Portal, scroll-locked, always centered in viewport.
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
  const titleId = useId();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 50);
    return () => clearTimeout(timer);
  }, []);

  // Lock body scroll while modal is open.
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
    const focusTimer = setTimeout(() => closeButtonRef.current?.focus(), 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex h-[100vh] h-[100dvh] w-screen items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
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

// Static panels

function RequirementsPanel() {
  return (
    <div className="py-3 text-[#080b50] sm:py-6">
      <h3 className="mb-4 text-[17px] font-bold sm:mb-6 sm:text-[22px]">
        Minimum WASSCE Requirements
      </h3>
      <ul className="space-y-3 text-[14px] leading-relaxed text-gray-700 sm:space-y-6 sm:text-[16px]">
        <li className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
          <span className="mb-1 block font-bold text-[#080b50]">Core Subjects (Required)</span>
          English Language, Core Mathematics, and Integrated Science.
        </li>
        <li className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
          <span className="mb-1 block font-bold text-[#080b50]">Elective Subjects</span>
          Elective Mathematics is required. You also need at least two further electives (Physics, Chemistry, Biology,
          Elective ICT, or another elective you name).
        </li>
        <li className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-4">
          <span className="mb-1 block font-bold text-[#080b50]">Minimum Grade Threshold</span>
          A1–C6 counts as a qualifying grade for every subject above.
        </li>
      </ul>
    </div>
  );
}

const FAQS = [
  {
    q: "What if I haven't received my WASSCE results yet?",
    a: "You can still use the checker with your mock or predicted grades to get a sense of where you stand, but your final application will be assessed on your official results.",
  },
  {
    q: "Does the checker store or submit my grades anywhere?",
    a: "No — everything runs in your browser. Nothing is saved or sent anywhere unless you choose to apply.",
  },
  {
    q: "I'm close but not eligible. What can I do?",
    a: "Reach out to the admissions office — resit options and alternative entry routes are handled case by case.",
  },
  {
    q: "How is the 'Potential CS Areas' match calculated?",
    a: "It's a rough guide based on your Mathematics, ICT, and science grades, weighted toward the subjects most relevant to each area. It's meant to help you explore, not to limit your choices.",
  },
];

function FaqsPanel() {
  return (
    <div className="py-3 sm:py-6">
      <h3 className="mb-4 text-[17px] font-bold text-[#080b50] sm:mb-6 sm:text-[22px]">
        Frequently Asked Questions
      </h3>
      <div className="space-y-3 sm:space-y-6">
        {FAQS.map((f) => (
          <div key={f.q} className="rounded-lg border border-gray-100 bg-gray-50 p-3 sm:p-5">
            <p className="text-[14px] font-semibold text-[#080b50] sm:text-[17px]">{f.q}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-600 sm:text-[15px]">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main component
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

          {tab === "requirements" && <RequirementsPanel />}
          {tab === "faqs" && <FaqsPanel />}

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
                    <p className="font-bold">Minimum Grade</p>
                    <p className="text-gray-700">
                      • A1–C6 is considered a qualifying grade for this checker.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 text-[15px] font-bold sm:mb-4 sm:text-[17px]">
                1 - Core Subjects (Required)
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
                  helperText="Minimum Required Grade is C6."
                />
              </div>

              <h3 className="mb-3 text-[15px] font-bold sm:mb-4 sm:text-[17px]">
                2 - Elective Subjects
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
                  {result.eligible ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#73D2F6] text-white sm:h-10 sm:w-10">
                        <Check size={22} strokeWidth={3} aria-hidden="true" className="sm:hidden" />
                        <Check size={25} strokeWidth={3} aria-hidden="true" className="hidden sm:block" />
                      </div>
                      <span className="text-[22px] font-semibold tracking-wide text-[#080b50] sm:text-[32px]">
                        ELIGIBLE
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <XCircle className="fill-red-500 text-white" size={38} aria-hidden="true" />
                      <span className="text-[22px] font-semibold tracking-wide text-[#080b50] sm:text-[32px]">
                        INELIGIBLE
                      </span>
                    </div>
                  )}
                </div>

                <p className="mx-auto mt-2 max-w-[420px] px-2 text-[13px] font-medium text-[#080b50] sm:text-[15px]">
                  {result.eligible
                    ? "You meet the minimum requirements for BSc Computer Science."
                    : "You currently do not meet the minimum WASSCE requirements for the Computer Science programme."}
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
                        <div className="flex w-7 justify-end sm:w-8">
                          {s.passed ? (
                            <Check className="text-[#73D2F6]" size={22} strokeWidth={2.5} aria-hidden="true" />
                          ) : (
                            <X size={22} className="text-red-500" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {!result.eligible && result.qualifyingElectiveCount < 2 && (
                  <p className="mx-auto mt-5 max-w-[420px] px-2 text-center text-[12px] text-gray-500 sm:mt-6 sm:text-[13px]">
                    You need at least two qualifying electives beyond Mathematics — you currently have{" "}
                    {result.qualifyingElectiveCount}.
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
                      <a
                        href="https://admissions.uenr.edu.gh/"
                        className="min-h-[48px] flex-1 rounded-lg bg-[#080b50] py-3 text-center text-[14px] font-bold text-white transition-opacity hover:opacity-90 sm:py-3.5 sm:text-[16px]"
                      >
                        Apply Now
                      </a>
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
                  Based on your subjects and grades, these areas may be worth exploring.
                </p>
              </div>

              <div className="mx-auto max-w-[680px] space-y-5 sm:space-y-6">
                {areas.map((area) => (
                  <div key={area.key} className="block w-full text-left">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-4">
                      <span className="shrink-0 text-[13px] font-bold text-[#080b50] sm:w-1/3 sm:text-[16px]">
                        {area.name}
                      </span>

                      <div className="flex flex-1 items-center gap-2 sm:gap-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200/80">
                          <div
                            className="h-full rounded-full bg-[#080b50]"
                            style={{ width: `${Math.max(8, area.fitPercent)}%` }}
                          />
                        </div>
                        <span className="min-w-[60px] text-right text-[12px] font-bold text-[#080b50] sm:min-w-[70px] sm:text-[14px]">
                          {area.fitLabel}
                        </span>
                      </div>
                    </div>
                  </div>
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
                <a
                  href="https://admissions.uenr.edu.gh/"
                  className="min-h-[48px] flex-1 rounded-xl bg-[#080b50] px-4 py-3 text-center text-[14px] font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:px-6 sm:py-4 sm:text-[15px]"
                >
                  Apply Now
                </a>
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
              <a
                href="https://admissions.uenr.edu.gh/"
                className="mt-10 block min-h-[48px] w-full rounded-xl bg-[#080b50] py-3.5 text-center text-[14px] font-bold text-white shadow-md transition-opacity hover:opacity-90 sm:mt-14 sm:py-4 sm:text-[16px]"
              >
                Apply Now
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}