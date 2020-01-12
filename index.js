/* global hexo */

'use strict';

hexo.config.markdown = Object.assign({
  render: {},
  anchors: {}
}, hexo.config.markdown);

hexo.config.markdown.render = Object.assign({
  html: true,
  xhtmlOut: false,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’'
}, hexo.config.markdown.render);

hexo.config.markdown.anchors = Object.assign({
  level: 2,
  collisionSuffix: '',
  permalink: false,
  permalinkClass: 'header-anchor',
  permalinkSide: 'left',
  permalinkSymbol: '¶',
  case: 0,
  separator: ''
}, hexo.config.markdown.anchors);

const renderer = require('./lib/renderer');

hexo.extend.renderer.register('md', 'html', renderer, true);
hexo.extend.renderer.register('markdown', 'html', renderer, true);
hexo.extend.renderer.register('mkd', 'html', renderer, true);
hexo.extend.renderer.register('mkdn', 'html', renderer, true);
hexo.extend.renderer.register('mdwn', 'html', renderer, true);
hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
hexo.extend.renderer.register('mdtext', 'html', renderer, true);
