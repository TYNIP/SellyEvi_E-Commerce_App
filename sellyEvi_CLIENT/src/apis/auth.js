import API from './client';


// logging a user in
export const login = async (credentials) => {
  try {
    const response = await API.post('auth/login', credentials, {withCredentials: true});
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
}


// Registering a user
export const register = async (data) => {
  try {
    const response = await API.post('auth/register', data, {withCredentials: true});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

// verifying the logged in status of a user
export const isLoggedIn = async () => {
  try {
    const response = await API.get('auth/logged_in', {withCredentials: true});
    return response.data;
  } catch(err) {
    throw err.response.data;
  }
}

// log Out user
export const logout = async () => {
  try {
    const response = await API.get('auth/logout', {withCredentials: true});
    return response;
  } catch (err) {
    throw err.response.data;
  }
}

/* THIRD PARTIES */
// verifying the logged in status of a user

export const loginWithGoogle = async () => {
    const response = await API.get('auth/google', {withCredentials: true});
    return response.data;
}