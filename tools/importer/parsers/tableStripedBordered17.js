/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the correct header row from the example
    const headerRow = ['Product Name', 'Website'];
    rows.push(headerRow);

    // Locate the table element within the provided element
    const table = element.querySelector('table');
    const bodyRows = table.querySelectorAll('tbody tr');

    bodyRows.forEach(tr => {
        const productNameCell = tr.querySelector('td:first-child');
        const websiteCell = tr.querySelector('td:last-child a');

        const productName = productNameCell ? Array.from(productNameCell.childNodes).map(node => {
            if (node.nodeType === document.ELEMENT_NODE) {
                return node.cloneNode(true); // Clone elements to retain their structure
            } else if (node.nodeType === document.TEXT_NODE) {
                return node.textContent.trim(); // Handle plain text nodes
            }
        }).filter(Boolean) : '';

        const website = websiteCell ? document.createElement('a') : '';

        if (websiteCell) {
            website.href = websiteCell.href;
            website.textContent = websiteCell.textContent.trim();
        }

        rows.push([productName, website]);
    });

    const tableBlock = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the structured table block
    element.replaceWith(tableBlock);
}