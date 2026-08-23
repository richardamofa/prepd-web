const express = require("express");
const controller = require("../controllers/paymentsController");
const router = express.Router();

router.post("/paystack/initialize", controller.initializePaystack);
router.get("/paystack/verify/:reference", controller.verifyPaystack);
router.post("/momo/initialize", controller.initializeMomo);

module.exports = router;
