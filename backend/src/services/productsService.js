const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const includeProduct = {
  images: {
    orderBy: {
      sortOrder: "asc",
    },
  },
  items: {
    include: {
      customizationItem: true,
    },
  },
};

const includePublicProduct = {
    images: {
      orderBy: {
        sortOrder: "asc",
      },
    },
};

const getAllProducts = async () => {
  return prisma.product.findMany({
    where: {
      isActive: true,
    },

    include: includePublicProduct,

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

const getProductById = (id) => prisma.product.findUnique({ where: { id }, include: includeProduct });
const getAllProductsForAdmin = () => prisma.product.findMany({ include: includeProduct, orderBy: { createdAt: "desc" } });

const imageData = (images) => images.map((image, index) => {
  if (!image || typeof image.src !== "string" || !image.src.trim()) {
    throw new AppError("Each product image must have a source", 400);
  }

  return {
    src: image.src.trim(),
    altText: typeof image.altText === "string" ? image.altText.trim() || null : null,
    sortOrder: image.sortOrder ?? index,
  };
});

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

  if (!Array.isArray(images)) {
    throw new AppError("Images must be an array", 400);
  }

  const productData = {
    slug,
    name,
    category,
    currency,
    price,
    description,
    longDescription,
    isActive,
  };

  return prisma.product.create({
    data: {
      ...productData,

      images:
        images.length > 0
          ? {
              create: imageData(images),
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

  if (images !== undefined && !Array.isArray(images)) {
    throw new AppError("Images must be an array", 400);
  }

  return prisma.$transaction(async (tx) => {
    const existingProduct = await tx.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new AppError("Product not found", 404);
    }

    const allowedProductData = {
      ...(productData.slug !== undefined ? { slug: productData.slug } : {}),
      ...(productData.name !== undefined ? { name: productData.name } : {}),
      ...(productData.category !== undefined ? { category: productData.category } : {}),
      ...(productData.currency !== undefined ? { currency: productData.currency } : {}),
      ...(productData.price !== undefined ? { price: productData.price } : {}),
      ...(productData.description !== undefined ? { description: productData.description } : {}),
      ...(productData.longDescription !== undefined ? { longDescription: productData.longDescription } : {}),
      ...(productData.isActive !== undefined ? { isActive: productData.isActive } : {}),
    };

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
        ...allowedProductData,

        ...(images
          ? {
              images: {
                create: imageData(images),
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
  }, {
    maxWait: 10000,
    timeout: 15000,
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
    getProductById,
    getAllProductsForAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getCustomizationItems,
};