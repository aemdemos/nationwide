/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Extract accordion items
  const items = Array.from(element.querySelectorAll('[data-ref="accordion"]')).map((accordionItem) => {
    const title = accordionItem.querySelector('[data-ref="accordionHeading"]').textContent.trim();
    const content = accordionItem.querySelector('[data-ref="accordionContent"]').cloneNode(true);
    return [title, content];
  });

  const tableData = [headerRow, ...items];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}