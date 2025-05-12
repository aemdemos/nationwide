/* global WebImporter */
export default function parse(element, { document }) {
    const content = [];

    // Extract Credit Ratings Table
    const creditRatingsHeading = element.querySelector('h2#credit-ratings');
    const creditRatingsTable = element.querySelector('table');
    if (creditRatingsHeading && creditRatingsTable) {
        const headerRow = ['Table (striped, bordered)'];
        const tableContent = [];

        // Add the header row
        const headers = Array.from(creditRatingsTable.querySelectorAll('thead th')).map(th => th.textContent.trim());
        tableContent.push(headers);

        // Add the body rows
        const rows = Array.from(creditRatingsTable.querySelectorAll('tbody tr'));
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td, th')).map(cell => cell.textContent.trim());
            tableContent.push(cells);
        });

        const creditRatingsBlock = WebImporter.DOMUtils.createTable([headerRow, ...tableContent], document);
        content.push(creditRatingsBlock);
    }

    // Extract Bloomberg Tickers
    const bloombergTickersHeading = element.querySelector('h3');
    const bloombergTickersContent = element.querySelector('h3 + div');
    if (bloombergTickersHeading && bloombergTickersContent) {
        const headerRow = ['Bloomberg Tickers'];
        const tickerLines = Array.from(bloombergTickersContent.querySelectorAll('p')).map(p => p.textContent.trim());
        const tickerBlock = WebImporter.DOMUtils.createTable([headerRow, ...tickerLines.map(line => [line])], document);
        content.push(tickerBlock);
    }

    // Responsible Business Section (without metadata)
    const responsibleBusinessHeading = element.querySelector('h2#responsible-business');
    const responsibleBusinessContent = element.querySelector('h2#responsible-business + div');
    if (responsibleBusinessHeading && responsibleBusinessContent) {
        const description = responsibleBusinessContent.querySelector('p')?.textContent.trim() || '';
        const link = responsibleBusinessContent.querySelector('a');
        const linkElement = link ? document.createElement('a') : null;
        if (linkElement) {
            linkElement.href = link.href;
            linkElement.textContent = link.textContent;
        }

        const responsibleBusinessBlock = WebImporter.DOMUtils.createTable([
            ['Description'],
            [description, linkElement].filter(item => item) // Filter out null values
        ], document);

        content.push(responsibleBusinessBlock);
    }

    // Finally, replace the element
    element.replaceWith(...content);
}