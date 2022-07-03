import { string } from 'yup';

const isValidForm = (state, form) => {
  const formData = new FormData(form);
  const url = formData.get('url').trim();

  const formSchema = string().url().notOneOf(state.fead);
  const isValid = formSchema
    .validate(url)
    .then((data) => state.fead.push(data))
    .catch((e) => state.errors.push(e));
  return isValid;
};

export default isValidForm;
