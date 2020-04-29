const utils = require('@vue/component-compiler-utils')
const css = require('css')

function splitRules(content) {
  const ast = css.parse(content)
  return ast.stylesheet.rules.map(rule => {
    // 构造ast
    const _ast = {
      type: 'stylesheet',
      stylesheet: {
        rules: [rule]
      }
    }
    return css.stringify(_ast)
  })
}

/**
 * Public transform function，不过用的是@vue/component-compiler-utils
 *
 * @param {String} hash
 * @param {String} styles
 * @param {Object} settings
 * @return {string}
 */
function transform(hash, styles, settings = {}) {
  let output
  if (hash === '') {
    output = styles
  } else {
    output = utils.compileStyle({
      source: styles,
      id: hash,
      filename: settings.filename
    }).code
  }
  if (settings.splitRules) {
    output = splitRules(output)
  }
  return output
}

module.exports = transform
