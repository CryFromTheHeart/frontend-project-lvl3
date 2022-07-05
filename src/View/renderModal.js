export default ({ feedItems, uiState: { openedIds } }) => {
  const id = openedIds[openedIds.length - 1];
  const { title, description, link } = feedItems.find((item) => item.id === id);

  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;

  const modalButton = document.querySelector('.modal-footer>.full-article');
  modalButton.setAttribute('href', link);
};
