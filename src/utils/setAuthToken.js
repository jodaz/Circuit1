const setAuthToken = token => {
  if (token) {
    localStorage.setItem('votToken', token);
  } else {
    localStorage.removeItem('votToken');
  }
}

export default setAuthToken;
