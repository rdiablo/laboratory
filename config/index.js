module.exports = {
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/': {
                target: 'http://localhost:3000',
                chageOrigin: true,
                pathRewrite: {
                    '^api': '/api',
                    secure: false
                }
            }
        }
    }
}