# styled-jsx

### fork 自 [`styled-jsx`](https://github.com/zeit/styled-jsx) ，目的在于修复某些 bug，`api` 可参考原来的库，其中改动点如下:

- `scopeid` 插入到属性而不是 `class`

  ```javascript
  <div class="orange" jsx-302262132 jsx-175175684 />
  ```

- 修改底层 css 编译库 `stylis` 为 `@vue/component-compiler-utils`，修复 bug [-webkit-keyframes add unexpect scope id](https://github.com/thysultan/stylis.js/issues/200)

- 修复 `import style from 'xxx.module.scss` 语法无法兼容 `css-loader` 问题（这个不算 bug，只是找到一个解决方案 [`extract-loader`](https://github.com/peerigon/extract-loader)）

- 不支持 `optimizeForSpeed` 配置

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
      {loader: require('styled-jsx/webpack').loader},
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
      removeList.push('extract-loader/index.js', 'babel-loader/index.js', 'styled-jsx/dist/webpack.js');
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
      { loader: require('styled-jsx/webpack').loader },
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
    "styled-jsx/babel"
  ]
},
```
