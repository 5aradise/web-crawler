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

  console.log('Start crawling');
  const pages = await crawl(baseURL);
  console.log('End crawling');

  const report = makeReport(baseURL, pages);
  if (!fs.existsSync('./reports/')) {
    fs.mkdirSync('./reports/');
  }

  let fileName = `report_${normalizeURL(baseURL)}`;
  if (fs.existsSync(`./reports/${fileName}.txt`)) {
    fileName += '(2)';
  }

  let counter = 3;
  while (fs.existsSync(`./reports/${fileName}.txt`)) {
    fileName = fileName.slice(0, -3);
    fileName += `(${counter++})`;
  }

  const reportFile = fs.createWriteStream(`./reports/${fileName}.txt`);
  reportFile.write(report);
  reportFile.end();
};

main();
