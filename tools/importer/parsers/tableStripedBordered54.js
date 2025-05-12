/* global WebImporter */
export default function parse(element, { document }) {
  // Process the table
  const tableElement = element.querySelector('table');
  const rows = [];

  // Add header row exactly matching the example
  const headerRow = ['Date your tracker was reserved', 'Tracker floor', 'Impact of the base rate change on your tracker mortgage'];
  rows.push(headerRow);

  // Add data rows dynamically extracting content from the original HTML
  const dataRows = Array.from(tableElement.querySelectorAll('tbody tr')).map(tr => {
    return Array.from(tr.querySelectorAll('td')).map(td => {
      const link = td.querySelector('a');
      return link ? link.href : td.textContent.trim();
    });
  });
  rows.push(...dataRows);

  const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with the new table block only
  element.replaceWith(tableBlock);
}