/* global hexo */

'use strict';

hexo.config.markdown = Object.assign({
  preset: 'default',
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
  separator: '-'
}, hexo.config.markdown.anchors);

const Renderer = require('./lib/renderer');
const renderer = new Renderer(hexo);

renderer.disableNunjucks = Boolean(hexo.config.markdown.disableNunjucks);

function render(data, options) {
  return renderer.render(data, options);
}

hexo.extend.renderer.register('md', 'html', render, true);
hexo.extend.renderer.register('markdown', 'html', render, true);
hexo.extend.renderer.register('mkd', 'html', render, true);
hexo.extend.renderer.register('mkdn', 'html', render, true);
hexo.extend.renderer.register('mdwn', 'html', render, true);
hexo.extend.renderer.register('mdtxt', 'html', render, true);
hexo.extend.renderer.register('mdtext', 'html', render, true);
