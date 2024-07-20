'use strict';

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

const isSameDomain = (url1, url2) =>
  new URL(url1).hostname === new URL(url2).hostname;

const crawl = async (baseURL, currURL = baseURL, pages = new Map()) => {
  let res;
  try {
    res = await fetch(currURL);
  } catch {
    return pages;
  }

  if (!res.ok) {
    return pages;
  }
  if (!res.headers.get('content-type').includes('html')) {
    return pages;
  }

  console.log(`Crawling ${currURL}`);

  let html;
  try {
    html = await res.text();
  } catch {
    return pages;
  }

  let foundURLs;
  try {
    foundURLs = getURLs(html, currURL);
  } catch {
    return pages;
  }

  const toCrawl = [];
  for (const url of foundURLs) {
    const normalURL = normalizeURL(url);
    if (!pages.has(normalURL)) {
      pages.set(normalURL, 0);
      if (isSameDomain(baseURL, currURL)) {
        toCrawl.push(crawl(currURL, url, pages));
      }
    }
    pages.set(normalURL, pages.get(normalURL) + 1);
  }
  await Promise.all(toCrawl);
  return pages;
};

export { normalizeURL, getURLs, crawl };
