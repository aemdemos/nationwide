/* global WebImporter */
export default function parse(element, { document }) {
  const tables = [];

  // Function to create a table block
  const createTableBlock = (header, content) => {
    const table = WebImporter.DOMUtils.createTable([
      [header],
      [content],
    ], document);
    return table;
  };

  // Parse the first HTML block
  const firstHeading = element.querySelector('h2[data-component="Heading2"]');
  const firstSearchForm = element.querySelector('form[data-analytics-identifier="search bar"]');

  if (firstHeading && firstSearchForm) {
    const header1 = 'Search';
    const queryIndex = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

    const table1 = createTableBlock(header1, queryIndex);
    const hr1 = document.createElement('hr');
    tables.push(hr1, table1);
  }

  // Parse the second HTML block
  const secondHeading = element.querySelector('h2[data-component="Heading2"]:nth-of-type(2)');
  const secondSearchForm = element.querySelector('form[data-analytics-identifier="search bar"]:nth-of-type(2)');

  if (secondHeading && secondSearchForm) {
    const header2 = 'Search';
    const queryIndex2 = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

    const table2 = createTableBlock(header2, queryIndex2);
    const hr2 = document.createElement('hr');
    tables.push(hr2, table2);
  }

  // Replace the original element with the processed tables
  element.replaceWith(...tables);
}