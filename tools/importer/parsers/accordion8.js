/* global WebImporter */
export default function parse(element, { document }) {
  // Verify if the element contains necessary content
  if (!element) return;

  // Correctly set the header row as per example
  const headerRow = ['Accordion'];

  // Extract all h2 headings and their corresponding content
  const titleElements = element.querySelectorAll('h2');
  const contentElements = element.querySelectorAll('[data-component="RichText"], ul');

  const rows = [];
  Array.from(titleElements).forEach((title, index) => {
    const titleText = title.textContent.trim();
    const content = contentElements[index]?.cloneNode(true);

    // Handle edge cases: skip rows where content is missing
    if (titleText && content) {
      rows.push([titleText, content]);
    }
  });

  // Build the table structure
  const cells = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}