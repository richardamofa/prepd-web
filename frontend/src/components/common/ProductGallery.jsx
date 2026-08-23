import { ImageOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductGallery({
  images = [],
}) {
  const [activeImage, setActiveImage] = useState(0);

  // Reset selected image whenever a different product loads
  useEffect(() => {
    setActiveImage(0);
  }, [images]);

  // Debug logs (remove when everything works)
  useEffect(() => {
    // console.log("Gallery images:", images);

    if (images.length) {
      // console.log("Current image:", images[activeImage]);
      // console.log("Current src:", images[activeImage]?.src);
    }
  }, [images, activeImage]);

  if (!images.length) {
    return (
      <div className="space-y-5">
        <div className="flex aspect-square items-center justify-center rounded-4xl bg-neutral-100">
          <div className="text-center">
            <ImageOff
              size={48}
              className="mx-auto text-neutral-300"
            />

            <p className="mt-4 text-sm text-neutral-500">
              No product images available
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="aspect-square rounded-xl bg-neutral-100"
            />
          ))}
        </div>
      </div>
    );
  }

  const currentImage =
    images[activeImage] || images[0];

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-4xl bg-neutral-100 p-8 md:p-16">
        <img
          src={currentImage.src}
          alt={
            currentImage.altText ||
            currentImage.name ||
            "Product image"
          }
          className="h-full w-full object-contain transition-all duration-300"
          onError={(e) => {
            // console.error("Failed to load:", currentImage.src);

            e.currentTarget.src =
              "/images/placeholders/product-placeholder.png";
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.id || image.src || index}
            type="button"
            onClick={() =>
              setActiveImage(index)
            }
            className={`overflow-hidden rounded-xl border transition ${
              activeImage === index
                ? "border-black ring-2 ring-black/10"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <div className="flex aspect-square items-center justify-center p-3">
              <img
                src={image.src}
                alt={
                  image.altText ||
                  "Thumbnail"
                }
                className="h-full w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "/images/placeholders/product-placeholder.png";
                }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}