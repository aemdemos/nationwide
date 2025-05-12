/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  function extractAccordionItems(parentElement) {
    const items = [];
    parentElement.querySelectorAll('[data-ref="accordion"]').forEach((accordion) => {
      const title = accordion.querySelector('[data-ref="accordionHeading"]').textContent.trim();
      const content = accordion.querySelector('[data-ref="accordionContent"]');

      // Extract all child nodes within content
      const contentChildren = Array.from(content.childNodes).map((child) => {
        if (child.nodeType === 3) { // Node.TEXT_NODE (3)
          return child.textContent.trim();
        }
        return child;
      }).filter(Boolean); // Remove any empty nodes or values

      items.push([title, contentChildren]);
    });
    return items;
  }

  // Extract accordion content
  const accordionItems = extractAccordionItems(element);

  const cells = [
    ['Accordion'],
    ...accordionItems
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new table
  element.replaceWith(hr, table);
}