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

export const fetchUser = id => ({
  type: 'FETCH_USER',
  payload: id
});

export const setErrors = (errors = {}) => ({
  type: 'SET_FORM_ERRORS',
  payload: errors
});

export const clearErrors = () => ({
  type: 'CLEAR_ERRORS'
});

export const updateVotes = (votes) => ({
  type: 'UPDATE_VOTES',
  payload: votes
});

export const clearCommons = () => ({
  type: 'CLEAR_COMMONS'
})
