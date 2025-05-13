/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content from li elements and combine into a single cell
  const extractContent = (liElement) => {
    const heading = liElement.querySelector('h3, h2');
    const headingText = heading ? heading.textContent.trim() : '';

    const paragraph = liElement.querySelector('p');
    const paragraphContent = paragraph ? paragraph.innerHTML.trim() : '';

    const link = liElement.querySelector('a');
    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
    }

    const image = liElement.querySelector('img');
    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    // Combine all extracted content into a single cell
    const contentCell = document.createElement('div');
    if (headingText) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = headingText;
      contentCell.appendChild(headingElement);
    }
    if (paragraphContent) {
      const paragraphElement = document.createElement('p');
      paragraphElement.innerHTML = paragraphContent;
      contentCell.appendChild(paragraphElement);
    }
    if (linkElement) {
      contentCell.appendChild(linkElement);
    }
    if (imageElement) {
      contentCell.appendChild(imageElement);
    }

    return [contentCell];
  };

  // Extract all list items
  const listItems = [...element.querySelectorAll('li')];
  const contentRows = listItems.map(extractContent);

  // Define block structure with correct header row and content rows
  const cells = [
    ['Columns'], // Correctly formatted header row with a single column
    ...contentRows
  ];

  // Create table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with structured block
  element.replaceWith(table);
}