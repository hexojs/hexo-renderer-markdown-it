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
});
