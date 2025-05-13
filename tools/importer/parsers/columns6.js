/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add header row for the block
  cells.push(['Columns']);

  // Identify columns within the element
  const columns = element.querySelectorAll('[data-ref="gridColumn"]');
  const columnCells = [];
  columns.forEach((column) => {
    const columnContent = [];

    // Extract heading if exists
    const heading = column.querySelector('h2, h3, h4');
    if (heading) {
      columnContent.push(heading.textContent.trim());
    }

    // Extract rich text content
    const richText = column.querySelectorAll('.RichText__StyledRichTextContent-sc-1j7koit-0');
    richText.forEach((richContent) => {
      columnContent.push(richContent.cloneNode(true));
    });

    // Extract buttons and links
    const links = column.querySelectorAll('a[data-ref="link"], a[data-ref="linkContent"]');
    links.forEach((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      columnContent.push(anchor);
    });

    columnCells.push(columnContent);
  });

  // Push the column content into the table cells
  cells.push(columnCells);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}