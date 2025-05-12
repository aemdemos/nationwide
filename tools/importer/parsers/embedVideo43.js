/* global WebImporter */
export default function parse(element, { document }) {
    const tableData = [];

    // Extract the heading text
    const headingElement = element.querySelector('[data-ref="heading"]');
    const headingText = headingElement ? headingElement.textContent.trim() : '';

    // Prepare the table data
    tableData.push(['Embed']);
    tableData.push([headingText]);

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}