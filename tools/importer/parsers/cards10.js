/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Get all cards inside the CardsGrid
  const cards = Array.from(element.querySelectorAll('[data-component="CardContactSimple"], [data-component="CardWaysToApply"], [data-component="CardCTAButton"], [data-component="CardCTATextLinks"]'));

  cards.forEach((card) => {
    const icon = card.querySelector('.IconWithContent__StyledIcon-sc-mcdv6-1 svg');
    const heading = card.querySelector('[data-ref="heading"]');
    const content = card.querySelector('[data-testid="CardContent"]');
    const availability = card.querySelector('[data-testid="CardAvailability"]');
    const link = card.querySelector('a[data-ref="link"]');

    const row = [];

    // Ensure consistency in handling icons
    if (icon) {
      row.push(icon.cloneNode(true));
    } else {
      const placeholderIcon = document.createElement('span');
      placeholderIcon.textContent = "No icon available";
      row.push(placeholderIcon);
    }

    const textContent = [];

    // Add heading as plain text
    if (heading) {
      textContent.push(document.createTextNode(heading.textContent));
    }

    // Add content
    if (content) {
      textContent.push(document.createElement('br'));
      textContent.push(content.cloneNode(true));
    }

    // Add availability
    if (availability) {
      textContent.push(document.createElement('br'));
      textContent.push(availability.cloneNode(true));
    }

    // Add link
    if (link) {
      textContent.push(document.createElement('br'));
      textContent.push(link.cloneNode(true));
    }

    row.push(textContent);
    rows.push(row);
  });

  const headerRow = ['Cards'];
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace element directly without adding unnecessary '<hr>'
  element.replaceWith(table);
}