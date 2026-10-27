import { useState } from 'react';
import { Search, X, ZoomIn, Calendar } from 'lucide-react';

// Define the shape of a gallery item so TypeScript knows what properties exist
interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
  date: string;
}

const CATEGORIES = ["All", "Campus Life", "Graduation", "Research Labs", "Events", "Sports"];

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", title: "University Library Study Session", category: "Campus Life", date: "Oct 2023" },
  { id: 2, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", title: "Annual Graduation Ceremony", category: "Graduation", date: "Aug 2023" },
  { id: 3, src: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80", title: "Advanced Robotics Lab", category: "Research Labs", date: "Sep 2023" },
  { id: 4, src: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80", title: "Tech Innovation Summit", category: "Events", date: "Nov 2023" },
  { id: 5, src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", title: "Inter-Department Football Match", category: "Sports", date: "Jul 2023" },
  { id: 6, src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80", title: "Computer Science Lecture Hall", category: "Campus Life", date: "Oct 2023" },
  { id: 7, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80", title: "Student Hackathon Finals", category: "Events", date: "Sep 2023" },
  { id: 8, src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?w=800&q=80", title: "Cybersecurity Research Group", category: "Research Labs", date: "Aug 2023" },
  { id: 9, src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80", title: "Convocation Day Celebrations", category: "Graduation", date: "Aug 2023" },
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  // Explicitly type the state as GalleryItem | null
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = GALLERY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main
      className="w-full bg-white text-[#060740] min-h-screen"
      style={{ fontFamily: "'Lufga', sans-serif", fontWeight: 700 }}
    >
      
      {/* --- Top Banner Section --- */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/95 via-[#1a237e]/90 to-[#1a237e]/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Photo Gallery</h1>
          <p className="max-w-xl text-gray-300 leading-relaxed text-lg">
            A visual journey through our campus life, academic milestones, research facilities, and memorable events.
          </p>
        </div>
      </section>

      {/* --- Controls Bar --- */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm py-4">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? "bg-[#1a237e] text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search gallery..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a237e]/20 transition-all"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* --- Gallery Grid --- */}
      <section className="container mx-auto px-6 py-12 max-w-7xl">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
                onClick={() => setSelectedImage(item)}
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">{item.category}</span>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-gray-300 text-xs">
                    <Calendar size={12} />
                    <span>{item.date}</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No images found matching your criteria.</p>
            <button 
              onClick={() => {setActiveCategory("All"); setSearchTerm("");}}
              className="mt-4 text-[#1a237e] font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* --- Lightbox Modal --- */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
          >
            <X size={24} />
          </button>
          
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title} 
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-gray-400 mt-1">{selectedImage.category} • {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;