import axios from 'axios';
import { history, setAuthToken } from './utils';
import { config } from './initializers';

export const login = data => 
  axios.post(config.apiURL+'/login', data)
    .then(res => ({ response: res.data }))
    .catch(err => ({ error: err.message.data }));

export const logout = () =>
  axios.get(`${config.apiURL}/logout`)
    .then(res => {
      // localStorage.removeItem('token');
      setAuthToken();
      history.push('/login');
    });

export const fetchUser = id => 
  axios.get(`${config.apiURL}/users/current?id=${id}`)
    .then(res => res.data);

export const fetchUsers = () => 
  axios.get(`${config.apiURL}/users?role=USER`)
    .then(res => ({ response: res.data }));

export const vote = async (id, data) => {
  await axios.post(`${config.apiURL}/votation-centers/${id}`, data)
    .then(res => ({ response: res.data }))
    .catch(error => ({ error: error.message.data }));
}
