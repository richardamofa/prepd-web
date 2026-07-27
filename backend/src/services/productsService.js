const prisma = require("../config/prisma");

const getAllProducts = async () => {
  return await prisma.product.findMany({
    where: {
      isActive: true,
    },

    include: {
      images: true,

      items: {
        include: {
          customizationItem: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getProductBySlug = async (slug) => {
  return await prisma.product.findUnique({
    where: {
      slug,
    },

    include: {
      images: true,

      items: {
        include: {
          customizationItem: true,
        },
      },
    },
  });
};

const createProduct = async (data) => {
  const {
    slug,
    name,
    category,
    currency,
    price,
    image,
    description,
    longDescription,
    isActive,
    customizationItems,
  } = data;

  return await prisma.product.create({
    data: {
      slug,
      name,
      category,
      currency,
      price,
      image,
      description,
      longDescription,
      isActive,

      items: customizationItems?.length
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

    include: {
      images: true,

      items: {
        include: {
          customizationItem: true,
        },
      },
    },
  });
};

const updateProduct = async (id, data) => {
  const {
    customizationItems,
    ...productData
  } = data;

  return await prisma.$transaction(async (tx) => {
    if (customizationItems) {
      await tx.productItem.deleteMany({
        where: {
          productId: id,
        },
      });
    }

    return await tx.product.update({
      where: {
        id,
      },

      data: {
        ...productData,

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

      include: {
        images: true,

        items: {
          include: {
            customizationItem: true,
          },
        },
      },
    });
  });
};

const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};

const getCustomizationItems = async () => {
  return await prisma.customizationItem.findMany({
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