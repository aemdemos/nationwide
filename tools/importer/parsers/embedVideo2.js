/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  const createSectionBreak = () => document.createElement('hr');

  const parseEmbedBlock = (messageElement) => {
    const icon = messageElement.querySelector('svg');
    const headerContent = messageElement.querySelector('[data-ref=messageHeader]');
    const content = messageElement.querySelector('[data-ref=messageContent]');

    if (!headerContent || !content) {
      return null;
    }

    const headerText = 'Embed';

    const secondRowContent = document.createElement('div');
    secondRowContent.append(icon, content);

    const rows = [
      [headerText],
      [secondRowContent]
    ];

    return createTable(rows, document);
  };

  const parseSectionMetadata = (sectionElement) => {
    const heading = sectionElement.querySelector('h2');
    const richText = sectionElement.querySelector('[data-component=RichText]');
    const hr = createSectionBreak();

    if (!heading || !richText) {
      return null;
    }

    const sectionMetadata = createTable([
      ['Section Metadata'],
      ['Heading', heading.textContent.trim()]
    ], document);

    return [hr, sectionMetadata];
  };

  const parsedBlocks = [];

  if (element.matches('[data-component=MessageModerate], [data-component=MessageHigh]')) {
    const embedBlock = parseEmbedBlock(element);
    if (embedBlock) {
      parsedBlocks.push(embedBlock);
    }
  } else if (element.matches('[data-component=GuideSection]')) {
    const sectionMetadata = parseSectionMetadata(element);
    if (sectionMetadata) {
      parsedBlocks.push(...sectionMetadata);
    }

    const richTextBlock = createTable([
      ['Rich Text'],
      [element.querySelector('[data-component=RichText]')]
    ], document);

    parsedBlocks.push(richTextBlock);
  }

  if (parsedBlocks.length) {
    element.replaceWith(...parsedBlocks);
  }
}