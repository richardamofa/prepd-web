import { motion } from "framer-motion";

const words = [
  "STAY PREPARED",
  "START STRONG",
  "STUDY SMART",
  "GET PREP'D",
];

export default function ProductMarquee() {
  return (
    <div className="overflow-hidden border-y border-neutral-200 py-6">
      <motion.div
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex w-max gap-12 whitespace-nowrap"
      >
        {[...words, ...words].map((word, index) => (
          <div
            key={index}
            className="flex items-center gap-12"
          >
            <span className="text-2xl font-black tracking-tight md:text-4xl">
              {word}
            </span>

            <span className="text-xl text-neutral-400">
              ✦
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}