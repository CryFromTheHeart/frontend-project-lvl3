import _ from 'lodash';

export default (html) => {
  const titleFeed = html.querySelector('title').textContent;
  const descriptionFeed = html.querySelector('description').textContent;

  const rawItems = html.querySelectorAll('item');

  const feed = { title: titleFeed, description: descriptionFeed };

  const items = Array.from(rawItems).map((item) => {
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    const link = item.querySelector('link').textContent;

    return {
      id: _.uniqueId(),
      title,
      description,
      link,
    };
  });
  return { items, feed };
};
