/* global WebImporter */
export default function parse(element, { document }) {
  // Create an HR element for section breaks
  const hr = document.createElement('hr');

  // Helper function to safely extract text from an element
  const extractText = (el) => el ? el.textContent.trim() : '';

  // Helper function to create links from elements with a 'src' attribute
  const createLink = (el) => {
    if (el && el.src) {
      const link = document.createElement('a');
      link.href = el.src;
      link.textContent = el.alt || el.src;
      return link;
    }
    return null;
  };

  const rows = [];

  // Dynamically extract content from the given element
  if (element.querySelector('.ImageWithContent__StyledContentArea-sc-rcc1rj-1')) {
    const headerRow = ['Columns'];
    
    const contentArea = element.querySelector('.ImageWithContent__StyledContentArea-sc-rcc1rj-1');
    const headings = Array.from(contentArea.querySelectorAll('h3, h4')).map(extractText);
    const paragraphs = Array.from(contentArea.querySelectorAll('p')).map(extractText);

    const contentRow = [
      headings.join('\n'),
      paragraphs.join('\n')
    ];

    rows.push(headerRow, contentRow);
  }

  // Check if section metadata is required
  if (element.querySelector('hr')) {
    rows.unshift(['Section Metadata']);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(hr, table);
}