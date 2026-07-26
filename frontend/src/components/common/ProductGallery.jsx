import { useState } from "react";

export default function ProductGallery({ images }) {
  const [activeImage, setActiveImage] = useState(0);

  const currentImage = images[activeImage];

  return (
    <div className="space-y-5">
      {/* Main Image */}

      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-4xl bg-neutral-100 p-8 md:p-16">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="h-full w-full object-contain transition duration-500"
        />
      </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveImage(index)}
            className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border p-3 transition ${
              activeImage === index
                ? "border-black"
                : "border-neutral-200 hover:border-neutral-400"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}