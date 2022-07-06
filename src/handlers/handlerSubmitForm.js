import { string, setLocale } from 'yup';
import genRss from '../genRss.js';

const handlerSubmitForm = (state, url, i18nInstance) => {
  state.status = 'loading';
  setLocale({
    mixed: {
      notOneOf: () => i18nInstance.t('validation.notOneOf'),
    },
    string: {
      url: () => i18nInstance.t('validation.url'),
    },
  });

  const formSchema = string().notOneOf(state.feedLinks).url();

  formSchema
    .validate(url)
    .then(() => {
      genRss(state, url, i18nInstance);
    })
    .catch((e) => {
      state.errors.push(e.errors);
      state.status = 'failed';
    });
};

export default handlerSubmitForm;
