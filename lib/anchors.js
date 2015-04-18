'use strict';

var assign = require('lodash.assign');
var Token = require('markdown-it/lib/token');
var sluggo = require('sluggo');

var renderPermalink = function (slug, opts, tokens, idx) {
  return tokens[idx + 1].children.unshift(assign(new Token('link_open', 'a', 1), {
    attrs: [['class', opts.permalinkClass], ['href', '#' + slug]]
  }), assign(new Token('text', '', 0), {
    content: opts.permalinkSymbol
  }), new Token('link_close', 'a', -1), assign(new Token('text', '', 0), {
    content: ''
  }));
};

var anchor = function (md, opts) {
  opts = assign({}, anchor.defaults, opts);

  var titleStore = {};
  var originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function (tokens, idx, something, somethingelse, self) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (tokens[idx].tag.substr(1) >= opts.level) {
      var _tokens$idx;

      var title = tokens[idx + 1].children.reduce(function (acc, t) {
        return acc + t.content;
      }, '');

      var slug = sluggo(title);

      if (titleStore.hasOwnProperty(slug)) {
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

    return (originalHeadingOpen) ?
      originalHeadingOpen.apply(this, args) :
      self.renderToken.apply(self, args);
  };
};

anchor.defaults = {
  level: 1,
  collisionSuffix: 'v',
  permalink: false,
  renderPermalink: renderPermalink,
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶'
};

module.exports = anchor;
