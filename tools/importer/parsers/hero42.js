/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize an array for table cells
  const cells = [];
  const blockName = 'Hero';

  // Add the block name as the header row
  cells.push([blockName]);

  // Extract content for the second row
  const rowContent = [];

  // Extract background image if present
  const backgroundImageContainer = element.querySelector('[data-testid="ImageContainer"]');
  if (backgroundImageContainer) {
    const style = backgroundImageContainer?.getAttribute('style');
    let imageSrc = null;
    if (style && style.includes('background-image')) {
      const match = style.match(/url\(("|')?(.*?)\1?\)/);
      imageSrc = match ? match[2] : null;
    }
    if (imageSrc) {
      const img = document.createElement('img');
      img.src = imageSrc;
      rowContent.push(img);
    }
  }

  // Extract title
  const titleElement = element.querySelector('[data-ref="heading"] span');
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent.trim();
    rowContent.push(title);
  }

  // Extract subheading
  const subheadingElement = element.querySelector('.Content-sc-mh9bui-0');
  if (subheadingElement) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingElement.textContent.trim();
    rowContent.push(subheading);
  }

  // Extract call-to-action
  const buttonElement = element.querySelector('[data-testid="PrimaryButton"]');
  if (buttonElement) {
    const ctaLink = document.createElement('a');
    ctaLink.href = buttonElement.href;
    ctaLink.textContent = buttonElement.textContent.trim();
    rowContent.push(ctaLink);
  }

  // Add the second row content
  cells.push([rowContent]);

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}