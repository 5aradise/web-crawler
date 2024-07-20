const makeReport = (baseURL, pages) => {
  let totalURLs = 0;
  const sortedPages = toSortedMap(pages);

  let reportBody = '';
  for (const [url, count] of sortedPages) {
    reportBody += `* ${url} - ${count}\n`;
    totalURLs += count;
  }

  let report = `*--------${baseURL}--------*\n`;
  report += `Total found ${totalURLs} links\n`;
  report += `of which are unique: ${pages.size}\n`;
  report += reportBody;
  report += '*------------------------*';
  return report;
};

const toSortedMap = (m) => {
  return new Map([...m.entries()].sort((a, b) => b[1] - a[1]));
};

export { makeReport };
