/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Cards']);

  // Process each card in the element
  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');

  cards.forEach((card) => {
    const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
    const heading = card.querySelector('[data-ref="heading"]');
    const contentParagraphs = card.querySelectorAll('[data-testid="CardContent"] p');
    const link = card.querySelector('a[data-ref="link"]');

    // Handle missing images
    const image = imageContainer ? imageContainer.cloneNode(true) : document.createElement('div');
    const title = heading ? heading.textContent.trim() : '';
    const date = contentParagraphs[0] ? contentParagraphs[0].textContent.trim() : '';
    const description = contentParagraphs[1] ? contentParagraphs[1].textContent.trim() : '';
    const cta = link ? link.cloneNode(true) : '';

    // Combine content into a single column
    const content = [];
    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      content.push(titleElement);
    }
    if (date) {
      const dateElement = document.createElement('p');
      dateElement.textContent = date;
      content.push(dateElement);
    }
    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      content.push(descriptionElement);
    }
    if (cta) {
      content.push(cta);
    }

    rows.push([image, content]);
  });

  // Ensure section metadata is not added if not required in the example
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}