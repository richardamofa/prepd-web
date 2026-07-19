import { motion } from "framer-motion";

import ProductDisplay from "@/components/common/ProductDisplay";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

import { fadeLeft, fadeRight } from "@/utils/motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 -z-10 h-175 w-175 rounded-full bg-neutral-100 blur-3xl" />

      <Container>
        <div className="grid min-h-[calc(100vh-96px)] items-center gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="show"
          >
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-neutral-500">
              Curated Student Starter Boxes
            </p>

            <h1 className="text-6xl font-black leading-none tracking-tight lg:text-8xl">
              Stay Ready.
              <br />

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">
              Everything you need to start the semester organized,
              confident and prepared—all packed into one premium
              starter box.
            </p>

            <div className="mt-10 flex gap-4">
              <Button>
                Shop Now
              </Button>

              <Button variant="secondary">
                Explore Box
              </Button>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate="show"
            className="relative flex justify-center"
          >
            <h2 className="absolute text-[180px] font-black font-head uppercase tracking-tight text-neutral-200 select-none">
                PREP'D
            </h2>
            <ProductDisplay />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}