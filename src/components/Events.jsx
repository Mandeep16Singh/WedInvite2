import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Events() {
  // Smart Change: Set Groom as the default starting tab
  const [activeTab, setActiveTab] = useState("groom");

  const brideEvents = [
    {
      title: "Haldi",
      date: "18th April 2026 | 2:00 PM",
      venue: "Sector 9A, Gurgaon",
      image: "/haldi.jpg",
    },
    {
      title: "Mehendi",
      date: "19th April 2026 | 2:00 PM",
      venue: "Sector 9A, Gurgaon",
      image: "/mehendi.jpg",
    },

    {
      title: "Bhaat & Manda",
      date: "19th April 2026 | 05:00 PM",
      venue: "Sector 9A, Gurgaon",
      image: "/bhaat.jpg",
    },
    {
      title: "Sangeet",
      date: "19th April 2026 | 7:00 PM",
      venue: "Sector 9A, Gurgaon",
      image: "/sangeet.jpg",
    },
    {
      title: "Wedding",
      date: "20th April 2026 | 7:00 PM",
      venue: "Subh Banquet, Sector 13, Gurgaon",
      image: "/wedding.jpg",
    },
  ];

  const groomEvents = [

    {
      title: "Bhaat & Manda",
      date: "19th April 2026 | 11:00 AM",
      venue: "Mrg World - The Balcony, Sector 93, Gurgaon",
      image: "/bhaat.jpg",
    },
    {
      title: "Haldi",
      date: "19th April 2026 | 02:00 PM",
      venue: "Mrg World - The Balcony, Sector 93, Gurgaon",
      image: "/haldi.jpg",
    },
    {
      title: "Sangeet",
      date: "19th April 2026 | 5:00 PM",
      venue: "Mrg World - The Balcony, Sector 93, Gurgaon",
      image: "/haldi.jpg",
    },
    {
      title: "Gudchadi",
      date: "20th April 2026 | 4:00 PM",
      venue: "Mrg World - The Balcony, Sector 93, Gurgaon",
      image: "/gudchadi.jpg",
    },
    {
      title: "Baraat & Wedding",
      date: "20th April 2026 | 6:00 PM",
      venue: "From MRG Sector 93 to Subh Banquet, Sector 13",
      image: "/wedding.jpg",
    },
    {
      title: "Reception",
      date: "9th May 2026 | 7:00 PM",
      venue: "Club House, Bistpur Jamshedpur",
      image: "/reception.jpg",
    },
  ];

  const events = activeTab === "bride" ? brideEvents : groomEvents;

  return (
    <section className="min-h-screen bg-rose-50 px-6 py-20">
      <div className="max-w-6xl mx-auto text-center">
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
              onClick={() => setActiveTab("groom")}
              className={`px-6 py-2 rounded-full transition ${
                activeTab === "groom" ? "bg-rose-600 text-white" : "text-rose-600"
              }`}
            >
              Groom Side
            </button>
            <button
              onClick={() => setActiveTab("bride")}
              className={`px-6 py-2 rounded-full transition ${
                activeTab === "bride" ? "bg-rose-600 text-white" : "text-rose-600"
              }`}
            >
              Bride Side
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {events.map((event, index) => (
              <motion.div
                key={`${activeTab}-${event.title}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-2xl shadow-lg aspect-[4/3]"
              >
                <div
                  role="img"
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6 text-white px-4 text-center">
                  <h3 className="text-2xl font-serif">{event.title}</h3>
                  <p className="mt-1 text-sm font-light opacity-90">{event.date}</p>
                  
                  {/* Smart Addition: Venue Info */}
                  <div className="mt-3 flex items-start justify-center gap-1 text-xs italic opacity-80">
                    <span className="mt-0.5">📍</span>
                    <span>{event.venue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}