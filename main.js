import { crawl } from './crawl.js';

const main = async () => {
  const argv = process.argv;
  if (argv.length !== 3) {
    throw new Error('Provide one argument (base url)');
  }

  const baseURL = argv[2];
  const urls = await crawl(baseURL);
  console.log(`Found urls: [${urls}]`);
};

main();
