/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image element and its attributes dynamically
  const imageElement = element.querySelector('img');
  const backgroundImage = imageElement ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = imageElement.src;
    backgroundImage.alt = imageElement.alt || ''; // Handle missing alt attribute
  }

  // Dynamically extract the title
  const titleElement = element.querySelector('h2');
  const title = titleElement ? document.createElement('h2') : null;
  if (title) {
    title.textContent = titleElement.textContent;
  }

  // Extract the content dynamically
  const contentElement = element.querySelector('.Content-sc-mh9bui-0');
  const content = contentElement ? document.createElement('div') : null;
  if (content) {
    content.innerHTML = contentElement.innerHTML;
  }

  // Dynamically extract the call-to-action link
  const ctaElement = element.querySelector('a');
  const callToAction = ctaElement ? document.createElement('a') : null;
  if (callToAction) {
    callToAction.href = ctaElement.href;
    callToAction.textContent = ctaElement.textContent;
  }

  // Create the table structure
  const cells = [
    ['Hero'], // Header row exactly matches example
    [
      [backgroundImage, title, content, callToAction].filter(Boolean) // Filter out null values for missing elements
    ]
  ];

  // Use the helper function to create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}