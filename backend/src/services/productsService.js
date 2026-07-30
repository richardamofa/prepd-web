const prisma = require("../config/prisma");

const includeProduct = {
  images: true,

  items: {
    include: {
      customizationItem: true,
    },
  },
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    where: {
      isActive: true,
    },

    include: includeProduct,

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductBySlug = async (slug) => {
  return prisma.product.findUnique({
    where: {
      slug,
    },

    include: includeProduct,
  });
};

const createProduct = async (data) => {
  const {
    slug,
    name,
    category,
    currency,
    price,
    description,
    longDescription,
    isActive = true,

    images = [],

    customizationItems = [],
  } = data;

  return prisma.product.create({
    data: {
      slug,
      name,
      category,
      currency,
      price,
      description,
      longDescription,
      isActive,

      images:
        images.length > 0
          ? {
              create: images.map((image) => ({
                src: image.src,
                altText: image.altText || null,
              })),
            }
          : undefined,

      items:
        customizationItems.length > 0
          ? {
              create: customizationItems.map((item) => ({
                quantity: item.quantity || 1,

                customizationItem: {
                  connect: {
                    id: item.customizationItemId,
                  },
                },
              })),
            }
          : undefined,
    },

    include: includeProduct,
  });
};

const updateProduct = async (id, data) => {
  const {
    images,

    customizationItems,

    ...productData
  } = data;

  return prisma.$transaction(async (tx) => {
    if (images) {
      await tx.productImage.deleteMany({
        where: {
          productId: id,
        },
      });
    }

    if (customizationItems) {
      await tx.productItem.deleteMany({
        where: {
          productId: id,
        },
      });
    }

    return tx.product.update({
      where: {
        id,
      },

      data: {
        ...productData,

        ...(images
          ? {
              images: {
                create: images.map((image) => ({
                  src: image.src,
                  altText: image.altText || null,
                })),
              },
            }
          : {}),

        ...(customizationItems
          ? {
              items: {
                create: customizationItems.map((item) => ({
                  quantity: item.quantity || 1,

                  customizationItem: {
                    connect: {
                      id: item.customizationItemId,
                    },
                  },
                })),
              },
            }
          : {}),
      },

      include: includeProduct,
    });
  });
};

const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};

const getCustomizationItems = async () => {
  return prisma.customizationItem.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: "asc",
    },
  });
};

module.exports = {
  getAllProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getCustomizationItems,
};