var gulp = require('gulp');
var webpack = require('webpack');
var webpackStream = require('webpack-stream'); // webpack编译
var named = require('vinyl-named'); 
var uglify = require('gulp-uglify'); // 压缩js
var rename = require('gulp-rename'); // 重命名
var cssmin = require('gulp-clean-css'); // 压缩css
var changed = require('gulp-changed'); // 只传递更改的文件
var debug = require('gulp-debug'); 
var imagemin = require('gulp-imagemin'); // 压缩图片

gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe(changed('./dist', {extension: '.html'}))
  .pipe(debug())
  .pipe(gulp.dest('./dist'))
});

gulp.task('css', function() {
	return gulp.src('./src/css/*.css')
		.pipe(changed('./dist/css', {extension: '.css'}))
		.pipe(rename({suffix: '.min'}))
		// .pipe(cssmin())
		.pipe(debug())
		.pipe(gulp.dest('./dist/css'))
});

gulp.task('scripts', function() {
	return gulp.src('./src/js/*.js')
		.pipe(named())
		.pipe(webpackStream(config))
		.pipe(rename({suffix: '.min'}))
		// .pipe(uglify())
		.pipe(debug())
		.pipe(gulp.dest('./dist/js'))
});

gulp.task('images', function() {
	return gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(debug())
		.pipe(gulp.dest('./dist/images'))
});

gulp.task('watch', function() {
	gulp.watch('./src/css/*.css', ['css']);
	gulp.watch('./src/*.html', ['html']);
});

gulp.task('default', ['watch', 'html', 'css', 'scripts', 'images']);

var config = {
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.css$/, loader: 'css-loader' },
			{ 
				test: /\.(png|jpg|gif|svg)$/, 
				loader: 'file-loader',
				query: {
					limit: 10000,
          			name: './images/[name].[ext]'
				} 
			}
		]
	},
	resolve: {
		alias: {
			'vue': 'vue/dist/vue.common.js'
		}
	},
	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
    	name: 'common'
    })
	],
	watch: true
}
