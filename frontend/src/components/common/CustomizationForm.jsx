import { Check, Loader2, Send } from "lucide-react";
import { useState } from "react";

import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import api from "@/services/api";

import {
  customizationItems,
  preparationOptions,
} from "@/constants/customizationOptions";

export default function CustomizationForm({
  selectedItems,
  setSelectedItems,
}) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    preparationFor: "",
    programme: "",
    quantity: 1,
    notes: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggleItem = (itemId) => {
    setSelectedItems((previous) =>
      previous.includes(itemId)
        ? previous.filter((item) => item !== itemId)
        : [...previous, itemId],
    );
  };

  const increaseQuantity = () => {
    setFormData((previous) => ({
      ...previous,
      quantity: previous.quantity + 1,
    }));
  };

  const decreaseQuantity = () => {
    setFormData((previous) => ({
      ...previous,
      quantity: Math.max(1, previous.quantity - 1),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");

    try {
      await api.customizationRequests.create({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        request: `${formData.preparationFor}; ${formData.programme}; Quantity: ${formData.quantity}; Items: ${selectedItems.join(", ")}; ${formData.notes}`,
      });

      setStatus("success");
      showToast("Customization request sent successfully.", "success");
    } catch (error) {
      // console.error(error);
      setStatus("error");
      showToast(error.message || "We couldn't send your request.", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold">Name<input name="customerName" value={formData.customerName} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-black" /></label>
        <label className="text-sm font-semibold">Email<input name="customerEmail" type="email" value={formData.customerEmail} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-black" /></label>
        <label className="text-sm font-semibold sm:col-span-2">Phone<input name="customerPhone" type="tel" value={formData.customerPhone} onChange={handleChange} required className="mt-2 w-full rounded-xl border border-neutral-200 px-4 py-3 font-normal outline-none focus:border-black" /></label>
      </div>
      {/* Preparation For */}

      <div>
        <label
          htmlFor="preparationFor"
          className="mb-3 block text-sm font-semibold"
        >
          What are you preparing for?
        </label>

        <select
          id="preparationFor"
          name="preparationFor"
          value={formData.preparationFor}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 outline-none transition focus:border-black"
        >
          <option value="">
            Select an option
          </option>

          {preparationOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Programme */}

      <div>
        <label
          htmlFor="programme"
          className="mb-3 block text-sm font-semibold"
        >
          What do you study?
        </label>

        <input
          id="programme"
          name="programme"
          value={formData.programme}
          onChange={handleChange}
          required
          placeholder="e.g. Computer Engineering"
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* Items */}

      <div>
        <div className="mb-4">
          <p className="text-sm font-semibold">
            What would you like included?
          </p>

          <p className="mt-1 text-sm text-neutral-500">
            Select the essentials you'd like in your box.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {customizationItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`relative rounded-xl border p-4 text-left transition ${
                  isSelected
                    ? "border-black bg-black text-white"
                    : "border-neutral-200 bg-white hover:border-black"
                }`}
              >
                {isSelected && (
                  <span className="absolute right-2 top-2">
                    <Check size={15} />
                  </span>
                )}

                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity */}

      <div>
        <p className="mb-3 text-sm font-semibold">
          Quantity
        </p>

        <div className="flex w-fit items-center rounded-xl border border-neutral-200">
          <button
            type="button"
            onClick={decreaseQuantity}
            className="px-4 py-3 text-lg transition hover:bg-neutral-100"
          >
            −
          </button>

          <span className="min-w-12 text-center font-semibold">
            {formData.quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            className="px-4 py-3 text-lg transition hover:bg-neutral-100"
          >
            +
          </button>
        </div>
      </div>

      {/* Notes */}

      <div>
        <label
          htmlFor="notes"
          className="mb-3 block text-sm font-semibold"
        >
          Anything else?
          <span className="ml-2 font-normal text-neutral-400">
            Optional
          </span>
        </label>

        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us anything else you'd like us to know..."
          className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-black"
        />
      </div>

      {/* Submit */}

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" && (
          <Loader2
            size={18}
            className="mr-2 animate-spin"
          />
        )}

        {status === "loading" && "Sending Request..."}

        {status === "idle" && (
          <>
            <Send
              size={18}
              className="mr-2"
            />
            Request My Custom Box
          </>
        )}

        {status === "success" && "Request Sent Successfully"}

        {status === "error" && "Try Again"}
      </Button>

      {/* Status Messages */}

      {status === "success" && (
        <p className="text-center text-sm text-green-600">
          Thanks! Your customization request has been received.
        </p>
      )}

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}