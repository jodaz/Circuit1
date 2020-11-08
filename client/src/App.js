import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import { VotersList } from './components/Voters';
import { UsersList, UsersCreate } from './components/Users';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';
import { isEmpty } from './utils';

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
  // Check authentication
  useEffect(() => {
    let route = window.location.pathname;

    if (!isEmpty(localStorage.votToken)) {
      route = (route == '/login' || route == '/') ? '/home' : route;
    } else {
      route = '/login';
    }
    history.push(route);
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
