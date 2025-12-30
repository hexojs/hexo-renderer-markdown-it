'use strict';

module.exports = {
  default: function(md) {
    md.core.ruler.push('esm_default', state => {
      state.tokens.push(new state.Token('esm_default', '', 0));
    });
    md.renderer.rules.esm_default = function() { return '[[esm_default]]'; };
  },

  named: function(md) {
    md.core.ruler.push('esm_named', state => {
      state.tokens.push(new state.Token('esm_named', '', 0));
    });
    md.renderer.rules.esm_named = function() { return '[[esm_named]]'; };
  }
};
