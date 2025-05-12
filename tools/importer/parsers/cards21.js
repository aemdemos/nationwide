/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const extractCards = () => {
    const cards = [];
    const cardElements = element.querySelectorAll('[data-component="CardCTATextLinks"], [data-component="CardCTAButton"]');

    cardElements.forEach((cardEl) => {
      const imageEl = cardEl.querySelector('[data-testid="ImageContainer"]');
      const imageContainer = imageEl ? imageEl.cloneNode(true) : document.createTextNode('No Image'); // Use 'No Image' placeholder

      const headingEl = cardEl.querySelector('[data-ref="heading"]');
      const heading = headingEl ? headingEl.textContent.trim() : '';

      const descriptionEl = cardEl.querySelector('[data-testid="CardContent"] p');
      const description = descriptionEl ? descriptionEl.textContent.trim() : '';

      const linkEl = cardEl.querySelector('a[data-ref="link"]');
      const link = linkEl ? linkEl.cloneNode(true) : null;

      const contentArray = [];
      if (heading) {
        const headingElement = document.createElement('strong');
        headingElement.textContent = heading;
        contentArray.push(headingElement);
      }
      if (description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;
        contentArray.push(descriptionElement);
      }
      if (link) contentArray.push(link);

      cards.push([imageContainer, contentArray]);
    });

    return cards;
  };

  const headerRow = ['Cards'];
  const tableData = [headerRow, ...extractCards()];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(hr, blockTable);
}