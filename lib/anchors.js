'use strict';

const Token = require('markdown-it/lib/token');
const { slugize } = require('hexo-util');

const renderPermalink = function(slug, opts, tokens, idx) {
  const permalink = [Object.assign(new Token('link_open', 'a', 1), {
    attrs: [['class', opts.permalinkClass], ['href', '#' + slug]]
  }), Object.assign(new Token('text', '', 0), {
    content: opts.permalinkSymbol
  }), new Token('link_close', 'a', -1), Object.assign(new Token('text', '', 0), {
    content: ''
  })];

  if (opts.permalinkSide === 'right') {
    return tokens[idx + 1].children.push(...permalink);
  }

  return tokens[idx + 1].children.unshift(...permalink);
};

const anchor = function(md, opts) {
  Object.assign(opts, { renderPermalink });

  let titleStore = {};
  const originalHeadingOpen = md.renderer.rules.heading_open;
  const slugOpts = { transform: opts.case, ...opts };

  md.renderer.rules.heading_open = function(...args) {
    const [tokens, idx, something, somethingelse, self] = args; // eslint-disable-line no-unused-vars

    if (tokens[idx].tag.substr(1) >= opts.level) {
      let _tokens$idx;

      const title = tokens[idx + 1].children.reduce((acc, t) => {
        return acc + t.content;
      }, '');

      let slug = slugize(title, slugOpts);

      if (Object.prototype.hasOwnProperty.call(titleStore, slug)) {
        titleStore[slug] = titleStore[slug] + 1;
        slug = slug + '-' + opts.collisionSuffix + titleStore[slug].toString();
      } else {
        titleStore[slug] = 1;
      }


      (_tokens$idx = tokens[idx], !_tokens$idx.attrs && (_tokens$idx.attrs = []), _tokens$idx.attrs)
        .push(['id', slug]);

      if (opts.permalink) {
        opts.renderPermalink.apply(opts, [slug, opts].concat(args));
      }
    }

    return originalHeadingOpen
      ? originalHeadingOpen.apply(this, args)
      : self.renderToken.apply(self, args);
  };

  md.core.ruler.push('clear_anchor_title_store', () => {
    titleStore = {};
  });
};

module.exports = anchor;
