/* global WebImporter */

export default function parse(element, { document }) {
  const hr = document.createElement('hr');
  const cells = [];

  // Add block header row
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Process each card within the element
  const cards = element.querySelectorAll('[data-component="CardContactSimple"]');
  cards.forEach((card) => {
    const icon = card.querySelector('svg') ? card.querySelector('svg').cloneNode(true) : document.createElement('div');
    const heading = card.querySelector('[data-ref="heading"]');
    const content = card.querySelector('[data-testid="CardContent"]');
    const availability = card.querySelector('[data-testid="CardAvailability"]');
    const actionText = card.querySelector('[data-testid="CardActionText"]');
    const links = card.querySelectorAll('a');

    const contentElements = [];

    // Add heading
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      contentElements.push(headingElement);
    }

    // Add content
    if (content) {
      const contentElement = document.createElement('p');
      contentElement.textContent = content.textContent;
      contentElements.push(contentElement);
    }

    // Add availability
    if (availability) {
      const availabilityElement = document.createElement('p');
      availabilityElement.textContent = availability.textContent;
      contentElements.push(availabilityElement);
    }

    // Include links in relevant content structure
    links.forEach((link) => {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      contentElements.push(linkElement);
    });

    // Add row to cells
    cells.push([icon, contentElements]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with table
  element.replaceWith(hr, table);
}