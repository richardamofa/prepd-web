require("dotenv").config();

const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

const { hashPassword } = require("../src/utils/password");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  /*
  |--------------------------------------------------------------------------
  | CUSTOMIZATION ITEMS
  |--------------------------------------------------------------------------
  */

  const customizationItems = [
    {
      slug: "mini-notebook",
      name: "Mini Notebook",
    },

    {
      slug: "notebook",
      name: "Notebook",
    },

    {
      slug: "pens",
      name: "Pens",
    },

    {
      slug: "sticky-notes",
      name: "Sticky Notes",
    },

    {
      slug: "highlighters",
      name: "Highlighters",
    },

    {
      slug: "hand-cream",
      name: "Hand Cream",
    },

    {
      slug: "lip-balm",
      name: "Lip Balm",
    },

    {
      slug: "notebook-stickers",
      name: "Notebook Stickers",
    },

    {
      slug: "laptop-stickers",
      name: "Laptop Stickers",
    },

    {
      slug: "mini-splash",
      name: "Mini Splash",
    },

    {
      slug: "pen-pouch",
      name: "Pen Pouch",
    },

    {
      slug: "premium-pen-pouch",
      name: "Premium Pen Pouch",
    },

    {
      slug: "dental-floss",
      name: "Dental Floss",
    },

    {
      slug: "pocket-tissue",
      name: "Pocket Tissue",
    },

    {
      slug: "stanley-cup",
      name: "Stanley Cup",
    },

    {
      slug: "keychain",
      name: "Keychain",
    },
  ];

  for (const item of customizationItems) {
    await prisma.customizationItem.upsert({
      where: {
        slug: item.slug,
      },

      update: {
        name: item.name,
      },

      create: item,
    });
  }

  console.log(
    `✅ Seeded ${customizationItems.length} customization items`,
  );

  /*
  |--------------------------------------------------------------------------
  | STARTER BOX
  |--------------------------------------------------------------------------
  */

  const starterBox = await prisma.product.upsert({
    where: {
      slug: "prepd-student-starter-box",
    },

    update: {
      name: "PREP'D Student Starter Box",
      category: "Student Essentials",
      currency: "GH₵",
      price: 350,

      description:
        "The essentials you need to start your semester prepared and ready to go.",

      longDescription:
        "The PREP'D Student Starter Box is a simple collection of everyday essentials designed to help you begin your semester organized, prepared, and ready for whatever comes next.",

      isActive: true,
    },

    create: {
      slug: "prepd-student-starter-box",

      name: "PREP'D Student Starter Box",

      category: "Student Essentials",

      currency: "GH₵",

      price: 350,

      description:
        "The essentials you need to start your semester prepared and ready to go.",

      longDescription:
        "The PREP'D Student Starter Box is a simple collection of everyday essentials designed to help you begin your semester organized, prepared, and ready for whatever comes next.",

      isActive: true,

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
  |--------------------------------------------------------------------------
  | LEVEL UP BOX
  |--------------------------------------------------------------------------
  */

  const levelUpBox = await prisma.product.upsert({
    where: {
      slug: "prepd-level-up-box",
    },

    update: {
      name: "PREP'D Level Up Box",
      category: "Student Essentials",
      currency: "GH₵",
      price: 500,

      description:
        "More essentials, more organization, and everything you need to level up your semester.",

      longDescription:
        "The PREP'D Level Up Box brings together practical study essentials and everyday personal items to help you stay organized, prepared, and comfortable throughout the semester.",

      isActive: true,
    },

    create: {
      slug: "prepd-level-up-box",

      name: "PREP'D Level Up Box",

      category: "Student Essentials",

      currency: "GH₵",

      price: 500,

      description:
        "More essentials, more organization, and everything you need to level up your semester.",

      longDescription:
        "The PREP'D Level Up Box brings together practical study essentials and everyday personal items to help you stay organized, prepared, and comfortable throughout the semester.",

      isActive: true,

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
  |--------------------------------------------------------------------------
  | LEVEL UP+ BOX
  |--------------------------------------------------------------------------
  */

  const levelUpPlusBox = await prisma.product.upsert({
    where: {
      slug: "prepd-level-up-plus-box",
    },

    update: {
      name: "PREP'D Level Up+ Box",
      category: "Premium Student Essentials",
      currency: "GH₵",
      price: 750,

      description:
        "The ultimate PREP'D experience with everything in the Level Up Box plus premium everyday essentials.",

      longDescription:
        "The PREP'D Level Up+ Box includes everything from the Level Up Box, with additional premium essentials designed to make your semester even more convenient, organized, and enjoyable.",

      isActive: true,
    },

    create: {
      slug: "prepd-level-up-plus-box",

      name: "PREP'D Level Up+ Box",

      category: "Premium Student Essentials",

      currency: "GH₵",

      price: 750,

      description:
        "The ultimate PREP'D experience with everything in the Level Up Box plus premium everyday essentials.",

      longDescription:
        "The PREP'D Level Up+ Box includes everything from the Level Up Box, with additional premium essentials designed to make your semester even more convenient, organized, and enjoyable.",

      isActive: true,

      items: {
        create: [
          /*
          |------------------------------------------------------------------
          | Everything from the Level Up Box
          |------------------------------------------------------------------
          */

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

          /*
          |------------------------------------------------------------------
          | Level Up+ Exclusive Items
          |------------------------------------------------------------------
          */

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
  |--------------------------------------------------------------------------
  | SUMMARY
  |--------------------------------------------------------------------------
  */

  console.log("✅ PREP'D database seeded successfully!");

  console.log({
    products: [
      starterBox.name,
      levelUpBox.name,
      levelUpPlusBox.name,
    ],

    customizationItems: customizationItems.length,
  });

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
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });