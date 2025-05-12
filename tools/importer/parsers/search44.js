/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Create the header row dynamically based on the example
  const headerRow = ['Search'];
  cells.push(headerRow);

  // Dynamically extract the query index URL from the HTML element
  let queryIndexUrl = '';
  const formElement = element.querySelector('form');
  if (formElement) {
    const actionUrl = formElement.getAttribute('action');
    queryIndexUrl = actionUrl && actionUrl.startsWith('http') ? actionUrl : 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  } else {
    queryIndexUrl = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  cells.push([queryIndexUrl]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}