/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Create header row for 'Columns'
  const headerRow = ['Columns'];

  // Step 2: Extract content for columns dynamically based on the HTML structure
  const columns = Array.from(element.querySelectorAll('.FooterNavigation__ColumnedFooter-sc-e6atpx-0 > div')).map((column) => {
    return Array.from(column.querySelectorAll('ul > li')).map((item) => {
      const link = item.querySelector('a');
      if (link) {
        const cellContent = `${link.textContent.trim()} (${link.href})`;
        return cellContent;
      } else {
        return item.textContent.trim();
      }
    });
  });

  // Step 3: Ensure structured table format
  const rows = [headerRow, ...columns];

  // Step 4: Create table block dynamically using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(blockTable);
}