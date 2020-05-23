import test from 'ava'
import sinon from 'sinon'
import loaderUtils from 'loader-utils'
import webpack from '../src/webpack'
import read from './_read'

test('webpack loader 编译 css - default', async t => {
  const content = {
    resourcePath: '/src/App.module.scss',
    addDependency: () => {},
    callback: sinon.spy()
  }
  const css = await read('./fixtures/transform2.css')
  const double = [
    sinon.stub(loaderUtils, 'getOptions').callsFake(() => null),
    sinon.stub(loaderUtils, 'parseQuery').callsFake(() => ({}))
  ]
  webpack.call(content, css)
  double.forEach(stub => stub.restore())
  const args = content.callback.args[0]
  t.snapshot(args)
})
