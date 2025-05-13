/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a cell with text or elements
  const createCellContent = (content) => {
    if (!content) return '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = content;
    return Array.from(wrapper.childNodes);
  };

  // Extract content from the given HTML element
  const items = [...element.querySelectorAll('li')].map((li) => {
    // Extract heading
    const heading = li.querySelector('h3');
    const headingContent = heading ? heading.textContent : '';

    // Extract text content
    const textContainer = li.querySelector('.vertical-rhythm--richText');
    const textContent = textContainer ? Array.from(textContainer.childNodes).filter(node => node.nodeType === 1 || node.nodeType === 3) : '';

    return [createCellContent(headingContent), textContent];
  });

  // Create the block table
  const headerRow = ['Columns'];
  const blockContent = [[headerRow], ...items];
  const block = WebImporter.DOMUtils.createTable(blockContent, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}