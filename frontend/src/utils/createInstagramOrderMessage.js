export function createInstagramOrderMessage({
  reference,
  customer,
  cartItems,
  cartTotal,
}) {
  const items = cartItems
    .map(
      (item) =>
        `• ${item.name} × ${item.quantity} — GH₵ ${(
          Number(item.price) * item.quantity
        ).toFixed(2)}`,
    )
    .join("\n");

  return `Hello PREP'D 👋

I'd like to complete an order.

ORDER REFERENCE
${reference}

CUSTOMER DETAILS
Name: ${customer.fullName}
Email: ${customer.email}
Phone: ${customer.phone}

ORDER DETAILS
${items}

TOTAL
GH₵ ${Number(cartTotal).toFixed(2)}

${
  customer.deliveryMethod === "delivery"
    ? `DELIVERY
Location: ${customer.address}`
    : `DELIVERY
Pickup / delivery details to be discussed.`
}

Please help me complete my order.

Thank you!`;
}