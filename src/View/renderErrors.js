export default (state, uiElements) => {
  const prevFeedback = document.querySelector('.feedback');
  prevFeedback.classList.add('text-danger');
  uiElements.input.classList.add('is-invalid');
  const text = state.errors[state.errors.length - 1];
  prevFeedback.textContent = text;
};
