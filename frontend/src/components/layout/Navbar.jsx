import {
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import { useCart } from "@/context/CartContext";

import { Link } from "react-router-dom";

import Logo from "@/components/common/Logo";
import Container from "@/components/ui/Container";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  const links = [
    {
      name: "Home",
      href: "/",
      type: "route"
    },
    {
      name: "Shop",
      href: "/shop",
      type: "route"
    },
    {
      name: "About",
      href: "/about",
      type: "route"
    },
    {
      name: "Contact",
      href: "/#contact",
      type: "route"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "bg-white/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <Container className="flex h-24 items-center justify-between">
          <Logo className="h-10" />

          {/* Desktop Navigation */}
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

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link
              to="/cart"
              className="relative"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() =>
                setIsOpen((previous) => !previous)
              }
              className="relative z-60 p-2 md:hidden"
              aria-label={
                isOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={isOpen}
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{
                      opacity: 0,
                      rotate: -90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                    }}
                  >
                    <X size={26} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      rotate: 90,
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      rotate: -90,
                    }}
                  >
                    <Menu size={26} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white md:hidden"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <div className="flex min-h-screen flex-col justify-center px-6">
              <nav className="flex flex-col gap-2">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    className="py-3 text-4xl font-black tracking-tight"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="https://www.instagram.com/prepd_26/"
                target="blank_"
                onClick={closeMenu}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
                className="mt-12 flex items-center justify-center rounded-full bg-black px-8 py-4 text-lg font-semibold text-white!"
              >
               VISIT
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}