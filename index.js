var md = require('markdown-it')();
var markdown = function(data, options){
  return md.render(data.text);
};

hexo.extend.renderer.register('md', 'html', markdown, true);
hexo.extend.renderer.register('markdown', 'html', markdown, true);
hexo.extend.renderer.register('mkd', 'html', markdown, true);
hexo.extend.renderer.register('mkdn', 'html', markdown, true);
hexo.extend.renderer.register('mdwn', 'html', markdown, true);
hexo.extend.renderer.register('mdtxt', 'html', markdown, true);
hexo.extend.renderer.register('mdtext', 'html', markdown, true);
