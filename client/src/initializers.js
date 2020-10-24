import createAdminStore from './store';
import simpleRestProvider from 'ra-data-simple-rest';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { history } from './utils';

export const dataProvider = simpleRestProvider('http://192.168.11.128:4000/api');

const i18nProvider = polyglotI18nProvider(() => spanishMessages);

export const store = createAdminStore({
  dataProvider,
  history
});

export {
  i18nProvider,
  history
}

