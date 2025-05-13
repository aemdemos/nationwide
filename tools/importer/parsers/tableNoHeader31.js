/* global WebImporter */
export default function parse(element, { document }) {
  // Extract list items from the provided HTML structure
  const listItems = [...element.querySelectorAll('li')];

  // Collect the content for each list item
  const rows = listItems.map((item) => {
    const primaryLink = item.querySelector('a.ScLink__ThemedLink-sc-1g231v1-0');
    const titleElement = primaryLink.querySelector('span > div'); // Target title div explicitly
    const smallElement = primaryLink.querySelector('small');

    const link = document.createElement('a');
    link.href = primaryLink.href;
    link.textContent = titleElement ? titleElement.textContent.trim() : 'Missing title';

    const additionalInfo = smallElement ? smallElement.textContent.trim() : 'Missing additional info';

    return [link, additionalInfo];
  });

  // Create the table structure
  const tableData = [
    ['Table (no header)'], // Header row
    ...rows
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}