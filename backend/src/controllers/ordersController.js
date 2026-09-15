const ordersService = require(
  "../services/ordersService",
);
const { sendOrderConfirmationEmail, sendOrderCompletionEmail, sendAdminOrderNotificationEmail } = require("../services/emailService");
const AppError = require("../utils/AppError");

const createOrder = async (
  req,
  res,
  next,
) => {
  try {
    const order =
      await ordersService.createOrder(req.body);

    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error("Order confirmation email failed:", emailError);
    }
    try {
      await sendAdminOrderNotificationEmail(order);
    } catch (emailError) {
      console.error("Admin order notification email failed:", emailError);
    }

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

const getOrderByReference = async (req, res, next) => {
  try {
    const order = await ordersService.getOrderByReference(req.params.reference);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) { next(error); }
};

const updateOrderStatus = async (
  req,
  res,
  next,
) => {
  try {
    if (!["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"].includes(req.body.orderStatus)) throw new AppError("Order status is invalid", 400);
    const updateResult =
      await ordersService.updateOrderStatus(
        req.params.id,
        req.body.orderStatus,
        { includeTransition: true },
      );

    if (updateResult.completionTransition) {
      try {
        await sendOrderCompletionEmail(updateResult.order);
      } catch (emailError) {
        console.error("Order completion email failed:", emailError);
      }
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: updateResult.order,
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
  getOrderByReference,
  updateOrderStatus,
  updatePaymentStatus,
};