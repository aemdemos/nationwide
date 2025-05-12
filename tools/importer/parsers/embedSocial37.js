/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all buttons within the element
  const buttons = Array.from(element.querySelectorAll('a'));

  // Validate that buttons contain data
  if (buttons.length === 0) {
    console.warn('No buttons found in the element.');
    return;
  }

  // Create table header row exactly as per the example
  const headerRow = ['Embed'];

  // Create content rows for each button separately
  const contentRows = buttons.map(button => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.querySelector('span')?.textContent || button.textContent;
    return [link];
  });

  const tableData = [
    headerRow,
    ...contentRows // Spread content rows to ensure each button is in its own row
  ];

  // Create the structured table using WebImporter utility
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}