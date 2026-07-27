const express = require("express");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCustomizations,
} = require("../controllers/productsController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getProducts);

router.get("/customizations", protect, getCustomizations);

router.get("/:slug", getProduct);

router.post("/", protect, createProduct);

router.patch("/:id", protect, updateProduct);

router.delete("/:id", protect, deleteProduct);

module.exports = router;