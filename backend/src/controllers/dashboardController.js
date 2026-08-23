const prisma = require("../config/prisma");

const getDashboard = async (req, res, next) => {
  try {
    const [totalOrders, pendingOrders, completedOrders, pendingPayments, unreadMessages, pendingRequests, recentOrders, recentRequests, recentMessages] = await prisma.$transaction([
      prisma.order.count(),
      prisma.order.count({ where: { orderStatus: "PENDING" } }),
      prisma.order.count({ where: { orderStatus: "COMPLETED" } }),
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.customizationRequest.count({ where: { status: "PENDING" } }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, reference: true, customerName: true, total: true, orderStatus: true, createdAt: true } }),
      prisma.customizationRequest.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, reference: true, customerName: true, status: true, createdAt: true } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, name: true, subject: true, status: true, createdAt: true } }),
    ]);
    res.json({ success: true, data: { metrics: { totalOrders, pendingOrders, completedOrders, pendingPayments, unreadMessages, pendingRequests }, recentOrders, recentRequests, recentMessages } });
  } catch (error) { next(error); }
};

module.exports = { getDashboard };