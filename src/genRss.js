import axios from 'axios';
import routes from './util/routes.js';
import parser from './parsers/parser.js';
import normolizeParseData from './util/normolizeParseData.js';

export default (state, url) => {
  axios
    .get(routes.getCacheDisableRoutes(url))
    .then((response) => {
      const html = parser(response.data.contents);
      const { items, feed } = normolizeParseData(html);

      state.feeds = state.feeds.concat(feed);
      state.feedItems = state.feedItems.concat(items);
      state.feedLinks.push(url);

      state.status = 'loaded';
    })
    .catch(() => {
      state.errors.push(['Ресурс не содержит валидный RSS']);
      state.status = 'failed';
    });
};
