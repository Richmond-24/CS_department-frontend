import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
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
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Contact Us</h1>
          <h2 className="text-xl md:text-2xl font-medium mb-4 text-blue-100">We're Here To Help</h2>
          <p className="max-w-xl text-gray-300 leading-relaxed">
            Have a question or need more information? Get in touch with the Department of Computer Science & Informatics.
          </p>
        </div>
      </section>

      {/* --- Middle Intro Text --- */}
      <div className="text-center py-12 px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Get in touch, let us know</h3>
        <p className="text-gray-500">how we can help you.</p>
      </div>

      {/* --- Main Contact Card --- */}
      <main className="container mx-auto px-4 pb-20 max-w-6xl">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Left Side: Contact Info */}
          <div className="bg-[#f0f7ff] p-8 md:p-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Contact Information</h3>
              <p className="text-gray-500 mb-10 text-sm">Need more information? Get in touch.</p>

              <div className="space-y-8">
                {/* Phone Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">Telephone</h4>
                    <p className="text-gray-600 text-sm">+233 (0) 302-000-000</p>
                  </div>
                </div>

                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">Email Address</h4>
                    <p className="text-gray-600 text-sm">info@university.edu.gh</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-1">Location Us</h4>
                    <p className="text-gray-600 text-sm">Kumasi, Sunyani Road<br />CS Dept Office</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ContactPage;
