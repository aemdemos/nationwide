/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Set the correct header row
  cells.push(['Table (no header)']);

  // Extract list items from the ul element
  const listItems = element.querySelectorAll('li');

  listItems.forEach((item) => {
    const link = item.querySelector('a[data-ref="link"]');
    const title = item.querySelector('span[data-ref="linkContent"] span')?.textContent;
    const smallText = item.querySelector('small[data-ref="text"]')?.textContent;

    if (link) {
      const href = link.getAttribute('href');
      const cellContent = [];

      if (title) {
        cellContent.push(title);
      }

      if (smallText) {
        cellContent.push(smallText);
      }

      const linkElement = document.createElement('a');
      linkElement.href = href;
      linkElement.textContent = href;
      cellContent.push(linkElement);

      cells.push([cellContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}