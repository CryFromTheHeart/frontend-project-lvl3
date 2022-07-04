export default (uiElements, i18nInstance) => {
  const prevFeedback = document.querySelector('.feedback');
  prevFeedback.classList.add('text-success');
  prevFeedback.classList.remove('text-danger');
  uiElements.input.classList.remove('is-invalid');
  const text = i18nInstance.t('form.successLoad');
  prevFeedback.textContent = text;
};
