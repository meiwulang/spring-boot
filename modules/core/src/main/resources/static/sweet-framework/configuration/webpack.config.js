var webpack = require('webpack');
var glob = require('glob');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var path = require('path');
var fs = require("fs");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var config = require('./config'); //引入js模块配置文件


var srcDir = path.resolve(process.cwd(), 'src');

var webpackConfig = {
    entry: getEntry(),
    output: {
        path: path.join(__dirname, "assets/"),
        publicPath: "../",
        filename: "js/[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        root: [
            path.join(__dirname, "src/js/")
        ],
        alias: config.alias
    },
    plugins: [
        new webpack.ProvidePlugin(config.global),
        new CommonsChunkPlugin('js/common.js'),
        
        new webpack.HotModuleReplacementPlugin() //热加载
    ]
};

module.exports = webpackConfig;

// 生成多页面入口文件
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js/pages/');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [],
        files = {};
    dirs.forEach(function(item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js/pages/', item);
        }
    });
    console.log(files);
    return files;
}
