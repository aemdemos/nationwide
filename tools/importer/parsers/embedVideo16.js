/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract iframe src
  const extractIframeSrc = (element) => {
    const iframe = element.querySelector('iframe');
    return iframe ? iframe.src : '';
  };

  // Extract the video URL
  const videoUrl = extractIframeSrc(element);

  // Ensure URL exists before proceeding
  if (!videoUrl) {
    console.warn('No video URL found in the provided element.');
    return;
  }

  // Create image and link dynamically for the embed block
  const videoLink = document.createElement('a');
  videoLink.href = videoUrl;
  videoLink.textContent = videoUrl;

  // Structure the cells for the block table
  const cells = [
    ['Embed'],
    [videoLink],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}