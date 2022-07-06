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

export default (feeds, i18nInstance) => {
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
