import { useState,useRef } from "react";

export default function Envelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
const audioRef = useRef(null);
  const handleOpen = () => {
    setIsOpening(true);

    // if (audioRef.current) {
    //   audioRef.current.volume = 0;
    //   audioRef.current.play().catch(() => {});

    //   // Smooth fade-in
    //   let vol = 0;
    //   const fade = setInterval(() => {
    //     if (vol < 0.8) {
    //       vol += 0.05;
    //       audioRef.current.volume = vol;
    //     } else {
    //       clearInterval(fade);
    //     }
    //   }, 200);
    // }

    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fdf3f0] px-4">

    {/*<audio ref={audioRef} src="/rustam.mp3" loop preload="auto" />*/}


      {/* Envelope Wrapper */}
      <div className="relative w-full max-w-3xl h-[320px]">

        {/* Envelope Body */}
        <div className="absolute inset-0 bg-[#f8e8e5] rounded-xl shadow-2xl overflow-hidden border border-[#e8cfc9]">

          {/* Embroidery Corners */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4a5a5] rounded-tl-xl"></div>
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#d4a5a5] rounded-tr-xl"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#d4a5a5] rounded-bl-xl"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4a5a5] rounded-br-xl"></div>

          {/* Flap */}
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-[#f3d6d2] origin-top transition-transform duration-[1400ms]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: isOpening ? "rotateX(180deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          ></div>

          {/* Instruction Text */}
          {!isOpening && (
            <div className="absolute bottom-8 w-full text-center px-6">
              <p
                className="text-2xl text-[#b76e79]"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                This invitation is exclusively for you
              </p>

              <p className="mt-2 text-sm text-gray-600 tracking-wide">
                Tap the seal to open your invitation
              </p>
            </div>
          )}
        </div>

        {/* CENTERED WAX SEAL (Placed Outside Body for Perfect Positioning) */}
        {!isOpening && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <button
              onClick={handleOpen}
              className="w-24 h-24 rounded-full overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.25)] transition hover:scale-105 active:scale-95"
            >
              <img
                src="/monogram1.png"
                alt="M & D Monogram"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
