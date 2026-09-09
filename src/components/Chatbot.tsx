const quickReplies = ['Admissions', 'Course map', 'Research topics', 'Internships']

export default function Chatbot() {
  return (
    <section className="mt-10 px-2 pt-2" aria-label="Department chatbot">
      <div className="rounded-[28px] bg-gradient-to-b from-slate-900 to-slate-800 p-6 text-slate-100 shadow-[0_30px_60px_rgba(15,23,42,0.18)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-[0.76rem] font-extrabold uppercase tracking-[0.16em] text-blue-300">Assistant</p>
            <h2 className="m-0 text-[clamp(2rem,3vw,2.8rem)] tracking-[-0.05em] text-white">Ask the CS advisor</h2>
          </div>
          <span className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-emerald-300 before:h-2 before:w-2 before:rounded-full before:bg-emerald-400">
            Online
          </span>
        </div>

        <div className="mb-5 flex flex-col gap-3">
          <div className="max-w-[78%] self-start rounded-[18px] bg-slate-700/40 px-4 py-3.5 text-slate-100">
            Hi! I can help with programs, deadlines, scholarships, and research.
          </div>
          <div className="max-w-[78%] self-end rounded-[18px] bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-3.5 text-white">
            What are the best pathways for AI and data science?
          </div>
          <div className="max-w-[78%] self-start rounded-[18px] bg-slate-700/40 px-4 py-3.5 text-slate-100">
            You can start with our AI track, data analytics core, and faculty-led labs in machine learning and intelligent systems.
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-2.5" aria-label="Quick reply prompts">
          {quickReplies.map((item) => (
            <button key={item} type="button" className="rounded-full border border-slate-500/30 bg-white/5 px-3 py-2 text-xs font-bold text-slate-100 transition hover:bg-white/10">
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your question..."
            aria-label="Type your question"
            className="min-h-[48px] flex-1 rounded-full border border-slate-500/30 bg-slate-900/50 px-4 text-slate-50 placeholder:text-slate-400"
          />
          <button type="button" className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-bold text-white">
            Send
          </button>
        </div>
      </div>
    </section>
  )
}
