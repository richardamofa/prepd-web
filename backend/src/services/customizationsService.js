const prisma = require("../config/prisma");

const getAllCustomizations = async () => {
  return await prisma.customizationItem.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const getCustomizationById = async (id) => {
  return await prisma.customizationItem.findUnique({
    where: {
      id,
    },
  });
};

const createCustomization = async (data) => {
  return await prisma.customizationItem.create({
    data: {
      slug: data.slug,
      name: data.name,
      image: data.image,
      description: data.description,
      isActive: data.isActive ?? true,
    },
  });
};

const updateCustomization = async (id, data) => {
  return await prisma.customizationItem.update({
    where: {
      id,
    },

    data,
  });
};

const deleteCustomization = async (id) => {
  return await prisma.customizationItem.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllCustomizations,
  getCustomizationById,
  createCustomization,
  updateCustomization,
  deleteCustomization,
};