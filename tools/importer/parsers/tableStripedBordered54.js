/* global WebImporter */

export default function parse(element, { document }) {
  // Correcting the issue with unnecessary 'Section Metadata' block generation
  const table = element.querySelector('table');
  const headerRow = ['Table (striped, bordered)'];

  if (table) {
    const rows = table.querySelectorAll('tbody tr'); // Extract rows dynamically from the provided content

    const tableData = Array.from(rows).map((row) => {
      const cells = row.querySelectorAll('td');
      return Array.from(cells).map((cell) => {
        return cell.textContent.trim(); // Ensure clean text extraction
      });
    });

    // Create the block table using the extracted data
    const structuredTable = WebImporter.DOMUtils.createTable(
      [headerRow, ...tableData],
      document
    );

    // Replace the element with the structured table
    element.replaceWith(structuredTable);
  }
}