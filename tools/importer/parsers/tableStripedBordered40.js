/* global WebImporter */
export default function parse(element, { document }) {
  const blocks = [];

  // Process Credit Ratings section
  const creditRatingsHeading = element.querySelector('#credit-ratings');
  if (creditRatingsHeading) {
    blocks.push(document.createElement('hr'));

    // Create Section Metadata Table
    blocks.push(WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      ['style', 'Table (striped & bordered)'],
    ], document));

    const table = element.querySelector('table');
    if (table) {
      const rows = Array.from(table.rows).map(row => (
        Array.from(row.cells).map(cell => cell.innerHTML.trim())
      ));
      blocks.push(WebImporter.DOMUtils.createTable(rows, document));
    }
  }

  // Process Bloomberg Tickers section
  const bloombergTickerHeading = element.querySelector('h3');
  if (bloombergTickerHeading) {
    blocks.push(document.createElement('hr'));

    blocks.push(WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      ['style', 'text'],
    ], document));

    const paragraphs = Array.from(element.querySelectorAll('h3 + div p'));
    paragraphs.forEach(p => blocks.push(p.cloneNode(true)));
  }

  // Process Responsible Business section
  const responsibleBusinessHeading = element.querySelector('#responsible-business');
  if (responsibleBusinessHeading) {
    blocks.push(document.createElement('hr'));

    blocks.push(WebImporter.DOMUtils.createTable([
      ['Section Metadata'],
      ['style', 'text'],
    ], document));

    const description = element.querySelector('#responsible-business + div p');
    const link = element.querySelector('a');

    if (description) blocks.push(description.cloneNode(true));
    if (link) blocks.push(link.cloneNode(true));
  }

  // Replace original element
  element.replaceWith(...blocks);
}