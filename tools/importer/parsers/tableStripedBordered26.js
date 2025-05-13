/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create links from elements
  const createLink = (href, content) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = content;
    return link;
  };

  // Extract relevant content from the HTML structure
  const rows = [];

  // First row: Header matches the example exactly
  const headerRow = ['Product Name', 'Website'];
  rows.push(headerRow);

  // Extract content rows dynamically
  const listItems = element.querySelectorAll('li');
  listItems.forEach((item) => {
    const link = item.querySelector('a');
    if (link) {
      const rowData = [link.textContent.trim(), createLink(link.href, link.href)];
      rows.push(rowData);
    }
  });

  // Create block table dynamically
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}