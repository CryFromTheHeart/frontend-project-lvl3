import _ from 'lodash';

export default (html) => {
  const title = html.querySelector('title').textContent;
  const description = html.querySelector('description').textContent;

  const rawItems = html.querySelectorAll('item');

  const feed = { title, description };

  const items = Array.from(rawItems).map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      id: _.uniqueId(), title, description, link,
    };
  });
  return { items, feed };
};
