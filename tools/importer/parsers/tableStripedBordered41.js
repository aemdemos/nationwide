/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row to match the example
  const headerRow = ['Product Name', 'Website'];

  const rows = [];
  const table = element.querySelector('table');
  const products = table.querySelectorAll('tbody tr');

  products.forEach((product) => {
    const cols = product.querySelectorAll('td, th');

    // Extract the product name
    const linkElement = cols[0].querySelector('a');
    const titleElement = linkElement ? linkElement.querySelector('span') : null;
    const title = titleElement ? titleElement.textContent.trim() : 'No Title';

    // Extract the link element
    let websiteCell = 'No Link';
    if (linkElement && linkElement.href) {
      const link = linkElement.href;
      websiteCell = document.createElement('a');
      websiteCell.href = link;
      websiteCell.textContent = link;
    }

    rows.push([title, websiteCell]);
  });

  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}