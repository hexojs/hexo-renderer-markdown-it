'use strict';

module.exports = function(data, options) {
  const MdIt = require('markdown-it');
  const cfg = this.config.markdown;
  const opt = cfg ? cfg : 'default';
  let parser = opt === 'default' || opt === 'commonmark' || opt === 'zero'
    ? new MdIt(opt)
    : new MdIt(opt.render);

  if (opt.plugins) {
    parser = opt.plugins.reduce((parser, pugs) => {
      if (pugs instanceof Object && pugs.name) {
        return parser.use(require(pugs.name), pugs.options);
      }
      return parser.use(require(pugs));

    }, parser);
  }

  if (opt.anchors) {
    parser = parser.use(require('./anchors'), opt.anchors);
  }

  return parser.render(data.text);
};
