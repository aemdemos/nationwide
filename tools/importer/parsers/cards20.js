/* global WebImporter */
 export default function parse(element, { document }) {
  const rows = [];

  // Extract all list items dynamically
  const listItems = element.querySelectorAll('li');

  if (listItems.length === 0) {
    // Handle edge case where no list items are found
    console.error('No list items found in the given element.');
    return;
  }

  // Header row (matches the exact header in the example) - dynamic
  rows.push(['Cards']);

  listItems.forEach((li) => {
    const image = li.querySelector('img');
    const link = li.querySelector('a');

    // Handle missing image or link edge cases dynamically
    const imageElement = image ? document.createElement('img') : document.createElement('span');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    } else {
      imageElement.textContent = 'Image not available';
    }

    const textElement = document.createElement('span');
    textElement.textContent = link ? link.textContent.trim() : 'Text not available';

    rows.push([imageElement, textElement]);
  });

  // Create the table block dynamically
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element dynamically
  element.replaceWith(blockTable);
}