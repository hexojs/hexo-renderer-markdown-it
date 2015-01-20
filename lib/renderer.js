var MarkdownIt = require('markdown-it');
var assign = require('object-assign');

module.exports = function (data, options) {
  var markConfig = this.config.markdown;
  var md;

  if (markConfig == 'commonmark' || markConfig == 'zero') {
    md = new MarkdownIt(markConfig);
  } else {
    md = new MarkdownIt(assign({}, markConfig, options));
  }
  return md.render(data.text);
};
