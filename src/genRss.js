import axios from 'axios';
import routes from './util/routes.js';
import parser from './parsers/parser.js';

export default (state, url, i18nInstance) => {
  axios
    .get(routes.getCacheDisableRoutes(url))
    .then((response) => {
      const { items, feed } = parser(response.data.contents);

      state.feeds = state.feeds.concat(feed);
      state.feedItems = state.feedItems.concat(items);
      state.feedLinks.push(url);

      state.status = 'loaded';
    })
    .catch((e) => {
      if (e.name === 'AxiosError') {
        state.errors.push(i18nInstance.t('errors.networkError'));
      }
      if (e.name === 'TypeError') {
        state.errors.push(i18nInstance.t('errors.invalidRSS'));
      }
      state.status = 'failed';
    });
};
