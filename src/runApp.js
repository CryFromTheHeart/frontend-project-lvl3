import handlerSubmitForm from './handlers/handlerSubmitForm.js';
import onChange from 'on-change';
import renderErrors from './View/renderErrors.js';
import i18next from 'i18next';
import resources from './locales/index.js';
import renderItems from './View/renderPosts.js';
import renderFeeds from './View/renderFeeds.js';
import renderSuccessFeedback from './View/renderSuccessFeedback.js';
import updatePost from './handlers/handlerUpdatePosts.js';

const runApp = () => {
  const state = {
    status: 'start',
    feedItems: [],
    feedLinks: [],
    feeds: [],
    errors: [],
  };

  const uiElements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
  };

  const i18nInstance = i18next.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const watchedState = onChange(state, (path, value) => {
    if (path === 'status') {
      switch (value) {
        case 'loaded': {
          renderItems(state.feedItems, i18nInstance);
          renderFeeds(state.feeds, i18nInstance);
          renderSuccessFeedback(uiElements, i18nInstance);
          break;
        }
        case 'failed':
          renderErrors(state, uiElements);
          break;
        case 'loading':
          break;
        default:
          throw new Error('Unknown state');
      }
    }
    if (path === 'feedItems') {
      renderItems(state.feedItems, i18nInstance);
    }
  });

  uiElements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    handlerSubmitForm(watchedState, url, i18nInstance);
  });

  updatePost(watchedState);
};

export default runApp;
