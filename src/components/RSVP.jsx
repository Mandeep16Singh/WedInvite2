import { useEffect, useRef, useState } from "react";

export default function RSVP() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
          className={`text-3xl sm:text-4xl md:text-5xl font-serif text-rose-700 mb-6 transition-all duration-1500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          RSVP
        </h2>

        {/* Paragraph */}
        <p
          className={`text-gray-600 text-base sm:text-lg leading-relaxed mb-8 transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          We would be honored to have you celebrate this special day with us.
        </p>

        {/* Button */}
        <div
          className={`transition-all duration-1000 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="https://wa.link/73k9m7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-rose-600 hover:bg-rose-700 transition-all duration-300 text-white px-8 py-3 rounded-full shadow-md hover:scale-105"
          >
            Confirm via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
