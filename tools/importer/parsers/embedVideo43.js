/* global WebImporter */
export default function parse(element, { document }) {
  // Check if the element contains necessary content
  const heading = element.querySelector('h3')?.textContent?.trim();
  if (!heading) {
    console.warn('Heading missing in element.');
    return;
  }

  // Extract paragraphs
  const paragraphs = Array.from(element.querySelectorAll('p')).map(p => p.textContent?.trim());
  if (paragraphs.length === 0) {
    console.warn('Paragraphs missing in element.');
    return;
  }

  // Extract image
  const image = element.querySelector('img');
  let imageElement = null;
  if (image) {
    imageElement = document.createElement('img');
    imageElement.src = image?.getAttribute('src');
    if (!imageElement.src) {
      console.warn('Image src missing.');
      return;
    }
  }

  // Create table cells dynamically
  const cells = [
    ['Embed'],
    [
      imageElement ? imageElement : '',
      paragraphs.join('<br>')
    ]
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(blockTable);
}