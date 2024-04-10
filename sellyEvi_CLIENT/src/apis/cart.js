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

// Add a product to a user's cart
export const createCart = async (productId) => {
  try {
    console.log('the endpoint create ahhh');
    console.log(productId);
    const response = await API.post(`carts/cart`, { product_id: productId}, {withCredentials: true});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}
export const addToCart = async (productId, productPrice, quantity) => {
  try {
    const response = await API.post(`carts/cart/items`, { product_id: productId, price: productPrice, quantity: quantity }, {withCredentials: true});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

// Removing a product from a user's cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`carts/cart/items/${cartItemId}`);
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

// Checking out a user's cart
export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/cart/checkout`, { cartId, paymentInfo });
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}