'use strict';

var MarkdownIt = require('markdown-it');
var anchor = require('markdown-it-anchor');
var assign = require('object-assign');

module.exports = function (data, options) {
  var markConfig = this.config.markdown;
  var md;

  if (markConfig == 'commonmark' || markConfig == 'zero') {
    md = new MarkdownIt(markConfig);
  } else {
    md = new MarkdownIt(assign({}, markConfig.render, options));
  }

  if(markConfig.plugins) {
    md = markConfig.plugins.reduce(function(md, p){
      return md.use(require(p));
    }, md);
  }

  if(markConfig.anchors) {
    return md.use(anchor, markConfig.anchors).render(data.text);
  } else {
    return md.render(data.text);
  }
};
