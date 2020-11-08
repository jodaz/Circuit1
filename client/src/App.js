import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import { VotersList } from './components/Voters';
import { UsersList, UsersCreate } from './components/Users';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';
import { isEmpty } from './utils';
import jwt_decode from 'jwt-decode';
import { fetchUser } from './actions';
import { useDispatch } from 'react-redux';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import PeopleIcon from '@material-ui/icons/People';

import {
  store,
  dataProvider,
  i18nProvider,
  history
} from './initializers';

function App() {
  const dispatch = useDispatch();

  // Check authentication
  useEffect(() => {
    let route = window.location.pathname;

    if (!isEmpty(localStorage.votToken)) {
      const { id } = jwt_decode(localStorage.votToken);
      dispatch(fetchUser(id));
      route = (route == '/login' || route == '/') ? '/home' : route;
    } else {
      route = '/login';
    }
    history.push(route);
  }, []);

  return (
    <Admin
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={Login}
      customRoutes={customRoutes}
      history={history}
      title='Vote'
    >
      <Resource 
        name="users"
        icon={AccountCircleIcon}
        list={UsersList}
        create={UsersCreate}
        options={{ label: 'Usuarios' }}
      />
      <Resource 
        name="votation-centers"
        icon={CenterFocusStrongIcon}
        list={VotationCentersList}
        create={VotationCentersCreate}
        options={{ label: 'Centros de votación' }}
      />
      <Resource 
        name="voters" 
        icon={PeopleIcon} 
        list={VotersList}
        options={{ label: 'Votantes' }}
      />
    </Admin>
  );
}

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Wrapper;
