/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row has exactly one column with the specified text
  const headerRow = ['Table (striped, bordered)'];

  const rows = [];
  const table = element.querySelector('table');
  if (table) {
    const tbody = table.querySelector('tbody');

    if (tbody) {
      Array.from(tbody.querySelectorAll('tr')).forEach(tr => {
        // Extract each row’s content without unnecessary wrapping or nested structures
        const cells = Array.from(tr.querySelectorAll('td')).map(td => {
          return td.textContent.trim(); // Extract clean text content from each cell
        });
        rows.push(cells);
      });
    }
  }

  // Create the block table using the fixed header row and cleaned rows
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}