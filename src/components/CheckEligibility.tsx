import { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  Check,
  X,
  XCircle,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Grade scale + eligibility / CS-area-matching logic
// ---------------------------------------------------------------------------

type Grade = "A1" | "B2" | "B3" | "C4" | "C5" | "C6" | "D7" | "E8" | "F9" | "";

const GRADE_OPTIONS: Grade[] = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];

const GRADE_POINTS: Record<Exclude<Grade, "">, number> = {
  A1: 8,
  B2: 7,
  B3: 6,
  C4: 5,
  C5: 4,
  C6: 3,
  D7: 2,
  E8: 1,
  F9: 0,
};

function getGradeRank(grade: Grade): number {
  const ranks: Record<Exclude<Grade, "">, number> = {
    A1: 1,
    B2: 2,
    B3: 3,
    C4: 4,
    C5: 5,
    C6: 6,
    D7: 7,
    E8: 8,
    F9: 9,
  };
  if (!grade) return 99;
  return ranks[grade];
}

function isQualifyingGrade(grade: Grade): boolean {
  const rank = getGradeRank(grade);
  return rank >= 1 && rank <= 6;
}

function gradePoints(grade: Grade): number {
  if (!grade) return 0;
  return GRADE_POINTS[grade];
}

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
    { label: "English Language", grade: form.english, required: true, passed: isQualifyingGrade(form.english) },
    { label: "Mathematics (Core)", grade: form.mathCore, required: true, passed: isQualifyingGrade(form.mathCore) },
    { label: "Integrated Science", grade: form.integratedScience, required: true, passed: isQualifyingGrade(form.integratedScience) },
  ];

  const mathElective: SubjectCheck = {
    label: "Mathematics (Elective)",
    grade: form.mathElective,
    required: true,
    passed: isQualifyingGrade(form.mathElective),
  };

  const rawOtherElectives: SubjectCheck[] = [
    { label: "Physics", grade: form.physics, required: false, passed: isQualifyingGrade(form.physics) },
    { label: "Chemistry", grade: form.chemistry, required: false, passed: isQualifyingGrade(form.chemistry) },
    { label: "Biology", grade: form.biology, required: false, passed: isQualifyingGrade(form.biology) },
    { label: "Elective ICT", grade: form.electiveIct, required: false, passed: isQualifyingGrade(form.electiveIct) },
  ];

  if (form.customElective1Name.trim() && form.customElective1Grade !== "") {
    rawOtherElectives.push({
      label: form.customElective1Name.trim(),
      grade: form.customElective1Grade,
      required: false,
      passed: isQualifyingGrade(form.customElective1Grade),
    });
  }

  if (form.customElective2Name.trim() && form.customElective2Grade !== "") {
    rawOtherElectives.push({
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

  filledOtherElectives.sort((a, b) => getGradeRank(a.grade) - getGradeRank(b.grade));
  const top2Electives = filledOtherElectives.slice(0, 2);

  const missingCore = coreSubjects.some((s) => !s.passed);
  const missingMathElective = !mathElective.passed;
  const qualifyingTop2Count = top2Electives.filter((s) => s.passed).length;

  const eligible = !isIncomplete && !missingCore && !missingMathElective && qualifyingTop2Count >= 2;

  const subjects: SubjectCheck[] = [
    ...coreSubjects.map((s) => ({ ...s, isEvaluatedInTop6: true })),
    { ...mathElective, isEvaluatedInTop6: true },
    ...rawOtherElectives.map((s) => ({
      ...s,
      isEvaluatedInTop6: top2Electives.some((t) => t.label === s.label && t.grade === s.grade),
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
    {
      key: "software-engineering",
      name: "Software Engineering",
      fitPercent: Math.round(softwareEngineering),
      fitLabel: fitLabelFor(softwareEngineering),
      description: "Your performance in Elective Mathematics and ICT supports this pathway.",
      careers: ["Software Developer", "Web Developer", "Backend Developer", "Full-Stack Developer", "QA Analyst"],
    },
    {
      key: "cybersecurity",
      name: "Cybersecurity",
      fitPercent: Math.round(cybersecurity),
      fitLabel: fitLabelFor(cybersecurity),
      description: "Strong ICT and Mathematics grades support work in systems and security.",
      careers: ["Security Analyst", "Network Administrator", "Penetration Tester", "SOC Analyst", "IT Auditor"],
    },
    {
      key: "ai-ml",
      name: "Artificial Intelligence & ML",
      fitPercent: Math.round(aiAndMl),
      fitLabel: fitLabelFor(aiAndMl),
      description: "Mathematics and science grades support this data- and math-heavy pathway.",
      careers: ["Machine Learning Engineer", "Data Scientist", "Data Analyst", "AI Research Assistant", "Data Engineer"],
    },
  ];

  return areas.sort((a, b) => b.fitPercent - a.fitPercent);
}

// ---------------------------------------------------------------------------
// UI Helper Components
// ---------------------------------------------------------------------------

type Tab = "checker" | "requirements" | "faqs";
type Step = "form" | "result" | "areas" | "career";

const inputLabel = "mb-1 block text-[14px] font-semibold text-[#080b50]";
const selectClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-[15px] text-[#080b50] outline-none transition-colors focus:border-[#203b82]";
const textInputClass =
  "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-[15px] text-[#080b50] outline-none transition-colors focus:border-[#203b82] placeholder:text-gray-400";

/**
 * Shared Header for consistent title & subtitle across steps
 */
function MainHeader() {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-[34px] font-extrabold tracking-[-1px] sm:text-[42px] text-[#18337A]">
        <span className="block">Computer Science</span>
        <span className="block">Admission Assistant</span>
      </h1>
      <p className="mt-4 text-[18px] sm:text-[20px] text-[#18337A] leading-relaxed">
        Enter your WASSCE results to find out whether you meet the minimum <br className="hidden sm:inline" />
        requirements for Computer Science.
      </p>
    </div>
  );
}

function GradeSelect({
  value,
  onChange,
  label,
  placeholder = "Select a grade",
}: {
  value: Grade;
  onChange: (g: Grade) => void;
  label: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={inputLabel}>{label}</label>
      <select className={selectClass} value={value} onChange={(e) => onChange(e.target.value as Grade)}>
        <option value="">{placeholder}</option>
        {GRADE_OPTIONS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Requirement 2: Even spacing across tabs
 */
function TabBar({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "checker", label: "Eligibility Checker" },
    { key: "requirements", label: "Requirements" },
    { key: "faqs", label: "FAQs" },
  ];
  return (
    <div className="flex w-full items-center justify-between border-b border-gray-200 mb-8">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => setTab(t.key)}
          className={`flex-1 text-center pb-3 text-[15px] sm:text-[16px] font-semibold transition-colors border-b-2 px-2 ${
            tab === t.key
              ? "border-[#080b50] text-[#080b50]"
              : "border-transparent text-gray-400 hover:text-[#203b82]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[500px] overflow-hidden rounded-2xl bg-white p-5 sm:p-8 pt-8 sm:pt-10 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div
          className="absolute top-0 left-0 h-2 bg-purple-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-50 text-purple-600">
          <AlertCircle size={44} strokeWidth={1.75} />
        </div>

        <h2 className="text-[25px] font-bold text-[#080b50]">More information required</h2>

        <p className="mx-auto mt-3 max-w-[360px] text-[18px] leading-relaxed text-gray-600">
          {!hasElectiveMath ? (
            <>
              Please select a grade for <strong>Elective Mathematics</strong> and enter at least 3 electives in total
              to continue.
            </>
          ) : (
            <>
              You have entered only {totalElectivesEntered} elective{totalElectivesEntered === 1 ? "" : "s"}. Please
              provide at least 3 electives, including Elective Mathematics, to continue.
            </>
          )}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-lg border border-[#080b50] px-8 py-2.5 text-[15px] font-semibold text-[#080b50] transition-colors hover:bg-gray-50 active:bg-gray-100"
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}

function RequirementsPanel() {
  return (
    <div className="py-4 sm:py-6 text-[#080b50]">
      <h3 className="mb-6 text-[22px] font-bold">Minimum WASSCE Requirements</h3>
      <ul className="space-y-6 text-[16px] leading-relaxed text-gray-700">
        <li className="rounded-lg bg-gray-50 p-4 border border-gray-100">
          <span className="font-bold text-[#080b50] block mb-1">Core Subjects (Required)</span>
          English Language, Core Mathematics, and Integrated Science.
        </li>
        <li className="rounded-lg bg-gray-50 p-4 border border-gray-100">
          <span className="font-bold text-[#080b50] block mb-1">Elective Subjects</span>
          Elective Mathematics is required. You also need at least two further electives (Physics, Chemistry, Biology,
          Elective ICT, or another elective you name).
        </li>
        <li className="rounded-lg bg-gray-50 p-4 border border-gray-100">
          <span className="font-bold text-[#080b50] block mb-1">Minimum Grade Threshold</span>
          A1–C6 counts as a qualifying grade for every subject above.
        </li>
      </ul>
    </div>
  );
}

function FaqsPanel() {
  const faqs = [
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
  return (
    <div className="py-4 sm:py-6">
      <h3 className="mb-6 text-[22px] font-bold text-[#080b50]">Frequently Asked Questions</h3>
      <div className="space-y-6">
        {faqs.map((f) => (
          <div key={f.q} className="rounded-lg bg-gray-50 p-5 border border-gray-100">
            <p className="text-[17px] font-semibold text-[#080b50]">{f.q}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function CheckEligibility() {
  const [tab, setTab] = useState<Tab>("checker");
  const [step, setStep] = useState<Step>("form");
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [form, setForm] = useState<EligibilityFormData>(EMPTY_FORM);
  const [selectedArea, setSelectedArea] = useState<AreaMatch | null>(null);

  const update = <K extends keyof EligibilityFormData>(key: K, value: EligibilityFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const result = useMemo(() => checkEligibility(form), [form]);
  const areas = useMemo(() => matchCsAreas(form), [form]);

  const evaluatedSixSubjects = useMemo(
    () => result.subjects.filter((s) => s.isEvaluatedInTop6),
    [result]
  );

  const coresFilled = form.english && form.mathCore && form.integratedScience;

  function handleCheck() {
    if (result.isIncomplete) {
      setShowIncompleteModal(true);
    } else {
      setStep("result");
    }
  }

  function handleBackToForm() {
    setStep("form");
  }

  function handleExploreAreas() {
    setStep("areas");
  }

  function handleOpenArea(area: AreaMatch) {
    setSelectedArea(area);
    setStep("career");
  }

  return (
    <section className="w-full bg-white py-12 text-[#080b50]">
      {showIncompleteModal && (
        <IncompleteModal
          totalElectivesEntered={result.totalElectivesEntered}
          hasElectiveMath={result.hasElectiveMath}
          onClose={() => setShowIncompleteModal(false)}
        />
      )}

      <div className="mx-auto max-w-[900px] px-6">
        {/* Requirement 1 & 4: Persistent Title Header across all screens */}
        <MainHeader />

        <div className="rounded-lg bg-white p-2 sm:p-6">
          <TabBar tab={tab} setTab={setTab} />

          {tab === "requirements" && <RequirementsPanel />}
          {tab === "faqs" && <FaqsPanel />}

          {tab === "checker" && step === "form" && (
            <div className="py-4 sm:py-6">
              <div className="mb-8 flex gap-4 rounded-md border border-[#203b82]/30 bg-[#77D4FF]/30 p-5 text-[12px] text-[#060740] leading-relaxed">
                <div className="flex flex-col items-center pt-0.5 shrink-0">
                  <AlertTriangle className="h-5 w-5 text-[#060740]" />
                  <div className="mt-2 w-[1.5px] flex-1 bg-[#18337A]" />
                </div>

                <div className="space-y-1.5">
                  <div>
                    <p className="mb-1 font-bold text-base">Before You Start</p>
                    <p>Enter your WASSCE grades exactly as they appear on your results.</p>
                  </div>

                  <div>
                    <p className="font-bold">Core Subjects</p>
                    <p className="text-gray-700">• English Language, Core Mathematics and Integrated Science are required.</p>
                  </div>

                  <div>
                    <p className="font-bold">Electives</p>
                    <p className="text-gray-700">• Elective Mathematics is required. Select at least two additional electives.</p>
                  </div>

                  <div>
                    <p className="font-bold">Minimum Grade</p>
                    <p className="text-gray-700">• A1–C6 is considered a qualifying grade for this checker.</p>
                  </div>
                </div>
              </div>

              <h3 className="mb-4 text-[17px] font-bold">1 — Core Subjects (Required)</h3>
              <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <GradeSelect label="English Language" value={form.english} onChange={(g) => update("english", g)} />
                <GradeSelect label="Mathematics (Core)" value={form.mathCore} onChange={(g) => update("mathCore", g)} />
                <div>
                  <GradeSelect
                    label="Integrated Science"
                    value={form.integratedScience}
                    onChange={(g) => update("integratedScience", g)}
                  />
                  <p className="mt-1 text-[12px] text-gray-500">Minimum required grade is C6.</p>
                </div>
              </div>

              <h3 className="mb-4 text-[17px] font-bold">2 — Elective Subjects</h3>
              <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <GradeSelect
                  label="Mathematics (Elective) *"
                  value={form.mathElective}
                  onChange={(g) => update("mathElective", g)}
                />
                <GradeSelect label="Physics" value={form.physics} onChange={(g) => update("physics", g)} />
                <GradeSelect label="Chemistry" value={form.chemistry} onChange={(g) => update("chemistry", g)} />
                <GradeSelect label="Biology" value={form.biology} onChange={(g) => update("biology", g)} />
                <GradeSelect label="Elective ICT" value={form.electiveIct} onChange={(g) => update("electiveIct", g)} />
              </div>

              <h3 className="mb-4 text-[17px] font-bold">Optional Subjects</h3>
              <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={inputLabel}>Other Elective 1 (Specify Subject Name)</label>
                  <input
                    className={`${textInputClass} mb-3`}
                    placeholder="Other Elective 1 (Specify Subject Name)"
                    value={form.customElective1Name}
                    onChange={(e) => update("customElective1Name", e.target.value)}
                  />
                  <select
                    className={selectClass}
                    value={form.customElective1Grade}
                    onChange={(e) => update("customElective1Grade", e.target.value as Grade)}
                  >
                    <option value="">Select a grade</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={inputLabel}>Other Elective 2 (Specify Subject Name)</label>
                  <input
                    className={`${textInputClass} mb-3`}
                    placeholder="Other Elective 2 (Specify Subject Name)"
                    value={form.customElective2Name}
                    onChange={(e) => update("customElective2Name", e.target.value)}
                  />
                  <select
                    className={selectClass}
                    value={form.customElective2Grade}
                    onChange={(e) => update("customElective2Grade", e.target.value as Grade)}
                  >
                    <option value="">Select a grade</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="button"
                disabled={!coresFilled}
                onClick={handleCheck}
                className="w-full rounded-md bg-[#080b50] py-3 text-[16px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Check My Eligibility
              </button>
            </div>
          )}

          {tab === "checker" && step === "result" && (
            <div className="py-2">
              <button
                type="button"
                onClick={handleBackToForm}
                className="mb-6 flex items-center gap-1.5 text-[15px] font-medium text-[#080b50] hover:opacity-80"
              >
                <ArrowLeft size={18} /> Back
              </button>

              <div className="text-center">
                <div className="inline-block border-b-2 border-[#080b50] pb-1">
                  <h2 className="text-[20px] font-semibold tracking-wider text-[#080b50]">
                    YOUR ELIGIBILITY RESULT
                  </h2>
                </div>

                <div className="mt-8 mb-6 flex flex-col items-center justify-center">
                  {result.eligible ? (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#73D2F6] text-white">
                        <Check size={25} strokeWidth={3} />
                      </div>
                      <span className="text-[32px] font-semibold text-[#080b50] tracking-wide">ELIGIBLE</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <XCircle className="fill-red-500 text-white" size={50} />
                      <span className="text-[32px] font-semibold text-[#080b50] tracking-wide">INELIGIBLE</span>
                    </div>
                  )}
                </div>

                <p className="mt-2 text-[15px] font-medium text-[#080b50]">
                  {result.eligible ? (
                    <>
                      You meet the minimum requirements for BSc
                      <br />
                      Computer Science.
                    </>
                  ) : (
                    "You currently do not meet the minimum WASSCE requirements for the Computer Science programme."
                  )}
                </p>

                <div className="my-8 border-b border-[#080b50]" />

                <p className="mb-8 -mt-5 text-[15px] font-extrabold uppercase tracking-wider text-[#080b50]">
                  REQUIREMENT CHECK
                </p>

                <ul className="mx-auto max-w-[460px] space-y-4 text-left">
                  {evaluatedSixSubjects.map((s) => (
                    <li key={s.label} className="flex items-center justify-between text-[15px] font-medium">
                      <span className="flex items-center gap-3 text-[#080b50]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#080b50]" />
                        {s.label}
                      </span>
                      <div className="flex items-center gap-4 sm:gap-12">
                        <span className="w-8 text-right text-[#080b50]">{s.grade || "—"}</span>
                        <div className="w-15 flex justify-end">
                          {s.passed ? (
                            <Check className="text-[#73D2F6]" size={25} strokeWidth={2.5} />
                          ) : (
                            <X size={25} className="text-red-500" />
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {!result.eligible && result.qualifyingElectiveCount < 2 && (
                  <p className="mx-auto mt-6 max-w-[420px] text-center text-[13px] text-gray-500">
                    You need at least two qualifying electives beyond Mathematics — you currently have{" "}
                    {result.qualifyingElectiveCount}.
                  </p>
                )}

                <div className="mx-auto mt-12 flex max-w-[620px] flex-col gap-5 sm:flex-row">
                  {result.eligible && (
                    <>
                      <button
                        type="button"
                        onClick={handleExploreAreas}
                        className="flex-1 rounded-lg border-2 border-[#080b50] py-3.5 text-[16px] font-bold text-[#080b50] transition-opacity hover:opacity-80"
                      >
                        Explore Potential CS Areas
                      </button>
                      <a
                        href="#apply"
                        className="flex-1 rounded-lg bg-[#080b50] py-3.5 text-center text-[16px] font-bold text-white transition-opacity hover:opacity-90"
                      >
                        Apply Now
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Requirement 3: Updated Potential CS Areas layout */}
          {tab === "checker" && step === "areas" && (
            <div className="py-6 sm:py-8">
              <button
                type="button"
                onClick={() => setStep("result")}
                className="mb-8 flex items-center gap-1 text-[14px] font-semibold text-[#18337A] hover:opacity-80"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="text-center mb-10">
                <span className="inline-block border-b-2 border-[#080b50] pb-1 text-[16px] sm:text-[18px] font-extrabold uppercase tracking-wider text-[#080b50]">
                  POTENTIAL CS AREAS MATCH RATING
                </span>
                <p className="mx-auto mt-6 max-w-[520px] text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                  Based on your subjects and grades, these areas may be worth exploring.
                </p>
              </div>

              {/* Seamless Inline Progress Bars */}
              <div className="mx-auto max-w-[680px] space-y-5">
                {areas.map((area) => (
                  <button
                    key={area.key}
                    type="button"
                    onClick={() => handleOpenArea(area)}
                    className="group relative block w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all hover:border-[#080b50] hover:bg-white hover:shadow-lg text-left"
                  >
                    <div className="flex items-center justify-between gap-4 z-10 relative">
                      <div className="flex items-center gap-3 w-1/3 shrink-0">
                        <span className="font-bold text-[#080b50] text-[16px] sm:text-[17px]">
                          {area.name}
                        </span>
                        <ChevronRight size={18} className="text-gray-400 group-hover:text-[#080b50] transition-colors" />
                      </div>

                      {/* Integrated Seamless Progress Bar */}
                      <div className="flex-1 flex items-center gap-3">
                        <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200/80">
                          <div
                            className="h-full rounded-full bg-[#080b50] transition-all duration-500 group-hover:bg-[#0798d1]"
                            style={{ width: `${Math.max(8, area.fitPercent)}%` }}
                          />
                        </div>
                        <span className="text-[14px] font-bold text-[#080b50] min-w-[80px] text-right">
                          {area.fitLabel}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Requirement 3: Enhanced Padding and Margins for CTAs */}
              <div className="mx-auto mt-16 mb-10 flex max-w-[580px] flex-col sm:flex-row gap-5 px-4 py-2">
                <button
                  type="button"
                  onClick={() => handleOpenArea(areas[0])}
                  className="flex-1 rounded-xl border-2 border-[#080b50] py-4 px-6 text-[15px] font-bold text-[#080b50] transition-all hover:bg-[#080b50] hover:text-white"
                >
                  Explore Career Opportunities
                </button>
                <a
                  href="#apply"
                  className="flex-1 rounded-xl bg-[#080b50] py-4 px-6 text-center text-[15px] font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                >
                  Apply Now
                </a>
              </div>
            </div>
          )}

          {/* Requirement 4: Explore Career Opportunities Layout */}
          {tab === "checker" && step === "career" && selectedArea && (
            <div className="py-6 sm:py-8">
              <button
                type="button"
                onClick={() => setStep("areas")}
                className="mb-8 flex items-center gap-1 text-[14px] font-semibold text-[#18337A] hover:opacity-80"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="text-center mb-6">
                {/* Underlined Selected Career Title */}
                <h3 className="inline-block border-b-2 border-[#080b50] pb-2 text-[24px] sm:text-[28px] font-extrabold uppercase tracking-wide text-[#080b50]">
                  {selectedArea.name}
                </h3>
                <p className="mx-auto mt-5 max-w-[520px] text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                  {selectedArea.description}
                </p>
              </div>

              {/* Visually Prominent Divider Line */}
              <div className="my-10 border-t-2 border-[#080b50]" />

              <p className="mb-8 text-center text-[15px] font-extrabold uppercase tracking-wider text-[#080b50]">
                CAREER OPPORTUNITIES
              </p>

              {/* Distinct "||" Inline Separator View for Opportunities */}
              <div className="mx-auto max-w-[700px] rounded-xl bg-gray-50 border border-gray-200 p-6 sm:p-8 text-center shadow-sm">
                <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-3 text-[16px] sm:text-[18px] font-bold text-[#080b50]">
                  {selectedArea.careers.map((career, index) => (
                    <div key={career} className="flex items-center gap-3">
                      <span className="hover:text-[#0798d1] transition-colors">{career}</span>
                      {index < selectedArea.careers.length - 1 && (
                        <span className="text-[#0798d1] font-black text-[18px] select-none">||</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-auto mt-14 flex max-w-[420px] flex-col gap-4">
                <a
                  href="#apply"
                  className="rounded-xl bg-[#080b50] py-4 text-center text-[16px] font-bold text-white transition-opacity hover:opacity-90 shadow-md"
                >
                  Apply Now
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}