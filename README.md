# hexo-renderer-markdown-it

[![Build Status](https://github.com/hexojs/hexo-renderer-markdown-it/workflows/Tester/badge.svg)](https://github.com/hexojs/hexo-renderer-markdown-it/actions?query=workflow%3ATester)
[![npm version](https://badge.fury.io/js/hexo-renderer-markdown-it.svg)](https://www.npmjs.com/package/hexo-renderer-markdown-it)
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

**Warning:** make sure you're inside the main hexo directory before starting this guide.

A default Hexo installation will include a markdown renderer plugin which uses `marked`, so you will have to remove it if you want to use `hexo-renderer-markdown-it`.

``` sh
$ npm un hexo-renderer-marked --save
```

If you have already removed the default renderer, and others you might of added, you can now safely install `hexo-renderer-markdown-it`

``` sh
$ npm i hexo-renderer-markdown-it --save
```

## Options

``` yml
markdown:
  preset: 'default'
  render:
    html: true
    xhtmlOut: false
    langPrefix: 'language-'
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
    separator: '-'
  images:
    lazyload: false
    prepend_root: false
    post_asset: false
  inline: false  # https://markdown-it.github.io/markdown-it/#MarkdownIt.renderInline
```

See below for more details.

## Advanced Configuration

### [Preset](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) options

``` yml
markdown:
  preset: 'default'
```

- **"commonmark"** - configures parser to strict [CommonMark](https://commonmark.org/) mode.
- **"default"** - similar to [GFM](https://github.github.com/gfm/), used when no preset name given. Enables all available rules, but still without html, typographer & autolinker.
- **"zero"** - all rules disabled. Useful to quickly setup your config via `.enable()`. For example, when you need only `bold` and `italic` markup and nothing else.

Note that the [default](https://github.com/hexojs/hexo-renderer-markdown-it#options) render and anchor options override some options in the preset. If you prefer to have the preset only:

``` yml
markdown:
  preset: 'default'
  render:
  anchors:
```

### Render options

#### html

The `html` setting defines whether or not HTML content inside the document should be escaped or passed to the final result.

``` yaml
html: true # Doesn't escape HTML content
    ## OR
html: false # Escapes HTML content so the tags will appear as text.
```

#### xhtmlOut

The `xhtmlOut` setting defines whether the parser will export fully XHTML compatible tags. This only needs to be `true` for complete [CommonMark] support.

``` yaml
xhtmlOut: true # Parser produces fully XHTML compliant code.
               # Ex: A line breaks will be <br />
    ## OR
xhtmlOut: false # Parser will not produce XHTML compliant code.
                # Ex: A line break will be <br>
```

#### breaks

Makes line breaks in the source file will be parsed into `<br>` tags. So every time you press the `Enter` key you will create a line break, which is not the default Markdown, CommonMark, or GFM behaviour.

``` yaml
breaks: true # Parser produces `<br>` tags every time there is a line break in the source document.
    ## OR
breaks: false # Parser will ignore line breaks in the source document.
              #Default double line break creates paragraph is still supported
```

#### langPrefix

Add a prefix to the class name of code blocks (when a language is specified).

``` yaml
langPrefix: 'language-' # default
```

_This option only applies when both Hexo's built-in highlighters are [**disabled**](https://hexo.io/docs/syntax-highlight#Disabled)._

**Example:**

``` yml
langPrefix: 'lang-'
```

Source:
````
``` js
example
```
````

HTML:

```html
<pre>
<code class="lang-js">example</code>
</pre>
```

#### linkify

The parser has the ability to inline links pasted directly into the text. If you write a piece of text that looks like a link it will be rendered as `<a src="http://example.com">http://example.com</a>`.

``` yaml
linkify: true # Returns text links as proper links inlined with the paragraph.
    ## OR
linkify: false # Returns text links as text.
```

#### typographer

This is enables the substitution for common typography elements like &copy;, curly quotes, dashes, etc.

``` yaml
typographer: true # Substitution of common typographical elements will take place.
    ## OR
typographer: false # No substitution, so dumb quotes will remain dumb quotes, etc.
```

#### quotes

Defines the double and single quotes used for substituting dumb quotes if typographer is set to `true`.

``` yaml
quotes: '“”‘’' # "double" will be turned into “single”
               # 'single' will be turned into ‘single’
    ## OR
quotes: '«»“”' # "double" will be turned into «single»
               # 'single' will be turned into “single”
```

#### Example configuration

``` yaml
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: false
    linkify: true
    typographer: true
    quotes: '“”‘’'
```

### Manage rules

Certain rules are enabled or disabled depending on the [preset](#preset-options). For example, "zero" preset disables all rules, to enable specific rules:

``` yml
markdown:
  preset: 'zero'

  # Single rule
  enable_rules: 'link'

  # Multiple rules
  enable_rules:
    - 'link'
    - 'image'
```

"default" preset enables all rules, to disable specific rules:

``` yml
markdown:
  preset: 'default'

  # Single rule
  disable_rules: 'link'

  # Multiple rules
  disable_rules:
    - 'link'
    - 'image'
```

#### Available rules

Since the rules are subject to change, it's better to check the Markdown-it's source code for up-to-date rules. Look for the `_rules` variable in the following files:
- [parser_block.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_block.js)
- [parser_core.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_core.js)
- [parser_inline.js](https://github.com/markdown-it/markdown-it/blob/master/lib/parser_inline.js)

### Automatic Headline ID's

Enables you to automatically create ID's for the headings so you can link back to them. A valid html document cannot have two elements with duplicate id value, for example if `title` id is already used, subsequent `title` values will be updated to `title-2`, `title-3` and so on.

Default options:

``` yaml
markdown:
  anchors:
    # Minimum level for ID creation. (Ex. h2 to h6)
    level: 2
    # A suffix that is prepended to the number given if the ID is repeated.
    collisionSuffix: ''
    # If `true`, creates an anchor tag with a permalink besides the heading.
    permalink: false
    # Class used for the permalink anchor tag.
    permalinkClass: header-anchor
    # Set to 'right' to add permalink after heading
    permalinkSide: 'left'
    # The symbol used to make the permalink
    permalinkSymbol: ¶
    # Transform anchor to (1) lower case; (2) upper case
    case: 0
    # Replace space with a character
    separator: '-'
```

### Plugins

Included plugins:
- markdown-it-abbr
- markdown-it-attrs
- markdown-it-cjk-breaks
- markdown-it-container
- markdown-it-deflist
- markdown-it-emoji
- markdown-it-footnote
- markdown-it-ins
- markdown-it-mark
- markdown-it-sub
- markdown-it-sup

Plugins are not enabled by default, to enable:

``` yaml
markdown:
  plugins:
    - markdown-it-abbr
    # installed external plugins also can be enabled
    - markdown-it-table-of-contents
```

#### Plugin option

``` yaml
markdown:
  plugins:
    - name: 'markdown-it-emoji'
      options:
        shortcuts:
          laughing: ':D'
    - name: 'other-plugin'
      options: ...
```

## Extensibility

This plugin overrides some default behaviors of how markdown-it plugin renders the markdown into html, to integrate with the Hexo ecosystem. It is possible to override this plugin too, without resorting to forking the whole thing.

For example, to enable [unsafe links](https://markdown-it.github.io/markdown-it/#MarkdownIt.prototype.validateLink) (which is disabled by default):

``` js
hexo.extend.filter.register('markdown-it:renderer', function(md) {
  const { config } = this; // Optional, parse user config from _config.yml
  md.validateLink = function() { return true; };
});

// Specify custom function in plugin option
const { slugize } = require('hexo-util');
const opts = hexo.config.markdown.anchors;
const mdSlugize = (str) => {
  return slugize(str, { transform: opts.case, ...opts });
};

hexo.extend.filter.register('markdown-it:renderer', function(md) {
  md.use(require('markdown-it-table-of-contents'), {
    includeLevel: [2,3,4],
    slugify: mdSlugize
  });
});
```

Save the file in "scripts/" folder and run Hexo as usual.

Refer to markdown-it [API documentation](https://markdown-it.github.io/markdown-it/#MarkdownIt).

## Frequently Asked Questions

### Missing Styles of GFM Task Lists

In general, adding the following styles to the theme can solve the problem.

```css
li.task-list-item {
  list-style-type: none;
}

li.task-list-item .task-list-item-checkbox {
  margin: 0 0.2em 0.25em -1.6em;
}
```

### How can I add math support?

First, install KaTeX plugin for markdown-it.

```bash
npm install katex @renbaoshuo/markdown-it-katex
```

Then add [`@renbaoshuo/markdown-it-katex`](https://github.com/renbaoshuo/markdown-it-katex) to plugins list.

```yaml
plugins:
  - '@renbaoshuo/markdown-it-katex'
  # Other plugins...
```

If you need to allow spaces before and after delimiters (e.g. `$ 1 + 1 = 2 $`), set the `skipDelimitersCheck` option to `true`:

```yaml
plugins:
  - name: '@renbaoshuo/markdown-it-katex'
    options:
      skipDelimitersCheck: true
```

Don't forget to include the KaTeX stylesheet in your html:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex/dist/katex.min.css"
/>
```

### How can I merge table cells with the same content?

Install the [`markdown-it-merge-cells`](https://github.com/Menci/markdown-it-merge-cells) plugin.

```bash
npm install markdown-it-merge-cells
```

Then add the plugin to plugins list.

```yaml
plugins:
  - markdown-it-merge-cells
  # Other plugins...
```

## Requests and bug reports

If you have any feature requests or bugs to report, you're welcome to [file an issue](https://github.com/hexojs/hexo-renderer-markdown-it/issues).


[CommonMark]: http://commonmark.org/
[Markdown]: http://daringfireball.net/projects/markdown/
[GFM]: https://help.github.com/articles/github-flavored-markdown/
[Markdown-it]: https://github.com/markdown-it/markdown-it
[Hexo]: http://hexo.io/
