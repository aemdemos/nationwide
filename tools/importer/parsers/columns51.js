/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  // Section Metadata Fix
  const sectionMetadataTable = WebImporter.DOMUtils.createTable(
    [
      ['Section Metadata'],
      ['Columns']
    ],
    document
  );

  // Extracting content from given HTML
  const cards = element.querySelectorAll('.ActionCard__ActionCardOuter-sc-niucah-0');

  const cells = [['Columns']]; // Header row

  const contentRow = Array.from(cards).map((card) => {
    const title = card.querySelector('[data-ref="heading"]')?.textContent || '';
    const list = card.querySelector('ol')?.outerHTML || '';
    const linkElement = card.querySelector('a[data-ref="link"]');
    const link = linkElement
      ? document.createElement('a')
      : null;

    if (link) {
      link.href = linkElement.href;
      link.textContent = linkElement.textContent;
    }

    const contentFragment = document.createElement('div');
    const titleElement = document.createElement('h4');
    titleElement.textContent = title;
    contentFragment.appendChild(titleElement);

    const listContainer = document.createElement('div');
    listContainer.innerHTML = list;
    contentFragment.appendChild(listContainer);

    if (link) {
      contentFragment.appendChild(link);
    }

    return contentFragment;
  });

  cells.push(contentRow);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with proper structure including section metadata
  element.replaceWith(hr, sectionMetadataTable, blockTable);
}