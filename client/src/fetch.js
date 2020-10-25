import axios from 'axios';
import { history, setAuthToken } from './utils';
import { config } from './initializers';

export const login = data => 
  axios.post(config.apiURL+'/login', data)
    .then(res => {
      const data = res.data;

      // localStorage.setItem('token', token);
      // setAuthToken(token);

      history.push('/home');
      return data;
    });

export const logout = () =>
  axios.get('/logout')
    .then(res => {
      // localStorage.removeItem('token');
      setAuthToken();
      history.push('/login');
    });

export const fetchUser = () => 
  axios.get('/user')
    .then(res => res.data);
