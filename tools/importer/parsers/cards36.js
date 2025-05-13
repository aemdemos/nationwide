/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the block name row
  rows.push(['Cards']);

  // Extract card data from the element
  const cards = element.querySelectorAll('[data-component="CardLinkList"]');
  cards.forEach((card) => {
    const title = card.querySelector('h2')?.textContent.trim();

    const links = [...card.querySelectorAll('li a')].map((link) => {
      const textContent = link.querySelector('span')?.textContent.trim();
      const href = link.href;

      const linkElement = document.createElement('a');
      linkElement.href = href;
      linkElement.textContent = textContent;

      return linkElement;
    });

    const footerLink = card.querySelector('footer a');
    const footerContent = footerLink?.querySelector('span')?.textContent.trim();
    const footerHref = footerLink?.href;

    const footerLinkElement = document.createElement('a');
    if (footerHref) {
      footerLinkElement.href = footerHref;
      footerLinkElement.textContent = footerContent;
    }

    const cardContent = document.createElement('div');

    if (title) {
      const titleElement = document.createElement('h2');
      titleElement.textContent = title;
      cardContent.append(titleElement);
    }

    links.forEach((linkElement) => cardContent.append(linkElement));

    if (footerHref) {
      cardContent.append(footerLinkElement);
    }

    rows.push([cardContent]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}