/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract accordion data
  const extractAccordionData = (accordion) => {
    const title = accordion.querySelector('[data-ref="accordionHeading"]');
    const content = accordion.querySelector('[data-ref="accordionContent"]');

    const titleText = title ? title.textContent.trim() : 'Untitled'; // Handle missing titles
    const contentElements = content && content.children.length > 0 
      ? Array.from(content.children) 
      : ['No content available']; // Handle missing content

    return [titleText, contentElements];
  };

  // Extract accordion blocks
  const accordions = Array.from(element.querySelectorAll('[data-ref="accordion"]'));
  const accordionRows = accordions.map((accordion) => extractAccordionData(accordion));

  // Create block table with bold header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';

  const tableRows = [headerRow, ...accordionRows];
  const accordionTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Section Metadata Block (if needed)
  const sectionMetadata = element.querySelector('[data-ref="section-metadata"]');
  if (sectionMetadata) {
    const hr = document.createElement('hr');
    const sectionMetadataHeader = ['Section Metadata'];
    const sectionMetadataContent = Array.from(sectionMetadata.children).map(child => child.textContent.trim());
    const sectionMetadataTable = WebImporter.DOMUtils.createTable(
      [sectionMetadataHeader, sectionMetadataContent],
      document
    );
    element.replaceWith(hr, sectionMetadataTable, accordionTable);
  } else {
    // Replace element with new structured block
    element.replaceWith(accordionTable);
  }
}