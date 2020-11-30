import React, { useState, useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import {
  VotationCentersEdit,
  VotationCentersList,
  VotationCentersCreate
} from './components/VotationCenters';
import {  MunicipalityList } from './components/Municipalities';
import {  UsersList, UsersCreate } from './components/Users';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { fetchUser } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'is-empty';
// Theming & Icons
import { deepPurple, pink } from '@material-ui/core/colors';
import Layout from './layout';
import { createMuiTheme } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import PublicIcon from '@material-ui/icons/Public';

import {
  store,
  dataProvider,
  i18nProvider,
  history
} from './initializers';

const theme = createMuiTheme({
  palette: {
    primary: pink
  }
});

const resources = rol => ([
  <Resource 
    name="municipalities"
    icon={<PublicIcon />}
    list={MunicipalityList}
    options={{ label: 'Municipios' }}
    key={2}
  />,
  <Resource 
    name="votation-centers"
    icon={<CenterFocusStrongIcon />}
    list={VotationCentersList}
    edit={rol === 'ADMIN' ? VotationCentersEdit : null}
    create={rol === 'ADMIN' ? VotationCentersCreate : null}
    options={{ label: 'Centros de votación' }}
    key={2}
  />,
 <Resource 
    name="users"
    icon={<AccountCircleIcon />}
    list={UsersList}
    create={ rol === 'ADMIN' ? UsersCreate : null}
    options={{ label: 'Usuarios' }}
    key={1}
  />,
]);

function App() {
  const user = useSelector(store => store.user.user);
  const [role, setRole] = useState();
  const dispatch = useDispatch();

  // Check authentication
  useEffect(() => {
    let route = window.location.pathname;

    if (!isEmpty(localStorage.votToken)) {
      const { exp, id } = jwt_decode(localStorage.votToken);
      dispatch(fetchUser(id));
      route = (route == '/login' || route == '/') ? '/home' : route;
    } else {
      route = '/login';
    }

    history.push(route);
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      setRole(user.role);
    }  
  }, [user]);

  if (role === 'USER' && window.location.pathname !== '/home') {
    history.push('/home');
  }

  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      customRoutes={customRoutes}
      layout={Layout}
      history={history}
      theme={theme}
      title='Vote'
    >
    {
      isEmpty(role) && role === 'USER'
        ? <></>
        : resources(role)
    }
    </Admin>
  );
}

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Wrapper;
