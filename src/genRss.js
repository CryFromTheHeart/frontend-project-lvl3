import axios from 'axios';
import _ from 'lodash';
import routes from './routes.js';
import parser from './parser.js';

export default (state, url) => {
  axios
    .get(routes.getCacheDisableRoutes(url))
    .then((response) => {
      const { rawItems, feed } = parser(response.data.contents);
      const items = rawItems.map((item) => ({ id: _.uniqueId(), ...item }));

      state.feeds = state.feeds.concat(feed);
      state.feedItems = state.feedItems.concat(items);
      state.feedLinks.push(url);
      state.status = 'loaded';
    })
    .catch((e) => {
      if (e.name === 'AxiosError') {
        state.errors.push('errors.networkError');
      }
      if (e.name === 'TypeError') {
        state.errors.push('errors.invalidRSS');
      }
      state.status = 'failed';
    });
};
