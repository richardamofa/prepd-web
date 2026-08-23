const prisma = require("../config/prisma");

const include = {
  product: { select: { id: true, name: true, slug: true, images: { orderBy: { sortOrder: "asc" }, take: 1 } } },
  assignedTo: { select: { id: true, name: true, email: true } },
};

const reference = () => `CR-${new Date().getFullYear()}-${Date.now().toString().slice(-8)}-${Math.floor(Math.random() * 90 + 10)}`;

const createRequest = (data) => prisma.customizationRequest.create({ data: { ...data, reference: reference() }, include });

const listRequests = async ({ page, pageSize, skip, search, status, productId }) => {
  const where = {
    ...(status ? { status } : {}),
    ...(productId ? { productId } : {}),
    ...(search ? { OR: [{ customerName: { contains: search, mode: "insensitive" } }, { customerEmail: { contains: search, mode: "insensitive" } }, { reference: { contains: search, mode: "insensitive" } }] } : {}),
  };
  const [data, total] = await prisma.$transaction([
    prisma.customizationRequest.findMany({ where, include, orderBy: { createdAt: "desc" }, skip, take: pageSize }),
    prisma.customizationRequest.count({ where }),
  ]);
  return { data, pagination: { page, pageSize, total, pages: Math.ceil(total / pageSize) } };
};

const getRequest = (id) => prisma.customizationRequest.findUnique({ where: { id }, include });

const updateRequest = (id, data) => prisma.customizationRequest.update({ where: { id }, data, include });

const deleteRequest = (id) => prisma.customizationRequest.delete({ where: { id } });

module.exports = { createRequest, listRequests, getRequest, updateRequest, deleteRequest };