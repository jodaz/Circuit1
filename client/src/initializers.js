import createAdminStore from './store';
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { isEmpty, history } from './utils';
import jsonapiClient from "ra-jsonapi-client";
import { fetchUtils } from 'react-admin';

const i18nProvider = polyglotI18nProvider(() => spanishMessages);

const config = {
  apiURL: `http://201.249.178.134:4000/api`
}

const settings = {
  headers: {
    Authorization: !isEmpty(localStorage.votingApp) ? localStorage.votingApp : ''
  }
};

export const dataProvider = jsonapiClient(config.apiURL, settings);

export const store = createAdminStore({
  dataProvider,
  history
});

export {
  i18nProvider,
  history,
  config
}

