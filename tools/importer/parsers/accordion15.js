/* global WebImporter */
export default function parse(element, { document }) {
  // Verify if Section Metadata is needed from example markdown
  const needsSectionBreak = false; // Change to true if Section Metadata is specified in example markdown

  // Extract accordion items dynamically from the element
  const accordionItems = Array.from(element.querySelectorAll('[data-ref="accordion"] h4')).map((item) => {
    const title = item.querySelector('[data-ref="accordionHeading"]').textContent.trim() || '(No Title)';
    const contentElement = item.nextElementSibling?.querySelector('.Accordion__StyledRichTextContent-sc-kdxjv9-0');
    const contentNode = document.createElement('div');

    if (contentElement) {
      contentNode.innerHTML = contentElement.innerHTML.trim() || '(No Content)';
    } else {
      contentNode.textContent = '(No Content)';
    }

    return [title, contentNode];
  });

  // Create the header row for the table exactly matching the example
  const headerRow = ['Accordion'];
  const accordionTable = [headerRow, ...accordionItems];

  // Create the block table using WebImporter.DOMUtils.createTable
  const accordionBlock = WebImporter.DOMUtils.createTable(accordionTable, document);

  // Conditionally add section break if specified by example markdown
  if (needsSectionBreak) {
    const hr = document.createElement('hr');
    element.replaceWith(hr, accordionBlock);
  } else {
    element.replaceWith(accordionBlock);
  }
}