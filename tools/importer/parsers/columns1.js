/* global WebImporter */
export default function parse(element, { document }) {
  const sections = [];
  const hr = document.createElement('hr');

  // Iterate through each block
  element.querySelectorAll('div[data-component="ImageWithContent"]').forEach((block) => {
    const headerRow = ['Columns'];

    const columns = [];

    // Extract image area content
    const imageArea = block.querySelector('.ImageWithContent__StyledImageArea-sc-rcc1rj-0 img');
    if (imageArea) {
      const image = document.createElement('img');
      image.src = imageArea.src;
      columns.push(image);
    }

    // Extract content area content
    const contentArea = block.querySelector('.ImageWithContent__StyledContentArea-sc-rcc1rj-1');
    if (contentArea) {
      const heading = contentArea.querySelector('h2, h3, h4');
      const paragraphs = contentArea.querySelectorAll('p');
      const links = contentArea.querySelectorAll('a');

      const contentElements = [];
      if (heading) {
        const headingElement = document.createElement('span');
        headingElement.textContent = heading.textContent;
        contentElements.push(headingElement);
      }

      paragraphs.forEach((p) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = p.textContent;
        contentElements.push(paragraphElement);
      });

      links.forEach((link) => {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        contentElements.push(linkElement);
      });

      columns.push(contentElements);
    }

    if (columns.length > 0) {
      const blockTable = WebImporter.DOMUtils.createTable([headerRow, columns], document);
      sections.push(blockTable);
    }
  });

  // Replace only with extracted sections and maintain exact structure
  if (sections.length > 0) {
    element.replaceWith(hr, ...sections);
  }
}