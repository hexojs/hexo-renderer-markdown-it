'use strict';
var fs = require('fs');
var render = require('../lib/renderer');
var chai = require('chai');
var should = chai.should();
var source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');

describe('Hexo Renderer Markdown-it', function () {

  it('should render GFM if no config provided', function () {
    var parsed_without_config = fs.readFileSync('./test/fixtures/outputs/default.html', 'utf8');
    var ctx = {
      config: {}
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_without_config);
  });

  it('should render CommonMark if config is \'commonmark\'', function () {
    var parsed_commonmark = fs.readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
    var ctx = {
      config: {
        markdown: 'commonmark'
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_commonmark);
  });

  it('should render a limited subset of Markdown if using \'zero\'', function () {
    var parsed_zero = fs.readFileSync('./test/fixtures/outputs/zero.html', 'utf8');
    var ctx = {
      config: {
        markdown: 'zero'
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_zero);
  });

  it('should render something very close to GFM with \'default\'', function () {
    var parsed_gfm = fs.readFileSync('./test/fixtures/outputs/default.html', 'utf8');
    var ctx = {
      config: {
        markdown: 'default'
      }
    };
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_gfm);
  });

  it('should handle a custom configuration', function () {
    var parsed_custom = fs.readFileSync('./test/fixtures/outputs/custom.html', 'utf8');
    var ctx = {
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
    var source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_custom);
  });

  it('should render plugins if they are defined', function () {
    var parsed_plugins = fs.readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
    var ctx = {
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
          plugins: ['markdown-it-footnote', 'markdown-it-sub', 'markdown-it-sup', 'markdown-it-ins', 'markdown-it-abbr']
        }
      }
    };
    var source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_plugins);
  });

  it('should render a plugin defined as an object', function () {
    var parsed_plugins = fs.readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
    var ctx = {
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
          plugins: ['markdown-it-footnote', 'markdown-it-sub', 'markdown-it-sup', 'markdown-it-ins', { name: 'markdown-it-abbr' }]
        }
      }
    };
    var source = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    result.should.equal(parsed_plugins);
  });

  it('should render anchor-headers if they are defined', function () {
    var anchors_with_permalinks = fs.readFileSync('./test/fixtures/outputs/anchors.html', 'utf8');
    var ctx = {
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
    var parse = render.bind(ctx);
    var result = parse({
      text: source
    });
    ctx = {};
    ctx = {
      config: {
        markdown: {
          anchors: {
            level: 1,
            permalink: false,
            permalinkClass: 'header-anchor',
            permalinkSymbol: '¶'
          }
        }
      }
    };
    var anchorsNoPerm = '<h1 id="this-is-an-h1-title">This is an H1 title</h1>\n<h1 id="this-is-an-h1-title-v2">This is an H1 title</h1>\n';
    var anchorsNoPerm_parse = render.bind(ctx);
    var anchorsNoPerm_result = anchorsNoPerm_parse({
      text: '# This is an H1 title\n# This is an H1 title'
    });
    ctx = {};

    anchorsNoPerm_result.should.equal(anchorsNoPerm);
    result.should.equal(anchors_with_permalinks);

  });

  it('should allow to disable a rule', function () {
	var parsed_disabled = fs.readFileSync('./test/fixtures/outputs/disable-single.html', 'utf8');
	var ctx = {
	  config: {
		markdown: {
		  disable: 'strikethrough'
		}
	  }
	};
	var parse = render.bind(ctx);
	var result = parse({
	  text: source
	});
	ctx = {};
	result.should.equal(parsed_disabled);
  });

  it('should allow to disable multiple rules', function () {
	var parsed_disabled = fs.readFileSync('./test/fixtures/outputs/disable-multiple.html', 'utf8');
	var ctx = {
	  config: {
		markdown: {
		  disable: ['strikethrough', 'table', 'blockquote']
		}
	  }
	};
	var parse = render.bind(ctx);
	var result = parse({
	  text: source
	});
	ctx = {};
	result.should.equal(parsed_disabled);
  });
});
