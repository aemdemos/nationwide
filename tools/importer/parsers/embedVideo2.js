/* global WebImporter */
export default function parse(element, { document }) {
  const createBlockTable = (headerText, content) => {
    return WebImporter.DOMUtils.createTable([
      [headerText],
      [content]
    ], document);
  };

  // Extract the message header and content dynamically
  const headerElement = element.querySelector('[data-ref="messageHeader"]');
  const headerText = headerElement ? headerElement.textContent.trim() : ''; // Ensure header is dynamically extracted

  const contentElement = element.querySelector('[data-ref="messageContent"]');
  const content = contentElement ? contentElement.textContent.trim() : ''; // Extract content dynamically without HTML tags

  // Create the block table using the exact header text from the example
  const embedTable = createBlockTable(headerText, content);

  // Replace the element with the new block table
  element.replaceWith(embedTable);
}