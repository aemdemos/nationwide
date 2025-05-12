/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content dynamically from the element
  const columns = Array.from(element.querySelectorAll('[data-ref="gridColumn"]'));

  if (columns.length < 2) {
    console.warn('Expected two columns, but found less.');
    return;
  }

  const firstColumnContent = [];
  const secondColumnContent = [];

  // Process first column
  const firstColumn = columns[0];
  const firstHeading = firstColumn.querySelector('h3');
  if (firstHeading) {
    const headingElem = document.createElement('p');
    headingElem.textContent = firstHeading.textContent.trim();
    firstColumnContent.push(headingElem);
  }

  const firstParagraphs = Array.from(firstColumn.querySelectorAll('p'));
  firstParagraphs.forEach((para) => {
    const paraElement = document.createElement('p');
    paraElement.innerHTML = para.innerHTML.trim();
    firstColumnContent.push(paraElement);
  });

  // Process second column
  const secondColumn = columns[1];
  const secondHeading = secondColumn.querySelector('h3');
  if (secondHeading) {
    const headingElem = document.createElement('p');
    headingElem.textContent = secondHeading.textContent.trim();
    secondColumnContent.push(headingElem);
  }

  const secondParagraphs = Array.from(secondColumn.querySelectorAll('p'));
  secondParagraphs.forEach((para) => {
    const paraElement = document.createElement('p');
    paraElement.innerHTML = para.innerHTML.trim();
    secondColumnContent.push(paraElement);
  });

  // Create table data
  const tableData = [headerRow, [firstColumnContent, secondColumnContent]];

  // Create block table
  const columnsTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(columnsTable);
}