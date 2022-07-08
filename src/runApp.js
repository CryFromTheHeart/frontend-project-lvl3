import onChange from 'on-change';
import i18next from 'i18next';
import handlerSubmitForm from './handlerSubmitForm.js';
import {
  choseRender,
  renderPosts,
  renderModal,
  renderBlockButtons,
} from './view.js';
import resources from './locales/index.js';

import updatePost from './handlerUpdatePosts.js';

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

      updatePost(watchedState);
    });
};

export default runApp;
