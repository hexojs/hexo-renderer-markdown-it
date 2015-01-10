# hexo-renderer-markdown-it

Add support for [Markdown] and [CommonMark]. This plugin uses [Markdown-it] as a render engine on [Hexo].

## Installation

``` bash
$ npm install hexo-renderer-markdown-it --save
```

## Configuration
[Markdown-it] is one of the most flexible markdown renderers in node. That means it comes with lots of configuration options and even plugins to extend it self.

To be able to expose all this functionality inside [Hexo] would be an enormous task. That said, feel free to open an issue if there's something you need.

You can configure this plugin by copy and pasting the following code into your main `config.yml`.

``` yaml
# Markdown-it config
## Docs: https://github.com/celsomiranda/hexo-renderer-markdown-it/blob/master/README.md
MarkdownIt:
  # Enable HTML tags in source
  html: false,
  # Use '/' to close single tags (<br />).
  # This is only for full CommonMark compatibility.
  xhtmlOut: false,
  # Convert '\n' in paragraphs into <br>
  breaks: false,
  # CSS language prefix for fenced blocks. Can be
  # useful for external highlighters.
  langPrefix: 'language-',  
  # Autoconvert URL-like text to links
  linkify: false,
  # Enable some language-neutral replacement + quotes beautification
  typographer: false,
  # Double + single quotes replacement pairs, when typographer enabled,
  # and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',
```

[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
