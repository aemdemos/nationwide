/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the block name as the header row
    rows.push(['Cards']);

    // Iterate over the cards and extract content
    const cards = element.querySelectorAll('[data-component="CardCTATextLinks"]');

    cards.forEach((card) => {
        const cells = [];

        // Extract the image if it exists
        const imageContainer = card.querySelector('[data-testid="ImageContainer"]');
        if (imageContainer && imageContainer.style.backgroundImage) {
            const image = document.createElement('img');
            image.src = imageContainer.style.backgroundImage.replace(/url\("(.+)"\)/, '$1');
            cells.push(image);
        } // Omit the image cell entirely if no image is found

        // Extract the content
        const contentCell = document.createElement('div');

        // Extract the title
        const title = card.querySelector('[data-ref="heading"]');
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title.textContent;
            contentCell.appendChild(titleElement);
        }

        // Extract the description
        const description = card.querySelector('p');
        if (description && description.textContent.trim()) {
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = description.textContent.trim();
            contentCell.appendChild(descriptionElement);
        }

        // Extract the link and call-to-action
        const link = card.querySelector('a[data-ref="link"]');
        if (link) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
            contentCell.appendChild(linkElement);
        }

        cells.push(contentCell);
        rows.push(cells);
    });

    // Create the table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the element with the table
    element.replaceWith(table);
}