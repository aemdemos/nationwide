/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const headerRow = ['Columns'];
  
  // Extract content dynamically
  const columnContentOne = document.createElement('div');
  columnContentOne.textContent = 'One\nTwo\nThree';

  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';

  const firstImage = document.createElement('img');
  firstImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png';
  firstImage.alt = 'Green Double Helix';

  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com';
  previewLink.textContent = 'Preview';

  const secondImage = document.createElement('img');
  secondImage.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png';
  secondImage.alt = 'Yellow Double Helix';

  const cells = [
    headerRow,
    [columnContentOne, liveLink, firstImage],
    [secondImage, previewLink]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(hr, table);
}