var gulp           = require('gulp');
var gutil          = require("gulp-util");
var gulpif         = require("gulp-if");
var clean          = require("gulp-clean");
var browserSync    = require('browser-sync').create();
var less           = require('gulp-less');
var filter         = require('gulp-filter');
var cssmin         = require('gulp-cssmin');
var imagemin       = require('gulp-imagemin'); //压缩图片
var webpack        = require("webpack");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var handleErrors   = require('./gulp/handleErrors');

// 通过接收npm参数，判断是生产模式还是开发模式
var isProduct      = process.argv[2] == 'dev' ? false : true;

var webpackConfig  = require("./webpack.config.js");

//引用webpack对js进行操作
gulp.task('build-js', function (callback) {
    
    if(isProduct) {
        webpackConfig.devtool = "source-map";
        // 压缩混淆JS
        webpackConfig.plugins.unshift(new uglifyJsPlugin({
            compress: { warnings: false },
            sourceMap: true
        }));
    }

    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));

        callback();
    });

});

//less编译
gulp.task('lessmin', function () {
    gulp.src(['src/less/*.less'])
        .pipe(less())
        .on('error', handleErrors)     //交给notify处理错误
        //这里可以加css sprite 让每一个css合并为一个雪碧图
        //.pipe(spriter({}))
        .pipe(gulpif(isProduct,cssmin()))
        .pipe(gulp.dest('assets/css/'))
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

//iconfont
gulp.task('iconfont', function () {
    gulp.src(['src/fonts/**/*'])
        .pipe(gulp.dest('assets/fonts'));
});

// 对图片进行压缩转移
gulp.task('images',function(){ 
    //images/**/* images目录下的所有子目录和所有东西(包含东西最多) 
    //images/*/* images目录下的东西和子目录下的东西 
    //images/*.{png,jpg} images目录下的所有以png和jpg为后缀名的图片 
    return gulp.src('src/images/**/*') 
    .pipe(gulpif(isProduct,imagemin())) //压缩图片
    .pipe(gulp.dest('assets/images')); 
});


// 使用默认任务启动Browsersync，监听JS文件
gulp.task('serve', ['build-js','images','iconfont','lessmin'], function () {

    // 从这个项目的根目录启动服务器
    browserSync.init({
        server: {
            baseDir: "./"
        },
        startPath: "/views",
        port:"3004"
    });

    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    gulp.watch(["src/js/pages/**/*","src/js/*.js"],['build-js']);
    gulp.watch("assets/js/**/*", browserSync.reload);
    gulp.watch('src/fonts/**/*', ['iconfont']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch('src/less/**/*', ['lessmin']);
    gulp.watch('views/**/*', browserSync.reload);
});

gulp.task('clean', function() {
  return gulp.src(['assets/css', 'assets/js', 'assets/images'], {read: false})
      .pipe(clean());
});

// 开发模式
gulp.task('dev',['clean'],function(){
    gulp.start('serve');
});

// 生产打包模式
gulp.task('build',['clean'],function(){
    gulp.start('build-js','images','iconfont','lessmin');
});

// 默认开发模式
gulp.task('default',['clean'],function(){
    gulp.start('serve');
});