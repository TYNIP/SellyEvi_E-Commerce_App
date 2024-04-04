import API from './client';

// loading the user's cart
export const fetchCart = async () => {
  try {
    const response = await API.get(`carts/cart`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// adding a product to a user's cart
export const addToCart = async (productId, qty) => {
  try {
    const response = await API.post(`carts/cart/items`, { productId, qty });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// removing a product from a user's cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`carts/cart/items/${cartItemId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

// checking out a user's cart
export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/cart/checkout`, { cartId, paymentInfo });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}