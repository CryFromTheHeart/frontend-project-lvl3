export default (data) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(data, 'text/xml');

  return html;
};
