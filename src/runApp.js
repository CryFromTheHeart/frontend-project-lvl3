import validationForm from './formFalidation.js';
import onChange from 'on-change';

const runApp = () => {
  const state = {
    fead: [],
    errors: [],
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
    if (path === 'errors') {
      renderErrors();
    }
  });

  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    validationForm(watchedState, e.target);
  });
};

export default runApp;
