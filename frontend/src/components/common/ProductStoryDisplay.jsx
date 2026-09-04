import { AnimatePresence, motion } from "framer-motion";

import box from "@/assets/contents/box-1.png";
import highlighter from "@/assets/contents/highlighter.png";
import notebook from "@/assets/contents/notebook.png";
import pens from "@/assets/contents/pens.png";
import planner from "@/assets/contents/planner.png";
import stickyNotes from "@/assets/contents/sticky-notes.png";

const rotations = {
  "01": -5,
  "02": 4,
  "03": -3,
  "04": 5,
  "05": -2,
 // "06": 3,
};

const contentItems = {
  "01": { src: notebook, alt: "Notebook", className: "-left-4 lg:-left-8 top-4 lg:top-6 w-32 lg:w-48 rotate-[-18deg]" },
  "02": { src: pens, alt: "Pens", className: "right-0 top-8 lg:top-12 w-28 lg:w-40 rotate-[20deg]" },
  "03": { src: stickyNotes, alt: "Sticky Notes", className: "-left-2 lg:-left-6 bottom-24 lg:bottom-32 w-20 h-100 lg:w-25 rotate-[-12deg]" },
  "04": { src: planner, alt: "Planner", className: "right-2 bottom-16 lg:bottom-20 w-28 h-125 lg:w-44 rotate-[10deg]" },
  "05": { src: highlighter, alt: "Highlighter", className: "left-6 lg:left-12 bottom-6 lg:bottom-8 w-24 h-150 lg:w-36 rotate-[-20deg]" },
 // "06": { src: flashcards, alt: "Flash Cards", className: "right-6 lg:right-10 top-0 w-28 lg:w-40 rotate-[8deg]" },
};

export default function ProductStoryDisplay({ activeItem = "01", isMobile = false }) {
  const item = contentItems[activeItem] || contentItems["01"];

  return (
    <motion.div
      animate={{
        rotate: rotations[activeItem] || 0,
        y: [0, -10, 0],
      }}
      transition={{
        rotate: { duration: 0.45 },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      // Responsive size handling mapping
      className={`relative mx-auto ${
        isMobile ? "h-72 w-72 scale-90 md:scale-100 my-4" : "h-140 w-140"
      }`}
    >
      {/* Shadow */}
      <div className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-black/15 blur-3xl ${
        isMobile ? "bottom-4 h-6 w-48" : "bottom-8 h-12 w-72"
      }`} />

      {/* Floating Item */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={activeItem}
          src={item.src}
          alt={item.alt}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
            y: {
              repeat: Infinity,
              duration: 2.8,
              ease: "easeInOut",
            },
          }}
          className={`absolute z-30 ${item.className}`}
        />
      </AnimatePresence>

      {/* Box */}
      <motion.img
        src={box}
        alt="PREP'D Box"
        className={`absolute bottom-0 left-1/2 z-20 -translate-x-1/2 ${
          isMobile ? "w-64" : "w-105"
        }`}
      />
    </motion.div>
  );
}