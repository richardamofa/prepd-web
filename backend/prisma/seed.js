require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const { hashPassword } = require("../src/utils/password");

const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 10000,
    timeout: 30000,
  },
});

async function main() {
  console.log("🌱 Starting database seed...");

  /*
  | CUSTOMIZATION ITEMS
  */

const customizationItems = [
  [
    "mini-notebook",
    "Mini Notebook",
    "A compact notebook for quick notes, ideas, and everyday planning.",
  ],

  [
    "notebook",
    "Notebook",
    "A reliable notebook for lectures, study sessions, planning, and everyday writing.",
  ],

  [
    "pens",
    "Pens",
    "Smooth-writing pens for taking notes, making plans, and getting things done.",
  ],

  [
    "pencils",
    "Pencils",
    "Reliable pencils for sketching, writing, and everyday note-taking.",
  ],

  [
    "binder",
    "Binder",
    "A sturdy binder for organizing documents, notes, and important papers.",
  ],

  [
    "sticky-notes",
    "Sticky Notes",
    "Perfect for reminders, quick notes, and keeping important ideas visible.",
  ],

  [
    "highlighters",
    "Highlighters",
    "Make important information stand out while studying or organizing your notes.",
  ],

  [
    "hand-cream",
    "Hand Cream",
    "An everyday essential to help keep your hands moisturized and comfortable.",
  ],

  [
    "lip-balm",
    "Lip Balm",
    "An everyday essential for keeping your lips feeling comfortable and moisturized.",
  ],

  [
    "notebook-stickers",
    "Notebook Stickers",
    "Add personality and organization to your notebooks, planners, and study materials.",
  ],

  [
    "laptop-stickers",
    "Laptop Stickers",
    "A fun way to personalize your laptop and make it feel more like yours.",
  ],

  [
    "mini-splash",
    "Mini Splash",
    "A convenient everyday refreshment to keep close during busy days.",
  ],

  [
    "pen-pouch",
    "Pen Pouch",
    "Keep your pens and other small essentials organized and easy to carry.",
  ],

  [
    "premium-pen-pouch",
    "Premium Pen Pouch",
    "A premium storage option for keeping your writing essentials organized and protected.",
  ],

  [
    "dental-floss",
    "Dental Floss",
    "A convenient personal-care essential for your daily oral-care routine.",
  ],

  [
    "pocket-tissue",
    "Pocket Tissue",
    "A compact everyday essential that is easy to carry wherever you go.",
  ],

  [
    "clipboard",
    "Clipboard",
    "A practical writing essential for holding papers securely and keeping notes organized.",
  ],

  [
    "water-bottle",
    "Glass Water Bottle",
    "A reusable glass bottle for keeping your water fresh and easy to carry.",
  ],

  [
    "mini-water-bottle",
    "Mini Water Bottle",
    "A compact reusable glass bottle for keeping your water fresh wherever you go.",
  ],

  [
    "keychain",
    "Keychain",
    "A small everyday accessory for keeping your keys together and easy to find.",
  ],

  [
    "clippers",
    "Clippers",
    "A compact grooming essential for keeping your personal-care kit complete.",
  ],

  [
    "stanley-cup",
    "Stanley Cup",
    "A reusable cup for keeping your favorite drinks close throughout the day.",
  ],

  [
    "flashcards",
    "Flashcards",
    "A simple study tool for reviewing key ideas and preparing for exams.",
  ],

  [
    "planner",
    "Planner",
    "A practical planner for organizing deadlines, tasks, and everyday plans.",
  ],
].map(([slug, name, description]) => ({
  slug,
  name,
  description,
  image: `/images/customizations/${slug === "clippers" ? "clipper" : slug}.png`,
}));

for (const item of customizationItems) {
  await prisma.customizationItem.upsert({
    where: {
      slug: item.slug,
    },

    update: {
      name: item.name,
      description: item.description,
      image: item.image,
    },

    create: item,
  });
}

  console.log(
    `✅ Seeded ${customizationItems.length} customization items`,
  );

  /*
  | PRODUCT IMAGE HELPERS
  */

  const starterBoxImages = [
    {
      src: "/images/starterBox/starterbox_1.png",
      altText: "PREP'D Student Starter Box",
    },
    {
      src: "/images/starterBox/starterbox_2.png",
      altText: "PREP'D Student Starter Box contents",
    },
    {
      src: "/images/starterBox/starterbox_3.png",
      altText: "PREP'D Student Starter Box essentials",
    },
  ];

  const levelUpBoxImages = [
    {
      src: "/images/levelUpBox/levelupbox_1.png",
      altText: "PREP'D Level Up Box",
    },
    {
      src: "/images/levelUpBox/levelupbox_2.png",
      altText: "PREP'D Level Up Box contents",
    },
    {
      src: "/images/levelUpBox/levelupbox_3.png",
      altText: "PREP'D Level Up Box essentials",
    },
  ];

  const levelUpPlusBoxImages = [
    {
      src: "/images/levelUpPlusBox/levelupplusbox_1.png",
      altText: "PREP'D Level Up+ Box",
    },
    {
      src: "/images/levelUpPlusBox/levelupplusbox_2.png",
      altText: "PREP'D Level Up+ Box contents",
    },
    {
      src: "/images/levelUpPlusBox/levelupplusbox_3.png",
      altText: "PREP'D Level Up+ Box essentials",
    },
  ];

  /*
  | STARTER BOX
  */

  const starterBox = await prisma.product.upsert({
    where: {
      slug: "prepd-student-starter-box",
    },

    update: {
      name: "PREP'D Student Starter Box",
      category: "Student Essentials",
      currency: "GH₵",
      price: 95,

      description:
        "The essentials you need to start your semester prepared and ready to go.",

      longDescription:
        "The PREP'D Student Starter Box is a simple collection of everyday essentials designed to help you begin your semester organized, prepared, and ready for whatever comes next.",

      isActive: true,

      images: {
        deleteMany: {},

        create: starterBoxImages,
      },

      items: {
        deleteMany: {},

        create: [
          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "pencils",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "sticky-notes",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "binder",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },
        ],
      },
    },

    create: {
      slug: "prepd-student-starter-box",

      name: "PREP'D Student Starter Box",

      category: "Student Essentials",

      currency: "GH₵",

      price: 95,

      description:
        "The essentials you need to start your semester prepared and ready to go.",

      longDescription:
        "The PREP'D Student Starter Box is a simple collection of everyday essentials designed to help you begin your semester organized, prepared, and ready for whatever comes next.",

      isActive: true,

      images: {
        create: starterBoxImages,
      },

      items: {
        create: [
          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "pencils",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "sticky-notes",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "binder",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },
        ],
      },
    },
  });

  /*
  | LEVEL UP BOX
  */

  const levelUpBox = await prisma.product.upsert({
    where: {
      slug: "prepd-level-up-box",
    },

    update: {
      name: "PREP'D Level Up Box",
      category: "Student Essentials",
      currency: "GH₵",
      price: 195,

      description:
        "More essentials, more organization, and everything you need to level up your semester.",

      longDescription:
        "The PREP'D Level Up Box brings together practical study essentials and everyday personal items to help you stay organized, prepared, and comfortable throughout the semester.",

      isActive: true,

      images: {
        deleteMany: {},

        create: levelUpBoxImages,
      },

      items: {
        deleteMany: {},

        create: [
          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "pencils",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "highlighters",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "binder",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "clippers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-water-bottle",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-splash",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pen-pouch",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "dental-floss",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pocket-tissue",
              },
            },
          },
        ]
      },
    },

    create: {
      slug: "prepd-level-up-box",

      name: "PREP'D Level Up Box",

      category: "Student Essentials",

      currency: "GH₵",

      price: 195,

      description:
        "More essentials, more organization, and everything you need to level up your semester.",

      longDescription:
        "The PREP'D Level Up Box brings together practical study essentials and everyday personal items to help you stay organized, prepared, and comfortable throughout the semester.",

      isActive: true,

      images: {
        create: levelUpBoxImages,
      },

      items: {
        create: [
          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "pencils",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "highlighters",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "binder",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "clippers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-water-bottle",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-splash",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pen-pouch",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "dental-floss",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pocket-tissue",
              },
            },
          },
        ],
      },
    },
  });

  /*
  | LEVEL UP+ BOX
  */

  const levelUpPlusBox = await prisma.product.upsert({
    where: {
      slug: "prepd-level-up-plus-box",
    },

    update: {
      name: "PREP'D Level Up+ Box",
      category: "Premium Student Essentials",
      currency: "GH₵",
      price: 225,

      description:
        "The ultimate PREP'D experience with everything in the Level Up Box plus premium everyday essentials.",

      longDescription:
        "The PREP'D Level Up+ Box includes everything from the Level Up Box, with additional premium essentials designed to make your semester even more convenient, organized, and enjoyable.",

      isActive: true,

      images: {
        deleteMany: {},

        create: levelUpPlusBoxImages,
      },

      items: {
        deleteMany: {},

        create: [
          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "pencils",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "highlighters",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "clippers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "binder",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "mini-splash",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "premium-pen-pouch",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "dental-floss",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pocket-tissue",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "water-bottle",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "keychain",
              },
            },
          },
        ],
      },
    },

    create: {
      slug: "prepd-level-up-plus-box",

      name: "PREP'D Level Up+ Box",

      category: "Premium Student Essentials",

      currency: "GH₵",

      price: 225,

      description:
        "The ultimate PREP'D experience with everything in the Level Up Box plus premium everyday essentials.",

      longDescription:
        "The PREP'D Level Up+ Box includes everything from the Level Up Box, with additional premium essentials designed to make your semester even more convenient, organized, and enjoyable.",

      isActive: true,

      images: {
        create: levelUpPlusBoxImages,
      },

      items: {
        create: [
          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pens",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "highlighters",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "mini-notebook",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "notebook-stickers",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "laptop-stickers",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "mini-splash",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "premium-pen-pouch",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "lip-balm",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "hand-cream",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "dental-floss",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "pocket-tissue",
              },
            },
          },

          {
            quantity: 1,
            customizationItem: {
              connect: {
                slug: "stanley-cup",
              },
            },
          },

          {
            quantity: 2,
            customizationItem: {
              connect: {
                slug: "keychain",
              },
            },
          },
        ],
      },
    },
  });

  /*
  | ADMIN USER
  */

  const hashedPassword = await hashPassword(
    "26devPrepdPassword",
  );

  await prisma.adminUser.upsert({
    where: {
      email: "admin@prepd.com",
    },

    update: {},

    create: {
      email: "admin@prepd.com",
      password: hashedPassword,
      name: "Andrea Opare",
    },
  });

  console.log("✅ Admin user seeded");

  console.log("✅ PREP'D database seeded successfully!");

  console.log({
    products: [
      starterBox.name,
      levelUpBox.name,
      levelUpPlusBox.name,
    ],

    customizationItems: customizationItems.length,
  });
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });