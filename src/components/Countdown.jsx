import React, { useEffect, useState } from "react";

const Countdown = () => {
const weddingDate = new Date(2026, 3, 20, 0, 0, 0).getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
  <section className="relative py-24 text-center bg-rose-50 overflow-hidden">

    {/* Soft Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-rose-100 via-white to-rose-100 opacity-70"></div>

    <div className="relative z-10 px-6">
      <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-14">
        Countdown to Our Wedding
      </h2>

      <div className="flex justify-center gap-6 flex-wrap">
        {["days", "hours", "minutes", "seconds"].map((unit, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-md px-8 py-8 rounded-3xl shadow-md w-28 md:w-32"
          >
            <div className="text-4xl md:text-5xl font-mono font-semibold text-rose-700 tracking-widest">
              {formatNumber(timeLeft[unit] || 0)}
            </div>
            <div className="text-sm mt-3 uppercase text-rose-500 tracking-wider">
              {unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

};

export default Countdown;
