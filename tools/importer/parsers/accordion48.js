/* global WebImporter */
export default function parse(element, { document }) {
    function extractAccordionData(rootElement) {
        const accordionItems = rootElement.querySelectorAll('[data-ref="accordion"]');
        
        const rows = Array.from(accordionItems).map(item => {
            const titleButton = item.querySelector('button[data-ref="accordionHeader"]');
            const title = titleButton ? titleButton.textContent.trim() : 'Untitled'; // Dynamic extraction

            const contentElement = item.querySelector('[data-ref="accordionContent"]');
            let content = [];

            if (contentElement) {
                // Extract all the text & media from the content
                const texts = Array.from(contentElement.childNodes).map(node => node.cloneNode(true));
                content = texts;
            }

            return [title, content.length > 0 ? content : 'No content available']; // Edge case for missing data
        });

        return rows;
    }

    const blockHeader = ['Accordion']; // Header row matches example structure
    const accordionRows = extractAccordionData(element);

    const cells = [blockHeader, ...accordionRows];
    const accordionTable = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(accordionTable); // Replaces the original element
}