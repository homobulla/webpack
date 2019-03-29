let path = require('path')
let HtmlWbpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口文件
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名
        path: path.resolve(__dirname, 'dist') // 路径必须为绝对路径
    },
    devServer: {
        // 开发服务器配置
        progress: true,
        contentBase: './build' // 打开文件
    },
    plugins: [
        new HtmlWbpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        })
    ]
}
