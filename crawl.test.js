import { test, expect } from '@jest/globals';
import { normalizeURL } from './crawl.js';

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
