/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Extract content dynamically
  const headingElement = element.querySelector('[data-ref="heading"]');
  const headerText = headingElement ? headingElement.textContent.trim() : 'Missing Header';

  const feedbackOptions = [];
  element.querySelectorAll('input[type="radio"]').forEach((input) => {
    const labelText = input.getAttribute('aria-label') || 'Unknown';
    const label = document.createElement('span');
    label.textContent = labelText;
    feedbackOptions.push(label);
  });

  // Creating structured rows
  const cells = [
    ['Columns'],
    [headerText, feedbackOptions],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with hr and table
  element.replaceWith(hr, table);
}