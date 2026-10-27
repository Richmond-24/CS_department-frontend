import { 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Code2, 
  Network, 
  MonitorSmartphone, 
  BrainCircuit, 
  Globe, 
  User, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// --- Mock Data ---

const STATS = [
  { value: "15+", label: "Research Projects" },
  { value: "30+", label: "Publications" },
  { value: "8", label: "Research Areas" },
  { value: "20+", label: "Researchers" },
];

const RESEARCH_AREAS = [
  { title: "Artificial Intelligence", desc: "Developing intelligent systems that learn, adapt, and solve complex problems.", icon: BrainCircuit },
  { title: "Data Science", desc: "Extracting meaningful insights from large datasets to drive decision-making.", icon: Database },
  { title: "Cybersecurity", desc: "Protecting digital systems, networks, and data from cyber threats and vulnerabilities.", icon: ShieldCheck },
  { title: "Software Engineering", desc: "Building reliable, scalable, and maintainable software systems through best engineering practices.", icon: Code2 },
  { title: "Computer Networks", desc: "Designing high-performance communication systems for efficiency and reliability.", icon: Network },
  { title: "Information Systems", desc: "Leveraging technology to improve organizational processes and strategic decision-making.", icon: MonitorSmartphone },
  { title: "Human-Computer Interaction", desc: "Creating intuitive interfaces that enhance user experience and accessibility.", icon: User },
  { title: "Internet of Things", desc: "Connecting physical devices to enable smart automation and real-time monitoring.", icon: Globe },
];

const PROJECTS = [
  { 
    title: "SmartFarm Monitor", 
    type: "IoT Project", 
    desc: "Smart sensor network for real-time crop health and soil monitoring.", 
    impact: "Increased yields by 40% in pilot regions." 
  },
  { 
    title: "CampusNav AR", 
    type: "Mobile App", 
    desc: "Augmented reality navigation for new students and visitors.", 
    impact: "Reduced orientation time by 60%." 
  },
  { 
    title: "MediTrack", 
    type: "Web Platform", 
    desc: "Secure patient record management system for rural clinics.", 
    impact: "Digitized records for 5,000+ patients." 
  },
  { 
    title: "EduBot", 
    type: "AI Chatbot", 
    desc: "Automated student support assistant available 24/7.", 
    impact: "Handled 10k+ queries in first semester." 
  },
];

const TEAM = [
  { name: "Prof. Patrick K. Mensah", role: "Head of Department", focus: "AI & Machine Learning", img: "/placeholder-team-1.jpg" },
  { name: "Dr. Felicia Boateng", role: "Senior Lecturer", focus: "Cybersecurity & Networks", img: "/placeholder-team-2.jpg" },
  { name: "Dr. Peter Nsiah", role: "Lecturer", focus: "Data Science", img: "/placeholder-team-3.jpg" },
  { name: "Dr. Mabel Agyemang", role: "Lecturer", focus: "HCI & Software Eng.", img: "/placeholder-team-4.jpg" },
];

const PUBLICATIONS = [
  { title: "Deep Learning Approaches for Early Disease Detection in Sub-Saharan Africa", authors: "P. Mensah, A. Osei", journal: "Journal of AI in Medicine", year: "2023" },
  { title: "A Framework for Securing IoT Devices in Higher Education Environments", authors: "F. Boateng, S. Mensah", journal: "IEEE Access", year: "2024" },
  { title: "Predictive Modeling for Student Retention: A South African Case Study", authors: "P. Nsiah, G. Mokoena", journal: "Computers & Education", year: "2023" },
  { title: "Usability Heuristics for Mobile Learning Applications in Developing Contexts", authors: "M. Agyemang, J. Doe", journal: "Intl. Journal of HCI", year: "2024" },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden bg-[#0a1128] py-24 lg:py-32">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-[#0a1128] to-[#0a1128]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-6 border border-blue-500/30">
            Department of Computer Science
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Research & Innovation
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Advancing Knowledge. Creating Impact. Explore our research, faculty, and innovations shaping the technological landscape within the Department of Computer Science & Informatics.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 border-t border-white/10 pt-8">
            {STATS.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#079bd3] mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-400 font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPLORE RESEARCH AREAS --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-4">Explore Our Research Areas</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our research spans key areas that shape the future of computing, data, and human-centered technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_AREAS.map((area, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#079bd3] mb-4 group-hover:bg-[#079bd3] group-hover:text-white transition-colors">
                <area.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0a1128] mb-2">{area.title}</h3>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{area.desc}</p>
              <button className="flex items-center text-xs font-bold text-[#079bd3] uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                Explore <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* --- FROM IDEAS TO INNOVATION (PROJECTS) --- */}
      <section className="py-20 bg-[#0a1128] text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-[#079bd3] font-bold tracking-wider uppercase text-sm mb-2 block">Innovation Lab</span>
              <h2 className="text-3xl md:text-4xl font-bold">From Ideas to Innovation</h2>
              <p className="text-slate-400 mt-2 max-w-xl">Discover how students and researchers transform ideas into practical technology solutions.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-semibold backdrop-blur-sm border border-white/10">
              View All Projects <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="bg-[#131b36] rounded-2xl overflow-hidden border border-white/5 hover:border-[#079bd3]/50 transition-all group">
                {/* Placeholder Image Area */}
                <div className="h-40 bg-slate-800 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131b36] to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2 py-1 rounded bg-[#079bd3] text-[10px] font-bold uppercase tracking-wider text-white">
                      {project.type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#079bd3] transition-colors">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">{project.desc}</p>
                  
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">Impact</p>
                    <p className="text-sm text-slate-300">{project.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
             <button className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white/10 text-sm font-semibold">
              View All Projects <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* --- MEET OUR RESEARCHERS --- */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0a1128] mb-4">Meet Our Researchers</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our faculty bring diverse expertise and a passion for collaborative research across multiple disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member, idx) => (
            <div key={idx} className="text-center group">
              <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-slate-200 ring-4 ring-white shadow-lg group-hover:ring-[#079bd3]/20 transition-all">
                 {/* Placeholder for image */}
                 <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-400">
                    <User size={40} />
                 </div>
                 {/* If you have images: <img src={member.img} alt={member.name} className="w-full h-full object-cover" /> */}
              </div>
              <h3 className="text-lg font-bold text-[#0a1128]">{member.name}</h3>
              <p className="text-sm text-[#079bd3] font-medium mb-1">{member.role}</p>
              <p className="text-xs text-slate-500 mb-3">{member.focus}</p>
              <button className="text-xs font-bold text-slate-400 hover:text-[#0a1128] uppercase tracking-wide transition-colors">
                View Profile
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="px-8 py-3 rounded-full bg-[#0a1128] text-white font-semibold hover:bg-[#079bd3] transition-colors shadow-lg shadow-blue-900/20">
            View All Researchers
          </button>
        </div>
      </section>

      {/* --- RESEARCH PUBLICATIONS --- */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#0a1128] mb-4">Research Publications</h2>
            <p className="text-slate-600">
              Recent publications from our research community, reflecting the department's commitment to scholarly output.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-5">Title</div>
              <div className="col-span-3">Research Area</div>
              <div className="col-span-2">Publication Type</div>
              <div className="col-span-2">Year</div>
            </div>

            {/* Rows */}
            {PUBLICATIONS.map((pub, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 border-b border-slate-100 last:border-0 hover:bg-blue-50/50 transition-colors items-center group">
                <div className="col-span-12 md:col-span-5 mb-2 md:mb-0">
                  <h4 className="font-bold text-[#0a1128] group-hover:text-[#079bd3] transition-colors mb-1">{pub.title}</h4>
                  <p className="text-xs text-slate-500 italic">{pub.authors}</p>
                </div>
                <div className="col-span-6 md:col-span-3 text-sm text-slate-600 font-medium">
                   {/* Mock mapping based on title keywords for demo purposes */}
                   {pub.title.includes("Learning") ? "AI & ML" : pub.title.includes("IoT") ? "Networks" : "Data Science"}
                </div>
                <div className="col-span-6 md:col-span-2 text-sm text-slate-600">Journal Article</div>
                <div className="col-span-12 md:col-span-2 flex justify-between md:block items-center">
                  <span className="text-sm font-bold text-slate-700">{pub.year}</span>
                  <button className="text-xs font-bold text-[#079bd3] flex items-center gap-1 hover:underline">
                    View Publication <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-slate-50 text-center border-t border-slate-200">
              <button className="text-sm font-bold text-[#0a1128] hover:text-[#079bd3] transition-colors">
                View All Publications →
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
