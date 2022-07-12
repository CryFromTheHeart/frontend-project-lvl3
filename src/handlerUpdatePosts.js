import axios from 'axios';
import _ from 'lodash';
import routes from './routes.js';
import parser from './parser.js';

const updatePost = (state) => {
  const coll = state.feedLinks.map((link) => {
    const axiosPromise = axios
      .get(routes.getCacheDisableRoutes(link))
      .then((response) => {
        const { rawItems } = parser(response.data.contents);
        const newItems = _.differenceBy(rawItems, state.feedItems, 'link');
        state.feedItems = [
          ...newItems.map((item) => ({ id: _.uniqueId(), ...item })),
          ...state.feedItems,
        ];
      });
    return axiosPromise;
  });

  Promise.all(coll).then(() => {
    setTimeout(() => {
      updatePost(state);
    }, 5000);
  });
};

export default updatePost;
