const webpack = require('webpack');

module.exports = {


    entry: {
        "index":"./src/index.js",//可以定义多个入口
    },
    module:{
        rules: [ 
            {
                test: /\.js$/,
                include: /src|node_modules[/\\]/,
                loader: "babel-loader"
            }
        ]
    },

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },
    mode: "development",
    devServer: {
        publicPath: __dirname + "/dist",
        host: '127.0.0.1',
        port: 8088,
        open:true,//自动打开浏览器
        openPage: '/dist/index.html',//配置项用于打开指定 URL 的网页

    },
    plugins:[
        new webpack.BannerPlugin({banner: `development build: ${new Date()}`, entryOnly: true})
    ]


}