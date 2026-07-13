import { motion } from "framer-motion";
import ProductStoryDisplay from "./ProductStoryDisplay";

export default function StoryItem({ item, active, onEnter }) {
  return (
    <motion.div
      id={`story-${item.number}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="story-item flex min-h-[70vh] lg:min-h-screen flex-col lg:flex-row items-center py-12 lg:py-20"
    >
      <div className="w-full">
        <p className={`text-sm font-semibold tracking-[0.35em] transition-all duration-500 ${
          active ? "text-black" : "text-neutral-400"
        }`}>
          {item.number}
        </p>

        <h3 className={`mt-4 font-black transition-all duration-500 text-3xl md:text-4xl lg:text-5xl ${
          active ? "text-black" : "text-neutral-400"
        }`}>
          {item.title}
        </h3>

        {/* Mobile-Only Interactive Graphic Container */}
        <div className="block lg:hidden my-8 overflow-hidden py-4">
          <ProductStoryDisplay activeItem={item.number} isMobile={true} />
        </div>

        <p className={`mt-6 max-w-lg text-base md:text-lg leading-8 transition-all duration-500 ${
          active ? "text-neutral-700" : "text-neutral-400"
        }`}>
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}