# hexo-renderer-markdown-it

Add support for [Markdown] and [CommonMark]. This plugin uses [Markdown-it] as a render engine on [Hexo].

## Installation
In it's current version, [Hexo] with `hexo-renderer-marked` predefined as a markdown renderer.

To use `hexo-renderer-markdown-it` you will have to:

1. Remove `hexo-renderer-marked`
``` bash
$ npm uninstall hexo-renderer-marked --save
```

2. Install `hexo-renderer-markdown-it`
``` bash
$ npm install hexo-renderer-markdown-it --save
```
3. Configure the plugin using the template in the configuration section.

## Configuration
[Markdown-it] is one of the most flexible markdown renderers in node. That means it comes with lots of configuration options and even plugins to extend it self.

To be able to expose all this functionality inside [Hexo] would be an enormous task. That said, feel free to open an issue if there's something you need.

You can configure this plugin by copy and pasting the following code into your main `config.yml`.

``` yaml
# Markdown-it config
## Docs: https://github.com/celsomiranda/hexo-renderer-markdown-it/blob/master/README.md
MarkdownIt:
  # Enable HTML tags in source. Also needed so hexo can process code tags and
  # shortcodes.
  html: true,
  # Use '/' to close single tags (<br />). This is only for full CommonMark
  # compatibility.
  xhtmlOut: false,
  # Convert '\n' (newline) in paragraphs into <br>
  breaks: false,
  # CSS language prefix for fenced blocks. Useful for external highlighters.
  langPrefix: '',  
  # Autoconvert URL-like text to links
  linkify: true,
  # Enable some language-neutral replacement & quotes beautification
  typographer: true,
  # Double + single quotes replacement pairs, when typographer enabled,
  # and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',
```

[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
