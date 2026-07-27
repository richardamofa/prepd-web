const ordersService = require(
  "../services/ordersService",
);

const createOrder = async (
  req,
  res,
  next,
) => {
  try {
    const order =
      await ordersService.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (
  req,
  res,
  next,
) => {
  try {
    const orders =
      await ordersService.getAllOrders();

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrder = async (
  req,
  res,
  next,
) => {
  try {
    const order =
      await ordersService.getOrderById(
        req.params.id,
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req,
  res,
  next,
) => {
  try {
    const order =
      await ordersService.updateOrderStatus(
        req.params.id,
        req.body.orderStatus,
      );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updatePaymentStatus = async (
  req,
  res,
  next,
) => {
  try {
    const order =
      await ordersService.updatePaymentStatus(
        req.params.id,
        req.body.paymentStatus,
      );

    res.status(200).json({
      success: true,
      message:
        "Payment status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
};