'use strict';

require('chai').should();
const { readFileSync } = require('fs');
const { join } = require('path').posix;
const { sep } = require('path');
const Renderer = require('../lib/renderer');
const source = readFileSync('./test/fixtures/markdownit.md', 'utf8');
const Hexo = require('hexo');
const { url_for } = require('hexo-util');

describe('Hexo Renderer Markdown-it', () => {
  const hexo = new Hexo(__dirname, { silent: true });
  const defaultCfg = JSON.parse(JSON.stringify(Object.assign(hexo.config, {
    markdown: {
      preset: 'default',
      render: {
        html: true,
        xhtmlOut: false,
        breaks: true,
        linkify: true,
        typographer: true,
        quotes: '“”‘’'
      },
      anchors: {
        level: 2,
        collisionSuffix: '',
        permalink: false,
        permalinkClass: 'header-anchor',
        permalinkSide: 'left',
        permalinkSymbol: '¶',
        case: 0,
        separator: ''
      }
    }
  })));

  beforeEach(() => {
    hexo.config = JSON.parse(JSON.stringify(defaultCfg));
  });

  describe('preset', () => {
    it('default', () => {
      hexo.config.markdown.preset = 'default';

      const parsed_gfm = readFileSync('./test/fixtures/outputs/default.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.equal(parsed_gfm);
    });

    it('commonmark', () => {
      hexo.config.markdown.preset = 'commonmark';

      const parsed_commonmark = readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.equal(parsed_commonmark);
    });

    // Deprecated
    it('handle deprecated config', () => {
      hexo.config.markdown = 'commonmark';

      const parsed_commonmark = readFileSync('./test/fixtures/outputs/commonmark-deprecated.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.equal(parsed_commonmark);
    });

    it('zero', () => {
      hexo.config.markdown.preset = 'zero';

      const parsed_zero = readFileSync('./test/fixtures/outputs/zero.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);
      result.should.equal(parsed_zero);
    });
  });

  describe('render options', () => {
    it('custom options', () => {
      hexo.config.markdown.render = {
        html: false,
        xhtmlOut: true,
        breaks: true,
        langPrefix: '',
        linkify: true,
        typographer: true,
        quotes: '«»“”'
      };

      const parsed_custom = readFileSync('./test/fixtures/outputs/custom.html', 'utf8');
      const source = readFileSync('./test/fixtures/markdownit.md', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);
      result.should.equal(parsed_custom);
    });

    it('langPrefix', () => {
      hexo.config.markdown.render = {
        langPrefix: 'lang-'
      };

      const text = '```js\nexample\n```';
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(text);
      result.should.eql('<pre><code class="lang-js">example\n</code></pre>\n');
    });

    it('render inline', () => {
      const text = 'inline text';
      const renderer = new Renderer(hexo);
      const resultBlock = renderer.render({ text });
      const resultInline = renderer.render({ text }, { inline: true });
      resultBlock.should.eql('<p>inline text</p>\n');
      resultInline.should.eql('inline text');
    });
  });

  describe('plugins', () => {
    it('default', () => {
      hexo.config.markdown.plugins = [
        'markdown-it-abbr',
        'markdown-it-attrs',
        'markdown-it-container',
        'markdown-it-deflist',
        'markdown-it-emoji',
        'markdown-it-footnote',
        'markdown-it-ins',
        'markdown-it-mark',
        'markdown-it-sub',
        'markdown-it-sup'
      ];

      const parsed_plugins = readFileSync('./test/fixtures/outputs/plugins.html', 'utf8');
      const source = readFileSync('./test/fixtures/markdownit.md', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);
      result.should.equal(parsed_plugins);
    });

    it('custom options', () => {
      hexo.config.markdown.plugins = [
        {
          name: 'markdown-it-emoji',
          options: {
            defs: {
              smile: ':lorem:'
            }
          }
        }
      ];

      const text = ':smile:';
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(text);
      result.should.equal('<p>:lorem:</p>\n');
    });
  });

  describe('anchors', () => {
    it('collisionSuffix & permalinkClass', () => {
      hexo.config.markdown.anchors = {
        level: 2,
        collisionSuffix: 'ver',
        permalink: true,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '¶'
      };
      const expected = readFileSync('./test/fixtures/outputs/anchors.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.eql(expected);
    });

    it('permalink disabled', () => {
      hexo.config.markdown.anchors = {
        level: 1,
        collisionSuffix: '',
        permalink: false,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '¶'
      };

      const renderer = new Renderer(hexo);
      const result = renderer.parser.render('# This is an H1 title\n# This is an H1 title');
      const expected = '<h1 id="This-is-an-H1-title">This is an H1 title</h1>\n<h1 id="This-is-an-H1-title-2">This is an H1 title</h1>\n';

      result.should.eql(expected);
    });

    it('slugize - case & separator', () => {
      hexo.config.markdown.anchors = {
        level: 2,
        case: 1,
        separator: '_'
      };

      const renderer = new Renderer(hexo);
      const result = renderer.parser.render('## foo BAR');

      result.should.equal('<h2 id="foo_bar">foo BAR</h2>\n');
    });

    it('multiple posts anchor id', () => {
      hexo.config.markdown.anchors = {
        level: 2,
        collisionSuffix: 'ver',
        permalink: true,
        permalinkClass: 'header-anchor',
        permalinkSymbol: '¶'
      };
      const expected = readFileSync('./test/fixtures/outputs/anchors.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);
      const result2 = renderer.parser.render(source);

      result.should.eql(expected);
      result2.should.eql(expected);
    });

    describe('permalinkSide', () => {
      const text = '## foo';

      it('left', () => {
        hexo.config.markdown.anchors = {
          level: 2,
          permalink: true,
          permalinkClass: 'anchor',
          permalinkSide: 'left',
          permalinkSymbol: '#'
        };
        const renderer = new Renderer(hexo);
        const result = renderer.parser.render(text);

        result.should.equal('<h2 id="foo"><a class="anchor" href="#foo">#</a>foo</h2>\n');
      });

      it('right', () => {
        hexo.config.markdown.anchors = {
          level: 2,
          permalink: true,
          permalinkClass: 'anchor',
          permalinkSide: 'right',
          permalinkSymbol: '#'
        };
        const renderer = new Renderer(hexo);
        const result = renderer.parser.render(text);

        result.should.equal('<h2 id="foo">foo<a class="anchor" href="#foo">#</a></h2>\n');
      });
    });
  });

  describe('rules', () => {
    it('enable_rules', () => {
      hexo.config.markdown.preset = 'zero';
      hexo.config.markdown.enable_rules = ['link', 'image'];

      const parsed_zero = readFileSync('./test/fixtures/outputs/zero-enable_rules.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.equal(parsed_zero);
    });

    it('disable_rules', () => {
      hexo.config.markdown.preset = 'default';
      hexo.config.markdown.render.linkify = false;
      hexo.config.markdown.disable_rules = 'link';

      const parsed = readFileSync('./test/fixtures/outputs/default-disable_rules.html', 'utf8');
      const renderer = new Renderer(hexo);
      const result = renderer.parser.render(source);

      result.should.equal(parsed);
    });
  });

  describe('execFilter', () => {
    it('default', () => {

      const renderer = new Renderer(hexo);
      const result = renderer.render({ text: '[foo](javascript:bar)' });

      result.should.equal('<p>[foo](javascript:bar)</p>\n');
    });

    it('enable unsafe link', () => {
      const filter = md => {
        md.validateLink = function() { return true; };
      };
      hexo.extend.filter.register('markdown-it:renderer', filter);

      const renderer = new Renderer(hexo);
      const result = renderer.render({ text: '[foo](javascript:bar)' });

      hexo.extend.filter.unregister('markdown-it:renderer', filter);

      result.should.equal('<p><a href="javascript:bar">foo</a></p>\n');
    });

    it('should execute loaded scripts', async () => {
      const renderer = new Renderer(hexo);

      hexo.env.init = true;
      await hexo.init();

      const result = renderer.render({ text: '[foo](javascript:bar)' });

      result.should.equal('<p><a href="javascript:bar">foo</a></p>\n');
    });

    it('should be called in render', () => {
      const iterates = 3;
      const spy = {
        called: 0,
        call() {
          this.called++;
        }
      };

      const filter = md => spy.call(md);
      hexo.extend.filter.register('markdown-it:renderer', filter);

      const renderer = new Renderer(hexo);
      for (let i = 0; i < iterates; i++) {
        renderer.render({ text: '' });
      }

      hexo.extend.filter.unregister('markdown-it:renderer', filter);

      spy.called.should.equal(iterates);
    });
  });

  describe('nunjucks', () => {
    const hexo = new Hexo(__dirname, { silent: true });
    const loremFn = () => { return 'ipsum'; };
    const engine = 'md';

    before(async () => {
      await hexo.init();
      hexo.config.markdown = {};

      const renderer = new Renderer(hexo);
      function render(data, options) {
        return renderer.parser.render(data.text);
      }

      hexo.extend.tag.register('lorem', loremFn);
      hexo.extend.renderer.register('md', 'html', render, true);
    });

    it('default', async () => {
      const result = await hexo.post.render(null, { content: '**foo** {% lorem %}', engine });
      result.content.should.eql('<p><strong>foo</strong> ipsum</p>\n');
    });

    it('enable disableNunjucks', async () => {
      const renderer = hexo.render.renderer.get('md');
      renderer.disableNunjucks = true;
      hexo.extend.renderer.register('md', 'html', renderer, true);
      const result = await hexo.post.render(null, { content: '**foo** {% lorem %}', engine });
      result.content.should.eql('<p><strong>foo</strong> {% lorem %}</p>\n');
    });
  });

  describe('image options', () => {
    const body = '![](/bar/baz.jpg)';

    it('add lazyload attribute', () => {
      hexo.config.markdown.images = { lazyload: true };

      const renderer = new Renderer(hexo);
      const result = renderer.render({ text: body });

      result.should.eql('<p><img src="/bar/baz.jpg" alt="" loading="lazy"></p>\n');
    });

    it('keep lazyload attribute', () => {
      hexo.config.markdown.images = { lazyload: true };

      const renderer = new Renderer(hexo);
      const result = renderer.render({ text: body });

      result.should.eql('<p><img src="/bar/baz.jpg" alt="" loading="lazy"></p>\n');
    });

    it('should prepend root', () => {
      hexo.config.markdown.images = { prepend_root: true };

      const renderer = new Renderer(hexo);
      hexo.config.root = '/blog';

      const result = renderer.render({ text: body });

      result.should.eql('<p><img src="/blog/bar/baz.jpg" alt=""></p>\n');
    });

    it('alt text', () => {
      hexo.config.markdown.images = { test: true };

      const renderer = new Renderer(hexo);
      const result = renderer.render({ text: '![alt text](/bar/baz.jpg)' });

      result.should.eql('<p><img src="/bar/baz.jpg" alt="alt text"></p>\n');
    });

    describe('post_asset', () => {
      const Post = hexo.model('Post');
      const PostAsset = hexo.model('PostAsset');

      beforeEach(() => {
        hexo.config.post_asset_folder = true;
        hexo.config.markdown.images = {
          prepend_root: true,
          post_asset: true
        };
      });

      it('should prepend post path', async () => {
        const renderer = new Renderer(hexo);

        const asset = 'img/bar.svg';
        const slug = asset.replace(/\//g, sep);
        const content = `![](${asset})`;
        const post = await Post.insert({
          source: '_posts/foo.md',
          slug: 'foo'
        });
        const postasset = await PostAsset.insert({
          _id: `source/_posts/foo/${asset}`,
          slug,
          post: post._id
        });

        const expected = url_for.call(hexo, join(post.path, asset));
        const result = renderer.render({ text: content, path: post.full_source });
        result.should.eql(`<p><img src="${expected}" alt=""></p>\n`);

        // should not be Windows path
        expected.includes('\\').should.eql(false);

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });

      it('should prepend post path without slug', async () => {
        const renderer = new Renderer(hexo);

        const asset = 'img/bar.svg';
        const slug = asset.replace(/\//g, sep);
        const content = `![](foo/${asset})`;
        const post = await Post.insert({
          source: '_posts/foo.md',
          slug: 'foo'
        });
        const postasset = await PostAsset.insert({
          _id: `source/_posts/foo/${asset}`,
          slug,
          post: post._id
        });

        const expected = url_for.call(hexo, join(post.path, asset));
        const result = renderer.render({ text: content, path: post.full_source });
        result.should.eql(`<p><img src="${expected}" alt=""></p>\n`);

        // should not be Windows path
        expected.includes('\\').should.eql(false);

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });

      it('should not modify non-post asset', async () => {
        const renderer = new Renderer(hexo);

        const asset = 'bar.svg';
        const siteasset = '/logo/brand.png';
        const site = 'http://lorem.ipsum/dolor/huri.bun';
        const content = `![](${asset})![](${siteasset})![](${site})`;
        const post = await Post.insert({
          source: '_posts/foo.md',
          slug: 'foo'
        });
        const postasset = await PostAsset.insert({
          _id: `source/_posts/foo/${asset}`,
          slug: asset,
          post: post._id
        });

        const result = renderer.render({ text: content, path: post.full_source });
        result.should.eql([
          `<p><img src="${url_for.call(hexo, join(post.path, asset))}" alt="">`,
          `<img src="${siteasset}" alt="">`,
          `<img src="${site}" alt=""></p>`
        ].join('') + '\n');

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });

      it('post located in subfolder', async () => {
        const renderer = new Renderer(hexo);

        const asset = 'img/bar.svg';
        const slug = asset.replace(/\//g, sep);
        const content = `![](${asset})`;
        const post = await Post.insert({
          source: '_posts/lorem/foo.md',
          slug: 'foo'
        });
        const postasset = await PostAsset.insert({
          _id: `source/_posts/lorem/foo/${asset}`,
          slug,
          post: post._id
        });

        const expected = url_for.call(hexo, join(post.path, asset));
        const result = renderer.render({ text: content, path: post.full_source });
        result.should.eql(`<p><img src="${expected}" alt=""></p>\n`);

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });
    });
  });
});
