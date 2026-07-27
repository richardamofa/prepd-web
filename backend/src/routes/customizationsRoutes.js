const express = require("express");

const {
  getCustomizations,
  getCustomization,
  createCustomization,
  updateCustomization,
  deleteCustomization,
} = require(
  "../controllers/customizationsController",
);

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getCustomizations);

router.get("/:id", protect, getCustomization);

router.post("/", protect, createCustomization);

router.patch("/:id", protect, updateCustomization);

router.delete("/:id", protect, deleteCustomization);

module.exports = router;