### `2020.05.18`
- **`feat`**: `optional style tag`，eg: 
  ```javascript
  { bool && <style jsx></style> }
  ```
- **`fix`**: 修复多个dynamic导致属性设置出错bug
  ```javascript
  <style jsx>{`
    .a { color: ${this.state.color} }
  `}</style>

  <style jsx>{`
    .b { font-size: ${this.state.fontSize} }
  `}</style>
  ```