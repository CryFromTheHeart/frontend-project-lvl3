function ParseError(message) {
  this.name = 'ParseError';
  this.errors = ['errors.invalidRSS'];
  this.message = message ?? 'invalidRSS';
  this.stack = new Error().stack;
}
ParseError.prototype = Object.create(Error.prototype);

export default (data) => {
  try {
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
        title,
        description,
        link,
      };
    });
    return { rawItems: items, feed };
  } catch (e) {
    throw new ParseError();
  }
};
