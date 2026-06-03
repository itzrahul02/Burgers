import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const authAPI = {
  register: (formData) =>
    api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  login: (email, password) => api.post("/auth/login", { email, password }),
  logout: () => api.post("/auth/logout"),
  verifyEmail: (code) => api.get(`/auth/verify?code=${code}`),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get("/user/profile"),
  updateProfile: (data) => api.put("/user/profile", data),
  getAvatar: () => api.get("/user/avatar"),
};

// Burger APIs
export const burgerAPI = {
  getAll: () => api.get("/burgers/menu"),
  getById: (id) => api.get(`/burgers/menu/${id}`),
  getByCategory: (category) => api.get(`/burgers/menu/category/${category}`),
  search: (query) => api.get(`/burgers/menu/search?q=${query}`),
  add: (formData) =>
    api.post("/burgers", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  update: (id, formData) =>
    api.put(`/burgers/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  delete: (id) => api.delete(`/burgers/${id}`),
  toggleAvailability: (id) => api.patch(`/burgers/${id}/toggle`),
};

// Order APIs
export const orderAPI = {
  create: (items, deliveryAddress) =>
    api.post("/orders", { items, deliveryAddress }),
  getMyOrders: () => api.get("/orders/my-orders"),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
  updateStatus: (id, status) =>
    api.patch(`/orders/${id}/status?status=${status}`),
  getAllByStatus: (status) => api.get(`/orders/admin/all?status=${status}`),
};

// Payment APIs
export const paymentAPI = {
  getKey: () => api.get("/payment/key"),
  checkout: (amount, orderId) => api.post("/payment/checkout", { amount, orderId }),
};

export default api;
