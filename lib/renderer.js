'use strict';

module.exports = function (data, options) {
  var MdIt = require('markdown-it');
  var cfg = this.config.markdown;
  var opt = (cfg) ? cfg : 'default';
  var parser = (opt === 'default' || opt === 'commonmark' || opt === 'zero') ?
    new MdIt(opt) :
    new MdIt(opt.render);

  if (opt.render && opt.render.highlight) {
    var highlight = opt.render.highlight;
    if (typeof highlight === 'string') {
      highlight = require(highlight);
    }
    parser.set({ highlight: highlight });
  }

  if (opt.plugins) {
    parser = opt.plugins.reduce(function (parser, pugs) {
      return parser.use(require(pugs));
    }, parser);
  }

  if (opt.anchors) {
    parser = parser.use(require('./anchors'), opt.anchors);
  }

  return parser.render(data.text);
};
