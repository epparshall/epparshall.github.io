// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import { affiliate } from './src/config/affiliate.mjs';

function renameFootnoteLabel() {
  return (tree) => {
    function walk(node) {
      if (
        node.type === 'element' &&
        node.tagName === 'h2' &&
        node.properties?.id === 'footnote-label'
      ) {
        node.children = [{ type: 'text', value: 'Sources' }];
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
  };
}

function wrapTables() {
  return (tree) => {
    function walk(node) {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'] },
            children: [child],
          };
        }
        walk(child);
        return child;
      });
    }

    walk(tree);
  };
}

// Strips tracking junk from Amazon product links, adds the Associates tag when one
// is configured in src/config/affiliate.mjs, and marks tagged links as sponsored.
function tagAffiliateLinks() {
  return (tree) => {
    function walk(node) {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string') {
        let url;
        try {
          url = new URL(node.properties.href);
        } catch {
          url = null;
        }
        if (url && /(^|\.)amazon\.com$/.test(url.hostname)) {
          const keep = new URLSearchParams();
          if (url.searchParams.has('k')) keep.set('k', url.searchParams.get('k'));
          if (url.searchParams.has('i')) keep.set('i', url.searchParams.get('i'));
          if (affiliate.amazonTag) keep.set('tag', affiliate.amazonTag);
          url.search = keep.toString();
          node.properties.href = url.toString();
          if (affiliate.amazonTag) node.properties.rel = ['sponsored', 'noopener', 'noreferrer'];
        }
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(walk);
      }
    }

    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://epparshall.github.io',
  base: '/',
  redirects: {
    '/publications': '/work',
  },
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [renameFootnoteLabel, wrapTables, tagAffiliateLinks],
  },
});
