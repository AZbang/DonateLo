'use strict';

const fs = require('fs');
const gulp = require('gulp');
const connect = require('gulp-connect');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const browserify = require('browserify');
const babelify = require('babelify');
const vueify = require('vueify');
const source = require('vinyl-source-stream');

const isDev = process.env.DEV !== 'production';

var errorMessage = () => {
	return plumber({errorHandler: notify.onError((err) => {
		return {
			title: err.name,
			message: err.message
		}
	})})
}

gulp.task('server', () => {
	return connect.server({
		port: 1338,
		livereload: true,
		root: './'
	});
});

gulp.task('dev', () => {
	return browserify({ entries: 'src/index.js'})
		.transform(babelify)
		.transform(vueify)
		.bundle()
		.pipe(source('build.js'))
		.pipe(gulp.dest('./'))
		.pipe(connect.reload());
});

gulp.task('watch', () => {
	gulp.watch('./src/**/*.*', ['dev']);
});


gulp.task('default', ['dev', 'watch', 'server']);
