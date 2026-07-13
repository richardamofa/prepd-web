
import { motion } from "framer-motion";

export default function FloatingItem({
  src,
  alt,
  className,
  active,
}) {
  return (
    <motion.img
      src={src}
      alt={alt}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 0.7,
        y: active ? [0, -8, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.35 },
        scale: { duration: 0.35 },
        y: {
          repeat: Infinity,
          duration: 2.8,
          ease: "easeInOut",
        },
      }}
      className={`absolute pointer-events-none ${className}`}
    />
  );
}