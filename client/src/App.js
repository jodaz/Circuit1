import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { VotationCentersList, VotationCentersCreate } from './components/VotationCenters';

function App() {
  return (
    <Admin
      dataProvider={simpleRestProvider('http://localhost:4000/api')}
    >
      <Resource name="votation-centers" list={VotationCentersList} create={VotationCentersCreate} />
    </Admin>
  );
}

export default App;
