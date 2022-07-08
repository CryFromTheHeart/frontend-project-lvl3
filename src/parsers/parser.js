import _ from 'lodash';

export default (data) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(data, 'text/xml');
  const titleFeed = xml.querySelector('title').textContent;
  const descriptionFeed = xml.querySelector('description').textContent;

  const rawItems = xml.querySelectorAll('item');

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
