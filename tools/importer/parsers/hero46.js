/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract the relevant content dynamically from the input element
  const backgroundImageDiv = element.querySelector('[data-testid="ImageContainer"]');
  let backgroundImageUrl = '';
  if (backgroundImageDiv) {
    const backgroundImage = backgroundImageDiv.style.backgroundImage;
    // Extract URL if available
    if (backgroundImage) {
      const match = backgroundImage.match(/url\("(.*?)"\)/);
      if (match && match[1]) {
        backgroundImageUrl = match[1];
      }
    }
  }

  // Step 2: Create the header row based on the example structure
  const headerRow = ['Hero'];

  // Step 3: Create the content row dynamically
  const contentRow = [];

  // Add background image if it exists
  if (backgroundImageUrl) {
    const img = document.createElement('img');
    img.src = backgroundImageUrl;
    contentRow.push(img);
  } else {
    // Handle edge case where no background image exists
    contentRow.push(document.createTextNode('No background image available'));
  }

  // Step 4: Construct the block table
  const cells = [
    headerRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(table);
}