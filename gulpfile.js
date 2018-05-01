var gulp         = require('gulp'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync  = require('browser-sync').create(),
	uncss        = require('gulp-uncss'),
	pug          = require('gulp-pug'),
	reload       = browserSync.reload,
	cache        = require('gulp-cache'),
	csso         = require('gulp-csso'),
	shorthand    = require('gulp-shorthand'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglify'),
	tinyPng      = require('gulp-tinypng'),
	clean        = require('gulp-clean');


gulp.task('browser-sync', function() {
	browserSync.init({
		notify: false,
		server: {
			baseDir: './build'
		}
	});
});

gulp.task('sass', function() {
	return gulp.src([
		'app/sass/**/*.sass',
		'!app/sass/**/_*.sass'
	])
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', ['sass', 'pug', 'pug-index', 'js-optimize', 'css-optimize','tiny-png', 'fonts', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/css/**/*.css', 'app/libs/**/*.css'], ['css-optimize']);
	gulp.watch('app/pug/**/*.pug', ['pug', 'pug-index', 'css-optimize']);
	gulp.watch(['build/index.html', 'build/layout/**/*.html']).on('change', reload);
	gulp.watch(['app/js/**/*.js', 'app/libs/**/*.js'], ['js-optimize']);
	gulp.watch('app/img/*', ['tiny-png']);
	gulp.watch('app/fonts/*', ['fonts']);
});

gulp.task('css-optimize', function() {
	return gulp.src([
		'app/fonts/**/*.css',
		'app/css/**/*.css',
		'app/libs/**/*.css'
	])
		.pipe(concat('main.min.css'))
		.pipe(uncss({
			html: ['build/index.html', 'build/layout/**/*.html']
		}))
		.pipe(shorthand())
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(csso({
			restructure: false,
			sourceMap: true,
			debug: true
		}))
		.pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	return gulp.src([
		'app/fonts/*',
		'!app/fonts/*.css'
	])
		.pipe(clean({forse: true}))
		.pipe(gulp.dest('build/fonts'));
});

gulp.task('clear', function() {
	cache.clearAll()
});

gulp.task('pug', function() {
	return gulp.src([
		'app/pug/**/*.pug',
		'!app/pug/index.pug',
		'!app/pug/**/_*.pug'
	])
		.pipe(pug({
			compileDebug: true
		}))
		.pipe(gulp.dest('build/layout'));
});

gulp.task('pug-index', function() {
	return gulp.src([
		'app/pug/index.pug'
	])
		.pipe(pug({
			compileDebug: true
		}))
		.pipe(gulp.dest('build'))
})

gulp.task('js-optimize', function() {
	return gulp.src([
		'app/js/**/*.js',
		'app/libs/**/*.js'
	])
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'))
		.pipe(browserSync.stream());
});

gulp.task('tiny-png', function() {
	return gulp.src('app/img/*')
		.pipe(clean({force: true}))
		.pipe(tinyPng('9CaEOyJuFSHPz0rXEDOlrloA8kYphfUp'))
		.pipe(gulp.dest('build/img'));
});

gulp.task('default', ['watch']);