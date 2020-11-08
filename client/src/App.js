import React, { useEffect } from 'react';
import { Admin, Resource } from 'react-admin';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import { VotersList } from './components/Voters';
import { UsersList, UsersCreate } from './components/Users';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';
import { isEmpty } from './utils';

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
          list={UsersList}
          create={UsersCreate}
          options={{ label: 'Usuarios' }}
        />
        <Resource 
          name="votation-centers"
          list={VotationCentersList}
          create={VotationCentersCreate}
          options={{ label: 'Centros de votación' }}
        />
        <Resource 
          name="voters" 
          list={VotersList}
          options={{ label: 'Votantes' }}
        />
      </Admin>
    </Provider>
  );
}

export default App;
