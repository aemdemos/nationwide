/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for Accordion block
  rows.push(['Accordion']);

  // Fetch all collapsible sections
  const collapsibleSections = element.querySelectorAll('article[data-component="SavingsSummaryBox"] section');

  collapsibleSections.forEach(section => {
    // Extract the title
    const titleElement = section.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the content
    const contentElement = section.querySelector('div.Content-sc-mh9bui-0');
    const content = contentElement ? contentElement.cloneNode(true) : document.createElement('div');

    // Add the row for the accordion item
    rows.push([title, content]);
  });

  // Create the accordion table
  const accordionTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element with the accordion table
  element.replaceWith(accordionTable);
}