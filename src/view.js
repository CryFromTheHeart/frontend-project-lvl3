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

export const renderBlockButtons = (status, uiElements) => {
  const { button, input } = uiElements;
  mapping[status](button, input);
};

export const renderErrors = (state, uiElements, i18nInstance) => {
  const prevFeedback = document.querySelector('.feedback');
  prevFeedback.classList.add('text-danger');
  uiElements.input.classList.add('is-invalid');
  const text = state.errors[state.errors.length - 1];
  prevFeedback.textContent = i18nInstance.t(text);
};

export const renderClearForm = (uiElements) => {
  uiElements.form.reset();
  uiElements.input.focus();
};

const createA = (item, font) => {
  const postLink = document.createElement('a');
  postLink.setAttribute('href', item.link);
  postLink.setAttribute('target', '_blank');
  postLink.setAttribute('data-id', item.id);
  postLink.dataset.bsPostid = item.id;
  postLink.setAttribute('rel', 'noopener noreferrer');
  postLink.classList.add(font);
  postLink.textContent = item.title;
  return postLink;
};

const createButton = (item, i18nInstance) => {
  const viewButton = document.createElement('button');
  viewButton.classList.add('btn', 'btn-outline-primary', 'btn-sm');
  viewButton.setAttribute('type', 'button');
  viewButton.setAttribute('data-id', item.id);
  viewButton.dataset.bsPostid = item.id;
  viewButton.setAttribute('data-bs-toggle', 'modal');
  viewButton.setAttribute('data-bs-target', '#modal');
  viewButton.textContent = i18nInstance.t('posts.button');
  return viewButton;
};

const createPostsSection = (i18nInstance) => {
  const container = document.querySelector('.posts');
  container.innerHTML = '';
  const postsCard = document.createElement('div');
  postsCard.classList.add('card', 'border-0');
  container.append(postsCard);
  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  postsCard.append(cardBody);

  const header = document.createElement('h2');
  header.classList.add('card-title', 'h4');
  header.textContent = i18nInstance.t('posts.header');
  cardBody.append(header);

  return postsCard;
};

export const renderPosts = (state, i18nInstance) => {
  const items = state.feedItems.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
  const container = createPostsSection(i18nInstance);
  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  items.forEach((item) => {
    const font = state.uiState.openedIds.find(
      (openlink) => openlink === item.id
    )
      ? 'fw-normal'
      : 'fw-bold';
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0'
    );

    const a = createA(item, font);
    const button = createButton(item, i18nInstance);

    li.append(a);
    li.append(button);

    ul.prepend(li);
  });

  container.append(ul);
};

const createFeedsSection = (i18nInstance) => {
  const container = document.querySelector('.feeds');
  container.innerHTML = '';

  const feedsCard = document.createElement('div');
  feedsCard.classList.add('card', 'border-0');
  container.append(feedsCard);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  feedsCard.append(cardBody);

  const header = document.createElement('h2');
  header.classList.add('card-title', 'h4');
  header.textContent = i18nInstance.t('feeds.header');
  cardBody.append(header);

  return container;
};

export const renderFeeds = (feeds, i18nInstance) => {
  const container = createFeedsSection(i18nInstance);

  const ul = document.createElement('ul');
  ul.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'rounded-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;

    const description = document.createElement('p');
    description.classList.add('m-0', 'small', 'text-black-50');
    description.textContent = feed.description;

    li.append(h3);
    li.append(description);
    ul.prepend(li);
  });

  container.append(ul);
};

export const renderSuccessFeedback = (uiElements, i18nInstance) => {
  const prevFeedback = document.querySelector('.feedback');
  prevFeedback.classList.add('text-success');
  prevFeedback.classList.remove('text-danger');
  uiElements.input.classList.remove('is-invalid');
  const text = i18nInstance.t('form.successLoad');
  prevFeedback.textContent = text;
};

export const renderModal = ({ feedItems, uiState: { openedIds } }) => {
  const id = openedIds[openedIds.length - 1];
  const { title, description, link } = feedItems.find((item) => item.id === id);

  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;

  const modalButton = document.querySelector('.modal-footer>.full-article');
  modalButton.setAttribute('href', link);
};

export const choseRender = (value, i18nInstance, watchedState, uiElements) => {
  switch (value) {
    case 'loaded': {
      renderClearForm(uiElements);
      renderPosts(watchedState, i18nInstance);
      renderFeeds(watchedState.feeds, i18nInstance);
      renderSuccessFeedback(uiElements, i18nInstance);
      break;
    }
    case 'failed':
      renderErrors(watchedState, uiElements, i18nInstance);
      break;
    case 'loading':
      renderBlockButtons('disabled', uiElements);
      break;
    default:
      throw new Error('Unknown state');
  }
};
