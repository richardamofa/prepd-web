import { ShoppingBag } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

import QuantitySelector from "@/components/common/QuantitySelector";
import Button from "@/components/ui/Button";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-neutral-500">
        {product.category}
      </p>

      <h1 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
        {product.name}
      </h1>

      <p className="mt-6 text-2xl font-semibold">
        {product.currency} {product.price}
      </p>

      <p className="mt-8 text-lg leading-8 text-neutral-600">
        {product.longDescription}
      </p>

      <div className="mt-10">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <div className="mt-10">
        <Button
          onClick={handleAddToCart}
          className="w-full md:w-auto"
        >
          <ShoppingBag
            size={18}
            className="mr-2"
          />

          Add to Cart
        </Button>
      </div>

      <div className="mt-6 border-t border-neutral-200 pt-6 text-sm text-neutral-500">
        Total:{" "}
        <span className="font-semibold text-black">
          {product.currency} {totalPrice}
        </span>
      </div>
    </div>
  );
}