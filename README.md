# hexo-renderer-markdown-it

[![Build Status](https://travis-ci.org/celsomiranda/hexo-renderer-markdown-it.svg)](https://travis-ci.org/celsomiranda/hexo-renderer-markdown-it)

Add support for [Markdown] and [CommonMark]. This plugin uses [Markdown-it] as a render engine on [Hexo].

## Installation
In it's current version, [Hexo] with `hexo-renderer-marked` predefined as a markdown renderer.

To use `hexo-renderer-markdown-it` you will have to:

**Step 1 -** Remove `hexo-renderer-marked`
``` powershell
$ npm un hexo-renderer-marked --save
```

**Step 2 -** Install `hexo-renderer-markdown-it`
``` powershell
$ npm i hexo-renderer-markdown-it --save
```

**Step 3 -** Configure the plugin (or leave empty for reasonable defaults).

## Configuration

While the options to enable, or disable [Markdown-it] plugins is not yet implemented, most if not all of the options available on the *vanila* parser have been exposed.

Please only choose one of the following options.

#### Option 1 - Choose defaults

You can choose the *CommonMark Strict Mode*, which tells the render to follow the latest [CommonMark] spec.

``` yaml
# Markdown-it config
## Docs: https://www.npmjs.com/package/hexo-renderer-markdown-it
markdown: 'commonmark'
```

Or you can use *Zero Mode*. This disables most of the parser functionality. You should only use this mode if you want nothing more than *italics* or **bold**.

``` yaml
# Markdown-it config
## Docs: https://www.npmjs.com/package/hexo-renderer-markdown-it
markdown: 'zero'
```

#### Option 2 - Don't pass any options to the parser

If you don't pass any configurations to the parser, it defaults to something very close to *Github Flavored Markdown*.

#### Option 3 - Specify each module (extending from GFM)

You have the option to pass a very specific configuration to the parser.

``` yaml
# Markdown-it config
## Docs: https://www.npmjs.com/package/hexo-renderer-markdown-it
markdown:
  html: true
  xhtmlOut: false
  breaks: false
  linkify: true
  typographer: true
  quotes: '“”‘’'
```

- **html:** `true || false` If true, the renderer will allow HTML tags inside markdown documents be passed to the resulting document.
- **xhtmlOut:** `true || false` If true, the renderer will export XHTML compatible tags (`<br />` instead of `<br>`). This feature exists only there to ensure [CommonMark] compliance.
- **breaks:** `true || false` Line breaks in the source file will be parsed into `<br>` tags.
- **linkify:** `true || false` Parser returns proper links from links inline with the text.
- **typographer:** `true || false` Enables substitution for common typography elements like &copy; and curly quotes.
- **quotes:** Option that defines the double and single quotes used for substituting dumb quotes if typographer is set to `true`.

[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
