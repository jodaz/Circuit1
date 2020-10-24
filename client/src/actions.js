export const login = credentials => ({
  type: 'LOGIN',
  payload: credentials
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const setUser = (user = {}) => ({
  type: 'SET_USER',
  payload: user
});

export const fetchUser = () => ({
  type: 'FETCH_USER' 
});
