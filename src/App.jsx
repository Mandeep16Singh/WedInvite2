import { useState } from "react";
import { useEffect } from "react";

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
  useEffect(() => {
  if (isOpen) {
    window.scrollTo({ top: 0, behavior: "instant" });
  }
}, [isOpen]);


  return (
    <>
      {!isOpen && <Envelope onOpen={() => setIsOpen(true)} />}

<div
        className={`transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ><
      Hero isOpen={isOpen} />

        <LoveStory />
        <WeddingAnnouncement/>
        <Countdown />
        <Events />
        
        <Venue />
        <Map />
        <Gallery />
        <Monogram/>
        <RSVP />
        <Footer />
      </div>
    </>
  );
}

export default App;
