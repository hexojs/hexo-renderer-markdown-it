'use strict';
var fs      = require('fs');
var render  = require('../lib/renderer');
var chai    = require('chai');
var should  = chai.should();
var source  = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');

describe('Hexo Renderer Markdown-it', function () {

  it('should default to CommonMark if no config is provided', function () {

    var parsed_without_config = fs.readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
    var ctx = { config: { title: 'no markdown'}};
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_without_config);

  });

  it('should render CommonMark if config is \'commonmark\'', function () {

    var parsed_commonmark = fs.readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
    var ctx = { config: { markdown: 'commonmark'}};
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_commonmark);

  });

  it('should render a limited subset of Markdown if using \'zero\'', function () {

    var parsed_zero = fs.readFileSync('./test/fixtures/outputs/zero.html', 'utf8');
    var ctx = { config: { markdown: 'zero'}};
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_zero);

  });

  it('should render something very close to GFM with \'default\'', function () {

    var parsed_gfm = fs.readFileSync('./test/fixtures/outputs/default.html', 'utf8');
    var ctx = { config: { markdown: 'default'}};
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_gfm);

  });

  it('should handle a custom configuration', function () {

    var parsed_custom = fs.readFileSync('./test/fixtures/outputs/custom.html', 'utf8');
    var ctx = { config: { markdown: { render: { html: false, xhtmlOut: true, breaks: true, langPrefix: '', linkify: true, typographer: true, quotes: '«»“”' }}}};
    var source  = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_custom);

  });

  it('should render plugins if they are defined', function () {

    var parsed_plugins = fs.readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
    var ctx = { config: {markdown: { plugins:[ 'markdown-it-footnote', 'markdown-it-sub', 'markdown-it-sup' ]}}};
    var source  = fs.readFileSync('./test/fixtures/markdownit.md', 'utf8');
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_plugins);

  });

  it('should render anchor-headers if they are defined', function () {

    var parsed_anchors = fs.readFileSync('./test/fixtures/outputs/anchors.html', 'utf8');
    var ctx = { config: { markdown: { anchors: { level: 2, permalink: false, permalinkClass: 'header-anchor', permalinkSymbol: '¶' }}}};
    var parse = render.bind(ctx);
    var result = parse({text: source});

    ctx = {};
    result.should.eql(parsed_anchors);

  });


});
