'use strict';

const {join, relative, basename, extname, dirname} = require('path').posix;
const {url_for} = require('hexo-util');

function mutateImageToken(token, options) {
  const {hexo, postPath} = options;
  const {prependRoot, postAsset, lazyload} = options.image;
  const {relative_link, model, source_dir} = hexo;
  const srcIdx = token.attrs.findIndex(attr => attr[0] === 'src');
  let src = token.attrs[srcIdx][1];
  if (!/^(#|\/\/|http(s)?:)/.test(src) && !relative_link && prependRoot) {
    if (!(src.startsWith('/') || src.startsWith('\\')) && postAsset) {
      const PostAsset = model.call(hexo, 'PostAsset');
      const assetDirPath = join(basename(source_dir), dirname(relative(source_dir, postPath)), basename(postPath, extname(postPath)), src);
      const asset = PostAsset.findById(assetDirPath);
      if (asset) {
        src = asset.path.replace(/\\/g, '/');
      }
    }
    token.attrs[srcIdx][1] = url_for.call(hexo, src);
  }
  if (lazyload) {
    const loadingIdx = token.attrs.findIndex(attr => attr[0] === 'loading');
    if (loadingIdx < 0) {
      token.attrs.push(['loading', 'lazy']);
    }
  }
}

function image(md, options) {
  md.core.ruler.after(
    'inline',
    'image-tag',
    state => {
      const {tokens} = state;
      tokens.forEach(blockToken => {
        if (blockToken.type === 'inline' && blockToken.children) {
          for (const token of blockToken.children) {
            if (token.type === 'image') {
              mutateImageToken(token, options);
            }
          }
        }
      });
    }
  );
}

module.exports = image;
