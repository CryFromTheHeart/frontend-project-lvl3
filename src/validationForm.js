import { string, setLocale } from 'yup';

const isValidForm = (state, form, i18nInstance) => {
  const formData = new FormData(form);
  const url = formData.get('url').trim();
  setLocale({
    mixed: {
      notOneOf: () => i18nInstance.t('validation.notOneOf'),
    },
    string: {
      url: () => i18nInstance.t('validation.url'),
    },
  });
  const formSchema = string().notOneOf(state.feed).url();
  const isValid = formSchema
    .validate(url)
    .then((data) => state.feed.push(data))
    .catch((e) => state.errors.push(e.errors));
  return isValid;
};

export default isValidForm;
