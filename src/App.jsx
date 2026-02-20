import { useState, useEffect, useRef } from "react";

import Envelope from "./components/Envelope";
import Hero from "./components/Hero";
import LoveStory from "./components/LoveStory";
import Events from "./components/Events";
import Venue from "./components/Venue";
import Countdown from "./components/Countdown";
import Gallery from "./components/Gallery";
import RSVP from "./components/RSVP";
import Map from "./components/Map";
import Footer from "./components/Footer";
import Monogram from "./components/monogram";
import WeddingAnnouncement from "./components/WeddingAnnouncement";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef(null);

  // 🔥 This runs when envelope opens
  const handleEnvelopeOpen = () => {
    setIsOpen(true);

    // if (audioRef.current) {
    //   audioRef.current.volume = 0.5;

    //   audioRef.current
    //     .play()
    //     .then(() => console.log("Music started"))
    //     .catch((err) => console.error("Audio error:", err));
    // }

    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});

      // Smooth fade-in
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.8) {
          vol += 0.05;
          audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [isOpen]);

  return (
    <>
      {/* 🎵 Global Audio (never unmounts) */}
      <audio ref={audioRef} src="/rustam.mp3" loop preload="auto" />

      {!isOpen && <Envelope onOpen={handleEnvelopeOpen} />}

      <div
        className={`transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero isOpen={isOpen} />
        <LoveStory />
        <WeddingAnnouncement />
        <Countdown />
        <Events />
        <Venue />
        <Map />
        <Gallery />
        <Monogram />
        <RSVP />
        <Footer />
      </div>
    </>
  );
}

export default App;