/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for the Accordion block
  rows.push(['Accordion']);

  // Process each list item in the provided HTML
  const listItems = element.querySelectorAll('li');
  listItems.forEach((item) => {
    const title = item.querySelector('svg');
    const content = item.querySelector('div.Content-sc-mh9bui-0');

    if (title && content) {
      rows.push([title.outerHTML, content.textContent.trim()]);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}