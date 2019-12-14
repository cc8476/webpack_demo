const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');



//delDir(__dirname+"/dist");//先清空dist目录下文件

module.exports = {

    devtool: 'source-map',//开启sourcemap
    entry: {
        "index":"./src/index.js",//可以定义多个入口,
        "page":"./src/page.js"
    },
    module:{
        rules: [ 
            {
                test: /\.js$/,
                include: /src|node_modules[/\\]/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                     {
                         loader: 'style-loader'  // 将打包后的css代码以<style>标签形式添加到页面头部
                     },
                     {
                         loader: 'css-loader'    // 用于加载css文件（并没有添加到页面
                     }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'img/[name].[hash:7].[ext]'
                    }
                  }
                ]
              }
        ]
    },

    output: {
        filename: '[name].js',
        path: __dirname + "/dist"  //指定资源的输出位置
    },
    mode: "development",
    plugins:[
        new webpack.BannerPlugin({banner: `development build: ${new Date()}`, entryOnly: true}),
         new htmlWebpackPlugin({   //创建一个在内存中生成html插件
            chunks: ['index'],
            template: path.join(__dirname, '/src/index.html'),  // 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面
            filename: 'index.html',  // 指定生成内存中的页面,
            hash: true,  // 生成的.js后面加hash  :bundle.js?93da9c5565a913afd93e
        }),
        new htmlWebpackPlugin({   //创建一个在内存中生成html插件
            chunks: ['page'],
            template: path.join(__dirname, '/src/page.html'),  // 指定模板页面, 将来会根据指定的页面路径, 去生成内存中的页面
            filename: 'page.html',  // 指定生成内存中的页面,
            hash: true,  // 生成的.js后面加hash  :bundle.js?93da9c5565a913afd93e
        }), 
    ],
    devServer: {
        publicPath: "/dist", 
        
        host: '127.0.0.1',
        port: 8088,
        open:true,//自动打开浏览器
        openPage: 'dist/index.html',//配置项用于打开指定 URL 的网页
        //hot: true,  // 启动热更新,
        //不启动热更新，仍然会在代码变化时自动刷新，大多数情况下满足需求了
        //启动热更新，目前只能监控js代码，css/html如果不是module的形式，就不能监听变化
        //所以，通常情况下就不设置hot:true

        //没有运行自更新的可能2个点：
        //1.如果publicPath写成__dirname+"/dist" 就不行
        //2.应该打开的网址是http://127.0.0.1:8088/dist/index.html
        //如果变成      http://127.0.0.1:8088/dist/index.html  
        //也是不能监控变化的

    },

}





function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
}
