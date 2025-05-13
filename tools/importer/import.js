/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import cardsNoImages4Parser from './parsers/cardsNoImages4.js';
import accordion8Parser from './parsers/accordion8.js';
import embedVideo16Parser from './parsers/embedVideo16.js';
import accordion15Parser from './parsers/accordion15.js';
import columns11Parser from './parsers/columns11.js';
import tableStripedBordered17Parser from './parsers/tableStripedBordered17.js';
import tableStripedBordered18Parser from './parsers/tableStripedBordered18.js';
import hero23Parser from './parsers/hero23.js';
import embedVideo2Parser from './parsers/embedVideo2.js';
import cardsNoImages25Parser from './parsers/cardsNoImages25.js';
import tableStripedBordered26Parser from './parsers/tableStripedBordered26.js';
import cards10Parser from './parsers/cards10.js';
import accordion24Parser from './parsers/accordion24.js';
import cards36Parser from './parsers/cards36.js';
import tabs38Parser from './parsers/tabs38.js';
import accordion39Parser from './parsers/accordion39.js';
import columns12Parser from './parsers/columns12.js';
import embedSocial37Parser from './parsers/embedSocial37.js';
import tableStripedBordered40Parser from './parsers/tableStripedBordered40.js';
import tableNoHeader31Parser from './parsers/tableNoHeader31.js';
import columns30Parser from './parsers/columns30.js';
import embedVideo43Parser from './parsers/embedVideo43.js';
import hero42Parser from './parsers/hero42.js';
import search44Parser from './parsers/search44.js';
import tableStripedBordered47Parser from './parsers/tableStripedBordered47.js';
import search45Parser from './parsers/search45.js';
import accordion22Parser from './parsers/accordion22.js';
import accordion48Parser from './parsers/accordion48.js';
import video50Parser from './parsers/video50.js';
import columns49Parser from './parsers/columns49.js';
import tableStripedBordered54Parser from './parsers/tableStripedBordered54.js';
import cards52Parser from './parsers/cards52.js';
import accordion13Parser from './parsers/accordion13.js';
import columns51Parser from './parsers/columns51.js';
import columns55Parser from './parsers/columns55.js';
import hero46Parser from './parsers/hero46.js';
import columns6Parser from './parsers/columns6.js';
import columns1Parser from './parsers/columns1.js';
import tableStripedBordered41Parser from './parsers/tableStripedBordered41.js';
import columns5Parser from './parsers/columns5.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import { TransformHook } from './transformers/transform.js';
import {
  generateDocumentPath,
  handleOnLoad,
  TableBuilder,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  cardsNoImages4: cardsNoImages4Parser,
  accordion8: accordion8Parser,
  embedVideo16: embedVideo16Parser,
  accordion15: accordion15Parser,
  columns11: columns11Parser,
  tableStripedBordered17: tableStripedBordered17Parser,
  tableStripedBordered18: tableStripedBordered18Parser,
  hero23: hero23Parser,
  embedVideo2: embedVideo2Parser,
  cardsNoImages25: cardsNoImages25Parser,
  tableStripedBordered26: tableStripedBordered26Parser,
  cards10: cards10Parser,
  accordion24: accordion24Parser,
  cards36: cards36Parser,
  tabs38: tabs38Parser,
  accordion39: accordion39Parser,
  columns12: columns12Parser,
  embedSocial37: embedSocial37Parser,
  tableStripedBordered40: tableStripedBordered40Parser,
  tableNoHeader31: tableNoHeader31Parser,
  columns30: columns30Parser,
  embedVideo43: embedVideo43Parser,
  hero42: hero42Parser,
  search44: search44Parser,
  tableStripedBordered47: tableStripedBordered47Parser,
  search45: search45Parser,
  accordion22: accordion22Parser,
  accordion48: accordion48Parser,
  video50: video50Parser,
  columns49: columns49Parser,
  tableStripedBordered54: tableStripedBordered54Parser,
  cards52: cards52Parser,
  accordion13: accordion13Parser,
  columns51: columns51Parser,
  columns55: columns55Parser,
  hero46: hero46Parser,
  columns6: columns6Parser,
  columns1: columns1Parser,
  tableStripedBordered41: tableStripedBordered41Parser,
  columns5: columns5Parser,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
};

WebImporter.Import = {
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.entries(transformers).forEach(([, transformerFn]) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => instance.url === originalURL)
      .map((instance) => ({
        ...block,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    try {
      // before parse hook
      WebImporter.Import.transform(TransformHook.beforeParse, element, { ...source });
      const tableBuilder = TableBuilder(WebImporter.DOMUtils.createTable);
      WebImporter.DOMUtils.createTable = tableBuilder.build(parserName);
      // parse the element
      parserFn.call(this, element, { ...source });
      WebImporter.DOMUtils.createTable = tableBuilder.restore();
      // after parse hook
      WebImporter.Import.transform(TransformHook.afterParse, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, publishUrl });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, publishUrl });

    return [{
      element: main,
      path,
    }];
  },
};
