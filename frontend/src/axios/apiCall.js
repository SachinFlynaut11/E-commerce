import axiosInstance from './axios';

const getSessionId = () => {
  let sessionId = localStorage.getItem('cartSessionId');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('cartSessionId', sessionId);
  }
  return sessionId;
};

export const authApi = {
  register: (data) =>
    axiosInstance.post('/auth/register', data).then((res) => res.data),

  login: (data) =>
    axiosInstance.post('/auth/login', data).then((res) => res.data),

  getMe: () =>
    axiosInstance.get('/auth/me').then((res) => res.data),
};

export const productApi = {
  getProducts: (params = {}) =>
    axiosInstance.get('/products', { params }).then((res) => res.data),

  getProductById: (id) =>
    axiosInstance.get(`/products/${id}`).then((res) => res.data),

  getCategories: () =>
    axiosInstance.get('/products/categories').then((res) => res.data),

  seedProducts: () =>
    axiosInstance.post('/products/seed').then((res) => res.data),
};

export const cartApi = {
  getSessionId,

  getCart: () => {
    const sessionId = getSessionId();
    return axiosInstance.get(`/cart/${sessionId}`).then((res) => res.data);
  },

  addToCart: (productId, quantity = 1) => {
    const sessionId = getSessionId();
    return axiosInstance
      .post(`/cart/${sessionId}/items`, { productId, quantity })
      .then((res) => res.data);
  },

  updateQuantity: (productId, quantity) => {
    const sessionId = getSessionId();
    return axiosInstance
      .patch(`/cart/${sessionId}/items/${productId}`, { quantity })
      .then((res) => res.data);
  },

  removeFromCart: (productId) => {
    const sessionId = getSessionId();
    return axiosInstance
      .delete(`/cart/${sessionId}/items/${productId}`)
      .then((res) => res.data);
  },

  clearCart: () => {
    const sessionId = getSessionId();
    return axiosInstance.delete(`/cart/${sessionId}`).then((res) => res.data);
  },
};
