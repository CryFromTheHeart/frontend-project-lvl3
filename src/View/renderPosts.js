const createA = (item, font) => {
  const postLink = document.createElement('a');
  postLink.setAttribute('href', item.link);
  postLink.setAttribute('target', '_blank');
  postLink.setAttribute('data-id', item.id);
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

export default (state, i18nInstance) => {
  const items = state.feedItems;
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
    button.addEventListener('click', () => {
      state.uiState.openedIds.push(item.id);
    });

    li.append(a);
    li.append(button);

    ul.prepend(li);
  });

  container.append(ul);
};
