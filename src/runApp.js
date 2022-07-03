import validationForm from './validationForm.js';
import onChange from 'on-change';
import renderErrors from './View/errorsRender.js';
import i18next from 'i18next';
import resources from './locales/index.js';

const runApp = () => {
  const state = {
    feed: [],
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

  const watchedState = onChange(state, (path) => {
    if (path === 'errors') {
      renderErrors(state, uiElements);
    }
    if (path === 'feed') {
      uiElements.form.reset();
      uiElements.input.focus();
    }
  });

  uiElements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    validationForm(watchedState, e.target, i18nInstance);
  });
};

export default runApp;
