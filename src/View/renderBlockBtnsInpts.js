const mapping = {
  disabled: (button, input) => {
    button.setAttribute('disabled', true);
    input.setAttribute('disabled', true);
  },
  enable: (button, input) => {
    button.removeAttribute('disabled');
    input.removeAttribute('disabled');
  },
};

export default (status, uiElements) => {
  const { button, input } = uiElements;
  mapping[status](button, input);
};
