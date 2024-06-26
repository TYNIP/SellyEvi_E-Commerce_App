import API from './client';

// Loading a user's orders
export const fetchOrders = async () => {
  try {
    const response = await API.get(`orders`, {withCredentials: true});
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}

// Loading a user's order by order ID
export const fetchOrder = async (orderId) => {
  try {
    const response = await API.get(`orders/${orderId}`, {withCredentials: true});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}