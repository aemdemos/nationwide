/* global WebImporter */
export default function parse(element, { document }) {
    // Initialize an array to hold extracted content
    const extractedContent = [];

    // Helper function to extract links from a list element
    function extractLinks(listElement) {
        if (!listElement) return []; // Handle edge case for missing lists
        const items = listElement.querySelectorAll('li');
        return Array.from(items).map((item) => {
            const link = item.querySelector('a');
            if (link) {
                const anchor = document.createElement('a');
                anchor.setAttribute('href', link.getAttribute('href'));
                anchor.textContent = link.textContent.trim();
                return anchor;
            }
            return item.textContent.trim(); // Return plain text for items without links
        });
    }

    // Extract header and list content from sections
    const sections = element.querySelectorAll('[data-ref="gridColumn"]');
    sections.forEach((section) => {
        const heading = section.querySelector('h2')?.textContent.trim();
        const list = section.querySelector('ul');

        if (heading && list) {
            extractedContent.push([heading, extractLinks(list)]);
        }
    });

    // Extract social links section if available
    const socialLinksSection = element.querySelector('.Footer__SocialMediaArea-sc-cd0zm5-5');
    if (socialLinksSection) {
        const socialLinksHeading = socialLinksSection.querySelector('h2')?.textContent.trim();
        const socialLinks = Array.from(socialLinksSection.querySelectorAll('a')).map((link) => {
            const screenReaderText = link.querySelector('.ScreenReaderOnly-sc-4zu1m-0')?.textContent.trim();
            const href = link.getAttribute('href');
            if (href && screenReaderText) {
                const anchor = document.createElement('a');
                anchor.setAttribute('href', href);
                anchor.textContent = screenReaderText;
                return anchor;
            }
            return screenReaderText || link.textContent.trim();
        });

        if (socialLinksHeading && socialLinks.length) {
            extractedContent.push([socialLinksHeading, socialLinks]);
        }
    }

    // Remove duplicate rows by checking headings
    const uniqueContent = extractedContent.reduce((acc, [heading, content]) => {
        if (!acc.some(([h]) => h === heading)) {
            acc.push([heading, content]);
        }
        return acc;
    }, []);

    // Construct the table header from the example
    const blockHeader = ['Columns'];

    // Construct the table content dynamically
    const blockContent = uniqueContent.map(([heading, content]) => {
        return [heading, content];
    });

    // Combine header and content into the table data array
    const tableData = [blockHeader, ...blockContent];

    // Create the table using WebImporter.DOMUtils.createTable()
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(table);
}