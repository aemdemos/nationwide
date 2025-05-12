/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Create the header row with exact structure from the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';
  cells.push(headerRow);

  // Iterate through the list items and extract content
  const listItems = element.querySelectorAll('li');
  listItems.forEach((listItem) => {
    const title = listItem.querySelector('p');
    if (title) {
      const titleText = title.textContent.trim();
      cells.push([titleText, '']); // Accordion blocks usually have empty content cells
    }
  });

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}