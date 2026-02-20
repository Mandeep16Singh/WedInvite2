import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeddingAnnouncement() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Optimized petal count for mobile performance
  const [petals] = useState([...Array(12)].map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 4,
    size: 12 + Math.random() * 10
  })));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true);
      },
      { threshold: 0.2 } // Trigger earlier on mobile for better UX
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const curtainTransition = { duration: 3.5, ease: [0.45, 0.05, 0.55, 0.95] };

  const goldGradientStyle = {
    fontFamily: "'Great Vibes', cursive",
    background: "linear-gradient(to bottom, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  };

  return (
    <section ref={sectionRef} className="relative py-12 md:py-24 bg-[#fff5f5] overflow-hidden min-h-screen flex items-center">
      
      {/* ================= FALLING PETALS ================= */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {visible && petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ y: -50, x: `${petal.x}%`, opacity: 0 }}
              animate={{ 
                y: "110vh", 
                x: `${petal.x + (Math.random() * 10 - 5)}%`, 
                opacity: [0, 1, 1, 0],
                rotate: 360 
              }}
              transition={{ duration: petal.duration, delay: petal.delay, repeat: Infinity, ease: "linear" }}
              className="absolute text-rose-300 opacity-40 md:opacity-60"
              style={{ fontSize: petal.size }}
            >
              🌸
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-6 text-center w-full">
        
        {/* ================= CURTAINS (Mobile Optimized) ================= */}
        {/* We use z-40 so they stay above content until they finish moving */}
        <motion.div
          initial={{ x: 0, scaleX: 1 }}
          animate={visible ? { x: "-110%", scaleX: 0.5 } : { x: 0 }}
          transition={curtainTransition}
          className="absolute top-0 left-0 w-1/2 h-full z-40 origin-left pointer-events-none"
          style={{ 
            backgroundColor: "#7f1d1d", 
            backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 20px, rgba(0,0,0,0.2) 25px, transparent 30px)" 
          }}
        />

        <motion.div
          initial={{ x: 0, scaleX: 1 }}
          animate={visible ? { x: "110%", scaleX: 0.5 } : { x: 0 }}
          transition={curtainTransition}
          className="absolute top-0 right-0 w-1/2 h-full z-40 origin-right pointer-events-none"
          style={{ 
            backgroundColor: "#7f1d1d", 
            backgroundImage: "repeating-linear-gradient(to left, transparent, transparent 20px, rgba(0,0,0,0.2) 25px, transparent 30px)" 
          }}
        />

        {/* ================= REVEALED CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="relative z-10"
        >
          {/* Introductory Text */}
          <div className="max-w-2xl mx-auto mb-8 md:mb-12 space-y-3 md:space-y-4">
            <p className="text-rose-600 font-serif italic text-xs md:text-base px-2">
              ॐ वक्रतुंड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
            <p className="text-gray-600 font-serif italic text-sm md:text-lg leading-relaxed px-4">
              "The soothing notes of Sehnai, the holy chants, Saat Pheres, and the grand union. <br className="hidden md:block" />
              With the blessings of Shiv-Parvati, we solicit your presence to attend the wedding of"
            </p>
          </div>

          {/* Names Section: Column on Mobile, Row on Desktop */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16">
            
            {/* Groom Side */}
            <div className="flex-1 space-y-2 md:space-y-4 w-full">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md py-1" style={goldGradientStyle}>
                Mandeep Parmar
              </h3>
              <div className="text-gray-700 space-y-0.5 md:space-y-1 font-serif text-xs md:text-sm lg:text-base px-2">
                <p>Grandson of <span className="font-semibold text-gray-900">Smt. Parmerswari Devi</span></p>
                <p>S/o <span className="font-semibold text-gray-900">Sh. Mukesh Parmar & Smt. Sudesh Rani</span></p>
                <p className="pt-2 text-[10px] text-gray-400 uppercase tracking-widest">Kalinga, Bhiwani, Haryana</p>
              </div>
            </div>

            {/* WEDS in center */}
            <div className="flex items-center justify-center my-2 md:my-0">
              <span className="text-2xl md:text-4xl italic text-[#B38728] font-serif font-semibold">
                weds
              </span>
            </div>

            {/* Bride Side */}
            <div className="flex-1 space-y-2 md:space-y-4 w-full">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-md py-1" style={goldGradientStyle}>
                Deepshikha Rana
              </h3>
              <div className="text-gray-700 space-y-0.5 md:space-y-1 font-serif text-xs md:text-sm lg:text-base px-2">
                <p>Granddaughter of <span className="font-semibold text-gray-900">Sh. Tara Singh</span></p>
                <p>D/o <span className="font-semibold text-gray-900">Sh. Sushil Rana & Smt. Rekha Rana</span></p>
                <p className="pt-2 text-[10px] text-gray-400 uppercase tracking-widest">Sector 9A, Gurgaon, Haryana</p>
              </div>
            </div>

          </div>
         {/* <div className="max-w-xl mx-auto border-t border-rose-200 pt-8 md:pt-12">
            <h3 className="text-3xl sm:text-5xl md:text-3xl lg:text-5xl drop-shadow-md py-1" style={goldGradientStyle}>
                Monday 20th April 2026
              </h3>
          </div>*/}

          <div className="max-w-xl mx-auto border-t border-rose-200 pt-8 md:pt-12">
            <div className="flex items-center justify-center space-x-6 md:space-x-10 py-4">
              <span className="text-xl md:text-2xl uppercase tracking-[0.2em] text-gray-600">
                April
              </span>
              <div className="w-px h-12 bg-rose-200"></div> {/* Vertical Divider */}
              <h3 className="text-5xl sm:text-6xl md:text-7xl drop-shadow-md font-light" style={goldGradientStyle}>
                20
              </h3>
              <div className="w-px h-12 bg-rose-200"></div> {/* Vertical Divider */}
              <span className="text-xl md:text-2xl uppercase tracking-[0.2em] text-gray-600">
                2026
              </span>
            </div>
            <p className="text-center text-rose-400 tracking-widest uppercase text-sm mt-4">
              Monday
            </p>
          </div>

          {/* Bottom Message */}
          <div className="max-w-xl mx-auto border-t border-rose-200 pt-8 md:pt-12">
            <p className="text-gray-600 font-serif italic text-sm md:text-lg leading-loose mb-4 md:mb-6 px-4">
              "As we tie the sacred knot and begin our eternal journey, we seek your gracious presence and blessings."
            </p>
            <p className="text-rose-600 font-serif italic text-xs md:text-sm">
              श्री गणेशाय नमः । मंगलं भगवान विष्णुः मंगलं गरुड़ध्वजः ।
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}