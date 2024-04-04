import API from './client';

// loading the user's profile
export const fetchUser = async (userId) => {
  try {
    const response = await API.post(`users/${userId}`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// updating the user's profile
export const updateUser = async (userId) => {
  try {
    const response = await API.post(`users/${userId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}