# hexo-renderer-markdown-it

[![Build Status](https://travis-ci.org/celsomiranda/hexo-renderer-markdown-it.svg)](https://travis-ci.org/celsomiranda/hexo-renderer-markdown-it) [![npm version](https://badge.fury.io/js/hexo-renderer-markdown-it.svg)](http://badge.fury.io/js/hexo-renderer-markdown-it) [![npm dependencies](https://david-dm.org/celsomiranda/hexo-renderer-markdown-it.svg)](https://www.npmjs.com/package/hexo-renderer-markdown-it) [![Coverage Status](https://coveralls.io/repos/celsomiranda/hexo-renderer-markdown-it/badge.svg)](https://coveralls.io/r/celsomiranda/hexo-renderer-markdown-it)

This renderer plugin uses [Markdown-it] as a render engine on [Hexo]. Adds support for [Markdown] and [CommonMark].

## Documentation
This `README` was getting too messy for my taste, so it was time to fire up the github wiki in the repo and [move the documentation over there](https://github.com/celsomiranda/hexo-renderer-markdown-it/wiki).

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
You can install `hexo-renderer-markdown-it` by following [these steps in the documentation](https://github.com/celsomiranda/hexo-renderer-markdown-it/wiki/Getting-Started).

It's also the place to go if you want to know more about how `hexo-renderer-markdown-it` works.

## Requests and bug reports
If you have any feature requests or bugs to report, [you're welcome to file an issue](https://github.com/celsomiranda/hexo-renderer-markdown-it/issues).

## Changelog
### 3.3.0
- Modified the ID collisions feature (reading the number of times the header repeats itself)
- Added option `collisionSuffix` which allows a suffix to be passed after the heading ID slug.

### 3.2.1
- Bugfixes

### 3.2.0
- Integrated `markdown-it-anchors` and changed the slugify function
- Implemented a way to prevent ID collisions in headings (using the heading line)
- Remade the tests

[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[GFM]: https://help.github.com/articles/github-flavored-markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
