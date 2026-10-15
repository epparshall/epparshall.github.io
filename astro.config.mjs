// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

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

// https://astro.build/config
export default defineConfig({
  site: 'https://epparshall.github.io',
  base: '/',
  redirects: {
    '/publications': '/work',
  },
  integrations: [sitemap()],
  markdown: {
    rehypePlugins: [renameFootnoteLabel],
  },
});
