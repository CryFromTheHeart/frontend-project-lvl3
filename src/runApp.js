import onChange from 'on-change';
import i18next from 'i18next';
import handlerSubmitForm from './handlers/handlerSubmitForm.js';
import renderErrors from './View/renderErrors.js';
import resources from './locales/index.js';
import renderPosts from './View/renderPosts.js';
import renderFeeds from './View/renderFeeds.js';
import renderSuccessFeedback from './View/renderSuccessFeedback.js';
import updatePost from './handlers/handlerUpdatePosts.js';
import renderModal from './View/renderModal.js';
import renderClearForm from './View/renderClearForm.js';
import renderBlockBtnsInpts from './View/renderBlockBtnsInpts.js';

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
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources,
  });

  const watchedState = onChange(state, (path, value) => {
    renderBlockBtnsInpts('enable', uiElements);
    if (path === 'status') {
      switch (value) {
        case 'loaded': {
          renderClearForm(uiElements);
          renderPosts(watchedState, i18nInstance);
          renderFeeds(state.feeds, i18nInstance);
          renderSuccessFeedback(uiElements, i18nInstance);
          break;
        }
        case 'failed':
          renderErrors(state, uiElements);
          break;
        case 'loading':
          renderBlockBtnsInpts('disabled', uiElements);
          break;
        default:
          throw new Error('Unknown state');
      }
    }
    if (path === 'uiState.openedIds') {
      renderPosts(watchedState, i18nInstance);
      renderModal(state);
    }
    if (path === 'feedItems') {
      renderPosts(watchedState, i18nInstance);
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
