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
  - Multi-languages Supported
- Footnotes
- `<sub>` H<sub>2</sub>O
- `<sup>` x<sup>2</sup>
- `<ins>` <ins>Inserted</ins>

## Installation
Follow the [installation guide](https://github.com/hexojs/hexo-renderer-markdown-it/wiki/Getting-Started).

## Options

``` yml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
  anchors:
    level: 2
    collisionSuffix: ''
    permalink: false,
    permalinkClass: 'header-anchor'
    permalinkSymbol: '¶'
    # replacement String to replace whitespace with, defaults to `-` (provides API compatibility with the `slug` module)
    replacement:  '-'
    # separator String, equivalent to `replacement` (provides API compatibility with the `speakingurl` module)
    # separator:  '-'
    # lang String, ISO 639-1 two-letter language code, defaults to auto-detected language
    #lang: 'de'
    # tone Boolean, add tone numbers to Pinyin transliteration of Chinese, defaults to `true`
    tone: true
    # separateNumbers Boolean, separate numbers that are within a word, defaults to `false`
    separateNumbers: false
    # maintainCase Boolean, maintain the original string's casing, defaults to `false`
    maintainCase: false
    #custom
    #  - Object, custom map for translation, overwrites all i.e. `{ '&': '#', '*': ' star ' }`
    #  - Array, add chars to allowed charMap
    #custom:
```

Refer to [the wiki](https://github.com/hexojs/hexo-renderer-markdown-it/wiki) for more details.

## Requests and bug reports
If you have any feature requests or bugs to report, you're welcome to [file an issue](https://github.com/hexojs/hexo-renderer-markdown-it/issues).


[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[GFM]: https://help.github.com/articles/github-flavored-markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
