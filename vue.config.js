let path = require("path");
module.exports = {
    publicPath: './', // 处理打包后资源找不到问题
    lintOnSave: false,
    //代理
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
    },
    configureWebpack: (config) => {
        config.resolve = {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, './src'),
            }
        }
    }
}