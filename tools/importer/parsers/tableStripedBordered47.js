/* global WebImporter */
export default function parse(element, { document }) {
  const tables = element.querySelectorAll('table');
  const parsedTables = [];

  tables.forEach((table) => {
    const rows = table.querySelectorAll('tr');
    const headerRow = rows[0];

    const headerCells = Array.from(headerRow.cells).map((cell) => cell.textContent.trim());

    const tableData = [headerCells];

    rows.forEach((row, index) => {
      if (index === 0) return; // Skip the header row
      
      const cells = Array.from(row.cells).map((cell) => {
        // Check if the cell contains a link
        const link = cell.querySelector('a');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent;
          return anchor;
        } else {
          return cell.textContent.trim();
        }
      });

      tableData.push(cells);
    });

    const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);
    parsedTables.push(tableBlock);
  });

  // Replace the element with tables only (no Section Metadata as example markdown did not require it)
  element.replaceWith(...parsedTables);
}