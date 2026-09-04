import { motion } from "framer-motion";

import box from "@/assets/images/box.png";


const rotations = {
  "01": -5,
  "02": 4,
  "03": -3,
  "04": 5,
  "05": -2,
  //"06": 3,
};

export default function ProductDisplay({ activeItem }) {
  return (
    
    <motion.div
      animate={{
        rotate: rotations[activeItem] || 0,
        y: [0, -12, 0],
      }}
      transition={{
        rotate: {
          duration: 0.5,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="relative"
    >
      <div className="absolute bottom-6 left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-black/20 blur-3xl" />

      <img
        src={box}
        alt="PREP'D"
        className="relative z-10 w-full max-w-md"
      />
    </motion.div>
  );
}