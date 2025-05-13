/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Process Image with content blocks
  const blocks = [];
  element.querySelectorAll('.NelComponents__Grid-sc-vsly48-37').forEach((grid) => {
    const imageCell = [];
    const contentCell = [];

    const imageArea = grid.querySelector('.ImageWithContent__StyledImageArea-sc-rcc1rj-0 img');
    if (imageArea) {
      const imgElement = document.createElement('img');
      imgElement.src = imageArea.src;
      imgElement.alt = imageArea.alt;
      imageCell.push(imgElement);
    }

    const contentArea = grid.querySelector('.ImageWithContent__StyledContentArea-sc-rcc1rj-1');
    if (contentArea) {
      const heading = contentArea.querySelector('h3, h2');
      const richText = contentArea.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0');

      if (heading) {
        const headingElement = document.createElement(heading.tagName);
        headingElement.textContent = heading.textContent.trim();
        contentCell.push(headingElement);
      }

      if (richText) {
        richText.querySelectorAll('p, ul').forEach(node => {
          contentCell.push(node);
        });
      }
    }

    blocks.push([imageCell, contentCell]);
  });

  // Process Section Metadata if exists
  const metadataBlocks = [];
  const metadataElement = element.querySelector('[data-component="MessageCritical"]');
  if (metadataElement) {
    const metadataHeaderRow = ['Section Metadata'];
    const metadataContentRow = [metadataElement.textContent.trim()];
    metadataBlocks.push(metadataHeaderRow);
    metadataBlocks.push(metadataContentRow);
  }

  const tables = blocks.map((block) => WebImporter.DOMUtils.createTable(block, document));
  const metadataTable = metadataBlocks.length > 0 ? WebImporter.DOMUtils.createTable(metadataBlocks, document) : null;

  element.replaceWith(
    hr,
    ...(metadataTable ? [metadataTable] : []),
    ...tables
  );
}