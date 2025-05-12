/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content
  const logoLink = element.querySelector('a.Logo__LogoLink-sc-vu9l0h-0');

  // Validate essential content
  if (!logoLink) {
    console.error('Essential elements are missing from the HTML structure.');
    return;
  }

  // Create the header row exactly as specified in the example
  const headerRow = ['Video'];

  // Extract video source as a link dynamically
  const videoSourceLink = document.createElement('a');
  videoSourceLink.href = logoLink.href;
  videoSourceLink.textContent = logoLink.getAttribute('aria-label') || 'Nationwide - Home';

  // Extract the logo image dynamically if available
  const logoImage = logoLink.querySelector('svg') || null;

  // Create separate rows for each content item (poster image and video source)
  const contentRows = [];
  if (logoImage) {
    contentRows.push([logoImage]);
  }
  contentRows.push([videoSourceLink]);

  // Create the block table
  const tableCells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}