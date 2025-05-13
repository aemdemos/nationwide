/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];

  const iframe = element.querySelector('iframe');
  const videoLink = document.createElement('a');
  videoLink.href = iframe ? iframe.src : '#';
  videoLink.textContent = iframe ? iframe.src : 'No video link available';

  const contentRow = [videoLink];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  element.replaceWith(table);
}