/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero']; // Correct header row with one column

  const heroContainer = element.querySelector('.HomepageHeroEdgeToEdge__HeroContainerInner-sc-rkxeoj-2');

  // Extract title
  const titleElement = heroContainer.querySelector('h2');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract subheading
  const subheadingElement = heroContainer.querySelector('p');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Extract call-to-action
  const ctaElement = heroContainer.querySelector('a');
  let cta = '';
  if (ctaElement) {
    cta = document.createElement('a');
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Create table rows
  const cells = [
    headerRow,  // Header row with exactly one column
    [
      [title, subheading, cta].filter(Boolean) // Content row with valid elements, combined into a single cell
    ]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}