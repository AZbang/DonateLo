'use strict';

const fs = require('fs');
const gulp = require('gulp');
const connect = require('gulp-connect');
// const plumber = require('gulp-plumber');
// const notify = require('gulp-notify');
// const gulpIf = require('gulp-if');
const webpack = require('webpack-stream');
const isDev = process.env.DEV !== 'production';

// var errorMessage = () => {
// 	return plumber({errorHandler: notify.onError((err) => {
// 		return {
// 			title: err.name,
// 			message: err.message
// 		}
// 	})})
// }

gulp.task('server', () => {
	return connect.server({
		proxy: '127.0.0.1:3338',
		port: 3338,
		https: true,
		livereload: true,
		root: './'
	});
});

gulp.task('dev', () => {
	return gulp.src('src/index.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('watch', () => {
	gulp.watch('./src/**/*.*', ['dev']);
});

gulp.task('default', ['dev',  'watch', 'server']);
