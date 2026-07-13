import { motion } from "framer-motion";

export default function ItemCard({ title, description }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
        ✦
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-neutral-600">
        {description}
      </p>
    </motion.div>
  );
}