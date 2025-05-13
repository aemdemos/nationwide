/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const contentCells = [];

  const columns = [...element.querySelectorAll('[data-ref="gridColumn"]')];

  columns.forEach((col) => {
    const colContent = [];

    const heading = col.querySelector('h3');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      colContent.push(headingElement);
    }

    const bars = [...col.querySelectorAll('div[data-component="PercentBar"] > div')];
    
    bars.forEach((bar) => {
      const textElement = bar.querySelector('p');
      if (textElement) {
        const span = textElement.querySelector('span');
        const spanContent = span ? span.textContent.trim() : '';
        const barContent = textElement.textContent.replace(spanContent, '').replace(/:\s*:/g, ':').trim();
        const content = `${spanContent} ${barContent}`;
        const paragraph = document.createElement('p');
        paragraph.textContent = content;
        colContent.push(paragraph);
      }
    });

    contentCells.push(colContent);
  });

  // Ensure the table rows and columns align with the example format
  const contentRow = contentCells;

  // Create table using the WebImporter DOMUtils helper
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with the new structured table
  element.replaceWith(table);
}