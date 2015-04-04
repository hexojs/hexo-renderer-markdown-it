'use strict';
module.exports = function (data, options) {
  var MarkdownIt = require('markdown-it');
  var opts       = (this.config.markdown) ? this.config.markdown : 'default';
  var parser     = (opts === 'default' || opts === 'commonmark' || opts === 'zero') ? new MarkdownIt(opts) : new MarkdownIt(opts.render);

  if(opts.plugins) {
    parser = opts.plugins.reduce(function(parser, pugs){
      return parser.use(require(pugs));
    }, parser);
  }

  if(opts.anchors) {
    parser.use(require('markdown-it-anchor'), opts.anchors);
  }

  return parser.render(data.text);
};
