const prisma = require("../config/prisma");

const recordActivity = (data) => prisma.adminActivity.create({ data });

const listActivities = ({ pageSize = 50 } = {}) => prisma.adminActivity.findMany({
  take: Math.min(Number(pageSize) || 50, 100),
  orderBy: { createdAt: "desc" },
  include: { admin: { select: { name: true, email: true } } },
});

module.exports = { recordActivity, listActivities };