'use strict';

var renderer = require('./lib/renderer');
var assign = require('object-assign');

hexo.config.markdown = assign({
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: '',
  linkify: false,
  typographer: false,
  quotes: '“”‘’'
}, hexo.config.markdown);

hexo.extend.renderer.register('md', 'html', renderer, true);
hexo.extend.renderer.register('markdown', 'html', renderer, true);
hexo.extend.renderer.register('mkd', 'html', renderer, true);
hexo.extend.renderer.register('mkdn', 'html', renderer, true);
hexo.extend.renderer.register('mdwn', 'html', renderer, true);
hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
hexo.extend.renderer.register('mdtext', 'html', renderer, true);
