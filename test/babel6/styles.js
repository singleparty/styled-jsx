// Packages
import test from 'ava'

// Ours
import transform from '../../src/lib/style-transform-v2'
import read from '../_read'

test('transpile styles with attributes', async t => {
  const src = await read('./fixtures/transform.css')
  t.snapshot(transform('jsx-123', src))
})

test('嵌套不报错', t => {
  const fixtures = [
    `div { &:hover { color: red } }`,
    `div {
      color: green;
      &:hover { color: red } }`,
    `:hover { div { color: red } }`,
    `@media all {
      div {
        &:hover { color: red }
      }
    }`,
    `* { div { color: red }
      &.test {
        color: red;
      }
    }`,
    `span {}
      .test {
        color: red;
      div& {
        color: red;
      }
    }`
  ]

  fixtures.forEach(fixture => {
    t.notThrows(() => transform('', fixture))
    t.notThrows(() => transform('jsx-123', fixture))
  })
})

test("doesn't throw when using at-rules", t => {
  const fixtures = [
    '@media (min-width: 480px) { div { color: red } }',
    `span {}
      @media (min-width: 480px) { div { color: red } }`,
    `@media (min-width: 480px) { div { color: red } }
    span {}`,
    `:hover {}
      @media (min-width: 480px) { div { color: red } }`,
    `:hover { color: green }
      @media (min-width: 480px) { div { color: red } }`,
    `@media (min-width: 480px) { div {} }`,
    `@keyframes foo {
      0% { opacity: 0 }
      100% { opacity: 1}
    }
    `,
    // Line with one space before @rule
    `div { color: red; }
 
     @media screen and (min-width: 480px) {
       div { color: red; }
     }
     `,
    // Line with one tab before @rule
    `div { color: red; }
	
     @media screen and (min-width: 480px) {
       div { color: red; }
     }
    `
  ]

  fixtures.forEach(fixture => {
    t.notThrows(() => transform('', fixture))
    t.notThrows(() => transform('jsx-123', fixture))
  })
})

test('没加分号报错', t => {
  t.throws(() => transform('', '@import "./test.css"', { splitRules: true }))
  t.throws(() => transform('', '@charset "UTF-8"', { splitRules: true }))
})

test('splits rules for `optimizeForSpeed`', t => {
  function snapshot(input, prefix = '') {
    t.snapshot(transform(prefix, input, { splitRules: true }))
  }

  snapshot('div { color: red }')

  snapshot('div { color: red } .p { color: red }')

  snapshot('div, span { color: red } a > .p { color: red }')

  snapshot(
    '@media (min-width: 400px) { div, span { color: red } } a > .p { color: red }'
  )

  snapshot(
    '@media (min-width: 400px) { div { color: red } span { color: red } } a > .p { color: red }'
  )

  snapshot(
    `@media (min-width: 1px) and (max-width: 768px) {
      [class*='test__test--'] {
        color: red;
      }
    }`
  )

  snapshot(
    'span { color: red } @font-face { font-family: test; src: url(test.woff); } div { color: red }'
  )

  snapshot('@charset "UTF-8";')

  snapshot('@import "./test.css";')

  snapshot(
    `
    @keyframes test {
      0% { opacity: 0 }
      100% { opacity: 1 }
    }
  `
  )

  snapshot(
    `
    @supports (display: flex) {
      div { display: flex; }
    }
  `
  )

  snapshot(
    `
    @import "./test.css";
    @supports (display: flex) {
      div { display: flex; }
    }
    div { color: red }
    a, div { color: red }
    @import "./test.css";
    @media (min-width: 400px) { div, span { color: red } }
  `
  )

  snapshot('@namespace url(http://www.w3.org/1999/xhtml);')
  snapshot('@namespace svg url(http://www.w3.org/2000/svg);')
  snapshot('@page :first { margin: 1in; }')

  snapshot(
    `
    div {
      animation: fade-in ease-in 1;
      animation-fill-mode: forwards;
      animation-duration: 500ms;
      opacity: 0;
    }
    @keyframes fade-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  `,
    'jsx-123'
  )

  snapshot(
    `
    div {
      animation: fade-in ease-in 1;
      animation-fill-mode: forwards;
      animation-duration: 500ms;
      opacity: 0;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  `
  )

  snapshot(`div { color: red } ::placeholder { color: green }`, 'jsx-123')
})
