/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row matching EXACTLY the example markdown
  const headerRow = ['Product Name', 'Website'];

  // Extract rows dynamically from the original HTML
  const rows = Array.from(element.querySelectorAll('tbody tr')).map(row => {
    const columns = row.querySelectorAll('td');

    // Extract plain text for the 'Product Name' column
    const productNameElement = columns[0]?.querySelector('p');
    const descriptionElement = columns[0]?.querySelector('div');
    const productName = productNameElement ? productNameElement.textContent.trim() : '';
    const description = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Combine product name and description into separate paragraphs
    const productNameCell = document.createElement('div');
    if (productName) {
      const productNameParagraph = document.createElement('p');
      productNameParagraph.textContent = productName;
      productNameCell.appendChild(productNameParagraph);
    }
    if (description) {
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = description;
      productNameCell.appendChild(descriptionParagraph);
    }

    // Extract the link and format it as an anchor element for the 'Website' column
    const websiteLink = columns[5]?.querySelector('a');
    let websiteAnchor = null;

    if (websiteLink) {
      websiteAnchor = document.createElement('a');
      websiteAnchor.href = websiteLink.href;
      websiteAnchor.textContent = websiteLink.href;
    }

    return [
      productNameCell,
      websiteAnchor
    ];
  });

  // Combine the header row and extracted rows into a single table structure
  const tableContent = [headerRow, ...rows];

  // Create the final block table
  const structuredTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new table
  element.replaceWith(structuredTable);
}