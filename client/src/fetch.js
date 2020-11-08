import axios from 'axios';
import { history, setAuthToken } from './utils';
import { config } from './initializers';

export const login = data => 
  axios.post(config.apiURL+'/login', data)
    .then(res => ({ response: res.data }))
    .catch(err => ({ error: err.response.data }));

export const logout = () =>
  axios.get('/logout')
    .then(res => {
      // localStorage.removeItem('token');
      setAuthToken();
      history.push('/login');
    });

export const fetchUser = id => 
  axios.get(`${config.apiURL}/users/current?id=${id}`)
    .then(res => res.data);
