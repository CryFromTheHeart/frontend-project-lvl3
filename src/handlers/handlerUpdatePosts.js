import axios from 'axios';
import _ from 'lodash';
import routes from '../util/routes.js';
import parser from '../parsers/parser.js';

const updatePost = (state) => {
  state.feedLinks.forEach((link) => {
    axios.get(routes.getCacheDisableRoutes(link)).then((response) => {
      const { items } = parser(response.data.contents);
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
