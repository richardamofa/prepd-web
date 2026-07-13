import { Mail, Phone } from "lucide-react";

import ContactForm from "@/components/forms/ContactForm";

import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section className="bg-neutral-50">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-center" id="contact">
        <div className="rounded-4xl border border-neutral-200 bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
            Contact Us
          </p>

          <h2 className="mt-4 text-5xl font-black leading-tight">
            Let's Get You
            <br />
            PREP'D.
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
            Have a question, need a customized order, or planning a bulk purchase?
            We'd love to hear from you.
          </p>

          <div className="mt-10 space-y-5">
            <a
              href="mailto:hello@prepd.com"
              className="flex items-center gap-3 text-neutral-700 hover:text-black"
            >
              <Mail size={20} />
              hello@prepd.com
            </a>

            <a
              href="tel:+233000000000"
              className="flex items-center gap-3 text-neutral-700 hover:text-black"
            >
              <Phone size={20} />
              +233 XX XXX XXXX
            </a>
          </div>
        </div>

      </div>
    </Section>
  );
}