// src/data/fallbackProducts.js
import level from "@/images/products/level-up-box-1.png";
import plus from "@/images/products/level-up-plus-box-1.png";
import starter from "@/images/products/student-starter-box-1.png";

export const fallbackProducts = [
  {
    id: "plus",
    slug: "prepd-level-up-plus-box",
    name: "PREP'D Level Up+ Box",
    price: 750,
    currency: "GH₵",
    category: "Premium Student Essentials",
    description:
      "The ultimate PREP'D experience.",
    images: [
      {
        src: plus,
      },
    ],
  },
  {
    id: "level",
    slug: "prepd-level-up-box",
    name: "PREP'D Level Up Box",
    price: 500,
    currency: "GH₵",
    category: "Student Essentials",
    description:
      "More essentials and organization for your semester.",
    images: [
      {
        src: level,
      },
    ],
  },
  {
    id: "starter",
    slug: "prepd-student-starter-box",
    name: "PREP'D Student Starter Box",
    price: 350,
    currency: "GH₵",
    category: "Student Essentials",
    description:
      "The essentials you need to start your semester prepared.",
    images: [
      {
        src: starter,
      },
    ],
  },
];