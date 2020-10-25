import createAdminStore from './store';
import simpleRestProvider from 'ra-data-simple-rest';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { history } from './utils';

const i18nProvider = polyglotI18nProvider(() => spanishMessages);

const config = {
  apiURL: 'http://201.249.178.134:3000/api'
}

export const dataProvider = simpleRestProvider(config.apiURL);

export const store = createAdminStore({
  dataProvider,
  history
});

export {
  i18nProvider,
  history,
  config
}

