'use strict';
const fs = require('fs');
const render = require('../lib/renderer');
const should = require('chai').should(); // eslint-disable-line
const source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');

describe('Hexo Renderer Markdown-it', () => {

  it('should render GFM if no config provided', () => {
    const parsed_without_config = fs.readFileSync('./test/fixtures/outputs/default.html', 'utf8');
    let ctx = {
      config: {}
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_without_config);
  });

  it('should render CommonMark if config is \'commonmark\'', () => {
    const parsed_commonmark = fs.readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
    let ctx = {
      config: {
        markdown: 'commonmark'
      }
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_commonmark);
  });

  it('should render a limited subset of Markdown if using \'zero\'', () => {
    const parsed_zero = fs.readFileSync('./test/fixtures/outputs/zero.html', 'utf8');
    let ctx = {
      config: {
        markdown: 'zero'
      }
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_zero);
  });

  it('should render something very close to GFM with \'default\'', () => {
    const parsed_gfm = fs.readFileSync('./test/fixtures/outputs/default.html', 'utf8');
    let ctx = {
      config: {
        markdown: 'default'
      }
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_gfm);
  });

  it('should handle a custom configuration', () => {
    const parsed_custom = fs.readFileSync('./test/fixtures/outputs/custom.html', 'utf8');
    let ctx = {
      config: {
        markdown: {
          render: {
            html: false,
            xhtmlOut: true,
            breaks: true,
            langPrefix: '',
            linkify: true,
            typographer: true,
            quotes: '«»“”'
          }
        }
      }
    };
    const source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_custom);
  });

  it('should render plugins if they are defined', () => {
    const parsed_plugins = fs.readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
    let ctx = {
      config: {
        markdown: {
          render: {
            html: false,
            xhtmlOut: false,
            breaks: false,
            langPrefix: 'language-',
            linkify: false,
            typographer: false,
            quotes: '«»“”'
          },
          plugins: [
            'markdown-it-abbr',
            'markdown-it-container',
            'markdown-it-deflist',
            'markdown-it-emoji',
            'markdown-it-footnote',
            'markdown-it-ins',
            'markdown-it-mark',
            'markdown-it-sub',
            'markdown-it-sup'
          ]
        }
      }
    };
    const source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_plugins);
  });

  it('should render a plugin defined as an object', () => {
    const parsed_plugins = fs.readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
    let ctx = {
      config: {
        markdown: {
          render: {
            html: false,
            xhtmlOut: false,
            breaks: false,
            langPrefix: 'language-',
            linkify: false,
            typographer: false,
            quotes: '«»“”'
          },
          plugins: [
            'markdown-it-abbr',
            'markdown-it-container',
            'markdown-it-deflist',
            'markdown-it-emoji',
            'markdown-it-footnote',
            'markdown-it-ins',
            'markdown-it-mark',
            'markdown-it-sub',
            'markdown-it-sup'
          ]
        }
      }
    };
    const source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_plugins);
  });

  it('anchors - should render anchor-headers if they are defined', () => {
    const anchors_with_permalinks = fs.readFileSync('./test/fixtures/outputs/anchors.html', 'utf8');
    let ctx = {
      config: {
        markdown: {
          anchors: {
            level: 2,
            collisionSuffix: 'ver',
            permalink: true,
            permalinkClass: 'header-anchor',
            permalinkSymbol: '¶'
          }
        }
      }
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: source
    });
    ctx = {};
    ctx = {
      config: {
        markdown: {
          anchors: {
            level: 1,
            collisionSuffix: '',
            permalink: false,
            permalinkClass: 'header-anchor',
            permalinkSymbol: '¶'
          }
        }
      }
    };
    const anchorsNoPerm = '<h1 id="This-is-an-H1-title">This is an H1 title</h1>\n<h1 id="This-is-an-H1-title-2">This is an H1 title</h1>\n';
    const anchorsNoPerm_parse = render.bind(ctx);
    const anchorsNoPerm_result = anchorsNoPerm_parse({
      text: '# This is an H1 title\n# This is an H1 title'
    });
    ctx = {};

    anchorsNoPerm_result.should.equal(anchorsNoPerm);
    result.should.equal(anchors_with_permalinks);
  });

  it('anchors - should parse options correctly', () => {
    const ctx = {
      config: {
        markdown: {
          anchors: {
            level: 2,
            case: 1,
            separator: '_'
          }
        }
      }
    };
    const parse = render.bind(ctx);
    const result = parse({
      text: '## foo BAR'
    });
    result.should.equal('<h2 id="foo_bar">foo BAR</h2>\n');
  });

  describe('anchors - permalinkSide', () => {
    const ctx = {
      config: {
        markdown: {
          anchors: {
            level: 2,
            permalink: true,
            permalinkClass: 'anchor',
            permalinkSide: 'left',
            permalinkSymbol: '#'
          }
        }
      }
    };
    const parse = render.bind(ctx);
    const text = '## foo';

    it('left', () => {
      const result = parse({ text });

      result.should.equal('<h2 id="foo"><a class="anchor" href="#foo" style="float: left">#</a>foo</h2>\n');
    });

    it('right', () => {
      ctx.config.markdown.anchors.permalinkSide = 'right';
      const result = parse({ text });

      result.should.equal('<h2 id="foo">foo<a class="anchor" href="#foo" style="float: none">#</a></h2>\n');
    });
  });
});
