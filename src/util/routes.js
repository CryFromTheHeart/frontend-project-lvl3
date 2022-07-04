export default {
  getCacheDisableRoutes: (url) =>
    `https://allorigins.hexlet.app/get?disableCache=true&url=${url}`,
};
