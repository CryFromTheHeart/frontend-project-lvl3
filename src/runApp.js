import onChange from 'on-change';
import i18next from 'i18next';
import { setLocale, string } from 'yup';
import axios from 'axios';
import _ from 'lodash';
import {
  choseRender,
  renderPosts,
  renderModal,
  renderBlockButtons,
} from './view.js';
import resources from './locales/index.js';
import genRss from './genRss.js';
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

const handlerSubmitForm = (state, url, i18nInstance) => {
  state.status = 'loading';

  const formSchema = string().notOneOf(state.feedLinks).url();

  formSchema
    .validate(url)
    .then(() => genRss(state, url, i18nInstance))
    .catch((e) => {
      console.log(e);
      if (e.name === 'AxiosError') {
        state.errors.push('errors.networkError');
      } else if (e.name === 'TypeError') {
        state.errors.push('errors.invalidRSS');
      } else {
        state.errors.push(e.errors);
      }
      state.status = 'failed';
    });
};

const runApp = () => {
  const state = {
    status: 'start',
    feedItems: [],
    feedLinks: [],
    feeds: [],
    errors: [],
    uiState: {
      openedIds: [],
    },
  };

  const uiElements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    button: document.querySelector('button[type="submit"]'),
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance
    .init({
      lng: 'ru',
      debug: false,
      resources,
    })
    .then(() => {
      setLocale({
        mixed: {
          notOneOf: () => 'validation.notOneOf',
        },
        string: {
          url: () => 'validation.url',
        },
      });
      const watchedState = onChange(state, (path, value) => {
        renderBlockButtons('enable', uiElements);
        switch (path) {
          case 'status': {
            choseRender(value, i18nInstance, watchedState, uiElements);
            break;
          }
          case 'uiState.openedIds': {
            renderPosts(watchedState, i18nInstance);
            renderModal(state);
            break;
          }
          case 'feedItems':
            renderPosts(watchedState, i18nInstance);
            break;
          default:
            break;
        }
      });

      uiElements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url');
        handlerSubmitForm(watchedState, url, i18nInstance);
      });

      const postsContainer = document.querySelector('.posts');
      postsContainer.addEventListener('click', ({ target }) => {
        console.log(target);
        const id = target.dataset.bsPostid;
        if (!id) return;
        watchedState.uiState.openedIds.push(id);
      });
      updatePost(watchedState);
    });
};

export default runApp;
