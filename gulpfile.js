'use strict';

const fs = require('fs');
const gulp = require('gulp');
const connect = require('gulp-connect');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglifyjs');
const webpack = require('webpack-stream');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const clean = require('gulp-clean');
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
		proxy: '127.0.0.1:3338',
		port: 3338,
		https: true,
		livereload: true,
		root: './'
	});
});

gulp.task('js', () => {
	return gulp.src('src/index.js')
		.pipe(errorMessage())
    .pipe(webpack(require('./webpack.config.js')))
		.pipe(gulpIf(!isDev, rev()))
    .pipe(gulp.dest('dist'))
		.pipe(rev.manifest('dist/rev-manifest.json', {merge: true, base: 'dist'}))
		.pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('styles', () => {
  return gulp.src('src/styles/index.scss')
		.pipe(errorMessage())
		.pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
		.pipe(gulpIf(!isDev, cssnano()))
		.pipe(gulpIf(isDev, sourcemaps.write()))
		.pipe(gulpIf(!isDev, rev()))
    .pipe(gulp.dest('dist'))
		.pipe(rev.manifest('dist/rev-manifest.json', {merge: true, base: 'dist'}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
});

gulp.task('clean', () => {
	return gulp.src(['dist/*.*'], {read: false})
    .pipe(clean())
});

gulp.task('rev-html', ['styles', 'js'], () => {
  return gulp.src('src/index.html')
		.pipe(revReplace({
			manifest: gulp.src('dist/rev-manifest.json')
		}))
		.pipe(gulp.dest('dist'));
});
gulp.task('copy-html', () => {
  return gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
	gulp.watch('src/styles/**/*.*', ['styles']);
});

gulp.task('dev', ['clean', 'server', 'watch', 'copy-html', 'styles', 'js']);
gulp.task('build', ['clean', 'js', 'styles', 'rev-html']);
