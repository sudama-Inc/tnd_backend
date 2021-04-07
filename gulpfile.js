'use strict';

const ts = require('gulp-typescript');
const gulp = require('gulp');
const tsProject = ts.createProject('tsconfig.json');

function scripts() {
	return gulp.src(['./**/*.ts', '!node_modules/**', '!migrations/**'])
		.pipe(tsProject())
		.pipe(gulp.dest('dist'));
}

function json() {
	return gulp.src(['package.json', 'swagger.json'])
		.pipe(gulp.dest('dist'));
}

function yaml() {
	return gulp.src(['./**/*.yaml', '!./dist/**/*.yaml'])
		.pipe(gulp.dest('dist'));
}

function html() {
	return gulp.src(['./**/*.html', '!./dist/**/*.html'])
		.pipe(gulp.dest('dist'));
}

function png() {
	return gulp.src(['./**/*.png', '!./dist/**/*.png'])
		.pipe(gulp.dest('dist'));
}

function jpg() {
	return gulp.src(['./**/*.jpg', '!./dist/**/*.jpg'])
		.pipe(gulp.dest('dist'));
}

function css() {
	return gulp.src('./**/*.css', '!./dist/**/*.css')
		.pipe(gulp.dest('dist'));
}


exports.scripts = scripts;

const build = gulp.parallel(
	scripts,
	json,
	yaml,
	html,
	png,
	jpg,
	css
);

gulp.task('default', build);