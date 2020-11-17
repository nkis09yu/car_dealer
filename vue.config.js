module.exports = {
    publicPath: "./",
    lintOnSave: false,
    devServer: {
        hot: true,
        inline: false,
        liveReload: false,
        proxy: {
            '/api': {
                target: 'http://yingyanchaxun.com/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}  