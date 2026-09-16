const { Resend } = require("resend");
const { render } = require("@react-email/render");
const React = require("react");
const OrderConfirmationEmail = require("../emails/OrderConfirmationEmail");
const OrderCompletionEmail = require("../emails/OrderCompletionEmail");
const CustomizationRequestConfirmationEmail = require("../emails/CustomizationRequestConfirmationEmail");
const CustomizationCompletionEmail = require("../emails/CustomizationCompletionEmail");
const AdminOrderNotificationEmail = require("../emails/AdminOrderNotificationEmail");
const AdminCustomizationRequestNotificationEmail = require("../emails/AdminCustomizationRequestNotificationEmail");

const ADMIN_NOTIFICATION_EMAIL = "prepdco.26@gmail.com";

let resendClient;

const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) return null;
  resendClient ||= new Resend(process.env.RESEND_API_KEY);
  return resendClient;
};

const sendEmail = async ({ to, subject, component, props, label }) => {
  const resend = getResendClient();
  const from = process.env.RESEND_FROM_EMAIL;

  if (!process.env.RESEND_API_KEY || !from) {
    console.error(`${label} email skipped: configure RESEND_API_KEY and RESEND_FROM_EMAIL in the backend environment.`);
    return { sent: false, skipped: true };
  }

  const html = await render(React.createElement(component, props));
  const { data, error } = await resend.emails.send({ from, to: [to], subject, html });

  if (error) throw new Error(error.message || `Resend failed to send the ${label} email`);
  return { sent: true, id: data?.id };
};

const sendOrderConfirmationEmail = (order) =>
  sendEmail({
    to: order.customerEmail,
    subject: `Your PREP'D order ${order.reference} has been received`,
    component: OrderConfirmationEmail,
    props: { order },
    label: "Order confirmation",
  });

const sendCustomizationRequestConfirmationEmail = (request) =>
  sendEmail({
    to: request.customerEmail,
    subject: `Your PREP'D customization request ${request.reference} has been received`,
    component: CustomizationRequestConfirmationEmail,
    props: { request },
    label: "Customization request confirmation",
  });

const sendOrderCompletionEmail = (order) =>
  sendEmail({
    to: order.customerEmail,
    subject: `Your PREP'D order ${order.reference} is complete`,
    component: OrderCompletionEmail,
    props: { order },
    label: "Order completion",
  });

const sendCustomizationCompletionEmail = (request) =>
  sendEmail({
    to: request.customerEmail,
    subject: `Your PREP'D customization request ${request.reference} is complete`,
    component: CustomizationCompletionEmail,
    props: { request },
    label: "Customization completion",
  });

const sendAdminOrderNotificationEmail = (order) =>
  sendEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: `New PREP'D Order · #${order.reference}`,
    component: AdminOrderNotificationEmail,
    props: { order },
    label: "Admin order notification",
  });

const sendAdminCustomizationRequestNotificationEmail = (request) =>
  sendEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: `New PREP'D Customization Request · #${request.reference}`,
    component: AdminCustomizationRequestNotificationEmail,
    props: { request },
    label: "Admin customization request notification",
  });

module.exports = {
  sendOrderConfirmationEmail,
  sendCustomizationRequestConfirmationEmail,
  sendOrderCompletionEmail,
  sendCustomizationCompletionEmail,
  sendAdminOrderNotificationEmail,
  sendAdminCustomizationRequestNotificationEmail,
};
