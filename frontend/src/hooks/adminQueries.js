import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import api from "@/services/api";

const EMPTY_LIST = [];

export const adminQueryKeys = {
  dashboard: ["admin", "dashboard"],
  products: ["admin", "products"],
  product: (productId) => ["admin", "product", productId],
  orders: ["admin", "orders"],
  order: (orderId) => ["admin", "order", orderId],
  messages: ["admin", "messages"],
  customizationRequests: ["admin", "customization-requests"],
};

export function useAdminDashboard() {
  return useQuery({
    queryKey: adminQueryKeys.dashboard,
    queryFn: api.admin.dashboard.get,
  });
}

export function useAdminProducts() {
  return useQuery({
    queryKey: adminQueryKeys.products,
    queryFn: api.admin.products.getAll,
  });
}

export function useAdminProduct(productId) {
  return useQuery({
    queryKey: adminQueryKeys.product(productId),
    queryFn: () => api.admin.products.getById(productId),
    enabled: Boolean(productId),
  });
}

export function useAdminOrders() {
  return useQuery({
    queryKey: adminQueryKeys.orders,
    queryFn: api.admin.orders.getAll,
  });
}

export function useAdminOrder(orderId) {
  return useQuery({
    queryKey: adminQueryKeys.order(orderId),
    queryFn: () => api.admin.orders.getById(orderId),
    enabled: Boolean(orderId),
  });
}

export function useAdminCustomizations() {
  return useQuery({
    queryKey: ["admin", "customizations"],
    queryFn: api.admin.customizations.getAll,
  });
}

export function useAdminCustomizationRequests(status = "") {
  return useQuery({
    queryKey: [...adminQueryKeys.customizationRequests, { status }],
    queryFn: () => api.admin.customizationRequests.getAll(status ? `?status=${status}` : ""),
  });
}

export function useAdminMessages(status = "") {
  return useQuery({
    queryKey: [...adminQueryKeys.messages, { status }],
    queryFn: () => api.admin.contactMessages.getAll(status ? `?status=${status}` : ""),
  });
}

export function useAdminProductMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: adminQueryKeys.products });
  return {
    create: useMutation({ mutationFn: api.admin.products.create, onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, data }) => api.admin.products.update(id, data), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: api.admin.products.remove, onSuccess: invalidate }),
  };
}

export function useAdminOrderMutations() {
  const queryClient = useQueryClient();
  return {
    updateStatus: useMutation({
      mutationFn: ({ id, status }) => api.admin.orders.updateStatus(id, status),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.orders });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.order(variables.id) });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
    updatePayment: useMutation({
      mutationFn: ({ id, status }) => api.admin.orders.updatePayment(id, status),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.orders });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.order(variables.id) });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
  };
}

export function useAdminCustomizationMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin", "customizations"] });
  return {
    create: useMutation({ mutationFn: api.admin.customizations.create, onSuccess: invalidate }),
    update: useMutation({ mutationFn: ({ id, data }) => api.admin.customizations.update(id, data), onSuccess: invalidate }),
    remove: useMutation({ mutationFn: api.admin.customizations.remove, onSuccess: invalidate }),
  };
}

export function useAdminRequestMutations() {
  const queryClient = useQueryClient();
  return {
    update: useMutation({
      mutationFn: ({ id, data }) => api.admin.customizationRequests.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.customizationRequests });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
    remove: useMutation({
      mutationFn: api.admin.customizationRequests.remove,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.customizationRequests });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
  };
}

export function useAdminMessageMutations() {
  const queryClient = useQueryClient();
  return {
    update: useMutation({
      mutationFn: ({ id, data }) => api.admin.contactMessages.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.messages });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
    remove: useMutation({
      mutationFn: api.admin.contactMessages.remove,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.messages });
        queryClient.invalidateQueries({ queryKey: adminQueryKeys.dashboard });
      },
    }),
  };
}
