const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清空文件加
const path = require('path');// 引入node的核心模块
module.exports = {
    entry:  // 配置文件入口
        {
            main: './src/index.js',
        },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不解决库中的js
                use: ['babel-loader', 'eslint-loader']
            },
            {
                // 规则以什么结尾
                test: /\.(jpg|png|gif)$/,
                use: {
                    // 加载哪个模块
                    loader: 'url-loader',
                    // 模块的配置
                    options: {
                        // 打包文件的名称（占位符）
                        name: '[name]_[hash].[ext]',
                        // 打包的路径
                        outputPath: 'images/',
                        // 超过某个字节会和file-loader相同，存文件
                        limit: 10240
                    }
                }
            }
            , {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:2,// 如果是样式引用的样式也执行下面两个插件
                        },
                    },
                ]
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    {
                        loader:"css-loader",
                        options:{
                            importLoaders:2,// 如果是样式引用的样式也执行下面两个插件
                        },
                    },
                    'less-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.(eot|ttf|svg|woff|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 打包文件的名称（占位符）
                        name: '[name]_[hash].[ext]',
                        // 打包的路径
                        outputPath: 'icon/',
                    }
                }
            },
        ]
    },
    externals: ['react','react-dom'], // 不打包lodash，使用业务代码中的lodash
    output: { // 打包文件存放位置
        filename: 'index.js',
        library: 'common', // 适用于《script》标签形式引入，定义一个全局变量为libray
        libraryTarget: 'umd', // 适用于import以及requer形式的引入
        // umdNamedDefine: true,
        pathinfo: true,
        path: path.resolve(__dirname, '../dist')// 打包出文件位置（__dirname当前webpack的路径）
    },
    plugins: [ // 插件配置
        new CleanWebpackPlugin(), // 自动根据配置的输出目录进行清空
    ]
}