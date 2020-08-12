'use strict';

module.exports = function(data, options) {
  const MdIt = require('markdown-it');
  let { markdown } = this.config;

  // Temporary backward compatibility
  if (typeof markdown === 'string') {
    markdown = {
      preset: markdown
    };
    this.log.warn(`Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`);
  }

  const { preset, render, plugins, anchors } = markdown;
  let parser = new MdIt(preset, render);

  if (plugins) {
    parser = plugins.reduce((parser, pugs) => {
      if (pugs instanceof Object && pugs.name) {
        return parser.use(require(pugs.name), pugs.options);
      }
      return parser.use(require(pugs));

    }, parser);
  }

  if (anchors) {
    parser = parser.use(require('./anchors'), anchors);
  }

  this.execFilterSync('markdown-it:renderer', parser, { context: this });

  return parser.render(data.text);
};
