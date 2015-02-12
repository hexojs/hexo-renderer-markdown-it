var should = require('chai').should();
var util = require('hexo-util');

describe('Markdown-It Hexo Renderer', function(){

  it('Default (GFM)', function(){
    var ctx = {
      config: {
        markdown: {
          html: false,
          xhtmlOut: true,
          breaks: true,
          langPrefix: '',
          linkify: true,
          typographer: true,
          quotes: '“”‘’'
        }
      }
    };

    var r = require('../lib/renderer').bind(ctx);

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

    var r = require('../lib/renderer').bind(ctx);

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
    var r = require('../lib/renderer').bind(ctx);
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
});
