import { Admin, Resource } from 'react-admin';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import Login from './components/Login';
import { customRoutes } from './utils';
import { Provider } from 'react-redux';

import {
  store,
  dataProvider,
  i18nProvider,
  history
} from './initializers';

function App() {
  return (
    <Provider
      store={store}
    >
      <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        loginPage={Login}
        customRoutes={customRoutes}
        history={history}
      >
        <Resource name="votation-centers" list={VotationCentersList} create={VotationCentersCreate} options={{ label: 'Centros de votación' }} />
      </Admin>
    </Provider>
  );
}

export default App;
