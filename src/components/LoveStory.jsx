import { useEffect, useRef, useState } from "react";

export default function LoveStory() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 bg-rose-50 overflow-hidden"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

        {/* Heading */}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-serif text-rose-700 mb-6 sm:mb-10 transition-all duration-1500 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Our Love Story
        </h2>

        {/* Paragraph */}
        <p
          className={`text-gray-600 text-base sm:text-lg leading-relaxed transition-all duration-1000 delay-300 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Bound by tradition and united by the wisdom of our elders, we begin our new chapter under the grace of Lord Shiva. From a simple hello to a lifetime promise, 
          our journey has been filled with laughter, blessings, and endless memories.
        </p>

      </div>
    </section>
  );
}
