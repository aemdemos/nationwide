/* global WebImporter */
export default function parse(element, { document }) {
    const hr = document.createElement('hr');

    const accordions = Array.from(element.querySelectorAll('[data-component="AccordionSimple"]'));

    const sections = [];

    accordions.forEach((accordion, index) => {
        // Create Section Metadata Block if required
        const sectionMetadata = [
            ['Section Metadata'], // Header row exactly matching example
            [`Section ${index + 1}`] // Dummy metadata for demonstration (can be extended dynamically)
        ];
        const sectionMetadataTable = WebImporter.DOMUtils.createTable(sectionMetadata, document);

        // Create Accordion Block
        const headerRow = ['Accordion'];
        const rows = [headerRow];

        const items = Array.from(accordion.querySelectorAll('[data-ref="accordion"]'));
        items.forEach((item) => {
            const titleElement = item.querySelector('button[data-ref="accordionHeader"] .nel-Accordion-503');
            const contentElement = item.querySelector('[data-ref="accordionContent"]');

            const title = titleElement?.textContent.trim() || 'Untitled'; // Handle missing titles
            const content = contentElement ? Array.from(contentElement.childNodes) : ['No content available']; // Handle missing content

            rows.push([title, content]);
        });

        const accordionTable = WebImporter.DOMUtils.createTable(rows, document);

        // Add Section Break and Section Metadata
        sections.push(hr.cloneNode(), sectionMetadataTable, accordionTable);
    });

    // Replace original element with all sections
    element.replaceWith(...sections);
}