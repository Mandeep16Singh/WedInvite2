import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Gallery() {
  const images = [
    "/g15.png", "/g16.jpg", "/g17.jpg", "/g18.jpg", "/g1.png",
    "/g2.png", "/g0.jpg", "/g11.png", "/g5.png", "/g6.jpg",
    "/g7.jpg", "/g8.jpg", "/g10.png",
  ];

  const [[current, direction], setCurrent] = useState([0, 0]);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  const paginate = (newDirection) => {
    setCurrent(([prev]) => {
      const nextIndex = (prev + newDirection + images.length) % images.length;
      return [nextIndex, newDirection];
    });
  };

  /* -------------------------
     FAST Auto scroll (2 Seconds)
  -------------------------- */
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 2000); // Reduced from 5000 to 2000ms

    return () => clearInterval(interval);
  }, [isInView, current]);

  useEffect(() => {
    const nextIndex = (current + 1) % images.length;
    const img = new Image();
    img.src = images[nextIndex];
  }, [current]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section ref={containerRef} className="min-h-screen bg-rose-50 px-6 py-20 flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <h2 className="text-4xl font-serif text-rose-600 mb-12">Memories</h2>

        <div className="relative h-[400px] md:h-[550px] overflow-hidden rounded-3xl shadow-2xl bg-gray-200">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                // Smoother, faster spring physics
                x: { type: "spring", stiffness: 400, damping: 40 }, 
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              // SENSITIVE SWIPE: reduced threshold from 100 to 30
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (offset.x < -30 || swipe < -500) paginate(1);
                else if (offset.x > 30 || swipe > 500) paginate(-1);
              }}
              className="absolute inset-0 w-full h-full bg-cover bg-center cursor-grab active:cursor-grabbing"
              style={{
                backgroundImage: `url(${images[current]})`,
                touchAction: "pan-y",
              }}
            />
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const newDir = index > current ? 1 : -1;
                  setCurrent([index, newDir]);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="mt-6 text-rose-400 font-serif italic">Swipe to see more moments</p>
      </div>
    </section>
  );
}