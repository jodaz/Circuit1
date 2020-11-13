import createAdminStore from './store';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { isEmpty, history, dataProvider as apiClient } from './utils';
import { fetchUtils } from 'react-admin';

const i18nProvider = polyglotI18nProvider(() => spanishMessages);

const config = {
  apiURL: `http://circuitouno.somoscarupano.com.ve/api`
}

export const dataProvider = apiClient(config.apiURL);

export const store = createAdminStore({
  dataProvider,
  history
});

export {
  i18nProvider,
  history,
  config
}

