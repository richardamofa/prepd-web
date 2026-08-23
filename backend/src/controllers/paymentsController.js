const paymentService = require("../services/paymentService");

const initializePaystack = async (req, res, next) => {
  try { const data = await paymentService.initializePaystack(req.body.reference, req.body.email); res.json({ success: true, data }); } catch (error) { next(error); }
};

const verifyPaystack = async (req, res, next) => {
  try { const data = await paymentService.verifyPaystack(req.params.reference); res.json({ success: true, data }); } catch (error) { next(error); }
};

const initializeMomo = async (req, res, next) => {
  try { const data = paymentService.initializeMomo(req.body.reference); res.json({ success: true, data }); } catch (error) { next(error); }
};

module.exports = { initializePaystack, verifyPaystack, initializeMomo };
