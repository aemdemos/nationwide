/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the block
  const headerRow = ['Tabs'];

  // Extract tab label and content dynamically from the buttons within the element
  const tabRows = Array.from(element.querySelectorAll('button')).map((button) => {
    const tabLabel = button.querySelector('span:nth-child(2)')?.textContent?.trim() || '';
    const tabContent = button.textContent?.trim() || '';

    // Place the tab label and content into separate cells within the row
    return [tabLabel, tabContent];
  });

  // Combine header row and tab rows into table data
  const tableData = [headerRow, ...tabRows];

  // Create the table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the element with the constructed table
  element.replaceWith(table);
}