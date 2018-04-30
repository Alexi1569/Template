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
	imageMin     = require('gulp-imagemin');


gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', ['sass', 'pug', 'pug-index', 'js-optimize', 'image-optimize', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch(['app/css/**/*.css', 'app/libs/**/*.css'], ['css-optimize']);
	gulp.watch('app/pug/**/*.pug', ['pug', 'pug-index', 'css-optimize']);
	gulp.watch(['build/index.html', 'build/layout/**/*.html']).on('change', reload);
	gulp.watch(['app/js/**/*.js', 'app/libs/**/*.js'], ['js-optimize']);
	gulp.watch('app/img/*', ['image-optimize']);
});

gulp.task('css-optimize', function() {
	return gulp.src([
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

gulp.task('clear', function() {
	cache.clearAll()
});

gulp.task('pug', function() {
	return gulp.src([
		'app/pug/**/*.pug',
		'!app/pug/index.pug'
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

gulp.task('image-optimize', function() {
	return gulp.src('app/img/*')
		.pipe(imageMin())
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.stream());
})

gulp.task('default', ['watch']);