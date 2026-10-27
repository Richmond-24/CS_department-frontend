import { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';

// Mock Data
const EVENTS = [
  {
    id: 1,
    title: "International Conference on Artificial Intelligence 2024",
    date: "Nov 15 - 17, 2023",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium, CSI Building",
    type: "Conference",
    description: "Join leading researchers and industry experts for three days of keynote speeches, paper presentations, and workshops on the latest advancements in AI and Machine Learning.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80"
  },
  {
    id: 2,
    title: "Annual Departmental Hackathon",
    date: "Dec 02, 2023",
    time: "08:00 AM - 08:00 PM",
    location: "Innovation Hub, Block B",
    type: "Competition",
    description: "Put your coding skills to the test! Teams of 4 will compete to build innovative solutions for real-world problems within a 12-hour timeframe. Prizes worth $5,000 up for grabs.",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?w=800&q=80"
  },
  {
    id: 3,
    title: "Alumni Homecoming & Networking Mixer",
    date: "Dec 10, 2023",
    time: "06:00 PM - 09:00 PM",
    location: "University Grand Hall",
    type: "Social",
    description: "Reconnect with old friends and expand your professional network. An evening of dinner, drinks, and career talks featuring successful alumni from the Class of 2010-2020.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
  },
  {
    id: 4,
    title: "Guest Lecture: The Ethics of Quantum Computing",
    date: "Jan 15, 2024",
    time: "02:00 PM - 04:00 PM",
    location: "Lecture Theatre 4",
    type: "Lecture",
    description: "Prof. Sarah Jenkins from MIT will discuss the ethical implications of quantum supremacy and its potential impact on global cryptography and privacy standards.",
    image: "https://images.unsplash.com/photo-1475721027767-p05a6dbd411f?w=800&q=80"
  }
];

const EventsPage = () => {
  const [filterType, setFilterType] = useState("All");
  
  const eventTypes = ["All", ...new Set(EVENTS.map(e => e.type))];
  
  const filteredEvents = filterType === "All" 
    ? EVENTS 
    : EVENTS.filter(e => e.type === filterType);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- Top Banner Section --- */}
      <section className="relative h-[300px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a237e]/95 via-[#1a237e]/90 to-[#1a237e]/70"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Upcoming Events</h1>
          <p className="max-w-xl text-gray-300 leading-relaxed text-lg">
            Mark your calendars! Discover conferences, workshops, social gatherings, and academic lectures hosted by the department.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* --- Left Column: Event List --- */}
          <div className="lg:w-2/3 space-y-8">
            
            {/* Filter Bar */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
              <div className="flex items-center gap-2 text-gray-500 mr-2">
                <Filter size={18} />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              {eventTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    filterType === type 
                      ? "bg-[#1a237e] text-white border-[#1a237e]" 
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#1a237e] hover:text-[#1a237e]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Events List */}
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <article key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-gray-100 group">
                  
                  {/* Date Badge (Mobile/Desktop consistent) */}
                  <div className="sm:w-32 bg-[#f0f4ff] flex sm:flex-col items-center justify-center p-4 sm:p-6 shrink-0 border-b sm:border-b-0 sm:border-r border-blue-100">
                    <div className="text-center">
                      <span className="block text-xs font-bold text-[#1a237e] uppercase tracking-wider mb-1">
                        {event.date.split(' ')[0]}
                      </span>
                      <span className="block text-2xl font-bold text-[#1a237e]">
                        {event.date.split(' ')[1].replace(',', '')}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {event.date.split(' ')[2] || ''}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded tracking-wide">
                        {event.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1a237e] transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#1a237e]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#1a237e]" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <button className="self-start flex items-center gap-2 text-[#1a237e] font-bold text-sm hover:gap-3 transition-all">
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-500">No upcoming events in this category.</p>
              </div>
            )}
          </div>

          {/* --- Right Column: Sidebar --- */}
          <aside className="lg:w-1/3 space-y-8">
            
            {/* Quick Add to Calendar Widget */}
            <div className="bg-[#1a237e] rounded-2xl p-8 text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">Add to Calendar</h3>
              <p className="text-blue-200 text-sm mb-6">
                Never miss an event. Subscribe to our department calendar or download individual .ics files.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Calendar size={16} /> Google Calendar
                </button>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                  <Calendar size={16} /> Outlook / Apple
                </button>
                <button className="w-full py-3 bg-white text-[#1a237e] hover:bg-blue-50 rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2">
                  Download All Events (.ics)
                </button>
              </div>
            </div>

            {/* Mini Upcoming Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Quick Highlights</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#1a237e] mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Hackathon Registration Closes</p>
                    <p className="text-xs text-gray-500">Nov 28, 2023</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#1a237e] mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">End of Semester Exams Begin</p>
                    <p className="text-xs text-gray-500">Dec 18, 2023</p>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#1a237e] mt-2 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Spring Semester Classes Resume</p>
                    <p className="text-xs text-gray-500">Jan 08, 2024</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup Mini */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="font-bold text-[#1a237e] mb-2">Event Notifications</h3>
              <p className="text-xs text-gray-600 mb-4">Get weekly updates on new events sent to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 rounded-lg border border-blue-200 text-sm focus:outline-none focus:border-[#1a237e]"
                />
                <button className="px-4 py-2 bg-[#1a237e] text-white rounded-lg text-sm font-bold hover:bg-[#283593] transition-colors">
                  Join
                </button>
              </div>
            </div>

          </aside>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
