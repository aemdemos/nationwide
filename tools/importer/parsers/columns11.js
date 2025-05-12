/* global WebImporter */
export default function parse(element, { document }) {
  // Create an hr element for section break
  const hr = document.createElement('hr');

  // Extract rows from the element
  const rows = Array.from(element.querySelectorAll('li')).map(li => {
    const heading = li.querySelector('h3')?.textContent.trim() || '';

    const paragraphs = Array.from(li.querySelectorAll('p')).map(p => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p.textContent.trim();
      return paragraph;
    });

    const links = Array.from(li.querySelectorAll('a')).map(a => {
      const link = document.createElement('a');
      link.href = a.href;
      link.textContent = a.textContent.trim();
      return link;
    });

    const image = li.querySelector('img');
    const imgElement = document.createElement('img');
    if (image) {
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
    }

    // Create a structured row with individual cells for heading, paragraphs, links, and image
    const row = [
      [heading],
      paragraphs.length ? paragraphs : '',
      links.length ? links : '',
      [imgElement]
    ];

    return row;
  });

  // Header row for the block
  const headerRow = ['Columns'];

  // Combine header and rows into table data
  const tableData = [headerRow, ...rows];

  // Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with section break and the new table
  element.replaceWith(hr, table);
}