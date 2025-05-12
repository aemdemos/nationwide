/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [];
  
  // Add header row
  rows.push(['Accordion']);

  // Extract accordion items
  const sections = element.querySelectorAll('section');
  sections.forEach((section) => {
    const title = section.querySelector('h3');
    const content = section.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0') || section.querySelector('.Content-sc-mh9bui-0');

    if (title && content) {
      rows.push([title.textContent.trim(), content.cloneNode(true)]);
    }
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block table
  element.replaceWith(blockTable);
}