/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  cells.push(['Columns']);

  // Extract content from each list item
  const items = element.querySelectorAll('li');
  const columns = Array.from(items).map((item) => {
    const title = item.querySelector('h3')?.textContent.trim() || '';
    const paragraph = item.querySelector('p')?.textContent.trim() || '';

    const link = item.querySelector('a');
    let combinedContent = `${paragraph}`;
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      combinedContent += ` ${linkElement.outerHTML}`;
    }

    return [`${title} ${combinedContent}`];
  });

  cells.push(...columns);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}