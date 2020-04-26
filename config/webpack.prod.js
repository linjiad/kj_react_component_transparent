const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const productConfig = {
    mode: 'production',// 打包模式
    devtool: "cheap-module-source-map", // 配置映射
}

module.exports = merge(commonConfig,productConfig);