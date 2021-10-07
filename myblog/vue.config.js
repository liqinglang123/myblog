module.exports = {
    // 自动打开
    outputDir: 'dist', // 打包文件夹
    assetsDir: 'static', // 静态资源目录
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 设置index.html文件路径,网上说要设置这个，但是我打包出来还是/开头
    // devServer: { // 开发阶段的代理
        // proxy: 'http://localhost:8848', // 我是全部代理了
        // port: '8081',
        // open: true,
    //     overlay: {
    //         warnings: false,
    //         errors: true
    //     }
    // },
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                network: '@/network',
                views: '@/views',
                // 由于router 和 store 只在main.js里引用切其他地方只需要this.$router就可以，所以不需要
            }
        }
    }
}