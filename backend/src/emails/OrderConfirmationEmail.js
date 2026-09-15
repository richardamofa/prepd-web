const React = require("react");
const {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} = require("@react-email/components");

const h = React.createElement;

const colors = {
  ink: "#171717",
  muted: "#737373",
  border: "#e5e5e5",
  soft: "#f5f5f5",
  white: "#ffffff",
};

const money = (value, currency = "GH₵") =>
  `${currency} ${Number(value || 0).toFixed(2)}`;

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GH", {
    dateStyle: "long",
    timeZone: "Africa/Accra",
  }).format(new Date(date));

const labelStyle = {
  color: colors.muted,
  fontSize: "12px",
  letterSpacing: "1.5px",
  lineHeight: "20px",
  margin: "0",
  textTransform: "uppercase",
};

const valueStyle = {
  color: colors.ink,
  fontSize: "15px",
  lineHeight: "22px",
  margin: "4px 0 0",
};

function Detail({ label, value }) {
  return h(
    Section,
    { style: { padding: "0 0 18px", verticalAlign: "top" } },
    h(Text, { style: labelStyle }, label),
    h(Text, { style: valueStyle }, value),
  );
}

function OrderConfirmationEmail({ order }) {
  const currency = order.currency || "GH₵";
  const items = order.items || [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0),
    0,
  );
  const isDelivery = Boolean(order.deliveryRequired);
  const estimatedDuration = isDelivery
    ? process.env.ORDER_ESTIMATED_DELIVERY || "2-5 business days after delivery is confirmed"
    : "Ready for pickup after order confirmation";
  const supportEmail = process.env.PREPD_SUPPORT_EMAIL || "hello@prepd.com";
  const logoUrl = process.env.PREPD_EMAIL_LOGO_URL;
  const deliveryValue = isDelivery
    ? "Fee confirmed separately based on distance"
    : "Pickup - no delivery fee";

  return h(
    Html,
    null,
    h(Head),
    h(
      Preview,
      null,
      `Your PREP'D order ${order.reference} has been received`,
    ),
    h(
      Body,
      { style: { backgroundColor: colors.soft, fontFamily: "Arial, sans-serif", margin: "0", padding: "32px 16px" } },
      h(
        Container,
        { style: { backgroundColor: colors.white, margin: "0 auto", maxWidth: "620px", padding: "0 32px" } },
        h(
          Section,
          { style: { padding: "32px 0 26px" } },
          logoUrl
            ? h(Img, { src: logoUrl, alt: "PREP'D", width: "120", style: { display: "block" } })
            : h(Text, { style: { color: colors.ink, fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px", margin: "0" } }, "PREP'D"),
        ),
        h(Hr, { style: { borderColor: colors.border, margin: "0" } }),
        h(
          Section,
          { style: { padding: "38px 0 20px" } },
          h(Text, { style: { color: colors.muted, fontSize: "13px", letterSpacing: "2px", margin: "0 0 14px", textTransform: "uppercase" } }, "Order received"),
          h(Heading, { as: "h1", style: { color: colors.ink, fontSize: "30px", lineHeight: "38px", margin: "0 0 14px" } }, `You're all PREP'D, ${order.customerName}.`),
          h(Text, { style: { color: colors.muted, fontSize: "16px", lineHeight: "26px", margin: "0" } }, "Thanks for your order. We have received your details and will be in touch with the next fulfilment step."),
        ),
        h(
          Section,
          { style: { backgroundColor: colors.soft, padding: "20px 22px" } },
          h(
            Row,
            null,
            h(Detail, { label: "Order number", value: order.reference }),
            h(Detail, { label: "Order date", value: formatDate(order.createdAt) }),
          ),
          h(
            Row,
            null,
            h(Detail, { label: "Order status", value: String(order.orderStatus || "PENDING").replace(/_/g, " ") }),
            h(Detail, { label: "Estimated timing", value: estimatedDuration }),
          ),
        ),
        h(Heading, { as: "h2", style: { color: colors.ink, fontSize: "20px", margin: "34px 0 16px" } }, "Your order"),
        h(
          Section,
          null,
          ...items.map((item) =>
            h(
              Row,
              { key: item.id, style: { borderBottom: `1px solid ${colors.border}` } },
              h(
                Section,
                { style: { padding: "14px 0" } },
                h(Text, { style: { color: colors.ink, fontSize: "15px", fontWeight: "700", margin: "0" } }, item.productName),
                h(Text, { style: { color: colors.muted, fontSize: "14px", margin: "5px 0 0" } }, `Quantity: ${item.quantity}`),
              ),
              h(Text, { style: { color: colors.ink, fontSize: "15px", textAlign: "right", margin: "14px 0" } }, money(item.totalPrice, currency)),
            ),
          ),
        ),
        h(
          Section,
          { style: { padding: "20px 0 0" } },
          h(Row, null, h(Text, { style: { color: colors.muted, fontSize: "14px", margin: "0 0 10px" } }, "Subtotal"), h(Text, { style: { color: colors.ink, fontSize: "14px", margin: "0 0 10px", textAlign: "right" } }, money(subtotal, currency))),
          h(Row, null, h(Text, { style: { color: colors.muted, fontSize: "14px", margin: "0 0 10px" } }, "Delivery"), h(Text, { style: { color: colors.ink, fontSize: "14px", margin: "0 0 10px", textAlign: "right" } }, deliveryValue)),
          h(Hr, { style: { borderColor: colors.border, margin: "8px 0 16px" } }),
          h(Row, null, h(Text, { style: { color: colors.ink, fontSize: "17px", fontWeight: "700", margin: "0 0 28px" } }, "Total"), h(Text, { style: { color: colors.ink, fontSize: "17px", fontWeight: "700", margin: "0 0 28px", textAlign: "right" } }, money(order.total, currency))),
        ),
        isDelivery && h(
          Section,
          { style: { backgroundColor: "#fffaf0", padding: "16px 18px", marginBottom: "28px" } },
          h(Text, { style: { color: colors.ink, fontSize: "14px", lineHeight: "22px", margin: "0" } }, `Delivery address: ${order.deliveryAddress}`),
          h(Text, { style: { color: colors.muted, fontSize: "13px", lineHeight: "20px", margin: "7px 0 0" } }, "The delivery fee will be confirmed separately based on the distance."),
        ),
        h(Hr, { style: { borderColor: colors.border, margin: "0" } }),
        h(
          Section,
          { style: { padding: "26px 0 34px" } },
          h(Text, { style: { color: colors.muted, fontSize: "13px", lineHeight: "21px", margin: "0" } }, "Need help with your order? Reply to this email or contact us at ", h(Link, { href: `mailto:${supportEmail}`, style: { color: colors.ink, fontWeight: "700" } }, supportEmail), "."),
          h(Text, { style: { color: colors.muted, fontSize: "12px", lineHeight: "20px", margin: "16px 0 0" } }, "PREP'D - thoughtfully prepared for your next step."),
        ),
      ),
    ),
  );
}

module.exports = OrderConfirmationEmail;
