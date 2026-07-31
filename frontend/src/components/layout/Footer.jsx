import Logo from "@/components/common/Logo";
import Section from "@/components/ui/Section";
import {
  Mail,
  Phone
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Section className="py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
                <Logo className="h-10" />
            </div>

            <p className="mt-3 text-sm text-neutral-500">
              Helping students stay prepared.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8 text-sm font-medium">
            {[
              { label: "Shop", path: "/shop" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/#contact" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.path}
                className="relative transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact */}
          <div className="space-y-3 text-sm">
            <a
              href="mailto:prepdco.26@gmail.com"
              className="flex items-center gap-2 text-neutral-600 transition hover:text-black"
            >
              <Mail size={16} />
                prepdco.26@gmail.com
            </a>

            <a
              href="tel:+233 20 739 2389"
              className="flex items-center gap-2 text-neutral-600 transition hover:text-black"
            >
              <Phone size={16} />
              +233 20 739 2389
            </a>
          </div>

            {/* Socials */}
            <div className="flex items-center gap-5 text-neutral-700">
            <a
                href="https://www.instagram.com/prepd_26/"
                className="group transition duration-300 hover:-translate-y-1"
            >
                {/* Instagram SVG */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition duration-300 group-hover:text-black"
                >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            </a>

            <a
                href="mailto:prepdco.2026@gmail.com"
                className="group transition duration-300 hover:-translate-y-1"
            >
                {/* Mail SVG */}
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition duration-300 group-hover:text-black"
                >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </a>
            </div>
        </div>

        <div className="mt-10 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
          © {new Date().getFullYear()} PREP'D. All rights reserved.
        </div>
      </Section>
    </footer>
  );
}