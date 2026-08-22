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
    throw new Error(
      data?.message ||
        "Something went wrong on the server",
    );
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
  },
};

export default api;