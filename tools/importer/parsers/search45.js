/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract the header dynamically, ensuring it matches the example
  const headerRow = ['Search'];

  // Extract the URL dynamically from the element
  const linkElement = element.querySelector('form input');
  let absoluteURL;
  if (linkElement) {
    absoluteURL = linkElement.getAttribute('src') || 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  } else {
    absoluteURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  const cells = [
    headerRow,
    [absoluteURL]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(hr, block);
}