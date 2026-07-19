import { AnimatePresence, motion } from "framer-motion";

import box from "@/assets/contents/box.png";

import flashcards from "@/assets/contents/flashcards.png";
import highlighter from "@/assets/contents/highlighter.png";
import notebook from "@/assets/contents/notebook.png";
import pens from "@/assets/contents/pens.png";
import planner from "@/assets/contents/planner.png";
import stickyNotes from "@/assets/contents/sticky-notes.png";

const itemImages = {
  notebook,
  pens,
  stickyNotes,
  planner,
  highlighter,
  flashcards,
};

const itemPositions = {
  notebook: "-left-6 top-16 w-40 rotate-[-15deg]",
  pens: "right-0 top-20 w-36 rotate-[15deg]",
  stickyNotes: "-left-4 bottom-28 w-32 rotate-[-10deg]",
  planner: "right-0 bottom-24 w-40 rotate-[8deg]",
  highlighters: "left-8 bottom-8 w-32 rotate-[-15deg]",
  flashcards: "right-8 top-4 w-36 rotate-[8deg]",
};

export default function CustomizationProductDisplay({
  selectedItems,
}) {
  return (
    <div className="relative mx-auto flex min-h-125 w-full max-w-xl items-center justify-center overflow-hidden rounded-[2rem] bg-neutral-100 p-8 md:min-h-[650px] md:rounded-[3rem]">
      {/* Background Details */}
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/70 blur-3xl" />

      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/70 blur-3xl" />

      {/* Selected Items */}
      <AnimatePresence>
        {selectedItems.map((item, index) => {
          const image = itemImages[item];
          const position = itemPositions[item];

          if (!image) return null;

          return (
            <motion.img
              key={item}
              src={image}
              alt={item}
              initial={{
                opacity: 0,
                scale: 0.5,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                y: 40,
              }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className={`absolute z-20 object-contain ${position}`}
            />
          );
        })}
      </AnimatePresence>

      {/* Main Box */}
      <motion.img
        src={box}
        alt="PREP'D Student Starter Box"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -1, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 w-full max-w-90 object-contain"
      />

      {/* Label */}
      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
        Your PREP'D Box
      </div>
    </div>
  );
}