import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';
import Login from './components/Login';
import { customRoutes } from './utils';
import { history } from './utils';

import spanishMessages from '@blackbox-vision/ra-language-spanish';
const i18nProvider = polyglotI18nProvider(() => spanishMessages);

function App() {
  return (
    <Admin
      dataProvider={simpleRestProvider('http://192.168.11.128:4000/api')}
      i18nProvider={i18nProvider}
      loginPage={Login}
      customRoutes={customRoutes}
      history={history}
    >
      <Resource name="votation-centers" list={VotationCentersList} create={VotationCentersCreate} options={{ label: 'Centros de votación' }} />
    </Admin>
  );
}

export default App;
