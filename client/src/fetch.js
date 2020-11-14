import axios from 'axios';
import { history, setAuthToken } from './utils';
import { apiURL } from './config';

export const login = data => 
  axios.post(apiURL+'/login', data)
    .then(res => ({ response: res.data }))
    .catch(err => ({ error: err.message.data }));

export const logout = () =>
  axios.get(`${apiURL}/logout`)
    .then(res => {
      setAuthToken();
      history.push('/login');
    });

export const fetchUser = id => 
  axios.get(`${apiURL}/users/current?id=${id}`)
    .then(res => res.data);

export const fetchUsers = () => 
  axios.get(`${apiURL}/users?role=USER`)
    .then(res => ({ response: res.data }));

export const vote = async (id, data) => {
  await axios.post(`${apiURL}/votation-centers/${id}`, data)
    .then(res => ({ response: res.data }))
    .catch(error => ({ error: error.message.data }));
}
