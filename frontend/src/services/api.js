const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiRequest = async (
  endpoint,
  options = {},
) => {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    },
  );

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const error = new Error(data?.message || "Something went wrong on the server");
    error.code = data?.code;
    throw error;
  }

  return data;
};

const api = {
  auth: {
    login: (credentials) =>
      apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),

    me: (token) =>
      apiRequest("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  },

  products: {
    getAll: () =>
      apiRequest("/products"),

    getBySlug: (slug) =>
      apiRequest(`/products/${slug}`),
  },

  customizations: {
    getAll: () =>
      apiRequest("/customizations"),
  },

  orders: {
    create: (orderData) =>
      apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
      }),
    getByReference: (reference) => apiRequest(`/orders/reference/${reference}`),
  },
  payments: {
    initializePaystack: (reference, email) => apiRequest("/payments/paystack/initialize", { method: "POST", body: JSON.stringify({ reference, email }) }),
    verifyPaystack: (reference) => apiRequest(`/payments/paystack/verify/${reference}`),
    initializeMomo: (reference) => apiRequest("/payments/momo/initialize", { method: "POST", body: JSON.stringify({ reference }) }),
  },
  customizationRequests: {
    create: (data) => apiRequest("/customization-requests", { method: "POST", body: JSON.stringify(data) }),
  },
  contact: {
    create: (data) => apiRequest("/contact", { method: "POST", body: JSON.stringify(data) }),
  },
  admin: {
    request: (endpoint, options = {}) => apiRequest(`/admin${endpoint}`, { ...options, headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}`, ...options.headers } }),
    products: {
      getAll: () => apiRequest("/admin/products", { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }),
      getById: (id) => api.admin.request(`/products/${id}`),
      create: (data) => api.admin.request("/products", { method: "POST", body: JSON.stringify(data) }),
      update: (id, data) => api.admin.request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      remove: (id) => api.admin.request(`/products/${id}`, { method: "DELETE" }),
    },
    orders: {
      getAll: () => api.admin.request("/orders"),
      getById: (id) => api.admin.request(`/orders/${id}`),
      updateStatus: (id, orderStatus) => api.admin.request(`/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ orderStatus }) }),
      updatePayment: (id, paymentStatus) => api.admin.request(`/orders/${id}/payment`, { method: "PATCH", body: JSON.stringify({ paymentStatus }) }),
    },
    dashboard: {
      get: () => api.admin.request("/dashboard"),
    },
    customizations: {
      getAll: () => api.admin.request("/customizations"),
      create: (data) => api.admin.request("/customizations", { method: "POST", body: JSON.stringify(data) }),
      update: (id, data) => api.admin.request(`/customizations/${id}`, { method: "PUT", body: JSON.stringify(data) }),
      remove: (id) => api.admin.request(`/customizations/${id}`, { method: "DELETE" }),
    },
    customizationRequests: {
      getAll: (query = "") => api.admin.request(`/customization-requests${query}`),
      update: (id, data) => api.admin.request(`/customization-requests/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
      remove: (id) => api.admin.request(`/customization-requests/${id}`, { method: "DELETE" }),
    },
    contactMessages: {
      getAll: (query = "") => api.admin.request(`/contact-messages${query}`),
      update: (id, data) => api.admin.request(`/contact-messages/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
      remove: (id) => api.admin.request(`/contact-messages/${id}`, { method: "DELETE" }),
    },
  },
};

export default api;