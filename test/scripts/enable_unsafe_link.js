'use strict';

// eslint-disable-next-line no-undef
hexo.extend.filter.register('markdown-it:renderer', md => {
  md.validateLink = function() { return true; };
});
