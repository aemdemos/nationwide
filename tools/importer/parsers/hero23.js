/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image
  const imgElement = element.querySelector('img');
  const image = imgElement ? document.createElement('img') : null;
  if (image) {
    image.src = imgElement.src;
    image.alt = imgElement.alt;
  }

  // Extract the heading
  const headingElement = element.querySelector('[data-ref="heading"]');
  const heading = headingElement ? document.createElement('h1') : null;
  if (heading) {
    heading.textContent = headingElement.textContent;
  }

  // Extract the content
  const contentElement = element.querySelector('.vertical-rhythm--richText');
  const content = contentElement ? document.createElement('div') : null;
  if (content) {
    content.innerHTML = contentElement.innerHTML;
  }

  // Extract the button
  const buttonElement = element.querySelector('[data-testid="PrimaryButton"]');
  const button = buttonElement ? document.createElement('a') : null;
  if (button) {
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent;
  }

  // Create the block table
  const cells = [
    ['Hero'],
    [[image, heading, content, button]],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}