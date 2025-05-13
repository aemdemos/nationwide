/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract links from list items
  const extractLinks = (list) => {
    return [...list.querySelectorAll('li')].map((li) => {
      const link = li.querySelector('a');
      const linkContent = link.querySelector('span');
      return [linkContent.textContent.trim(), link.href];
    });
  };

  const accordionHeader = ['Accordion'];

  const sectionContent = [];

  // Optional informational block handling
  const messageBlock = element.querySelector('[data-testid="MessagingFramework"]');
  if (messageBlock) {
    const messageHeader = messageBlock.querySelector('[data-ref="messageHeader"]').textContent.trim();
    const messageContent = messageBlock.querySelector('[data-ref="messageContent"] p').cloneNode(true);
    sectionContent.push([messageHeader, messageContent]);
  }

  // Extract "What's on this page" links
  const heading = element.querySelector('[data-ref="heading"]');
  const navSection = element.querySelector('[data-ref="list"]');

  if (heading && navSection) {
    const links = extractLinks(navSection);
    links.forEach(([title, href]) => {
      const linkElement = document.createElement('a');
      linkElement.href = href;
      linkElement.textContent = href;
      sectionContent.push([title, linkElement]);
    });
  }

  // Prepare the table structure
  const cells = [accordionHeader, ...sectionContent];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}