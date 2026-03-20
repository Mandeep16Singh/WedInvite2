import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  const flapVariants = {
    closed: { rotateX: 0, rotateY: 0, opacity: 1 },
    openTop: { rotateX: 180, transition: { duration: 0.8 } },
    openBottom: { rotateX: -180, transition: { duration: 0.8 } },
    openLeft: { rotateY: -180, transition: { duration: 0.8 } },
    openRight: { rotateY: 180, transition: { duration: 0.8 } },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdf3f0] overflow-hidden px-4">
      {/* 1. WIDER DIMENSIONS: 
        Changed to a rectangle. Mobile: 95% width (max 450px) by 320px tall. 
        Desktop: 750px wide by 450px tall. 
      */}
      <div className="relative w-[95vw] max-w-[450px] sm:max-w-none sm:w-[750px] h-[320px] sm:h-[450px]">
        
        {/* The "Popping" Content */}
        <AnimatePresence>
          {isOpening && (
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, y: 0 }}
              animate={{ scale: 1.2, opacity: 1, y: -20 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="absolute inset-10 bg-white shadow-xl z-10 flex items-center justify-center p-6 text-center border-2 border-rose-100"
            >
              <p className="font-serif text-rose-800 text-xl">Opening your Invitation...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 4-Side Flaps Container */}
        <div className="absolute inset-0 bg-[#f8e8e5] shadow-2xl">
          
          <div className="absolute inset-4 border border-[#d4a5a5] opacity-40 pointer-events-none z-0" />
          <div className="absolute inset-6 border-2 border-[#d4a5a5] opacity-20 pointer-events-none z-0" />

          {/* === FIXED TEXT AND SEAL PLACEMENT === */}
          {!isOpening && (
            <>
              <div className="absolute top-[20%] sm:top-[22%] left-0 w-full z-50 px-6 text-center pointer-events-none -translate-y-1/2">
  <p 
    className="text-xl sm:text-[1.8rem] text-[#b76e79] drop-shadow-sm whitespace-nowrap"
    style={{ fontFamily: "'Great Vibes', cursive" }}
  >
    This invitation is exclusively for you
  </p>
</div>

              {/* Bottom Text - Placed in the lower flap */}
              <div className="absolute bottom-[20%] sm:bottom-[22%] left-0 w-full z-50 px-6 text-center pointer-events-none translate-y-1/2">
                <p className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-[0.2em]">
                  Tap the seal to open
                </p>
              </div>

              {/* Center Wax Seal Container */}
              <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleOpen}
                  className="w-20 h-20 sm:w-28 sm:h-28 pointer-events-auto"
                >
                  <img src="/monogram1.png" alt="Seal" className="w-full h-full object-cover rounded-full shadow-xl" />
                </motion.button>
              </div>
            </>
          )}
          {/* ======================================= */}

          <motion.div
            variants={flapVariants}
            animate={isOpening ? "openTop" : "closed"}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#f3d6d2] origin-top z-40 border-b border-rose-200"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
          />

          <motion.div
            variants={flapVariants}
            animate={isOpening ? "openBottom" : "closed"}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#f3d6d2] origin-bottom z-40 border-t border-rose-200"
            style={{ clipPath: "polygon(50% 0, 0 100%, 100% 100%)", backfaceVisibility: "hidden" }}
          />

          <motion.div
            variants={flapVariants}
            animate={isOpening ? "openLeft" : "closed"}
            className="absolute top-0 left-0 h-full w-1/2 bg-[#eed2cd] origin-left z-30 border-r border-rose-200"
            style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)", backfaceVisibility: "hidden" }}
          />

          <motion.div
            variants={flapVariants}
            animate={isOpening ? "openRight" : "closed"}
            className="absolute top-0 right-0 h-full w-1/2 bg-[#eed2cd] origin-right z-30 border-l border-rose-200"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)", backfaceVisibility: "hidden" }}
          />

        </div>
      </div>
    </div>
  );
}