const prisma = require("../config/prisma");
const AppError = require("../utils/AppError");

const getOrder = (reference) => prisma.order.findUnique({ where: { reference }, include: { payments: true } });

const initializePaystack = async (reference, email) => {
  if (!process.env.PAYSTACK_SECRET_KEY) throw new AppError("Paystack is not configured", 503);
  const order = await getOrder(reference);
  if (!order || order.paymentMethod !== "PAYSTACK") throw new AppError("Paystack order not found", 404);
  if (email && email !== order.customerEmail) throw new AppError("Payment details are invalid", 400);
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: order.customerEmail, amount: Math.round(Number(order.total) * 100), currency: "GHS", reference: order.payments[0]?.reference }),
  });
  const result = await response.json();
  if (!response.ok || !result.status) throw new AppError("Unable to initialize payment", 502);
  return result.data;
};

const verifyPaystack = async (reference) => {
  if (!process.env.PAYSTACK_SECRET_KEY) throw new AppError("Paystack is not configured", 503);
  const order = await getOrder(reference);
  if (!order || order.paymentMethod !== "PAYSTACK") throw new AppError("Payment order not found", 404);
  const payment = order.payments[0];
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(payment.reference)}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } });
  const result = await response.json();
  if (!response.ok || !result.status || result.data.status !== "success" || Number(result.data.amount) !== Math.round(Number(order.total) * 100)) throw new AppError("Payment verification failed", 400);
  await prisma.$transaction([
    prisma.payment.update({ where: { id: payment.id }, data: { status: "PAID", providerReference: String(result.data.id), metadata: { provider: "paystack", channel: result.data.channel } } }),
    prisma.order.update({ where: { id: order.id }, data: { paymentStatus: "PAID" } }),
  ]);
  return { reference: order.reference, status: "PAID" };
};

const initializeMomo = () => { throw new AppError("MTN MoMo is not configured", 503); };

module.exports = { initializePaystack, verifyPaystack, initializeMomo };
