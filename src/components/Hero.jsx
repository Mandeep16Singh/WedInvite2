import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function Hero({ isOpen }) 
 {

  useEffect(() => {
    if (!isOpen) return;

    const duration = 2000;
    const end = Date.now() + duration;
    const colors = ["#f43f5e", "#fda4af", "#ffffff", "#fecdd3"];

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: colors,
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [isOpen]);


  return (
    <section className="relative h-[100dvh] flex items-center justify-center text-center overflow-hidden px-6">

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Soft Rose Overlay */}
      <div className="absolute inset-0 bg-rose-900/30 backdrop-blur-[2px]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl">

        {/* Names – Static */}
        <h1
          className="italic text-white tracking-wide whitespace-nowrap text-[clamp(26px,6vw,60px)]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Mandeep&nbsp;❤️&nbsp;Deepshikha
        </h1>

        {/* Invite Text – Static */}
        {/*<p
          className="mt-10 sm:mt-14 italic text-rose-100 leading-relaxed mx-auto max-w-[90%] text-[clamp(14px,3.8vw,22px)]"
          style={{ fontFamily: "'Pinyon Script', cursive" }}
        >
          With immense joy in our hearts and blessings from our families, we cordially invite you to grace the wedding celebration of our beautiful beginning.
        </p>
*/}
        <p
  className="mt-10 sm:mt-14 text-rose-100 leading-relaxed mx-auto max-w-[90%] text-[clamp(16px,4vw,24px)] font-medium tracking-wide"
  style={{ fontFamily: "'Cormorant Garamond', serif" }}
>
  With immense joy in our hearts and blessings from our families, we cordially 
  invite you to grace the wedding celebration of our beautiful beginning.
</p>

      </div>

      {/* Scroll Indicator (Still Animated) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 flex flex-col items-center text-white"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-3 bg-white rounded-full mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <span className="mt-2 text-xs tracking-widest">SCROLL</span>
      </motion.div>

    </section>
  );
}
