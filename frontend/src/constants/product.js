import box from "@/assets/contents/box.png";
import floss from "@/assets/contents/floss.png";
import handCream from "@/assets/contents/hand-cream.png";
import highlighter from "@/assets/contents/highlighter.png";
import keychain from "@/assets/contents/key-chain.png";
import laptopStickers from "@/assets/contents/laptop-stickers.png";
import levelupBoxplusplus from "@/assets/contents/levelupbox.png";
import levelupBox from "@/assets/contents/levelupboxplusplus.png";
import lipBalm from "@/assets/contents/lip-balm.png";
import miniNotebook from "@/assets/contents/mini-notebook.png";
import splash from "@/assets/contents/mini-splash.png";
import notebook from "@/assets/contents/notebook.png";
import penPouch from "@/assets/contents/pen-pouch.png";
import pens from "@/assets/contents/pens.png";
import pocketTissue from "@/assets/contents/pocket-tissue.png";
import stanleyCup from "@/assets/contents/stanley-cup.png";
import stickers from "@/assets/contents/stickers.png";
import stickyNotes from "@/assets/contents/sticky-notes.png";

export const products = [

  // STARTER BOX
  {
    id: "prepd-student-starter-box",

    image: box,

    slug: "prepd-student-starter-box",

    name: "PREP'D Student Starter Box",

    category: "Student Essentials",

    currency: "GH₵",

    price: 350,

    description:
      "The essentials you need to start your semester prepared and ready to go.",

    longDescription:
      "The PREP'D Student Starter Box is a simple collection of practical study and everyday essentials designed to help you begin your semester organized, prepared, and ready for whatever comes next.",

    images: [
      {
        src: box,
        alt: "PREP'D Student Starter Box",
      },
      {
        src: notebook,
        alt: "PREP'D Mini Notebooks",
      },
      {
        src: pens,
        alt: "PREP'D Pens",
      },
    ],

    items: [
      {
        name: "Mini Notebooks",
        quantity: 2,
        image: miniNotebook,
        description:
          "Two compact notebooks for quick notes, reminders, ideas, and everyday planning.",
      },

      {
        name: "Smooth Writing Pens",
        image: pens,
        description:
          "Reliable pens for lectures, notes, and everyday writing.",
      },

      {
        name: "Sticky Notes",
        image: stickyNotes,
        description:
          "Perfect for reminders, bookmarks, quick notes, and study organization.",
      },

      {
        name: "Hand Cream",
        image: handCream,
        description:
          "A small everyday self-care essential to keep your hands feeling refreshed.",
      },

      {
        name: "Lip Balm",
        image: lipBalm,
        description:
          "A handy everyday essential to keep with you throughout the day.",
      },

      {
        name: "Notebook Stickers",
        image: stickers,
        description:
          "Fun stickers to personalize and decorate your notebooks.",
      },

      {
        name: "Laptop Stickers",
        image: laptopStickers,
        description:
          "Express yourself and personalize your laptop with PREP'D stickers.",
      },
    ],
  },


  // LEVEL UP BOX 
  {
    id: "prepd-level-up-box",

    image: levelupBox,

    slug: "prepd-level-up-box",

    name: "PREP'D Level Up Box",

    category: "Student Essentials",

    currency: "GH₵",

    price: 500,

    description:
      "More essentials, more organization, and everything you need to level up your semester.",

    longDescription:
      "The PREP'D Level Up Box brings together study essentials, organization tools, and everyday personal-care essentials to help you stay prepared throughout the semester.",

    images: [
      {
        src: box,
        alt: "PREP'D Level Up Box",
      },
      {
        src: notebook,
        alt: "PREP'D Notebook and Mini Notebook",
      },
      {
        src: pens,
        alt: "PREP'D Pens",
      },
      {
        src: highlighter,
        alt: "PREP'D Highlighters",
      },
    ],

    items: [
      {
        name: "Smooth Writing Pens",
        image: pens,
        description:
          "Reliable pens for lectures, assignments, and everyday writing.",
      },

      {
        name: "Highlighters",
        image: highlighter,
        description:
          "Make important concepts, notes, and information stand out.",
      },

      {
        name: "Premium Notebook",
        image: notebook,
        description:
          "A durable notebook for lectures, planning, and everyday note-taking.",
      },

      {
        name: "Mini Notebook",
        image: miniNotebook,
        description:
          "A compact notebook for quick notes, reminders, and ideas on the go.",
      },

      {
        name: "Notebook Stickers",
        image: stickers,
        description:
          "Personalize your notebooks with fun and expressive stickers.",
      },

      {
        name: "Laptop Stickers",
        image: laptopStickers,
        description:
          "Add personality to your laptop with unique PREP'D stickers.",
      },

      {
        name: "Mini Splash",
        image: splash,
        description:
          "A compact fragrance mist to keep with you throughout the day.",
      },

      {
        name: "Pen Pouch",
        image: penPouch,
        description:
          "Keep your pens and other small stationery essentials organized.",
      },

      {
        name: "Lip Balm",
        image: lipBalm,
        description:
          "A handy everyday essential to keep close throughout the day.",
      },

      {
        name: "Hand Cream",
        image: handCream,
        description:
          "A small self-care essential for keeping your hands feeling refreshed.",
      },

      {
        name: "Dental Floss",
        image: floss,
        description:
          "A convenient personal-care essential to keep in your everyday kit.",
      },

      {
        name: "Pocket Tissue",
        image: pocketTissue,
        description:
          "A useful everyday essential for your bag, backpack, or pocket.",
      },
    ],
  },

  
  // LEVEL UP BOX PLUS PLUS 
  {
    id: "prepd-level-up-plus-box",

    image: levelupBoxplusplus,

    slug: "prepd-level-up-plus-box",

    name: "PREP'D Level Up+ Box",

    category: "Premium Student Essentials",

    currency: "GH₵",

    price: 750,

    description:
      "Everything in the Level Up Box, plus premium essentials to take your PREP'D experience further.",

    longDescription:
      "The PREP'D Level Up+ Box includes everything from the Level Up Box, with additional premium everyday essentials designed to make your semester more convenient, organized, and enjoyable.",

    images: [
      {
        src: box,
        alt: "PREP'D Level Up Plus Box",
      },
      {
        src: notebook,
        alt: "PREP'D Notebook",
      },
      {
        src: pens,
        alt: "PREP'D Pens",
      },
      {
        src: highlighter,
        alt: "PREP'D Highlighters",
      },
    ],

    items: [
      // Everything from the Level Up Box

      {
        name: "Smooth Writing Pens",
        image: pens,
        description:
          "Reliable pens for lectures, assignments, and everyday writing.",
      },

      {
        name: "Highlighters",
        image: highlighter,
        description:
          "Make important concepts, notes, and information stand out.",
      },

      {
        name: "Premium Notebook",
        image: notebook,
        description:
          "A durable notebook for lectures, planning, and everyday note-taking.",
      },

      {
        name: "Mini Notebook",
        image:  miniNotebook,
        description:
          "A compact notebook for quick notes, reminders, and ideas on the go.",
      },

      {
        name: "Notebook Stickers",
        image: stickers,
        description:
          "Personalize your notebooks with fun and expressive stickers.",
      },

      {
        name: "Laptop Stickers",
        image: laptopStickers,
        description:
          "Add personality to your laptop with unique PREP'D stickers.",
      },

      {
        name: "Mini Splash",
        image: splash,
        quantity: 2,
        description:
          "Two compact fragrance mists to keep with you throughout the day.",
      },

      {
        name: "Premium Pen Pouch",
        image: penPouch,
        description:
          "A larger and more premium pouch for organizing your stationery essentials.",
      },

      {
        name: "Lip Balm",
        image: lipBalm,
        description:
          "A handy everyday essential to keep close throughout the day.",
      },

      {
        name: "Hand Cream",
        image: handCream,
        description:
          "A small self-care essential for keeping your hands feeling refreshed.",
      },

      {
        name: "Dental Floss",
        image: floss,
        description:
          "A convenient personal-care essential to keep in your everyday kit.",
      },

      {
        name: "Pocket Tissue",
        image: pocketTissue,
        description:
          "A useful everyday essential for your bag, backpack, or pocket.",
      },

      // Level Up+ exclusive items

      {
        name: "Stanley Cup",
        image: stanleyCup,
        description:
          "A reusable insulated cup to keep your drink with you throughout the day.",
      },

      {
        name: "Keychains",
        image: keychain,
        quantity: 2,
        description:
          "Fun PREP'D keychains to personalize your keys, bag, or backpack.",
      },
    ],
  },
];