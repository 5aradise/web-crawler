'use strict';

import fs from 'fs';

import { crawl, normalizeURL } from './crawl.js';
import { makeReport } from './report.js';

const main = async () => {
  const argv = process.argv;
  if (argv.length !== 3) {
    throw new Error('Provide one argument (base url)');
  }

  const baseURL = argv[2];
  const pages = await crawl(baseURL);
  const report = makeReport(baseURL, pages);
  const reportFile = fs.createWriteStream(`report_${normalizeURL(baseURL)}.txt`);
  reportFile.write(report);
  reportFile.end();
};

main();
