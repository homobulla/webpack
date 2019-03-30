const path = require('path')
const HtmlWbpackPlugin = require('html-webpack-plugin') // 移动html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 抽离css
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')
module.exports = {
    mode: 'development', // development or production
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
    // 若模式为dev则不会走优化项
    optimization: {
        // 优化项
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并发打包
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ]
    },
    plugins: [
        new HtmlWbpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new Webpack.ProvidePlugin({
            // 在每个模块都注入L符号
            L: 'lodash'
        })
    ],
    module: {
        // 模块
        //规则
        rules: [
            // css-loader 解析@import
            // style-loader 负责将css插入header中，
            // loader的use,若loader单一，则字符串，若多个则数组包裹，执行顺序从右向左！
            // {
            //     test: require.resolve('lodash'),
            //     use: 'expose-loader?L' // L即在全局中的别名,
            // },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    // {
                    //     loader: 'style-loader',
                    //     options: {
                    //         insertAt: 'top'
                    //     }
                    // },
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
}
