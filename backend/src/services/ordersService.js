const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const orderInclude = {
  items: {
    include: {
      product: true,
    },
  },

  payments: true,

  createdBy: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
};

const createOrder = async (data) => {
  const customer = data.customer || data;
  const delivery = data.delivery || data;
  const customerName = customer.customerName || customer.fullName;
  const customerEmail = customer.customerEmail || customer.email;
  const customerPhone = customer.customerPhone || customer.phone;
  const deliveryRequired = delivery.deliveryRequired ?? delivery.required ?? false;
  const deliveryAddress = delivery.deliveryAddress ?? delivery.address;
  const paymentMethod = String(data.paymentMethod || "").toUpperCase();
  const items = Array.isArray(data.items) ? data.items : [];

  if (!customerName || !customerEmail || !customerPhone || !items.length) throw new AppError("Customer details and at least one item are required", 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) throw new AppError("Email is invalid", 400);
  if (!deliveryRequired && deliveryAddress) throw new AppError("Delivery address is only valid for delivery orders", 400);
  if (deliveryRequired && (!deliveryAddress || deliveryAddress.length > 500)) throw new AppError("Delivery address is required", 400);
  if (!["MTN_MOMO", "PAYSTACK", "INSTAGRAM"].includes(paymentMethod)) throw new AppError("Payment method is invalid", 400);
  const productIds = items.map((item) => item.productId);
  if (new Set(productIds).size !== productIds.length) throw new AppError("Duplicate products are not allowed", 400);

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },
      isActive: true,
    },
  });

  if (products.length !== items.length) {
    throw new AppError("One or more products are unavailable", 400);
  }

  let total = new Prisma.Decimal(0);

  const orderItems = items.map((item) => {
    const product = products.find(
      (p) => p.id === item.productId
    );

    const quantity = Number(item.quantity);

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
      throw new AppError("Invalid product quantity", 400);
    }

    const unitPrice = product.price; // Decimal

    const totalPrice = unitPrice.mul(quantity);

    total = total.add(totalPrice);

    return {
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      quantity,
      unitPrice,
      totalPrice,
    };
  });

  const reference = `PREPD-${new Date().getFullYear()}-${Date.now()}-${Math.floor(Math.random() * 90 + 10)}`;

  return prisma.$transaction(async (tx) => tx.order.create({
    data: {
      reference,

      customerName,
      customerEmail,
      customerPhone,

      deliveryRequired: deliveryRequired ?? false,
      deliveryAddress,

      paymentMethod,

      total,

      items: {
        create: orderItems,
      },

      payments: {
        create: {
          reference: `PAY-${reference}`,
          amount: total,
          currency: "GH₵",
          method: paymentMethod,
          metadata: paymentMethod === "INSTAGRAM" ? { flow: "manual-social-checkout" } : undefined,
        },
      },
    },

    include: orderInclude,
  }));
};

const getOrderByReference = (reference) => prisma.order.findUnique({ where: { reference }, include: orderInclude });

const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: orderInclude,

    orderBy: {
      createdAt: "desc",
    },
  });
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: {
      id,
    },

    include: orderInclude,
  });
};

const updateOrderStatus = async (
  id,
  orderStatus
) => {
  const order = await prisma.order.findUnique({ where: { id }, select: { id: true } });
  if (!order) throw new AppError("Order not found", 404);

  return prisma.order.update({
    where: {
      id,
    },

    data: {
      orderStatus,
    },

    include: orderInclude,
  });
};

const updatePaymentStatus = async (
  id,
  paymentStatus
) => {
  if (!["PENDING", "PAID", "FAILED", "REFUNDED"].includes(paymentStatus)) throw new AppError("Payment status is invalid", 400);
  const order = await prisma.order.findUnique({ where: { id }, select: { id: true } });
  if (!order) throw new AppError("Order not found", 404);

  return prisma.$transaction(async (tx) => {
    await tx.payment.updateMany({ where: { orderId: id }, data: { status: paymentStatus } });
    return tx.order.update({ where: { id }, data: { paymentStatus }, include: orderInclude });
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrderByReference,
  updateOrderStatus,
  updatePaymentStatus,
};