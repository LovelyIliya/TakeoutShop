module.exports = {
    //解决跨域问题
    devServer: {
        host: 'localhost',
        port: '8080',
        https: false,
        open: true,
        proxy: {
            "/api": {
                target: 'http://localhost:4000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}