/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function for extracting image data
  const extractImage = (img) => {
    if (!img) return null;
    const imageLink = document.createElement('a');
    imageLink.href = img.src;
    imageLink.textContent = img.alt || 'Image';
    return imageLink;
  };

  // Helper function for extracting list data
  const extractList = (ul) => {
    if (!ul) return null;
    const listItems = Array.from(ul.querySelectorAll('li')).map(item => item.textContent.trim());
    return listItems.join(', ');
  };

  // Helper function for extracting heading and paragraph data
  const extractTextContent = (container, selector) => {
    const element = container.querySelector(selector);
    return element ? element.textContent.trim() : '';
  };

  const hr = document.createElement('hr');
  let blockTable;

  // Parse element based on its structure
  if (element.querySelector('[data-testid="MessagingFramework"]')) {
    const header = extractTextContent(element, 'h2');
    const paragraph = extractTextContent(element, '.vertical-rhythm--richText');

    // Ensure table header matches example
    const tableRows = [
      ['Columns'],
      [`${header} ${paragraph}`],
    ];

    blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  } else if (element.querySelector('[data-component="ImageWithContent"]')) {
    const heading = extractTextContent(element, 'h3');
    const paragraph = extractTextContent(element, 'p');
    const image = extractImage(element.querySelector('img'));
    const list = extractList(element.querySelector('ul'));

    // Ensure table header matches example
    const tableRows = [
      ['Columns'],
      [
        heading,
        paragraph,
        list,
        image,
      ].filter(Boolean),
    ];

    blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  }

  // Replace the element with parsed content
  element.replaceWith(hr, blockTable);
}