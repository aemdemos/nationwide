/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const rows = [];

  // Find all sections within the element
  const sections = element.querySelectorAll('section[data-component="CardLinkList"]');

  sections.forEach(section => {
    const title = section.querySelector('h2')?.textContent.trim();
    const listItems = section.querySelectorAll('ul li');

    const links = Array.from(listItems).map(li => {
      const link = li.querySelector('a');
      if (link) {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        const anchor = document.createElement('a');
        anchor.href = href;
        anchor.textContent = text;
        return anchor;
      }
      return null;
    }).filter(Boolean);

    const footerLink = section.querySelector('footer a');
    if (footerLink) {
      const footerText = footerLink.textContent.trim();
      const footerHref = footerLink.getAttribute('href');
      const footerAnchor = document.createElement('a');
      footerAnchor.href = footerHref;
      footerAnchor.textContent = footerText;
      links.push(footerAnchor);
    }

    rows.push([title, links]);
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}