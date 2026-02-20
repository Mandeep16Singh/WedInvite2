import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Monogram() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [startEffect, setStartEffect] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          // 1. Trigger the fade-in UI IMMEDIATELY, don't wait for video to buffer
          setStartEffect(true);
          videoRef.current.playbackRate = 0.75;

          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch((err) => {
              console.log("Autoplay blocked or delayed by mobile browser", err);
            });
          }
        } else {
          // Pause when out of view to save battery/memory
          videoRef.current.pause();
        }
      },
      { 
        // 2. OPTIMIZATION: Start playing when only 10% is visible, 
        // OR when it is 200px away from entering the screen!
        threshold: 0.1, 
        rootMargin: "200px 0px 200px 0px" 
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation(); 
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      ref={sectionRef}
      // Note: h-[100dvh] in modern Tailwind is highly recommended over the calc() hack!
      className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-[2000ms] ${
          startEffect ? "opacity-100" : "opacity-0"
        }`}
        src="/monogramLux.mp4"
        // 3. OPTIMIZATION: Add a poster image so the screen isn't black while loading
        poster="/monogramLux-poster.jpg" 
        playsInline
        webkit-playsinline="true" // Crucial for older iOS devices
        disablePictureInPicture
        muted={isMuted}
        loop
        preload="metadata" // "metadata" is generally more respected by mobile than "auto"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

      {/* Unmute UI Button */}
      <AnimatePresence>
        {startEffect && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className="absolute bottom-8 right-6 z-50 flex items-center gap-2 bg-white/10 backdrop-blur-xl p-3 px-4 rounded-full border border-white/30 text-white shadow-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
              {isMuted ? "Tap for Sound" : "Music On"}
            </span>
            <div className="w-5 h-5 flex items-center justify-center">
              {isMuted ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6L4.5 9h-1.5v6h1.5l5.25 3.75V5.25L4.5 9z" />
                </svg>
              ) : (
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-full h-full">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}