var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less-sourcemap');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var riot = require('gulp-riot');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['less', 'concat-riot', 'browserify'])

gulp.task('less', function() {
    return gulp.src('./src/less/main.less')
            .pipe(less({sourceMap: {}}))
            .pipe(minifyCSS())
            .pipe(gulp.dest('./public/'))
});

gulp.task('riot', () => {
    return gulp.src('./src/riot/*.tag')
            .pipe(riot())
            .pipe(gulp.dest('./build/tags/'))
});

gulp.task('concat-riot', ['riot'], function() {
    return gulp.src(['./build/tags/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('riot.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./public/'));
});

gulp.task('browserify', function(){
    return browserify('./src/js/main.js',{debug: true} )
            .bundle()
            .pipe(source('main.js'))
            .pipe(gulp.dest('./public/'))
});
