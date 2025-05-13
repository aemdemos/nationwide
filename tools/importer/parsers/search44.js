/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row with the exact block name
  const headerRow = ['Search'];

  // Extract the URL dynamically from the element
  const formElement = element.querySelector('form');
  let url = '';
  if (formElement) {
    const action = formElement.getAttribute('action');
    if (action && action !== '#') {
      url = action;
    }
  }

  // Set a default fallback URL if the dynamic extraction fails
  if (!url) {
    url = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  }

  // Create the content row with the extracted or fallback URL
  const contentRow = [url];

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured block table
  element.replaceWith(blockTable);
}