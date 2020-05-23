# @ciiri/styled-jsx

### fork 自 [`styled-jsx`](https://github.com/zeit/styled-jsx) ，`api` 可参考原来的库。改动点如下:

- `scopeId` 插入到属性而不是原本的 `class`

  ```javascript
  <div class="orange" jsx-302262132 jsx-175175684 />
  ```

- 修改底层 css 编译库 `stylis` 为 `@vue/component-compiler-utils`，fix bug [-webkit-keyframes add unexpect scope id](https://github.com/thysultan/stylis.js/issues/200)

- 解决 `import style from 'xxx.module.scss` 语法无法兼容 `css-loader` 问题（方案：[`extract-loader`](https://github.com/peerigon/extract-loader)）

- `css` 语法与vue保持一致(因为换了编译库)，如果用scss的话，简单使用如下：
  ```css
  .App::v-deep .orange {
    color: orange;
    animation: scaleIn 3s ease-in forwards;
  }
  .pic {
    background: url(./logo192.png) no-repeat left top;
    height: 192px;
  }
  @keyframes scaleIn {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  ```

- **`version 4.2.2`** 新增 `optional style tag` 用法
  ```javascript
  { this.state.optional && <style jsx>{`
    .optional {
      color: green;
      font-size: ${this.state.fontSize};
    }
  `}</style> }
  ```

- 以后`README`只同步新特性，bug相关修复同步在`CHANGELOG`


### 已有项目如何接入

> _目的是在不影响现有流程的情况下无缝接入_

### 一、配置rules

_有两种方法，各取所需_

- 新增配置

  用文件名做区分 `xx.scss` or `xx.module.scss` ，可如下配置：

  ```javascript
  {
    test: /\.module\.(scss|sass)$/,
    use: [
      {loader: 'babel-loader'},
      {loader: require('@ciiri/styled-jsx/webpack').loader},
      {loader: 'extract-loader'},
      {loader: 'css-loader'},
      {loader: 'sass-loader'}
    ]
  }

  {
    test: /\.(scss|sass)$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'sass-loader'}
    ]
  }
  ```


- 可编程loader

  本质还是文件名做区分 `xx.scss` or `xx.module.scss` ，编程的能力来源于 [`pitch-loader`](https://github.com/singleparty/pitch-loader)

  ```javascript
  // 只是举例
  function trimPitch(args, ext) {
    const isModule = ext.filename.includes('.module.');
    const loaders = this.loaders;
    const removeList = [];
    if (isModule) {
      removeList.push('style-loader/index.js');
    } else {
      removeList.push('extract-loader/index.js', 'babel-loader/index.js', '@ciiri/styled-jsx/dist/webpack.js');
    }
    this.loaders = loaders.filter(({ path }) => !removeList.some(str => path.includes(str)));
  }

  {
    test: /\.s(a|c)ss$/,
    use: [
      { 
        loader: 'pitch-loader', 
        options: {
          pitch: trimPitch // 在pitch阶段执行loaders顺序调整、或者删除
        }
      },
      { loader: 'babel-loader' },
      { loader: require('@ciiri/styled-jsx/webpack').loader },
      { loader: 'extract-loader' },
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  }
  ```

### 二、配置babel

```javascript
"babel": {
  "plugins": [
    "@ciiri/styled-jsx/babel"
  ]
},
```
