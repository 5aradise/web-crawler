import { test, expect } from '@jest/globals';
import { normalizeURL, getURLs } from './crawl.js';

test('normalize slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('normalize protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('normalize caps', () => {
  const input = 'http://BLOG.BOOT.DEV/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toBe(expected);
});

test('get url', () => {
  const inputURL = 'https://example.com';
  const inputBody = `
<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>
`;
  const actual = getURLs(inputBody, inputURL);
  const expected = ['https://blog.boot.dev/'];
  expect(actual).toEqual(expected);
});

test('select url', () => {
  const inputURL = 'https://example.com';
  const inputBody = `
<p>You can reach Michael at:</p>

<ul>
  <li><a href="https://example.com">Website</a></li>
  <li><a href="mailto:m.bluth@example.com">Email</a></li>
  <li><a href="tel:+123456789">Phone</a></li>
</ul>
`;
  const actual = getURLs(inputBody, inputURL);
  const expected = ['https://example.com/'];
  expect(actual).toEqual(expected);
});

test('get urls', () => {
  const inputURL = 'https://example.com';
  const inputBody = `<blockquote>
	<p>This is a <i>block quotation</i> containing a single paragraph. Well, not quite, since this is not <em>really</em> quoted text, but I hope you understand the point. After all, this page does not use HTML markup very normally anyway.</p>
</blockquote>

<p>The following contains links to the Comm-244 home page</p>

<p>
	<a href="http://web.simmons.edu/~grovesd/comm244">Comm-244 Website</a>,
	<a href="http://web.simmons.edu/~grovesd/comm244/week3">Week 3 page for class</A>
</p>

<h2>Lists</h2>

<p>This is a paragraph before an <strong>unordered</strong> list (<code>ul</code>). Note that the spacing between a paragraph and a list before or after that is hard to tune in a user style sheet. You can't guess which paragraphs are logically related to a list, e.g. as a "list header".</p>
`;
  const actual = getURLs(inputBody, inputURL);
  const expected = [
    'http://web.simmons.edu/~grovesd/comm244',
    'http://web.simmons.edu/~grovesd/comm244/week3',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
  const inputURL = 'https://blog.boot.dev';
  const inputBody = `
  <html>
      <body>
        <a href="/path/one"><span>Boot.dev></span></a>
      </body>
    </html>`;
  const actual = getURLs(inputBody, inputURL);
  const expected = ['https://blog.boot.dev/path/one'];
  expect(actual).toEqual(expected);
});

test('getURLsFromHTML both', () => {
  const inputURL = 'https://blog.boot.dev';
  const inputBody = `
  <html>
    <body>
      <a href="/path/one"><span>Boot.dev></span></a>
      <a href="https://other.com/path/one"><span>Boot.dev></span></a>
    </body>
  </html>`;
  const actual = getURLs(inputBody, inputURL);
  const expected = [
    'https://blog.boot.dev/path/one',
    'https://other.com/path/one',
  ];
  expect(actual).toEqual(expected);
});
