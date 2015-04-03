'use strict';

var should  = require('chai').should();

describe('Markdown-It Hexo Renderer', function(){

  var render  = require('../lib/renderer');

  it('Without Setup', function(){
    var ctx = {
      config:{
        title: 'Something to test'
      }
    };

    var r = render.bind(ctx);

    var body = [
      '# Hello',
      'world',
      '',
      '| Option | Description |',
      '| ------ | ----------- |',
      '| data   | path to data files to supply the data that will be passed into templates. |',
      '| engine | engine to be used for processing templates. Handlebars is the default. |',
      '| ext    | extension to be used for dest files. |'
    ].join('\n');

    var result = r({text: body});

    result.should.eql([
        '<h1>Hello</h1>',
        '<p>world</p>',
        '<p>| Option | Description |',
        '| ------ | ----------- |',
        '| data   | path to data files to supply the data that will be passed into templates. |',
        '| engine | engine to be used for processing templates. Handlebars is the default. |',
        '| ext    | extension to be used for dest files. |</p>'
      ].join('\n') + ('\n'));
  });

  it('Default (GFM)', function(){
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
            quotes: '“”‘’'
          },
        }
      }
    };

    var r = render.bind(ctx);

    var body = [
      'Hello',
      'world'
    ].join('\n');

    var result = r({text: body});

    result.should.eql([
        '<p>Hello<br />',
        'world</p>'
      ].join('\n') + ('\n'));

  });

  it('Strict CommonMark', function(){
    var ctx = {
      config: {
        markdown: 'commonmark'
      }
    };

    var r = render.bind(ctx);

    var body = [
      '# Hello',
      'world',
      '',
      '| Option | Description |',
      '| ------ | ----------- |',
      '| data   | path to data files to supply the data that will be passed into templates. |',
      '| engine | engine to be used for processing templates. Handlebars is the default. |',
      '| ext    | extension to be used for dest files. |'
    ].join('\n');

    var result = r({text: body});

    result.should.eql([
        '<h1>Hello</h1>',
        '<p>world</p>',
        '<p>| Option | Description |',
        '| ------ | ----------- |',
        '| data   | path to data files to supply the data that will be passed into templates. |',
        '| engine | engine to be used for processing templates. Handlebars is the default. |',
        '| ext    | extension to be used for dest files. |</p>'
      ].join('\n') + ('\n'));

  });

  it('Plugins', function(){
    var ctx = {
      config: {
        markdown: {
          plugins: [
            'markdown-it-footnote',
            'markdown-it-sub',
            'markdown-it-sup'
          ]
        }
      }
    };
    var r = render.bind(ctx);
    var footnote = [
      'Test [^1]:',
      '',
      '[^1]: footnote'
    ].join('\n');

    r({text: footnote}).should.eql([
      '<p>Test <sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup>:</p>',
      '<hr class="footnotes-sep">',
      '<section class="footnotes">',
      '<ol class="footnotes-list">',
      '<li id="fn1"  class="footnote-item"><p>footnote <a href="#fnref1" class="footnote-backref">↩</a></p>',
      '</li>',
      '</ol>',
      '</section>',
      ''
    ].join('\n'));

    r({text: '29^th^'}).should.eql('<p>29<sup>th</sup></p>\n');
    r({text: 'H~2~O'} ).should.eql('<p>H<sub>2</sub>O</p>\n');

  });

  it('Header Anchors', function(){
    var ctx = {
      config: {
        markdown: {
          anchors: {
            level: 2,
            permalink: false,
            permalinkClass: 'header-anchor',
            permalinkSymbol: '¶'
          }
        }
      }
    };

    var r = render.bind(ctx);

    var headers = [
      '# Level 1 - Not anchored',
      '',
      '## Level 2',
      '',
      '## Level *2*',
      '',
      '## Level **2**',
      '',
      '### Level - $3',
      '',
      '#### Nível 4',
      '',
      '#### [Nível 4](http://www.celsomiranda.net)',
      ''
    ].join('\n');

    r({text: headers}).should.eql([
      '<h1>Level 1 - Not anchored</h1>',
      '<h2 id="level-2">Level 2</h2>',
      '<h2 id="level-2">Level <em>2</em></h2>',
      '<h2 id="level-2">Level <strong>2</strong></h2>',
      '<h3 id="level-3">Level - $3</h3>',
      '<h4 id="nivel-4">Nível 4</h4>',
      '<h4 id="nivel-4"><a href="http://www.celsomiranda.net">Nível 4</a></h4>',
      ''
    ].join('\n'));

  });

});
