const express = require("express");
const customizationRequests = require("../controllers/customizationRequestsController");
const contact = require("../controllers/contactController");
const router = express.Router();
router.post("/customization-requests", customizationRequests.create);
router.post("/contact", contact.create);
module.exports = router;