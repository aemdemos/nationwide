/* global WebImporter */
export default function parse(element, { document }) {
  // Correctly create the header row
  const headerRow = ['Table (striped, bordered)'];

  // Extract the table rows dynamically
  const tableElement = element.querySelector('.CurrentAccountsTable__DesktopTable-sc-ar5eyv-9');
  const rows = tableElement ? tableElement.querySelectorAll('tr') : [];

  const tableRows = Array.from(rows).map((row) => {
    const cells = row.querySelectorAll('th, td');
    return Array.from(cells).map((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.getAttribute('href');
        anchor.textContent = link.textContent.trim();
        return anchor;
      }
      return cell.textContent.trim();
    });
  });

  // Create the block table with correct header row
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow, // Correct header row with only one column
    ...tableRows,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}