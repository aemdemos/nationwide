/* global WebImporter */
export default function parse(element, { document }) {
  const rows = element.querySelectorAll('tr');
  const tableData = [];

  // Extract header row from the first row
  const headerRow = Array.from(rows[0].querySelectorAll('th')).map((th) => th.textContent.trim());
  tableData.push(headerRow);

  // Extract other rows dynamically
  Array.from(rows).slice(1).forEach((row) => {
    const rowData = Array.from(row.querySelectorAll('td')).map((td) => {
      if (!td) return '';

      const link = td.querySelector('a');
      if (link) {
        const anchorElement = document.createElement('a');
        anchorElement.setAttribute('href', link.href);
        anchorElement.textContent = link.textContent.trim();
        return anchorElement;
      }

      const list = td.querySelector('ul');
      if (list) {
        return Array.from(list.querySelectorAll('li')).map((li) => li.textContent.trim());
      }

      return td.textContent.trim();
    });

    tableData.push(rowData);
  });

  // Create structured table using WebImporter
  const structuredTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured table
  element.replaceWith(structuredTable);
}