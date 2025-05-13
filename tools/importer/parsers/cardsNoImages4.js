/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  const extractCardContent = (cardElement) => {
    const titleElement = cardElement.querySelector('[data-ref="heading"]');
    const descriptionElement = cardElement.querySelector('[data-testid="CardContent"] p');
    const ctaElement = cardElement.querySelector('[data-testid="PrimaryButton"]');

    const content = [];

    if (titleElement) {
      const titleStrong = document.createElement('strong');
      titleStrong.textContent = titleElement.textContent;
      content.push(titleStrong);
    }

    if (descriptionElement) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = descriptionElement.textContent;
      content.push(descriptionParagraph);
    }

    if (ctaElement) {
      const link = document.createElement('a');
      link.href = ctaElement.href;
      link.textContent = ctaElement.textContent;
      content.push(link);
    }

    return content;
  };

  // Extract all card elements
  const cardElements = element.querySelectorAll('[data-component="CardCTAButton"]');

  const cardsTable = [
    ['Cards (no images)'], // Header row matches example
    ...Array.from(cardElements).map((cardElement) => [extractCardContent(cardElement)])
  ];

  const block = WebImporter.DOMUtils.createTable(cardsTable, document);

  element.replaceWith(block);
}