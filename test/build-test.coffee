'use strict'
fs = require('fs')
render = require('../lib/renderer')
source = fs.readFileSync('./fixtures/markdownit.md', 'utf8')
ctx = config: markdown: anchors:
  level: 2
  collisionSuffix: 'ver'
  permalink: true
  permalinkClass: 'header-anchor'
  permalinkSymbol: '¶'
parse = render.bind(ctx)
result = parse(text: source)
fs.writeFileSync './fixtures/outputs/.html', result
