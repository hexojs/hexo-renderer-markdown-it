# hexo-renderer-markdown-it

[![Build Status](https://travis-ci.org/hexojs/hexo-renderer-markdown-it.svg?branch=master)](https://travis-ci.org/hexojs/hexo-renderer-markdown-it)
[![npm version](https://badge.fury.io/js/hexo-renderer-markdown-it.svg)](https://www.npmjs.com/package/hexo-renderer-markdown-it)
[![npm dependencies](https://david-dm.org/hexojs/hexo-renderer-markdown-it.svg)](https://david-dm.org/hexojs/hexo-renderer-markdown-it)
[![Coverage Status](https://coveralls.io/repos/github/hexojs/hexo-renderer-markdown-it/badge.svg?branch=master)](https://coveralls.io/github/hexojs/hexo-renderer-markdown-it?branch=master)

This renderer plugin uses [Markdown-it] as a render engine on [Hexo]. Adds support for [Markdown] and [CommonMark].

## Main Features
- Support for [Markdown], [GFM] and [CommonMark]
- Extensive configuration
- Faster than the default renderer | `hexo-renderer-marked`
- Safe ID for headings
- Anchors for headings with ID
- Footnotes
- `<sub>` H<sub>2</sub>O
- `<sup>` x<sup>2</sup>
- `<ins>` <ins>Inserted</ins>

## Installation
Follow the [installation guide](https://github.com/hexojs/hexo-renderer-markdown-it/wiki/Getting-Started).

## Options

``` yml
markdown:
  preset: 'default'
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  enable_rules:
  disable_rules:
  plugins:
  anchors:
    level: 2
    collisionSuffix: ''
    permalink: false
    permalinkClass: 'header-anchor'
    permalinkSide: 'left'
    permalinkSymbol: '¶'
    case: 0
    separator: ''
```

Refer to [the wiki](https://github.com/hexojs/hexo-renderer-markdown-it/wiki) for more details.

## Extensibility

This plugin overrides some default behaviors of how markdown-it plugin renders the markdown into html, to integrate with the Hexo ecosystem. It is possible to override this plugin too, without resorting to forking the whole thing.

For example, to enable [unsafe links](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.validateLink) (which is disabled by default):

``` js
hexo.extend.filter.register('markdown-it:renderer', function(md) {
  const { config } = this; // Skip this line if you don't need user config from _config.yml
  md.validateLink = function() { return true; };
});
```

Save the file in "scripts/" folder and run Hexo as usual.

Refer to markdown-it [API documentation](https://markdown-it.github.io/markdown-it/#MarkdownIt).

## Requests and bug reports
If you have any feature requests or bugs to report, you're welcome to [file an issue](https://github.com/hexojs/hexo-renderer-markdown-it/issues).


[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[GFM]: https://help.github.com/articles/github-flavored-markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
