const level = "/images/levelUpBox/levelupbox_1.png";
const plus = "/images/levelUpPlusBox/levelupplusbox_1.png";
const starter = "/images/starterBox/starterbox_1.png";

export const fallbackProducts = [
  {
    id: "plus",
    slug: "prepd-level-up-plus-box",
    name: "PREP'D Level Up+ Box",
    price: 225,
    currency: "GH₵",
    category: "Premium Student Essentials",
    description:
      "The ultimate PREP'D experience.",
    images: [
      {
        src: plus,
        altText: "PREP'D Level Up+ Box",
      },
    ],
  },
  {
    id: "level",
    slug: "prepd-level-up-box",
    name: "PREP'D Level Up Box",
    price: 195,
    currency: "GH₵",
    category: "Student Essentials",
    description:
      "More essentials and organization for your semester.",
    images: [
      {
        src: level,
        altText: "PREP'D Level Up Box",
      },
    ],
  },
  {
    id: "starter",
    slug: "prepd-student-starter-box",
    name: "PREP'D Student Starter Box",
    price: 95,
    currency: "GH₵",
    category: "Student Essentials",
    description:
      "The essentials you need to start your semester prepared.",
    images: [
      {
        src: starter,
        altText: "PREP'D Student Starter Box",
      },
    ],
  },
];