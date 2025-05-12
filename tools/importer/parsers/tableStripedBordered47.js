/* global WebImporter */
export default function parse(element, { document }) {
  const content = [];

  // Check for Section Metadata in the example structure
  const hr = document.createElement('hr');
  content.push(hr);

  const sectionMetadataTable = WebImporter.DOMUtils.createTable([
    ['Section Metadata'],
    ['Type', 'Table (striped, bordered)'],
    ['Description', 'This block is used to organize tabular data into a grid of rows and columns, making it easier for readers to compare and analyze information. The `bordered` and `striped` variants should be used together when the table should have a border around each cell and every second row should have a background color set.'],
  ], document);
  content.push(sectionMetadataTable);

  const tables = element.querySelectorAll('table');

  tables.forEach((table) => {
    const rows = [];

    rows.push(['Table (striped, bordered)']); // Add header row dynamically

    table.querySelectorAll('tr').forEach((row, index) => {
      const cells = [];

      row.querySelectorAll('th, td').forEach((cell) => {
        if (cell.querySelector('a')) {
          const link = document.createElement('a');
          link.href = cell.querySelector('a').href;
          link.textContent = cell.textContent.trim();
          cells.push(link);
        } else {
          cells.push(cell.textContent.trim());
        }
      });

      rows.push(cells);
    });

    const blockTable = WebImporter.DOMUtils.createTable(rows, document);
    content.push(blockTable);
  });
  
  element.replaceWith(...content);
}