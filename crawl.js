import { JSDOM } from 'jsdom';

const normalizeURL = (url) => {
  const urlObj = new URL(url);
  let normalUrl = urlObj.hostname + urlObj.pathname;
  if (normalUrl.endsWith('/')) {
    normalUrl = normalUrl.slice(0, -1);
  }
  return normalUrl;
};

const getURLs = (html, baseURL) => {
  const dom = new JSDOM(html);
  const nodeList = dom.window.document.querySelectorAll('a');
  const urls = [];
  for (const node of nodeList) {
    if (node.hasAttribute('href')) {
      const href = node.getAttribute('href');
      const url = new URL(href, baseURL).href;
      if (url.startsWith('http')) {
        urls.push(url);
      }
    }
  }
  return urls;
};

const crawl = async (baseUrl) => {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    throw new Error(`unsuccessful response (url:${baseUrl})`);
  }
  if (!res.headers.get('content-type').includes('html')) {
    throw new Error('response does not contain html (url:${baseUrl})');
  }

  const html = await res.text();
  return getURLs(html, baseUrl);
};

export { normalizeURL, getURLs, crawl };
