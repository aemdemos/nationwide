/* global WebImporter */
export default function parse(element, { document }) {
  const getTextContent = (el) => (el ? el.textContent.trim() : '');

  // Extract header row (exact match to example)
  const headerRow = ['Columns'];

  // Extract content dynamically from the element
  const rows = [];

  const columnElements = element.querySelectorAll('.NelComponents__Col-sc-vsly48-38');
  columnElements.forEach((col, index) => {
    const colContent = [];

    // Extract images inside column
    const images = col.querySelectorAll('img');
    images.forEach((img) => {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt || '';
      colContent.push(imageElement);
    });

    // Extract paragraphs inside column
    const paragraph = col.querySelector('p');
    if (paragraph) {
      colContent.push(document.createTextNode(getTextContent(paragraph)));
    }

    // Extract links inside column
    const link = col.querySelector('a');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = getTextContent(link);
      colContent.push(linkElement);
    }

    rows.push(colContent);
  });

  // Ensure rows are not empty
  if (rows.length === 0) {
    rows.push(['No content available']);
  }

  // Create the table dynamically with extracted content
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}