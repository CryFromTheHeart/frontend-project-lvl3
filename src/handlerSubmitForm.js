import { string } from 'yup';
import genRss from './genRss.js';

const handlerSubmitForm = (state, url, i18nInstance) => {
  state.status = 'loading';

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
