import test from 'ava'
import sinon from 'sinon'
import loaderUtils from 'loader-utils'
import webpack from '../src/webpack'
import { normal } from './fixtures/webpack-loader-transform-css'

test('webpack loader 编译 css - default', t => {
  const content = {
    resourcePath: '/src/App.module.scss',
    addDependency: () => {},
    callback: sinon.spy()
  }
  const double = [
    sinon.stub(loaderUtils, 'getOptions').callsFake(() => null),
    sinon.stub(loaderUtils, 'parseQuery').callsFake(() => ({}))
  ]
  webpack.call(content, normal)
  double.forEach(stub => stub.restore())
  const args = content.callback.args[0]
  t.snapshot(args)
})
