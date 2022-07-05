import axios from 'axios';
import _ from 'lodash';
import routes from '../util/routes.js';
import parser from '../parsers/parser.js';
import normolizeParseData from '../util/normolizeParseData.js';

const updatePost = (state) => {
  state.feedLinks.forEach((link) => {
    axios.get(routes.getCacheDisableRoutes(link)).then((response) => {
      const html = parser(response.data.contents);
      const { items } = normolizeParseData(html);
      const newRawItems = _.union(items, state.feedItems);
      const newItems = _.differenceBy(newRawItems, state.feedItems, 'link');

      state.feedItems = [...newItems, ...state.feedItems];
    });
  });
  setTimeout(() => {
    updatePost(state);
  }, 5000);
};

export default updatePost;
