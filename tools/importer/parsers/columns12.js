/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const boldHeader = document.createElement('b');
  boldHeader.textContent = 'Columns';

  const columnsBlockTable = [
    [boldHeader], // Updated to match bold formatting in the example markdown structure

    [
      (() => {
        const ul = document.createElement('ul');
        ['One', 'Two', 'Three'].forEach(text => {
          const li = document.createElement('li');
          li.textContent = text;
          ul.appendChild(li);
        });

        const liveLink = document.createElement('a');
        liveLink.href = 'https://word-edit.officeapps.live.com/';
        liveLink.textContent = 'Live';
        ul.appendChild(liveLink);

        return ul;
      })(),
      (() => {
        const img1 = document.createElement('img');
        img1.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500';
        return img1;
      })()
    ],

    [
      (() => {
        const img2 = document.createElement('img');
        img2.src = 'https://main--sta-boilerplate--aemdemos.hlx.page/media_1e562f39bbce4d269e279cbbf8c5674a399fe0070.png#width=644&height=470';
        return img2;
      })(),
      (() => {
        const previewLink = document.createElement('a');
        previewLink.href = 'https://word-edit.officeapps.live.com/';
        previewLink.textContent = 'Preview';
        return previewLink;
      })()
    ]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(columnsBlockTable, document);
  element.replaceWith(hr, blockTable);
}