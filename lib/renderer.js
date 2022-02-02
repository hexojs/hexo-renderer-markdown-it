'use strict';

const MarkdownIt = require('markdown-it');

class Renderer {

  /**
   * constructor
   *
   * @param {*} hexo context of hexo
   */
  constructor(hexo) {
    this.hexo = hexo;

    let { markdown } = hexo.config;

    // Temporary backward compatibility
    if (typeof markdown === 'string') {
      markdown = {
        preset: markdown
      };
      hexo.log.warn(`Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`);
    }

    const { preset, render, enable_rules, disable_rules, plugins, anchors } = markdown;
    this.parser = new MarkdownIt(preset, render);

    if (enable_rules) {
      this.parser.enable(enable_rules);
    }

    if (disable_rules) {
      this.parser.disable(disable_rules);
    }

    if (plugins) {
      this.parser = plugins.reduce((parser, pugs) => {
        if (pugs instanceof Object && pugs.name) {
          return parser.use(require(pugs.name), pugs.options);
        }
        return parser.use(require(pugs));
      }, this.parser);
    }

    if (anchors) {
      this.parser.use(require('./anchors'), anchors);
    }
  }

  render(data, options) {
    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });
    return this.parser.render(data.text);
  }
}

module.exports = Renderer;
