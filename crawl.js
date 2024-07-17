const normalizeURL = (url) => {
  const urlObj = new URL(url);
  let normalUrl = urlObj.hostname + urlObj.pathname;
  if (normalUrl.endsWith('/')) {
    normalUrl = normalUrl.slice(0, -1);
  }
  return normalUrl;
};

export { normalizeURL };
