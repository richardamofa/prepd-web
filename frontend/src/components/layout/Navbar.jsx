import {
    Menu,
    ShoppingBag,
    X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Logo from "@/components/common/Logo";
import Container from "@/components/ui/Container";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <Container className="relative z-50 flex h-24 items-center justify-between">
        <Logo className="h-10" />

        <nav className="hidden items-center gap-12 text-xs font-semibold uppercase tracking-[0.25em] md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="relative">
            <ShoppingBag size={22} />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
              0
            </span>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden z-50 relative p-2"
            aria-label="Toggle Menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <X size={26} className="text-black" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Menu size={26} className="text-black" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Slide-in View overlay layout */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden"
          >
            {/* 💡 FIXED: Separated px-6 and pt-32 to provide systematic structural gutters */}
            <div className="flex h-full flex-col justify-center px-6 sm:px-8 pt-24 max-w-md mx-auto w-full">
              <div className="flex flex-col space-y-2">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                    className="py-3 text-4xl font-black tracking-tight text-black transition-colors hover:text-neutral-600"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-12 rounded-full bg-black px-8 py-4 text-lg font-semibold text-white w-full transition-transform active:scale-95"
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}