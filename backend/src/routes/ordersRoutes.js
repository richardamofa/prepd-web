const express = require("express");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
} = require("../controllers/ordersController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createOrder);

router.get("/", protect, getOrders);

router.get("/:id", protect, getOrder);

router.patch(
  "/:id/status",
  protect,
  updateOrderStatus,
);

router.patch(
  "/:id/payment",
  protect,
  updatePaymentStatus,
);

module.exports = router;