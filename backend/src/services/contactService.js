const prisma = require("../config/prisma");

const listMessages = async ({ page, pageSize, skip, search, status }) => {
  const where = {
    ...(status ? { status } : {}),
    ...(search ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }, { subject: { contains: search, mode: "insensitive" } }] } : {}),
  };
  const [data, total] = await prisma.$transaction([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip, take: pageSize }),
    prisma.contactMessage.count({ where }),
  ]);
  return { data, pagination: { page, pageSize, total, pages: Math.ceil(total / pageSize) } };
};

module.exports = { listMessages };