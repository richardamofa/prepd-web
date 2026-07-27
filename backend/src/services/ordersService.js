const prisma = require("../config/prisma");

const orderInclude = {
  items: true,
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
  const {
    customerName,
    customerEmail,
    customerPhone,
    deliveryRequired,
    deliveryAddress,
    paymentMethod,
    items,
  } = data;

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: items.map((item) => item.productId),
      },

      isActive: true,
    },
  });

  if (products.length !== items.length) {
    throw new Error(
      "One or more products are unavailable",
    );
  }

  let total = 0;

  const orderItems = items.map((item) => {
    const product = products.find(
      (product) => product.id === item.productId,
    );

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      throw new Error("Invalid product quantity");
    }

    const unitPrice = Number(product.price);
    const totalPrice = unitPrice * quantity;

    total += totalPrice;

    return {
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      quantity,
      unitPrice,
      totalPrice,
    };
  });

  const reference = `PREPD-${Date.now()}`;

  return await prisma.order.create({
    data: {
      reference,

      customerName,
      customerEmail,
      customerPhone,

      deliveryRequired:
        deliveryRequired ?? false,

      deliveryAddress,

      total,

      paymentMethod,

      items: {
        create: orderItems,
      },
    },

    include: orderInclude,
  });
};

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
  orderStatus,
) => {
  return await prisma.order.update({
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
  paymentStatus,
) => {
  return await prisma.order.update({
    where: {
      id,
    },

    data: {
      paymentStatus,
    },

    include: orderInclude,
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
};