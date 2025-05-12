/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Accordion'];
  cells.push(headerRow);

  // Extract accordion items
  const accordionItems = element.querySelectorAll('[data-ref="accordion"]');
  accordionItems.forEach((item) => {
    const titleElement = item.querySelector('[data-ref="accordionHeading"]');
    const contentElement = item.querySelector('[data-ref="accordionContent"]');

    const titleCell = titleElement ? titleElement.textContent.trim() : '';

    const bodyContent = [];
    if (contentElement) {
      const paragraphs = contentElement.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        const links = paragraph.querySelectorAll('a[href]');
        if (links.length > 0) {
          links.forEach((link) => {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            bodyContent.push(linkElement); // Push link elements
          });
        } else {
          // Push paragraph text if no links are present
          const paragraphText = paragraph.textContent.trim();
          if (paragraphText) {
            bodyContent.push(paragraphText);
          }
        }
      });
    }

    cells.push([titleCell, bodyContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}