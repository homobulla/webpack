[webpack4.0](https://www.bilibili.com/video/av41371417/?p=2)

## 转 es6 甚至更高级

`babel-loader @babel/core @babel/preset-env`

## 引入全局变量，将之打入 Window 对象下

1. global.variable
2. 引入 `expose-loader`,在`webpack.config.js`中添加对应规则，而后在文件中引
   入`import $ from 'loadsh'`

```js
   {
        test: require.resolve('loadsh')
        use:'expose-loader?L'    // L即在全局中的别名
    },
```

3. 在每个模块中注入第三方库，使用插件`webpack`在`plugins`中添加：

```js
new Webpack.ProvidePlugin({
    // 在每个模块都注入L符号
    L: 'lodash'
})
```

### 图片引入问题
