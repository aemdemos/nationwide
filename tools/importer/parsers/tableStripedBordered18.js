/* global WebImporter */
export default function parse(element, { document }) {
  const hasSectionMetadata = true; // Example markdown structure had metadata

  // Create Section Metadata block
  const sectionMetadataCells = hasSectionMetadata ? [
    ['Section Metadata'],
    ['Title', 'Explore our instant access accounts'],
    ['Description', 'Apply for an instant access savings account with Nationwide. Get unlimited withdrawals and easy access to your money.']
  ] : [];
  const sectionMetadataBlock = hasSectionMetadata ? WebImporter.DOMUtils.createTable(sectionMetadataCells, document) : null;

  // Extract Table Headers dynamically from HTML
  const tableHeaderRow = Array.from(element.querySelector('table thead tr').children).map(header => header.textContent.trim());

  // Extract Table Rows dynamically from HTML
  const tableRows = Array.from(element.querySelector('table tbody').rows).map(row => {
    return Array.from(row.cells).map((cell, index) => {
      if (index === tableHeaderRow.length - 1) { // 'Find out more' column
        const link = cell.querySelector('a');
        return link ? link.cloneNode(true) : '';
      }
      const paragraph = cell.querySelector('p');
      const paragraphText = paragraph ? paragraph.textContent.trim() : '';
      const remainingText = cell.textContent.replace(paragraphText, '').trim();
      return paragraphText && remainingText ? `${paragraphText} ${remainingText}` : paragraphText || cell.textContent.trim();
    });
  });

  // Create Table Block dynamically
  const tableCells = [tableHeaderRow, ...tableRows];
  const tableBlock = WebImporter.DOMUtils.createTable(tableCells, document);

  // Add section break if Section Metadata exists
  const sectionBreak = hasSectionMetadata ? document.createElement('hr') : null;

  // Replace element with the structured blocks
  if (hasSectionMetadata && sectionBreak && sectionMetadataBlock) {
    element.replaceWith(sectionBreak, sectionMetadataBlock, tableBlock);
  } else {
    element.replaceWith(tableBlock);
  }
}