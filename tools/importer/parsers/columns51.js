/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row for 'Columns', matching the example exactly
  rows.push(['Columns']);

  // Extract content from the provided HTML
  const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');
  const cardContents = [];

  cards.forEach((card) => {
    const heading = card.querySelector('[data-ref="heading"]');
    const headingText = heading ? heading.textContent : '';

    const listItems = Array.from(card.querySelectorAll('ol li')).map((li) => {
      const listContent = document.createElement('li');

      // Extract text content and preserve inline links
      li.childNodes.forEach((node) => {
        if (node.nodeType === 3) { // Node.TEXT_NODE
          listContent.appendChild(document.createTextNode(node.textContent));
        } else if (node.nodeName === 'A') {
          const anchor = document.createElement('a');
          anchor.href = node.href;
          anchor.textContent = node.textContent;
          listContent.appendChild(anchor);
        } else if (node.nodeName === 'STRONG') {
          const strong = document.createElement('strong');
          strong.textContent = node.textContent;
          listContent.appendChild(strong);
        }
      });

      return listContent;
    });

    const orderedList = document.createElement('ol');
    listItems.forEach((li) => orderedList.appendChild(li));

    const linkContainer = card.querySelector('.CardCTATextLinks__LinkContainer-sc-14tk81h-0 a');
    const anchor = linkContainer ? document.createElement('a') : null;

    if (anchor) {
      anchor.href = linkContainer.href;
      anchor.textContent = linkContainer.textContent;
    }

    const combinedContent = document.createElement('div');
    const headingElement = document.createElement('h4');
    headingElement.textContent = headingText;
    combinedContent.append(headingElement, orderedList);

    if (anchor) {
      combinedContent.append(anchor);
    }

    cardContents.push(combinedContent);
  });

  rows.push(cardContents);

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the parsed table
  element.replaceWith(table);
}