/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = ['Columns'];

  // Extract the content from the element dynamically
  const columns = [];

  // Locate all child nodes that represent the columns
  const columnElements = element.querySelectorAll('div[data-ref="gridColumn"]');
  columnElements.forEach((columnEl) => {
    const columnContent = [];

    // Extract text content
    const textContent = columnEl.querySelector('p');
    if (textContent && textContent.textContent.trim()) {
      columnContent.push(textContent.textContent.trim());
    }

    // Extract image elements
    const images = columnEl.querySelectorAll('img');
    images.forEach((img) => {
      if (img.src) {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        columnContent.push(imgElement);
      }
    });

    // Extract links
    const links = columnEl.querySelectorAll('a');
    links.forEach((link) => {
      if (link.href) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent.trim();
        columnContent.push(linkElement);
      }
    });

    // Push the collected content to the columns array
    columns.push(columnContent);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    ...columns
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}