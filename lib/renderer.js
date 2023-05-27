'use strict';

const MarkdownIt = require('markdown-it');
const path = require('path');

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
        preset: markdown,
      };
      hexo.log.warn(
        `Deprecated config detected. Please use\n\nmarkdown:\n  preset: ${markdown.preset}\n\nSee https://github.com/hexojs/hexo-renderer-markdown-it#options`
      );
    }

    const { preset, render, enable_rules, disable_rules, plugins, anchors, images } = markdown;
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
          const resolved = require.resolve(pugs.name, {
            paths: [
              // find from root hexo base directory node_modules
              path.join(hexo.base_dir, 'node_modules'),
              // find from current installed library node_modules
              path.join(__dirname, '../node_modules'),
              // find from root hexo base directory
              hexo.base_dir,
              // find from current library directory
              path.join(__dirname, '../'),
            ],
          });
          return parser.use(require(resolved), pugs.options);
        }
        return parser.use(require(pugs));
      }, this.parser);
    }

    if (anchors) {
      this.parser.use(require('./anchors'), anchors);
    }

    if (images) {
      this.parser.use(require('./images'), {
        images,
        hexo: this.hexo,
      });
    }
  }

  render(data, options) {
    this.hexo.execFilterSync('markdown-it:renderer', this.parser, { context: this });

    if (options != null && options.inline === true) {
      return this.parser.renderInline(data.text, {
        postPath: data.path
      });
    }
    return this.parser.render(data.text, {
      postPath: data.path,
    });
  }
}

module.exports = Renderer;
