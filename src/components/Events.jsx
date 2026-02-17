import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Events() {
  const [activeTab, setActiveTab] = useState("bride");

  const brideEvents = [
    {
      title: "Haldi",
      date: "19th April 2026 | 9:00 AM",
      image: "/haldi.jpg",
    },
    {
      title: "Mehendi",
      date: "19th April 2026 | 5:00 PM",
      image: "/mehendi.jpg",
    },
    {
      title: "Sangeet",
      date: "19th April 2026 | 8:00 PM",
      image: "/sangeet.jpg",
    },
    
    {
      title: "Bhaat & manda",
      date: "20th April 2026 | 3:00 PM",
      image: "/bhaat.jpg",
    },
    {
      title: "Wedding",
      date: "20th April 2026 | 7:00 PM",
      image: "/wedding.jpg",
    },
  ];

  const groomEvents = [
    {
      title: "Haldi",
      date: "19th April 2026 | 9:00 AM",
      image: "/haldi.jpg",
    },
    {
      title: "Bhaat & Manda",
      date: "19th April 2026 | 11:00 PM",
      image: "/bhaat.jpg",
    },
    {
      title: "Gudchadi",
      date: "20th April 2026 | 3:00 PM",
      image: "/gudchadi.jpg",
    },
    {
      title: "Baraat & Wedding",
      date: "20th April 2026 | 6:00 PM",
      image: "/wedding.jpg",
    },
    {
      title: "Reception",
      date: "9th May 2026 | 8:00 PM",
      image: "/reception.jpg",
    },
    
    
    
  ];

  const events = activeTab === "bride" ? brideEvents : groomEvents;

  return (
    <section className="min-h-screen bg-rose-50 px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-serif text-rose-700 mb-10"       
        >
          Wedding Events
        </motion.h2>

        {/* Tabs */}
        <div className="flex justify-center mb-14">
          <div className="bg-white rounded-full shadow-md p-1 flex">

            <button
              onClick={() => setActiveTab("bride")}
              className={`px-6 py-2 rounded-full transition ${
                activeTab === "bride"
                  ? "bg-rose-600 text-white"
                  : "text-rose-600"
              }`}
            >
              Bride Side
            </button>

            <button
              onClick={() => setActiveTab("groom")}
              className={`px-6 py-2 rounded-full transition ${
                activeTab === "groom"
                  ? "bg-rose-600 text-white"
                  : "text-rose-600"
              }`}
            >
              Groom Side
            </button>

          </div>
        </div>

        {/* Animated Grid */}
        {/* Animated Grid */}
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab} // Unique key ensures the whole grid re-animates on switch
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    {events.map((event, index) => (
      <motion.div
        // Combining tab and title ensures unique keys for Framer Motion
        key={`${activeTab}-${event.title}`} 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3]"
      >
        {/* Using a div with aria-label for better accessibility */}
        <div
          role="img"
          aria-label={event.title}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${event.image})` }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-white px-4 text-center">
          <h3 className="text-2xl font-serif">{event.title}</h3>
          <p className="mt-1 text-sm font-light opacity-90">{event.date}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>

      </div>
    </section>
  );
}
