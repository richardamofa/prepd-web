import { motion } from "framer-motion";

const letters = ["P", "R", "E", "P", "'", "D"];

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black text-white"
    >
      <p className="mb-6 text-sm uppercase tracking-[0.5em] text-neutral-400">
        Let's Get
      </p>

      <div className="flex text-6xl font-black md:text-8xl">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              duration: 0.55,
              repeat: Infinity,
              delay: index * 0.08,
            }}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}