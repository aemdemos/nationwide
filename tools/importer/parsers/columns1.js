/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const blockContent = [];

  // Iterate through the sections separated by <hr>
  for (const section of element.children) {
    if (section.tagName === 'DIV') {
      const rows = [];
      rows.push(['Columns']); // Add default block header

      // Find grid columns in the section
      const columns = section.querySelectorAll('[data-ref="gridColumn"]');
      const columnContent = [];
      columns.forEach((col) => {
        const content = [];

        // Extract headings
        const heading = col.querySelector('h2, h3');
        if (heading) {
          content.push(heading.textContent.trim());
        }

        // Extract paragraphs and links
        const richText = col.querySelector('.RichText__StyledRichTextContent-sc-1j7koit-0');
        if (richText) {
          richText.querySelectorAll('p, a').forEach((child) => {
            if (child.tagName === 'A') {
              // Append link content with href
              const link = document.createElement('a');
              link.textContent = child.textContent.trim();
              link.href = child.href;
              content.push(link);
            } else {
              content.push(child.textContent.trim());
            }
          });
        }

        // Extract images
        const image = col.querySelector('img');
        if (image) {
          const img = document.createElement('img');
          img.src = image.src;
          img.alt = image.alt;
          content.push(img);
        }

        columnContent.push(content);
      });

      rows.push(columnContent);

      const table = WebImporter.DOMUtils.createTable(rows, document);
      blockContent.push(table);
    } else if (section.tagName === 'HR') {
      blockContent.push(hr);
    }
  }

  // Replace the element with the blocks
  element.replaceWith(...blockContent);
}