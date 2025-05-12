/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  const headerRow = ['Cards (no images)'];
  rows.push(headerRow);

  // Iterate through all sections in the element
  const sections = element.querySelectorAll('section[data-component="CardLinkList"]');
  sections.forEach((section) => {
    const cellContent = [];

    // Extract heading if available
    const heading = section.querySelector('[data-ref="heading"]');
    if (heading) {
      const headingEl = document.createElement('p');
      headingEl.textContent = heading.textContent.trim();
      headingEl.style.fontWeight = 'bold';
      cellContent.push(headingEl);
    }

    // Extract description if available (links)
    const listItems = section.querySelectorAll('[data-ref="link"]');
    listItems.forEach((item) => {
      const linkEl = document.createElement('a');
      linkEl.href = item.href;
      linkEl.textContent = item.textContent.trim();
      cellContent.push(linkEl);
    });

    // Push content as a single cell row
    rows.push([cellContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Handle section breaks if necessary
  if (element.previousElementSibling && element.previousElementSibling.tagName === 'HR') {
    const hr = document.createElement('hr');
    element.replaceWith(hr, table);
  } else {
    element.replaceWith(table);
  }
}