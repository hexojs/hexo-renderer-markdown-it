var assign = require('object-assign');
hexo.config.MarkdownIt = assign({
  html:         true,
  xhtmlOut:     false,
  breaks:       false,
  langPrefix:   '',
  linkify:      false,
  typographer:  false,
  quotes: '“”‘’'
}, hexo.config.MarkdownIt);

var markdownIt = require('markdown-it')(hexo.config.MarkdownIt);
var renderer = function(data, options){
  return markdownIt.render(data.text);
};

hexo.extend.renderer.register('md', 'html', renderer, true);
hexo.extend.renderer.register('markdown', 'html', renderer, true);
hexo.extend.renderer.register('mkd', 'html', renderer, true);
hexo.extend.renderer.register('mkdn', 'html', renderer, true);
hexo.extend.renderer.register('mdwn', 'html', renderer, true);
hexo.extend.renderer.register('mdtxt', 'html', renderer, true);
hexo.extend.renderer.register('mdtext', 'html', renderer, true);
