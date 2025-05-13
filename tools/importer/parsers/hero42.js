/* global WebImporter */
export default function parse(element, { document }) {

  const hr = document.createElement('hr');
  const headerRow = ['Hero'];

  // Extract data from the element
  const breadcrumbsContainer = element.querySelector('[aria-label="breadcrumb"]');
  const headingElement = element.querySelector('h1[data-ref="heading"]');
  const backgroundImage = element.querySelector('[data-testid="ImageContainer"]');
  const subheadingElement = element.querySelector('p');

  // Process breadcrumbs
  let breadcrumbs = [];
  if (breadcrumbsContainer) {
    const breadcrumbLinks = breadcrumbsContainer.querySelectorAll('a[data-ref="link"]');
    breadcrumbs = Array.from(breadcrumbLinks).map(link => {
      const breadcrumbText = link.querySelector('span[data-ref="linkContent"]');
      return breadcrumbText ? breadcrumbText.textContent.trim() : '';
    });
  }

  // Process heading
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Process subheading
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Process background image
  let backgroundImageElement = null;
  if (backgroundImage && backgroundImage.getAttribute('id')) {
    const imageSrc = backgroundImage.getAttribute('id');
    backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = imageSrc;
  }

  // Create content for the table's second row
  const secondRowContent = [];

  if (backgroundImageElement) {
    secondRowContent.push(backgroundImageElement);
  }

  if (heading) {
    const headingEl = document.createElement('h1');
    headingEl.textContent = heading;
    secondRowContent.push(headingEl);
  }

  if (subheading) {
    const subheadingEl = document.createElement('p');
    subheadingEl.textContent = subheading;
    secondRowContent.push(subheadingEl);
  }

  // Create table
  const cells = [
    headerRow,
    [secondRowContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block
  element.replaceWith(hr, block);
}