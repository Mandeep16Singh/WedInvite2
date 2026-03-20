import { useState, useEffect } from "react";

export default function Venue() {
  const images = [
    "/venue1.jpg",
    "/venue2.jpg",
    "/venue3.jpg",
    "/venue4.jpg",
    "/venue5.jpg",
    "/venue6.jpg",
    "/venue7.jpg",
    "/venue8.jpg",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000); // 1 second

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-dvh flex items-center justify-center overflow-hidden text-center">

      {/* Background Carousel */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 text-white">
        <h2 className="text-4xl md:text-5xl font-serif mb-6">
          Wedding Venue
        </h2>

        <p className="text-xl md:text-2xl font-medium">
          Shubh Banquets & Convention Centre
        </p>

        <p className="mt-2 text-lg opacity-90">
          Near Lt. Atul Kataria Marg, Rajiv Nagar, Sector 13, Gurugram, Haryana
        </p>
      </div>
    </section>
  );
}
