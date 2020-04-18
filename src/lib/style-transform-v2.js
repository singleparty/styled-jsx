const utils = require('@vue/component-compiler-utils')
/**
 * Public transform function，不过用的是@vue/component-compiler-utils
 *
 * @param {String} hash
 * @param {String} styles
 * @param {Object} settings
 * @return {string}
 */
function transform(hash, styles, settings = {}) {
  if (hash === '') {
    return styles
  }
  const output =  utils.compileStyle({
    source: styles,
    id: hash,
    filename: settings.filename
  })
  return output.code
}

module.exports = transform