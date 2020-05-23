- ## version: **`4.2.3`** 
  *2020.05.24*
  - **`fix`**: [#589 CSS content property no longer renders encoded characters](https://github.com/zeit/styled-jsx/issues/589) 

- ## version: **`4.2.2`** 
  *2020.05.18*  
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