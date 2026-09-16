import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { adminQueryClient } from "@/lib/adminQueryClient";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";

import { Analytics } from "@vercel/analytics/react";

import "@/styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={adminQueryClient}>
      <BrowserRouter>
        <CartProvider>
          <ToastProvider>
            <App />
            <Analytics />
          </ToastProvider>
        </CartProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);