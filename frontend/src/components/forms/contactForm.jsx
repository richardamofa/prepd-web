import { ArrowRight, LoaderCircle } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import api from "@/services/api";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState(initialState);

  const [status, setStatus] = useState("idle");
  // idle | loading | success | error

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("loading");
    setError("");

    try {
      await api.contact.create(formData);

      setStatus("success");
      showToast("Message sent. We will get back to you soon.", "success");

      setFormData(initialState);
    } catch (error) {
      setStatus("error");
      showToast(error.message || "We couldn't send your message.", "error");
      setError(
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">Phone (optional)</label>
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+233 XX XXX XXXX" className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Subject
        </label>

        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Customization Request"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Message
        </label>

        <textarea
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us how we can help..."
          className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
          required
        />
      </div>

      {status === "success" && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Your message has been sent successfully.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="group w-full"
      >
        {status === "loading" ? (
          <>
            <LoaderCircle
              className="mr-2 animate-spin"
              size={18}
            />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight
              size={18}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </Button>
    </form>
  );
}