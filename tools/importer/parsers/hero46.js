/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) return;

  // Create <hr> for section break
  const hr = document.createElement('hr');

  // Extract the background image URL dynamically
  const backgroundImageDiv = element.querySelector('.ImageContainer__BackgroundImage-sc-fxzmob-0');
  const backgroundImageUrl = backgroundImageDiv ? backgroundImageDiv.style.backgroundImage.match(/url\(['"]?([^'"]*)['"]?\)/)?.[1] : null;

  // Create image element dynamically if backgroundImageUrl is available
  const imageElement = backgroundImageUrl ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = backgroundImageUrl;
  }

  // Dynamically extract heading content if available
  const headingElement = document.createElement('h1');
  headingElement.textContent = backgroundImageDiv ? backgroundImageDiv.getAttribute('alt') || 'Hero Block Placeholder Heading' : 'Hero Block Placeholder Heading';

  // Prepare table cells based on extracted content
  const cells = [
    ['Hero'], // Exact table header row according to the example
    [imageElement || document.createTextNode('No image available'), headingElement], // Content row
  ];

  // Create the block table using WebImporter DOM utility
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the section break and new block table
  element.replaceWith(hr, blockTable);
}