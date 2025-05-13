/* global WebImporter */
export default function parse(element, { document }) {
    // Corrected Code to Address Issues

    // Create the header row
    const headerRow = ['Cards (no images)'];

    // Cells array to store content rows
    const cells = [headerRow];

    // Extract list items
    const listItems = element.querySelectorAll('ul li');

    listItems.forEach((item) => {
        const link = item.querySelector('a');
        const linkText = link ? link.textContent.trim() : '';
        const linkHref = link ? link.href.trim() : '';

        // Create content for the row (exclude repeated heading)
        const content = [];

        // Add linked text if available
        if (linkText && linkHref) {
            const linkElement = document.createElement('a');
            linkElement.href = linkHref;
            linkElement.textContent = linkText;
            content.push(linkElement);
        } else if (linkText) {
            content.push(linkText);
        }

        // Push the content as a single row
        cells.push([content]);
    });

    // Create the table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table block
    element.replaceWith(block);
}