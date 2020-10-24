import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';

import spanishMessages from '@blackbox-vision/ra-language-spanish';
const i18nProvider = polyglotI18nProvider(() => spanishMessages);

function App() {
  return (
    <Admin
      dataProvider={simpleRestProvider('http://localhost:4000/api')}
      i18nProvider={i18nProvider}
    >
      <Resource name="votation-centers" list={VotationCentersList} create={VotationCentersCreate} />
    </Admin>
  );
}

export default App;
