import axios from 'axios';
import routes from './util/routes.js';
import parser from './parsers/parser.js';
import normolizeParseData from './util/normolizeParseData.js';

export default (state, url, i18nInstance) => {
  axios
    .get(routes.getCacheDisableRoutes(url))
    .then((response) => {
      const html = parser(response.data.contents);
      const { items, feed } = normolizeParseData(html);

      state.feeds = state.feeds.concat(feed);
      state.feedItems = state.feedItems.concat(items).sort();
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
