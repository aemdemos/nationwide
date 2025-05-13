/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically from the provided HTML element
  const logoLink = element.querySelector('a.Logo__LogoLink-sc-vu9l0h-0');
  const videoLink = logoLink ? logoLink.href : 'No link available';
  const videoLinkText = logoLink ? logoLink.getAttribute('aria-label') : 'No link text available';
  const logoSvg = element.querySelector('svg');

  // Combine SVG and link text into a single cell logically
  const combinedContent = [];
  if (logoSvg) combinedContent.push(logoSvg.cloneNode(true));
  const linkElement = document.createElement('a');
  linkElement.href = videoLink;
  linkElement.textContent = videoLinkText;
  combinedContent.push(linkElement);

  // Define table structure with correct header row matching the example
  const cells = [
    ['Video'],
    [combinedContent],
  ];

  // Create table using WebImporter.DOMUtils
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block
  element.replaceWith(block);
}