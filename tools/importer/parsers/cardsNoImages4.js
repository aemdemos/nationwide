/* global WebImporter */
 export default function parse(element, { document }) {
    const cardsData = [];

    // Extract heading and description from each card
    const cardElements = element.querySelectorAll('[data-component="CardsGrid"] section[data-component="CardLinkList"] ul li');
    cardElements.forEach((card) => {
        const linkElement = card.querySelector('a');
        const cardContent = [];

        // Heading
        if (linkElement) {
            const heading = linkElement.textContent.trim();
            cardContent.push(heading);
        }

        // Push the card content
        cardsData.push(cardContent);
    });

    // Extract additional content like 'Find out more about ReachOut' and 'Was this information helpful?'
    const additionalContent = [];

    const reachOutLink = element.querySelector('[href="https://reachout.co.uk/"]');
    if (reachOutLink) {
        additionalContent.push(`Find out more about ReachOut: ${reachOutLink.href}`);
    }

    const feedbackSection = element.querySelector('[data-component="FeedbackTool"] h2');
    if (feedbackSection) {
        additionalContent.push(feedbackSection.textContent.trim());
    }

    // Include additional content in the cardsData
    additionalContent.forEach(content => cardsData.push([content]));

    // Create the header row of the table
    const tableHeader = ['Cards (no images)'];

    // Combine header and card rows
    const tableData = [tableHeader, ...cardsData];

    // Create the table
    const cardsTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(cardsTable);
}