/* global WebImporter */
export default function parse(element, { document }) {
    // Create an <hr> element for a section break
    const hr = document.createElement('hr');

    // Extract tab labels and content dynamically
    const tabsData = [];
    const buttons = element.querySelectorAll('button');
    
    buttons.forEach((button) => {
        const label = button.querySelector('span:last-child')?.textContent?.trim() || 'Unknown Tab';
        const contentContainer = document.createElement('div');
        contentContainer.textContent = label; // Placeholder for actual content since it's unavailable

        tabsData.push([label, contentContainer]);
    });

    // Create the block table with header and dynamically extracted rows
    const headerRow = ['Tabs']; // Match the example header exactly
    const tableRows = [headerRow, ...tabsData];
    const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

    // Replace the original element with the new structure
    element.replaceWith(hr, blockTable);
}