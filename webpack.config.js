var path = require("path");


module.exports = {


    entry: {
        app: "./src/index.js",
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
        publicPath: "/dist",
        host: '127.0.0.1',
        port: 8088,
    },
    plugins:[
    ]


}