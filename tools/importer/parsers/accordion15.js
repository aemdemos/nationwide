/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Extract accordion headers and content dynamically
  const accordionElements = element.querySelectorAll('[data-component="AccordionSimple"]');
  accordionElements.forEach((accordion) => {
    const header = accordion.querySelector('[data-ref="accordionHeading"]');
    const content = accordion.querySelector('[data-ref="accordionContent"]');

    // Handle edge cases for missing content
    rows.push([
      header ? header.textContent.trim() : 'Untitled Accordion',
      content ? content.innerHTML.trim() : 'No content available'
    ]);
  });

  // Create main block table
  const cells = [
    ['Accordion'],
    ...rows,
  ];
  const mainTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the main block table
  element.replaceWith(mainTable);
}