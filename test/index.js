'use strict';

require('chai').should();
const { readFileSync } = require('fs');
const render = require('../lib/renderer');
const source = readFileSync('./test/fixtures/markdownit.md', 'utf8');
const Hexo = require('hexo');
const {join} = require('path').posix;
const {sep} = require('path');
const {url_for} = require('hexo-util');

describe('Hexo Renderer Markdown-it', () => {
  const hexo = new Hexo(__dirname, { silent: true });
  const parse = render.bind(hexo);
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
      const result = parse({
        text: source
      });
      result.should.equal(parsed_gfm);
    });

    it('commonmark', () => {
      hexo.config.markdown.preset = 'commonmark';

      const parsed_commonmark = readFileSync('./test/fixtures/outputs/commonmark.html', 'utf8');
      const result = parse({
        text: source
      });
      result.should.equal(parsed_commonmark);
    });

    // Deprecated
    it('handle deprecated config', () => {
      hexo.config.markdown = 'commonmark';

      const parsed_commonmark = readFileSync('./test/fixtures/outputs/commonmark-deprecated.html', 'utf8');
      const result = parse({
        text: source
      });
      result.should.equal(parsed_commonmark);
    });

    it('zero', () => {
      hexo.config.markdown.preset = 'zero';

      const parsed_zero = readFileSync('./test/fixtures/outputs/zero.html', 'utf8');
      const result = parse({
        text: source
      });
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
      const result = parse({
        text: source
      });
      result.should.equal(parsed_custom);
    });

    it('langPrefix', () => {
      hexo.config.markdown.render = {
        langPrefix: 'lang-'
      };

      const text = '```js\nexample\n```';
      const result = parse({ text });
      result.should.eql('<pre><code class="lang-js">example\n</code></pre>\n');
    });
  });

  describe('plugins', () => {
    it('default', () => {
      hexo.config.markdown.plugins = [
        'markdown-it-abbr',
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
      const result = parse({
        text: source
      });
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
      const result = parse({ text });
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
      const result = parse({
        text: source
      });

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
      const result = parse({
        text: '# This is an H1 title\n# This is an H1 title'
      });
      const expected = '<h1 id="This-is-an-H1-title">This is an H1 title</h1>\n<h1 id="This-is-an-H1-title-2">This is an H1 title</h1>\n';

      result.should.eql(expected);
    });

    it('slugize - case & separator', () => {
      hexo.config.markdown.anchors = {
        level: 2,
        case: 1,
        separator: '_'
      };

      const result = parse({
        text: '## foo BAR'
      });

      result.should.equal('<h2 id="foo_bar">foo BAR</h2>\n');
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
        const result = parse({ text });

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
        const result = parse({ text });

        result.should.equal('<h2 id="foo">foo<a class="anchor" href="#foo">#</a></h2>\n');
      });
    });
  });

  describe('rules', () => {
    it('enable_rules', () => {
      hexo.config.markdown.preset = 'zero';
      hexo.config.markdown.enable_rules = ['link', 'image'];

      const parsed_zero = readFileSync('./test/fixtures/outputs/zero-enable_rules.html', 'utf8');
      const result = parse({
        text: source
      });
      result.should.equal(parsed_zero);
    });

    it('disable_rules', () => {
      hexo.config.markdown.preset = 'default';
      hexo.config.markdown.render.linkify = false;
      hexo.config.markdown.disable_rules = 'link';

      const parsed = readFileSync('./test/fixtures/outputs/default-disable_rules.html', 'utf8');
      const result = parse({
        text: source
      });
      result.should.equal(parsed);
    });
  });

  describe('execFilter', () => {
    it('default', () => {
      const result = parse({
        text: '[foo](javascript:bar)'
      });
      result.should.equal('<p>[foo](javascript:bar)</p>\n');
    });

    it('enable unsafe link', () => {
      hexo.extend.filter.register('markdown-it:renderer', md => {
        md.validateLink = function() { return true; };
      });

      const result = parse({
        text: '[foo](javascript:bar)'
      });
      result.should.equal('<p><a href="javascript:bar">foo</a></p>\n');
    });
  });

  describe('nunjucks', () => {
    const hexo = new Hexo(__dirname, { silent: true });
    const loremFn = () => { return 'ipsum'; };
    const engine = 'md';

    before(async () => {
      await hexo.init();
      hexo.extend.tag.register('lorem', loremFn);
      hexo.extend.renderer.register('md', 'html', require('../lib/renderer'), true);
    });

    beforeEach(() => { hexo.config.markdown = {}; });

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
    const body = '![](/bar/baz.jpg)![foo](/aaa/bbb.jpg)';

    it('add lazyload attribute', () => {
      hexo.config.markdown.image = {lazyload: true};
      const result = parse({text: body});
      result.should.eql('<p><img src="/bar/baz.jpg" alt="" loading="lazy"><img src="/aaa/bbb.jpg" alt="foo" loading="lazy"></p>\n');
    });
    it('keep lazyload attribute', () => {
      hexo.config.markdown.image = {lazyload: true};
      const result = parse({text: body});
      result.should.eql('<p><img src="/bar/baz.jpg" alt="" loading="lazy"><img src="/aaa/bbb.jpg" alt="foo" loading="lazy"></p>\n');
    });
    it('should prepend root', () => {
      hexo.config.markdown.image = {prependRoot: true};
      hexo.config.root = '/blog';
      const result = parse({text: body});
      result.should.eql('<p><img src="/blog/bar/baz.jpg" alt=""><img src="/blog/aaa/bbb.jpg" alt="foo"></p>\n');
    });
    describe('postAsset', () => {
      const Post = hexo.model('Post');
      const PostAsset = hexo.model('PostAsset');
      beforeEach(() => {
        hexo.config.post_asset_folder = true;
        hexo.config.markdown.image = {
          prependRoot: true,
          postAsset: true
        };
      });
      it('should prepend post path', async () => {
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
        const result = parse({ text: content, path: post.full_source });
        result.should.eql(`<p><img src="${expected}" alt=""></p>\n`);

        // should not be Windows path
        expected.includes('\\').should.eql(false);

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });

      it('should not modify non-post asset', async () => {
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

        const result = parse({ text: content, path: post.full_source });
        result.should.eql([
          `<p><img src="${url_for.call(hexo, join(post.path, asset))}" alt="">`,
          `<img src="${siteasset}" alt="">`,
          `<img src="${site}" alt=""></p>`
        ].join('') + '\n');

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });
      it('post located in subfolder', async () => {
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
        const result = parse({ text: content, path: post.full_source });
        result.should.eql(`<p><img src="${expected}" alt=""></p>\n`);

        await PostAsset.removeById(postasset._id);
        await Post.removeById(post._id);
      });
    });
  });
});
