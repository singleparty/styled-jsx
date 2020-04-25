import css, { resolve, global } from 'styled-jsx/css'
import colors, { size } from './constants'
const color = 'red'

const zzz = css`
  div {
    font-size: 3em;
    animation: fadeIn 3s ease-in forwards;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @media (min-width: 480px) {
    div {
      color: red;
    }
  }
`

const bar = css`
  div {
    font-size: 3em;
  }
`

const baz = css.global`
  div {
    font-size: 3em;
  }
`

const a = global`
  div {
    font-size: ${size}em;
  }
`

export const uh = bar

export const foo = css`
  div {
    color: ${color};
  }
`

css.resolve`
  div {
    color: ${colors.green.light};
  }
  a { color: red }
`

const b = resolve`
  div {
    color: ${colors.green.light};
  }
  a { color: red }
`

const dynamic = colors => {
  const b = resolve`
    div {
      color: ${colors.green.light};
    }
    a { color: red }
  `
}

export default css.resolve`
  div {
    font-size: 3em;
  }
  p {
    color: ${color};
  }
`
