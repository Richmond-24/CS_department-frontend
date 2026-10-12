import { Search, Calendar, ArrowRight } from 'lucide-react';

// Mock Data based on the screenshot
const FEATURED_NEWS = {
  id: 1,
  title: "CSI Department Launches State-of-the-Art AI Research Lab",
  date: "October 24, 2023",
  category: "Research",
  excerpt: "The Department of Computer Science & Informatics has officially opened its new Artificial Intelligence Research Laboratory, equipped with high-performance computing clusters designed to support advanced machine learning research.",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" // Tech/Lab vibe
};

const LATEST_UPDATES = [
  {
    id: 2,
    title: "Annual CSI Hackathon 2023 Winners Announced",
    date: "Oct 15, 2023",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "New MSc in Cybersecurity Programme Now Open for Applications",
    date: "Oct 10, 2023",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Department Hosts International Conference on Data Science",
    date: "Oct 05, 2023",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Students Win Gold at National Robotics Competition",
    date: "Sep 28, 2023",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "Alumni Networking Event Scheduled for November",
    date: "Sep 20, 2023",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "Guest Lecture Series: The Future of Quantum Computing",
    date: "Sep 15, 2023",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
];

const NewsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- Top Banner Section --- */}
      <section className="relative h-[300px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" 
          }}
        >
          {/* Dark Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/95 via-[#1a237e]/90 to-[#1a237e]/70"></div>
        </div>

        {/* Banner Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">News & Media</h1>
          <p className="max-w-xl text-gray-300 leading-relaxed text-lg">
            Stay updated with the latest happenings, research breakthroughs, and events from the Department of Computer Science & Informatics.
          </p>
        </div>
      </section>

      {/* --- Navigation Tabs --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1a237e] text-white rounded-full text-sm font-medium whitespace-nowrap">
              All News
            </button>
            <button className="text-gray-600 hover:text-[#1a237e] text-sm font-medium whitespace-nowrap transition-colors">
              Events
            </button>
            <button className="text-gray-600 hover:text-[#1a237e] text-sm font-medium whitespace-nowrap transition-colors">
              Press Releases
            </button>
            <button className="text-gray-600 hover:text-[#1a237e] text-sm font-medium whitespace-nowrap transition-colors">
              Student Achievements
            </button>
            <button className="text-gray-600 hover:text-[#1a237e] text-sm font-medium whitespace-nowrap transition-colors">
              Research Updates
            </button>
            
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex ml-auto relative">
              <input 
                type="text" 
                placeholder="Search news..." 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 w-48 transition-all"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-12 max-w-7xl space-y-16">

        {/* --- Featured News Section --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a237e]">Featured News</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row group cursor-pointer">
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img 
                src={FEATURED_NEWS.image} 
                alt={FEATURED_NEWS.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-full w-fit mb-4">
                {FEATURED_NEWS.category}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#1a237e] transition-colors">
                {FEATURED_NEWS.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                <Calendar size={14} />
                <span>{FEATURED_NEWS.date}</span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                {FEATURED_NEWS.excerpt}
              </p>
              <button className="flex items-center gap-2 text-[#1a237e] font-bold text-sm hover:gap-3 transition-all">
                Read Full Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* --- Latest Updates Grid --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a237e]">Latest Updates</h2>
            <button className="text-sm font-semibold text-gray-500 hover:text-[#1a237e]">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LATEST_UPDATES.map((news) => (
              <article key={news.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                    <Calendar size={12} />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 leading-snug group-hover:text-[#1a237e] transition-colors">
                    {news.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- CSI Gallery Section --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#1a237e]">CSI Gallery</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {GALLERY_IMAGES.map((src, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden cursor-pointer relative group">
                <img 
                  src={src} 
                  alt={`Gallery ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button className="px-8 py-3 bg-[#1a237e] text-white rounded-full font-semibold hover:bg-[#283593] transition-colors shadow-lg shadow-blue-900/20">
              View More
            </button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default NewsPage;
