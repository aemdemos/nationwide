/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from links
  const links = Array.from(element.querySelectorAll('a')).map(link => {
    const href = link.getAttribute('href');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', href);
    anchor.textContent = href;
    return anchor;
  });

  // Accurate table structure for Embed block
  const headerRow = ['Embed'];
  const cells = [
    headerRow,
    [links],
  ];

  // Create table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}